import { zValidator } from "@hono/zod-validator";
import { Db } from "db";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { createPublicClient, http, parseAbi, stringify } from "viem";
import { z } from "zod";
import { chains } from "./chains";
if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not set");
}

if (!process.env.APP_ENV) {
	throw new Error("APP_ENV is not set");
}

const app = new Hono();
const db = new Db(
	process.env.DATABASE_URL,
	process.env.APP_ENV === "production",
);

app.use("*", serveStatic({ root: "../ui/dist" }));
app.use("*", serveStatic({ path: "../ui/dist/index.html" }));
app.use("*", cors());

const schema = z.object({
	chainId: z.string().transform((val) => Number(val)),
	address: z.string(),
	functionSignature: z.string(),
});

const api = app
	.get("/requests", async (c) => {
		const requests = await db.getRequests();
		return c.json({
			requests: requests.map((req) => ({
				...req,
				chainId: req.chainId.toString(),
			})),
		});
	})
	.get("/health", (c) => c.json({ success: true }))
	.get(
		"/:chainId/:address/:functionSignature",
		zValidator("param", schema),
		async (c) => {
			const { chainId, address, functionSignature } = c.req.valid("param");
			if (!Object.keys(chains).includes(chainId.toString())) {
				return c.json(
					{
						error: "Chain not supported",
					},
					400,
				);
			}

			const rpcs = chains[chainId as keyof typeof chains].rpc;
			const rpcUrl = rpcs[Math.floor(Math.random() * rpcs.length)];
			const client = createPublicClient({
				chain: chains[chainId as keyof typeof chains].chain,
				transport: http(rpcUrl),
			});
			const sig = convertToSolidityFunction(functionSignature);
			const abi = parseAbi([sig]);
			const functionName = functionSignature.split("(")[0];
			const result = await client.readContract({
				address: address as `0x${string}`,
				abi,
				functionName,
			});
			await db.createRequest({
				chainId: BigInt(chainId),
				address,
				functionSignature,
				path: c.req.path,
			});
			return c.json(JSON.parse(stringify(result)));
		},
	);

function convertToSolidityFunction(signature: string): string {
	const [functionName, returnType] = signature.split("()");
	return `function ${functionName}() public view returns (${returnType
		.replace("(", "")
		.replace(")", "")})`;
}

export type Api = typeof api;
export default app;

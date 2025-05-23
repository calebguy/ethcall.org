import { zValidator } from "@hono/zod-validator";
import { Db } from "db";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { formatEther, getAddress, parseAbi, parseEther, stringify } from "viem";
import { z } from "zod";
import { InvalidChainError, chains, getClient } from "./chains";
import { convertToSolidityFunction, extractParams } from "./utils";
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
app.notFound((c) => c.html(Bun.file("../ui/dist/index.html").text()));

const balanceSchema = z.object({
	chainId: z.string().transform((val) => Number(val)),
	address: z.string(),
});

const schema = z.object({
	chainId: z.string().transform((val) => Number(val)),
	address: z.string(),
	functionSignature: z.string(),
	params: z.string().optional(),
});

const api = app
	.get("/docs", serveStatic({ path: "../ui/dist/index.html" }))
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
	.get("/chains", (c) => {
		const data = [];
		for (const { chain } of Object.values(chains)) {
			data.push({
				chainId: Number(chain.id),
				name: chain.name,
			});
		}
		return c.json(data);
	})
	.get("/wei2eth/:value", (c) => {
		const { value } = c.req.param();
		let formattedValue: string;
		try {
			formattedValue = formatEther(BigInt(value));
		} catch (error) {
			return c.json(
				{
					error: "Invalid value",
				},
				400,
			);
		}
		return c.json({ value: formattedValue });
	})
	.get("/eth2wei/:value", (c) => {
		const { value } = c.req.param();
		let weiValue: bigint;
		try {
			weiValue = parseEther(value);
		} catch (error) {
			return c.json(
				{
					error: "Invalid value",
				},
				400,
			);
		}
		return c.json({ value: weiValue.toString() });
	})
	.get(
		"/:chainId/:address/balance",
		zValidator("param", balanceSchema),
		async (c) => {
			try {
				const { chainId, address } = c.req.valid("param");
				const client = getClient(chainId);
				const balance = await client.getBalance({
					address: getAddress(address),
				});
				return c.json({ balance: formatEther(balance) });
			} catch (e) {
				if (e instanceof InvalidChainError) {
					return c.json({ error: e.message }, 400);
				}
				return c.json(
					{ error: e instanceof Error ? e.message : "Internal server error" },
					500,
				);
			}
		},
	)
	.get(
		"/:chainId/:address/:functionSignature/:params?",
		zValidator("param", schema),
		async (c) => {
			const { chainId, address, functionSignature, params } =
				c.req.valid("param");

			try {
				const client = getClient(chainId);
				const sig = convertToSolidityFunction(functionSignature);
				const functionParams = extractParams(sig, params);
				const abi = parseAbi([sig]);
				const functionName = functionSignature.split("(")[0];
				const result = await client.readContract({
					address: getAddress(address),
					abi,
					functionName,
					args: functionParams.length > 0 ? functionParams : undefined,
				});

				if (!c.req.header("Accept")?.includes("html")) {
					await db.createRequest({
						chainId: BigInt(chainId),
						address,
						functionSignature,
						path: c.req.path,
						result: JSON.parse(stringify(result)),
					});
				}
				return c.json({ result: JSON.parse(stringify(result)) });
			} catch (e) {
				if (e instanceof InvalidChainError) {
					return c.json({ error: e.message }, 400);
				}
				return c.json(
					{ error: e instanceof Error ? e.message : "Internal server error" },
					500,
				);
			}
		},
	);

export type Api = typeof api;
export default app;

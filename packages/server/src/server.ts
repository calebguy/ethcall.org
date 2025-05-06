import { zValidator } from "@hono/zod-validator";
import { Db } from "db";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import {
	createPublicClient,
	formatEther,
	getAddress,
	http,
	parseAbi,
	parseEther,
	stringify,
} from "viem";
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
app.notFound((c) => c.html(Bun.file("../ui/dist/index.html").text()));

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
	.get("/test", async (c) => {
		const client = createPublicClient({
			chain: chains[10].chain,
			transport: http("https://optimism.llamarpc.com"),
		});
		const result = await client.readContract({
			address: "0xD47B4F11Fc2be760E706C01C65248feFE51B95A0",
			abi: parseAbi([
				"function getEntry(uint256) public view returns ((uint256,uint256,string[],uint256,uint256,address))",
			]),
			functionName: "getEntry",
			args: [BigInt(14)],
		});
		return c.json({
			result: JSON.parse(stringify(result)),
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
		"/:chainId/:address/:functionSignature/:params?",
		zValidator("param", schema),
		async (c) => {
			const { chainId, address, functionSignature, params } =
				c.req.valid("param");
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
		},
	);

/**
 * Convert function signature into Solidity format
 * Supports function arguments now.
 */
function convertToSolidityFunction(signature: string): string {
	const functionPattern = /^(\w+)\((.*?)\)\((.*)\)$/;
	const match = signature.match(functionPattern);

	if (!match) {
		throw new Error(`Invalid function signature format: ${signature}`);
	}

	const functionName = match[1]; // Function name
	const inputTypes = match[2]; // Function input types
	const returnTypes = match[3]; // Return types

	// Ensure return types maintain correct parentheses
	return `function ${functionName}(${inputTypes}) public view returns (${returnTypes})`;
}

/**
 * Extract parameters and cast to correct types
 */
function extractParams(signature: string, paramsString?: string) {
	if (!paramsString) return [];

	const inputTypes = signature.match(/\((.*?)\)/)?.[1]?.split(",") || [];

	const params = paramsString.split(",").map((param, index) => {
		const type = inputTypes[index]?.trim();

		if (type?.startsWith("uint") || type?.startsWith("int")) {
			return BigInt(param);
		}
		if (type === "bool") {
			return param === "true";
		}
		if (type === "address") {
			return getAddress(param);
		}
		if (type?.endsWith("[]")) {
			return param.split(";"); // Arrays use `;` as separator
		}
		return param;
	});

	return params;
}

export type Api = typeof api;
export default app;

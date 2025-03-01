import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { createPublicClient, http, parseAbi, stringify } from "viem";
import { mainnet, optimism } from "viem/chains";
import { z } from "zod";

const app = new Hono();

app.use("*", serveStatic({ root: "../ui/dist" }));
app.use("*", serveStatic({ path: "../ui/dist/index.html" }));

const schema = z.object({
	chainId: z.string().transform((val) => Number(val)),
	address: z.string(),
	functionSignature: z.string(),
});

const chains = {
	1: {
		rpc: [
			"https://eth.llamarpc.com",
			"https://virginia.rpc.blxrbdn.com",
			"https://eth.blockrazor.xyz",
		],
		chain: mainnet,
	},
	10: {
		rpc: [
			"https://optimism.llamarpc.com",
			"https://rpc.ankr.com/optimism",
			"https://optimism.lava.build",
		],
		chain: optimism,
	},
};

const api = app
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
			return c.json(JSON.parse(stringify(result)));
		},
	)
	.get("/health", (c) => c.json({ success: true }));

function convertToSolidityFunction(signature: string): string {
	const [functionName, returnType] = signature.split("()");
	return `function ${functionName}() public view returns (${returnType.replace("(", "").replace(")", "")})`;
}

export type Api = typeof api;
export default app;

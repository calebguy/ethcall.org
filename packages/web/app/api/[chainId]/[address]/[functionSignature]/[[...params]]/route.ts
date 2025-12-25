import { InvalidChainError, getClient } from "@/lib/chains";
import { getDb } from "@/lib/db";
import { convertToSolidityFunction, extractParams } from "@/lib/server-utils";
import { getAddress, parseAbi, stringify } from "viem";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{
		params,
	}: {
		params: Promise<{
			chainId: string;
			address: string;
			functionSignature: string;
			params?: string[];
		}>;
	}
) {
	const {
		chainId,
		address,
		functionSignature,
		params: callParams,
	} = await params;
	const paramsString = callParams?.join(",");

	try {
		const client = getClient(Number(chainId));
		const sig = convertToSolidityFunction(functionSignature);
		const functionParams = extractParams(sig, paramsString);
		const abi = parseAbi([sig]);
		const functionName = functionSignature.split("(")[0];
		const result = await client.readContract({
			address: getAddress(address),
			abi,
			functionName,
			args: functionParams.length > 0 ? functionParams : undefined,
		});

		const acceptHeader = request.headers.get("Accept") || "";
		if (!acceptHeader.includes("html")) {
			const url = new URL(request.url);
			const db = getDb();
			await db.createRequest({
				chainId: BigInt(chainId),
				address,
				functionSignature,
				path: url.pathname,
				result: JSON.parse(stringify(result)),
			});
		}
		return NextResponse.json({ result: JSON.parse(stringify(result)) });
	} catch (e) {
		if (e instanceof InvalidChainError) {
			return NextResponse.json({ error: e.message }, { status: 400 });
		}
		return NextResponse.json(
			{ error: e instanceof Error ? e.message : "Internal server error" },
			{ status: 500 }
		);
	}
}

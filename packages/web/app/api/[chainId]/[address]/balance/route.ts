import { InvalidChainError, getClient } from "@/lib/chains";
import { formatEther, getAddress } from "viem";
import { NextResponse } from "next/server";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ chainId: string; address: string }> }
) {
	const { chainId, address } = await params;
	try {
		const client = getClient(Number(chainId));
		const balance = await client.getBalance({
			address: getAddress(address),
		});
		return NextResponse.json({ result: formatEther(balance) });
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

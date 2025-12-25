import { chains } from "@/lib/chains";
import { NextResponse } from "next/server";

export async function GET() {
	const data = [];
	for (const { chain } of Object.values(chains)) {
		data.push({
			chainId: Number(chain.id),
			name: chain.name,
		});
	}
	return NextResponse.json(data);
}

import { formatEther } from "viem";
import { NextResponse } from "next/server";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ value: string }> }
) {
	const { value } = await params;
	try {
		const formattedValue = formatEther(BigInt(value));
		return NextResponse.json(formattedValue);
	} catch {
		return NextResponse.json({ error: "Invalid value" }, { status: 400 });
	}
}

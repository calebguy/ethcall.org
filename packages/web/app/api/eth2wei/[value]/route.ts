import { parseEther } from "viem";
import { NextResponse } from "next/server";

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ value: string }> }
) {
	const { value } = await params;
	try {
		const weiValue = parseEther(value);
		return NextResponse.json(weiValue.toString());
	} catch {
		return NextResponse.json({ error: "Invalid value" }, { status: 400 });
	}
}

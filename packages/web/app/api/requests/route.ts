import { getDb } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
	const db = getDb();
	const requests = await db.getRequests();
	return NextResponse.json({
		requests: requests.map((req) => ({
			...req,
			chainId: req.chainId.toString(),
		})),
	});
}

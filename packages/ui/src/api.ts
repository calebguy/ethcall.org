import { hc } from "hono/client";
import type { Api } from "server/src/server";
const client = hc<Api>(import.meta.env.VITE_API_BASE_URL);

export async function getRequests() {
	const res = await client.requests.$get();
	if (!res.ok) {
		throw new Error("Failed to fetch requests");
	}
	return res.json();
}

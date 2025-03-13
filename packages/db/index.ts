import { desc } from "drizzle-orm";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle } from "drizzle-orm/node-postgres";
import { requests } from "./src/schema";

class Db {
	private pg;

	constructor(connectionUrl: string, isNeon: boolean) {
		const params = {
			casing: "snake_case",
			connection: connectionUrl,
			schema: {
				requests,
			},
		};
		//@ts-expect-error
		this.pg = isNeon ? drizzleNeon(params) : drizzle(params);
	}

	async createRequest(request: InsertRequest) {
		return this.pg.insert(requests).values(request).returning();
	}

	async getRequests() {
		return this.pg
			.select()
			.from(requests)
			.orderBy(desc(requests.createdAt))
			.limit(50);
	}
}

export type SelectRequest = typeof requests.$inferSelect;
export type InsertRequest = typeof requests.$inferInsert;
export { Db };

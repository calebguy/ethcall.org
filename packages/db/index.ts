import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle } from "drizzle-orm/node-postgres";
import { requests } from "./src/schema";

class Db {
	private pg;

	constructor(
		private readonly connectionUrl: string,
		isNeon: boolean,
	) {
		const params = {
			casing: "snake_case",
			connection: this.connectionUrl,
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
		return this.pg.select().from(requests).limit(25);
	}
}

export type SelectRequest = typeof requests.$inferSelect;
export type InsertRequest = typeof requests.$inferInsert;
export { Db };

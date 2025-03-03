import {
	bigint,
	jsonb,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";

export const requests = pgTable("requests", {
	id: uuid("id").primaryKey().defaultRandom(),
	chainId: bigint("chain_id", { mode: "bigint" }).notNull(),
	functionSignature: text("function_signature").notNull(),
	address: text("address").notNull(),
	path: text("path").notNull(),
	result: jsonb("result"),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

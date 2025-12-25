import { Db } from "db";

let _db: Db | null = null;

export function getDb(): Db {
	if (!_db) {
		if (!process.env.DATABASE_URL) {
			throw new Error("DATABASE_URL is not set");
		}
		const isProduction = process.env.NODE_ENV === "production";
		_db = new Db(process.env.DATABASE_URL, isProduction);
	}
	return _db;
}

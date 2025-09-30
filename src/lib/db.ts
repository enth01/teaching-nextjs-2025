import { DB } from "@/lib/db-types";
import SQLite from "better-sqlite3";
import { SqliteDialect, Kysely } from "kysely";

export default function getDB(){
  const dialect = new SqliteDialect({ database: new SQLite("db.sqlite") });
  const db = new Kysely<DB>({ dialect });
  return db
}
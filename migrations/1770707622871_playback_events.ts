import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<unknown>): Promise<void> {
	await sql`CREATE TABLE playback_events (
		id integer primary key autoincrement not null,
		name text not null,
		date integer not null,
		user_id integer not null,
		song_id integer not null,
		foreign key (user_id) references users (id),
		foreign key (song_id) references songs (id)
	) STRICT`.execute(db);
}

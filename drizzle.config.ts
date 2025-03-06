import { defineConfig } from 'drizzle-kit';
import { config } from "dotenv";
config();

export default defineConfig({
	schema: './src/lib/db/schema.ts',
	dbCredentials: {
		url: process.env.DB_URL ?? "",
		authToken: process.env.DB_TOKEN ?? ""
	},
	verbose: true,
	strict: true,
	dialect: 'turso',
	out: './src/lib/db/migrations'
});

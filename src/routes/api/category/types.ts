import type { categories, subcategories } from "$lib/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type Category = InferSelectModel<typeof categories>;
export type Subcategory = InferSelectModel<typeof subcategories>;

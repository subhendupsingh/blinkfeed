import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    role: text('role', {enum: ["user", "admin", "moderator"]}).notNull().default('user'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow()
});

export const categories = sqliteTable('categories', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull().unique(),
    slug: text('slug').unique(),
    status: text('status', {enum: ["pending", "approved", "rejected"]}).default('pending')
}, (table) => ({
    uniqueName: uniqueIndex('unique_name').on(table.name),
    uniqueSlug: uniqueIndex('unique_slug').on(table.slug)
}));

export const subcategories = sqliteTable('subcategories', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    categoryId: integer('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
    slug: text('slug').unique(),
    status: text('status', {enum: ["pending", "approved", "rejected"]}).default('pending')
  }, (table) => ({
    uniqueNamePerCategory: uniqueIndex('unique_name_per_category').on(table.categoryId, table.name),
    uniqueSlug: uniqueIndex('unique_slug_subcategory').on(table.slug)
}));

export const rssFeeds = sqliteTable('rss_feeds', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    url: text('url').notNull().unique(),
    categoryId: integer('category_id').notNull().references(() => categories.id),
    subcategoryId: integer('subcategory_id').references(() => subcategories.id), // Optional
    status: text('status', {enum: ["pending", "approved", "rejected"]}).notNull().default('pending'), // e.g., 'pending', 'approved', 'rejected'
    submittedBy: integer('submitted_by').references(() => users.id),
    blogName: text('blog_name'),
    author: text('author'),
    description: text('description'),
    favicon: text('favicon'),
    ogImage: text('og_image'),
    lastFetchedAt: integer('last_fetched_at', { mode: 'timestamp' }),
    blogLastUpdatedAt: integer('blog_last_updated_at', { mode: 'timestamp' }),
    latestArticles: text('latest_articles'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow()
});

export const articles = sqliteTable('articles', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    rssFeedId: integer('rss_feed_id').references(() => rssFeeds.id),
    title: text('title').notNull(),
    link: text('link').notNull().unique(),
    pubDate: integer('pub_date', { mode: 'timestamp' }),
    author: text('author'),
    summary: text('summary'),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow(),
    ogImage: text('og_image')
});

export const bugReports = sqliteTable('bug_reports', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    contact: text('contact').notNull(),
    message: text('message').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull().defaultNow()
});
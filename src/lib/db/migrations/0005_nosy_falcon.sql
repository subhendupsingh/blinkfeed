ALTER TABLE `categories` ADD `slug` text;--> statement-breakpoint
CREATE UNIQUE INDEX `categories_slug_unique` ON `categories` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_name` ON `categories` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_slug` ON `categories` (`slug`);--> statement-breakpoint
ALTER TABLE `subcategories` ADD `slug` text;--> statement-breakpoint
CREATE UNIQUE INDEX `subcategories_slug_unique` ON `subcategories` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `unique_slug_subcategory` ON `subcategories` (`slug`);
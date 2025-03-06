
INSERT INTO categories (name) VALUES ('Technology'),('Programming'),('Web Development'),('Cloud Computing'),('Design');--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Artificial Intelligence', id FROM categories WHERE name = 'Technology';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Blockchain', id FROM categories WHERE name = 'Technology';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Internet of Things (IoT)', id FROM categories WHERE name = 'Technology';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Languages', id FROM categories WHERE name = 'Programming';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Frameworks', id FROM categories WHERE name = 'Programming';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Tools', id FROM categories WHERE name = 'Programming';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Frontend Development', id FROM categories WHERE name = 'Web Development';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Backend Development', id FROM categories WHERE name = 'Web Development';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Full Stack Development', id FROM categories WHERE name = 'Web Development';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Cloud Providers', id FROM categories WHERE name = 'Cloud Computing';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Serverless Architecture', id FROM categories WHERE name = 'Cloud Computing';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'UI/UX Design', id FROM categories WHERE name = 'Design';--> statement-breakpoint
INSERT INTO subcategories (name, category_id) SELECT 'Graphic Design', id FROM categories WHERE name = 'Design';

INSERT INTO categories (name, slug) VALUES ('Technology','technology'),('Programming','programming'),('Web Development', 'web-development'),('Cloud Computing', 'cloud-computing'),('Design', 'design');--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Artificial Intelligence', id, 'artificial-intelligence' FROM categories WHERE name = 'Technology';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Blockchain', id, 'blockchain' FROM categories WHERE name = 'Technology';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Internet of Things (IoT)', id, 'internet-of-things' FROM categories WHERE name = 'Technology';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Languages', id, 'languages' FROM categories WHERE name = 'Programming';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Frameworks', id, 'frameworks' FROM categories WHERE name = 'Programming';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Tools', id, 'tools' FROM categories WHERE name = 'Programming';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Frontend Development', id, 'frontend-development' FROM categories WHERE name = 'Web Development';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Backend Development', id, 'backend-development' FROM categories WHERE name = 'Web Development';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Full Stack Development', id, 'full-stack-development' FROM categories WHERE name = 'Web Development';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Cloud Providers', id, 'cloud-providers' FROM categories WHERE name = 'Cloud Computing';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Serverless Architecture', id, 'serverless-architecture' FROM categories WHERE name = 'Cloud Computing';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'UI/UX Design', id, 'ui-ux-design' FROM categories WHERE name = 'Design';--> statement-breakpoint
INSERT INTO subcategories (name, category_id, slug) SELECT 'Graphic Design', id, 'graphic-design' FROM categories WHERE name = 'Design';
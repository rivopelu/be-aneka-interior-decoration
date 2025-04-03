ALTER TABLE `product` ADD `slug` varchar(256) NOT NULL;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_slug_unique` UNIQUE(`slug`);
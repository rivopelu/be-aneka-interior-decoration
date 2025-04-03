CREATE TABLE `product` (
	`id` varchar(255) NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	`created_date` timestamp NOT NULL DEFAULT (now()),
	`created_by` varchar(256) NOT NULL DEFAULT 'SYSTEM',
	`updated_date` timestamp,
	`updated_by` varchar(256),
	`deleted_by` varchar(256),
	`deleted_date` timestamp,
	`name` varchar(256) NOT NULL,
	`description` text,
	`image` text NOT NULL,
	`category_id` varchar(255),
	`price` int NOT NULL,
	CONSTRAINT `product_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_category_id_category_id_fk` FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON DELETE cascade ON UPDATE no action;
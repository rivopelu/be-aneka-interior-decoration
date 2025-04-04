CREATE TABLE `cart` (
	`id` varchar(255) NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	`created_date` timestamp NOT NULL DEFAULT (now()),
	`created_by` varchar(256) NOT NULL DEFAULT 'SYSTEM',
	`updated_date` timestamp,
	`updated_by` varchar(256),
	`deleted_by` varchar(256),
	`deleted_date` timestamp,
	`product_id` varchar(255) NOT NULL,
	`account_id` varchar(255) NOT NULL,
	`qty` int NOT NULL,
	CONSTRAINT `cart_id` PRIMARY KEY(`id`),
	CONSTRAINT `account_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
ALTER TABLE `category` DROP INDEX `category_id_unique`;--> statement-breakpoint
ALTER TABLE `product` DROP INDEX `category_id_unique`;--> statement-breakpoint
ALTER TABLE `account` DROP INDEX `category_id_unique`;--> statement-breakpoint
ALTER TABLE `category` ADD CONSTRAINT `account_id_unique` UNIQUE(`id`);--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `account_id_unique` UNIQUE(`id`);--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_id_unique` UNIQUE(`id`);--> statement-breakpoint
ALTER TABLE `cart` ADD CONSTRAINT `cart_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `cart` ADD CONSTRAINT `cart_account_id_account_id_fk` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE no action ON UPDATE no action;
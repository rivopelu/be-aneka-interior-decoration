CREATE TABLE `shipping_address` (
	`id` varchar(255) NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	`created_date` timestamp NOT NULL DEFAULT (now()),
	`created_by` varchar(256) NOT NULL DEFAULT 'SYSTEM',
	`updated_date` timestamp,
	`updated_by` varchar(256),
	`deleted_by` varchar(256),
	`deleted_date` timestamp,
	`account_id` varchar(255) NOT NULL,
	`destination_code` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL,
	`subdistrict` varchar(255) NOT NULL,
	`province` varchar(255) NOT NULL,
	`address` text NOT NULL,
	CONSTRAINT `shipping_address_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
ALTER TABLE `account` DROP INDEX `account_id_unique`;--> statement-breakpoint
ALTER TABLE `cart` DROP INDEX `account_id_unique`;--> statement-breakpoint
ALTER TABLE `category` DROP INDEX `account_id_unique`;--> statement-breakpoint
ALTER TABLE `product` DROP INDEX `account_id_unique`;--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `category_id_unique` UNIQUE(`id`);--> statement-breakpoint
ALTER TABLE `cart` ADD CONSTRAINT `category_id_unique` UNIQUE(`id`);--> statement-breakpoint
ALTER TABLE `category` ADD CONSTRAINT `category_id_unique` UNIQUE(`id`);--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `category_id_unique` UNIQUE(`id`);--> statement-breakpoint
ALTER TABLE `shipping_address` ADD CONSTRAINT `shipping_address_account_id_account_id_fk` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE no action ON UPDATE no action;
CREATE TABLE `category` (
	`id` varchar(255) NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	`created_date` timestamp NOT NULL DEFAULT (now()),
	`created_by` varchar(256) NOT NULL DEFAULT 'SYSTEM',
	`updated_date` timestamp,
	`updated_by` varchar(256),
	`deleted_by` varchar(256),
	`deleted_date` timestamp,
	`name` varchar(256) NOT NULL,
	`slug` varchar(256) NOT NULL,
	CONSTRAINT `category_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_id_unique` UNIQUE(`id`),
	CONSTRAINT `category_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
ALTER TABLE `account` DROP INDEX `account_id_unique`;--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `category_id_unique` UNIQUE(`id`);
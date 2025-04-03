ALTER TABLE `account` DROP INDEX `account_id_unique`;--> statement-breakpoint
ALTER TABLE `category` MODIFY COLUMN `id` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `category` ADD PRIMARY KEY(`id`);--> statement-breakpoint
ALTER TABLE `category` ADD CONSTRAINT `category_id_unique` UNIQUE(`id`);--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `category_id_unique` UNIQUE(`id`);
DROP TABLE `category`;--> statement-breakpoint
ALTER TABLE `account` DROP INDEX `category_id_unique`;--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_id_unique` UNIQUE(`id`);
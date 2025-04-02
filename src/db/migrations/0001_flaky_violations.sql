ALTER TABLE `account` MODIFY COLUMN `created_date` timestamp NOT NULL DEFAULT (now());--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `updated_date` timestamp;--> statement-breakpoint
ALTER TABLE `account` MODIFY COLUMN `deleted_date` timestamp;
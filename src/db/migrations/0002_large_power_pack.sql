CREATE TABLE `category` (
	`id` varchar(256) NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	`created_date` timestamp NOT NULL DEFAULT (now()),
	`created_by` varchar(256) NOT NULL DEFAULT 'SYSTEM',
	`updated_date` timestamp,
	`updated_by` varchar(256),
	`deleted_by` varchar(256),
	`deleted_date` timestamp,
	`name` varchar(256) NOT NULL,
	`slug` varchar(256) NOT NULL,
	CONSTRAINT `category_slug_unique` UNIQUE(`slug`)
);

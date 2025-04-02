CREATE TABLE `account` (
	`id` varchar(255) NOT NULL DEFAULT 'uuid',
	`name` varchar(256) NOT NULL,
	`email` varchar(256) NOT NULL,
	`role` enum('USER','ADMIN') DEFAULT 'USER',
	`active` boolean NOT NULL DEFAULT true,
	`created_date` datetime NOT NULL DEFAULT '2025-04-02 14:27:12.090',
	`createdBy` varchar(256) NOT NULL,
	`updated_date` datetime,
	`updatedBy` varchar(256),
	`deletedBy` varchar(256),
	`deleted_date` datetime,
	CONSTRAINT `account_id` PRIMARY KEY(`id`),
	CONSTRAINT `account_id_unique` UNIQUE(`id`),
	CONSTRAINT `account_email_unique` UNIQUE(`email`)
);

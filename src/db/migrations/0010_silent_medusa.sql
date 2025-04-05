CREATE TABLE `order` (
	`id` varchar(255) NOT NULL,
	`active` boolean NOT NULL DEFAULT true,
	`created_date` timestamp NOT NULL DEFAULT (now()),
	`created_by` varchar(256) NOT NULL DEFAULT 'SYSTEM',
	`updated_date` timestamp,
	`updated_by` varchar(256),
	`deleted_by` varchar(256),
	`deleted_date` timestamp,
	`delivery_cost` int NOT NULL,
	`delivery_service_name` varchar(255) NOT NULL,
	`delivery_service_description` varchar(255) NOT NULL,
	`delivery_service_estimated` varchar(255) NOT NULL,
	`total_payment` int NOT NULL,
	`total_for_goods_payment` int NOT NULL,
	`account_id` varchar(255) NOT NULL,
	`shipping_address_id` varchar(255) NOT NULL,
	CONSTRAINT `order_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
ALTER TABLE `order` ADD CONSTRAINT `order_account_id_account_id_fk` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order` ADD CONSTRAINT `order_shipping_address_id_shipping_address_id_fk` FOREIGN KEY (`shipping_address_id`) REFERENCES `shipping_address`(`id`) ON DELETE no action ON UPDATE no action;
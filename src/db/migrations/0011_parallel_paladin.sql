CREATE TABLE `order_product` (
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
	`order_id` varchar(255) NOT NULL,
	`qty` int NOT NULL,
	`total_price` int NOT NULL,
	`price_per_qty` int NOT NULL,
	CONSTRAINT `order_product_id` PRIMARY KEY(`id`),
	CONSTRAINT `category_id_unique` UNIQUE(`id`)
);
--> statement-breakpoint
ALTER TABLE `order_product` ADD CONSTRAINT `order_product_product_id_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_product` ADD CONSTRAINT `order_product_account_id_account_id_fk` FOREIGN KEY (`account_id`) REFERENCES `account`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_product` ADD CONSTRAINT `order_product_order_id_order_id_fk` FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE no action ON UPDATE no action;
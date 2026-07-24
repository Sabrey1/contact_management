CREATE TABLE `suppliers` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`contact_person` text,
	`email` text,
	`phone` text,
	`address` text,
	`website` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);

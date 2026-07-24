CREATE TABLE `contact_emails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contact_id` integer NOT NULL,
	`email` text NOT NULL,
	`type` text,
	FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `contact_phones` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`contact_id` integer NOT NULL,
	`phone` text NOT NULL,
	`type` text,
	FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `contacts` DROP COLUMN `email`;--> statement-breakpoint
ALTER TABLE `contacts` DROP COLUMN `phone`;
ALTER TABLE `tasks` RENAME TO `transactions`;--> statement-breakpoint
ALTER TABLE `transactions` RENAME COLUMN "name" TO "amount";--> statement-breakpoint
ALTER TABLE `transactions` RENAME COLUMN "done" TO "callback_url";--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`id` text PRIMARY KEY NOT NULL,
	`reference` text NOT NULL,
	`amount` real NOT NULL,
	`callback_url` text,
	`status` text DEFAULT 'pending',
	`network` text,
	`asset` text NOT NULL,
	`metadata` text NOT NULL,
	`created_at` integer,
	`updated_at` integer
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("id", "reference", "amount", "callback_url", "status", "network", "asset", "metadata", "created_at", "updated_at") SELECT "id", "reference", "amount", "callback_url", "status", "network", "asset", "metadata", "created_at", "updated_at" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
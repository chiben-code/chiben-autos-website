CREATE TABLE `site_settings` (
	`id` text PRIMARY KEY NOT NULL,
	`phone` text NOT NULL,
	`whatsapp` text NOT NULL,
	`email` text NOT NULL,
	`address` text NOT NULL,
	`tagline` text NOT NULL,
	`animation_mode` text DEFAULT 'balanced' NOT NULL,
	`auctions_status` text DEFAULT 'coming-soon' NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `vehicles` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`name` text NOT NULL,
	`category` text NOT NULL,
	`price_label` text DEFAULT 'Price on request' NOT NULL,
	`price_ngn` integer,
	`year` integer NOT NULL,
	`mileage` text DEFAULT '' NOT NULL,
	`transmission` text DEFAULT 'Automatic' NOT NULL,
	`fuel` text DEFAULT 'Petrol' NOT NULL,
	`body_type` text DEFAULT '' NOT NULL,
	`color` text DEFAULT '' NOT NULL,
	`location` text DEFAULT 'Lagos' NOT NULL,
	`image_url` text NOT NULL,
	`gallery_json` text DEFAULT '[]' NOT NULL,
	`features_json` text DEFAULT '[]' NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`badge` text DEFAULT 'Chiben selection' NOT NULL,
	`featured` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`prototype_visual` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `vehicles_slug_unique` ON `vehicles` (`slug`);
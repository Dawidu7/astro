CREATE TABLE `admin` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`password` varchar(60) NOT NULL,
	CONSTRAINT `admin_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `cameras` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`matrixX` real NOT NULL,
	`matrixY` real NOT NULL,
	`pixelSize` real NOT NULL,
	`resolutionX` int NOT NULL,
	`resolutionY` int NOT NULL,
	CONSTRAINT `cameras_id` PRIMARY KEY(`id`),
	CONSTRAINT `cameras_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `catalogs` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`value` varchar(255) NOT NULL,
	CONSTRAINT `catalogs_id` PRIMARY KEY(`id`),
	CONSTRAINT `catalogs_name_unique` UNIQUE(`name`),
	CONSTRAINT `catalogs_value_unique` UNIQUE(`value`)
);
--> statement-breakpoint
CREATE TABLE `flattReduc` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`times` real NOT NULL,
	CONSTRAINT `flattReduc_id` PRIMARY KEY(`id`),
	CONSTRAINT `flattReduc_name_unique` UNIQUE(`name`),
	CONSTRAINT `flattReduc_times_unique` UNIQUE(`times`)
);
--> statement-breakpoint
CREATE TABLE `images` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`imageUrl` varchar(255) NOT NULL,
	`thumbnailUrl` varchar(255) NOT NULL,
	`acquisition` varchar(255),
	`annotationUrl` varchar(255),
	`camera` varchar(255),
	`date` date,
	`exposureDetails` varchar(255),
	`filters` varchar(255),
	`info` varchar(255),
	`mount` varchar(255),
	`optic` varchar(255),
	`processing` varchar(255),
	`sqml` varchar(255),
	CONSTRAINT `images_id` PRIMARY KEY(`id`),
	CONSTRAINT `images_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `option` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('angle','camera','catalog','constellation','filter','telescope') NOT NULL,
	CONSTRAINT `option_id` PRIMARY KEY(`id`),
	CONSTRAINT `option_name_unique` UNIQUE(`name`),
	CONSTRAINT `option_name_type_unique` UNIQUE(`name`,`type`)
);
--> statement-breakpoint
CREATE TABLE `telescopes` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`focalLength` int NOT NULL,
	`diameter` int NOT NULL,
	`focalRatio` real NOT NULL,
	CONSTRAINT `telescopes_id` PRIMARY KEY(`id`),
	CONSTRAINT `telescopes_name_unique` UNIQUE(`name`)
);

DO $$ BEGIN
 CREATE TYPE "type" AS ENUM('angle', 'camera', 'catalog', 'constellation', 'filter', 'telescope');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" varchar(60) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cameras" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"matrixX" real NOT NULL,
	"matrixY" real NOT NULL,
	"pixelSize" real NOT NULL,
	"resolutionX" integer NOT NULL,
	"resolutionY" integer NOT NULL,
	CONSTRAINT "cameras_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "catalogs" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"value" varchar(255) NOT NULL,
	CONSTRAINT "catalogs_name_unique" UNIQUE("name"),
	CONSTRAINT "catalogs_value_unique" UNIQUE("value")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "flattReduc" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"times" real NOT NULL,
	CONSTRAINT "flattReduc_name_unique" UNIQUE("name"),
	CONSTRAINT "flattReduc_times_unique" UNIQUE("times")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"imageUrl" varchar(255) NOT NULL,
	"thumbnailUrl" varchar(255) NOT NULL,
	"acquisition" varchar(255),
	"annotationUrl" varchar(255),
	"camera" varchar(255),
	"date" date,
	"exposureDetails" varchar(255),
	"filters" varchar(255),
	"info" varchar(255),
	"mount" varchar(255),
	"optic" varchar(255),
	"processing" varchar(255),
	"sqml" varchar(255),
	CONSTRAINT "images_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "option" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"type" "type" NOT NULL,
	CONSTRAINT "option_name_unique" UNIQUE("name"),
	CONSTRAINT "option_name_type_unique" UNIQUE("name","type")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "telescopes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"focalLength" integer NOT NULL,
	"diameter" integer NOT NULL,
	"focalRatio" real NOT NULL,
	CONSTRAINT "telescopes_name_unique" UNIQUE("name")
);

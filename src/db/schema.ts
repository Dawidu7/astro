import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import {
  date,
  integer,
  pgEnum,
  pgTable,
  real,
  serial,
  unique,
  varchar,
} from "drizzle-orm/pg-core"

export const admin = pgTable("admin", {
  id: serial("id").primaryKey(),
  password: varchar("password", { length: 60 }).notNull(),
})

export const cameras = pgTable("cameras", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  matrixX: real("matrixX").notNull(),
  matrixY: real("matrixY").notNull(),
  pixelSize: real("pixelSize").notNull(),
  resolutionX: integer("resolutionX").notNull(),
  resolutionY: integer("resolutionY").notNull(),
})

export const catalogs = pgTable("catalogs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  value: varchar("value", { length: 255 }).notNull().unique(),
})

export const flattReducs = pgTable("flattReduc", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  times: real("times").notNull().unique(),
})

export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  imageUrl: varchar("imageUrl", { length: 255 }).notNull(),
  thumbnailUrl: varchar("thumbnailUrl", { length: 255 }).notNull(),
  acquisition: varchar("acquisition", { length: 255 }),
  annotationUrl: varchar("annotationUrl", { length: 255 }),
  camera: varchar("camera", { length: 255 }),
  date: date("date"),
  exposureDetails: varchar("exposureDetails", { length: 255 }),
  filters: varchar("filters", { length: 255 }),
  info: varchar("info", { length: 255 }),
  mount: varchar("mount", { length: 255 }),
  optic: varchar("optic", { length: 255 }),
  processing: varchar("processing", { length: 255 }),
  sqml: varchar("sqml", { length: 255 }),
})

export const typeEnum = pgEnum("type", [
  "angle",
  "camera",
  "catalog",
  "constellation",
  "filter",
  "telescope",
])

export const options = pgTable(
  "option",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    type: typeEnum("type").notNull(),
  },
  t => ({
    unq: unique().on(t.name, t.type),
  }),
)

export const telescopes = pgTable("telescopes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  focalLength: integer("focalLength").notNull(),
  diameter: integer("diameter").notNull(),
  focalRatio: real("focalRatio").notNull(),
})

export type InsertAdmin = InferInsertModel<typeof admin>
export type SelectAdmin = InferSelectModel<typeof admin>
export type InsertCamera = InferInsertModel<typeof cameras>
export type SelectCamera = InferSelectModel<typeof cameras>
export type InsertCatalog = InferInsertModel<typeof catalogs>
export type SelectCatalog = InferSelectModel<typeof catalogs>
export type InsertImage = InferInsertModel<typeof images>
export type SelectImage = InferSelectModel<typeof images>
export type InsertOption = InferInsertModel<typeof options>
export type SelectOption = InferSelectModel<typeof options>
export type InsertTelescope = InferInsertModel<typeof telescopes>
export type SelectTelescope = InferSelectModel<typeof telescopes>

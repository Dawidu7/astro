import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import {
  date,
  int,
  mysqlEnum,
  mysqlTable,
  real,
  serial,
  unique,
  varchar,
} from "drizzle-orm/mysql-core"

export const admin = mysqlTable("admin", {
  id: serial("id").primaryKey(),
  password: varchar("password", { length: 60 }).notNull(),
})

export const cameras = mysqlTable("cameras", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  matrixX: real("matrixX").notNull(),
  matrixY: real("matrixY").notNull(),
  pixelSize: real("pixelSize").notNull(),
  resolutionX: int("resolutionX").notNull(),
  resolutionY: int("resolutionY").notNull(),
})

export const catalogs = mysqlTable("catalogs", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  value: varchar("value", { length: 255 }).notNull().unique(),
})

export const flattReducs = mysqlTable("flattReduc", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  times: real("times").notNull().unique(),
})

export const images = mysqlTable("images", {
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

export const options = mysqlTable(
  "option",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull().unique(),
    type: mysqlEnum("type", [
      "angle",
      "camera",
      "catalog",
      "constellation",
      "filter",
      "telescope",
    ]).notNull(),
  },
  t => ({
    unq: unique().on(t.name, t.type),
  }),
)

export const telescopes = mysqlTable("telescopes", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  focalLength: int("focalLength").notNull(),
  diameter: int("diameter").notNull(),
  focalRatio: real("focalRatio").notNull(),
})

export type InsertAdmin = InferInsertModel<typeof admin>
export type SelectAdmin = InferSelectModel<typeof admin>
export type InsertCamera = InferInsertModel<typeof cameras>
export type SelectCamera = InferSelectModel<typeof cameras>
export type InsertCatalog = InferInsertModel<typeof catalogs>
export type SelectCatalog = InferSelectModel<typeof catalogs>
export type InsertFlattReduc = InferInsertModel<typeof flattReducs>
export type SelectFlattReduc = InferSelectModel<typeof flattReducs>
export type InsertImage = InferInsertModel<typeof images>
export type SelectImage = InferSelectModel<typeof images>
export type InsertOption = InferInsertModel<typeof options>
export type SelectOption = InferSelectModel<typeof options>
export type InsertTelescope = InferInsertModel<typeof telescopes>
export type SelectTelescope = InferSelectModel<typeof telescopes>

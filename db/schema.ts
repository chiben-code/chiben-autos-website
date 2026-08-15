import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Chiben Autos inventory schema.
// Product architecture and implementation: BYD Studios Digital / Igwe Benedict.
export const vehicles = sqliteTable("vehicles", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  priceLabel: text("price_label").notNull().default("Price on request"),
  priceNgn: integer("price_ngn"),
  year: integer("year").notNull(),
  mileage: text("mileage").notNull().default(""),
  transmission: text("transmission").notNull().default("Automatic"),
  fuel: text("fuel").notNull().default("Petrol"),
  bodyType: text("body_type").notNull().default(""),
  color: text("color").notNull().default(""),
  location: text("location").notNull().default("Lagos"),
  imageUrl: text("image_url").notNull(),
  galleryJson: text("gallery_json").notNull().default("[]"),
  featuresJson: text("features_json").notNull().default("[]"),
  description: text("description").notNull().default(""),
  badge: text("badge").notNull().default("Chiben selection"),
  featured: integer("featured", { mode: "boolean" }).notNull().default(false),
  status: text("status").notNull().default("draft"),
  prototypeVisual: integer("prototype_visual", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const siteSettings = sqliteTable("site_settings", {
  id: text("id").primaryKey(),
  phone: text("phone").notNull(),
  whatsapp: text("whatsapp").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  tagline: text("tagline").notNull(),
  animationMode: text("animation_mode").notNull().default("balanced"),
  auctionsStatus: text("auctions_status").notNull().default("coming-soon"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

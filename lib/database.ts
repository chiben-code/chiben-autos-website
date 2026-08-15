import { defaultSettings, prototypeVehicles, type SiteSettings, type Vehicle } from "./vehicles";

type VehicleRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price_label: string;
  price_ngn: number | null;
  year: number;
  mileage: string;
  transmission: string;
  fuel: string;
  body_type: string;
  color: string;
  location: string;
  image_url: string;
  gallery_json: string;
  features_json: string;
  description: string;
  badge: string;
  featured: number;
  status: string;
  prototype_visual: number;
};

export async function getDatabase() {
  const { env } = await import("cloudflare:workers");
  const database = env.DB as D1Database | undefined;
  if (!database) throw new Error("The Chiben inventory database binding is unavailable.");
  return database;
}

export async function getBucket() {
  const { env } = await import("cloudflare:workers");
  const bucket = env.BUCKET as R2Bucket | undefined;
  if (!bucket) throw new Error("The Chiben vehicle image storage binding is unavailable.");
  return bucket;
}

export async function ensureDatabase(database: D1Database) {
  await database.batch([
    database.prepare(`CREATE TABLE IF NOT EXISTS vehicles (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price_label TEXT NOT NULL DEFAULT 'Price on request',
      price_ngn INTEGER,
      year INTEGER NOT NULL,
      mileage TEXT NOT NULL DEFAULT '',
      transmission TEXT NOT NULL DEFAULT 'Automatic',
      fuel TEXT NOT NULL DEFAULT 'Petrol',
      body_type TEXT NOT NULL DEFAULT '',
      color TEXT NOT NULL DEFAULT '',
      location TEXT NOT NULL DEFAULT 'Lagos',
      image_url TEXT NOT NULL,
      gallery_json TEXT NOT NULL DEFAULT '[]',
      features_json TEXT NOT NULL DEFAULT '[]',
      description TEXT NOT NULL DEFAULT '',
      badge TEXT NOT NULL DEFAULT 'Chiben selection',
      featured INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'draft',
      prototype_visual INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
    database.prepare("CREATE INDEX IF NOT EXISTS vehicles_status_category_idx ON vehicles(status, category)"),
    database.prepare(`CREATE TABLE IF NOT EXISTS site_settings (
      id TEXT PRIMARY KEY,
      phone TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      email TEXT NOT NULL,
      address TEXT NOT NULL,
      tagline TEXT NOT NULL,
      animation_mode TEXT NOT NULL DEFAULT 'balanced',
      auctions_status TEXT NOT NULL DEFAULT 'coming-soon',
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    )`),
  ]);

  const count = await database.prepare("SELECT COUNT(*) AS count FROM vehicles").first<{ count: number }>();
  if (!count?.count) {
    await database.batch(prototypeVehicles.map((vehicle) => vehicleInsert(database, vehicle)));
  }

  await database.prepare(`INSERT OR IGNORE INTO site_settings
    (id, phone, whatsapp, email, address, tagline, animation_mode, auctions_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind("main", defaultSettings.phone, defaultSettings.whatsapp, defaultSettings.email, defaultSettings.address, defaultSettings.tagline, defaultSettings.animationMode, defaultSettings.auctionsStatus)
    .run();
}

export function vehicleInsert(database: D1Database, vehicle: Vehicle) {
  return database.prepare(`INSERT INTO vehicles
    (id, slug, name, category, price_label, price_ngn, year, mileage, transmission, fuel, body_type, color, location, image_url, gallery_json, features_json, description, badge, featured, status, prototype_visual)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .bind(
      vehicle.id,
      vehicle.slug,
      vehicle.name,
      vehicle.category,
      vehicle.priceLabel,
      vehicle.priceNgn,
      vehicle.year,
      vehicle.mileage,
      vehicle.transmission,
      vehicle.fuel,
      vehicle.bodyType,
      vehicle.color,
      vehicle.location,
      vehicle.imageUrl,
      JSON.stringify(vehicle.gallery),
      JSON.stringify(vehicle.features),
      vehicle.description,
      vehicle.badge,
      vehicle.featured ? 1 : 0,
      vehicle.status,
      vehicle.prototypeVisual ? 1 : 0,
    );
}

export function rowToVehicle(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category === "Refurbished" ? "Refurbished" : "Brand New",
    priceLabel: row.price_label,
    priceNgn: row.price_ngn,
    year: row.year,
    mileage: row.mileage,
    transmission: row.transmission,
    fuel: row.fuel,
    bodyType: row.body_type,
    color: row.color,
    location: row.location,
    imageUrl: row.image_url,
    gallery: parseArray(row.gallery_json, [row.image_url]),
    features: parseArray(row.features_json, []),
    description: row.description,
    badge: row.badge,
    featured: Boolean(row.featured),
    status: (["published", "draft", "reserved", "sold"].includes(row.status) ? row.status : "draft") as Vehicle["status"],
    prototypeVisual: Boolean(row.prototype_visual),
  };
}

export function rowToSettings(row: Record<string, unknown>): SiteSettings {
  return {
    phone: String(row.phone ?? defaultSettings.phone),
    whatsapp: String(row.whatsapp ?? defaultSettings.whatsapp),
    email: String(row.email ?? defaultSettings.email),
    address: String(row.address ?? defaultSettings.address),
    tagline: String(row.tagline ?? defaultSettings.tagline),
    animationMode: (["full", "balanced", "minimal"].includes(String(row.animation_mode)) ? row.animation_mode : "balanced") as SiteSettings["animationMode"],
    auctionsStatus: (["coming-soon", "live", "hidden"].includes(String(row.auctions_status)) ? row.auctions_status : "coming-soon") as SiteSettings["auctionsStatus"],
  };
}

function parseArray(value: string, fallback: string[]) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : fallback;
  } catch {
    return fallback;
  }
}

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 80);
}

import { requireAdmin } from "../../../../lib/admin-auth";
import { ensureDatabase, getDatabase, rowToVehicle, slugify, vehicleInsert } from "../../../../lib/database";
import type { Vehicle } from "../../../../lib/vehicles";

export async function GET(request: Request) {
  const auth = requireAdmin(request);
  if (auth.response) return auth.response;
  try {
    const database = await getDatabase();
    await ensureDatabase(database);
    const result = await database.prepare("SELECT * FROM vehicles ORDER BY featured DESC, created_at DESC").all();
    return Response.json({ vehicles: result.results.map((row) => rowToVehicle(row as never)) });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to load owner inventory." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = requireAdmin(request);
  if (auth.response) return auth.response;
  try {
    const payload = await request.json() as Partial<Vehicle>;
    if (!payload.name?.trim() || !payload.imageUrl?.trim()) {
      return Response.json({ error: "Vehicle name and main image are required." }, { status: 400 });
    }
    const database = await getDatabase();
    await ensureDatabase(database);
    const vehicle: Vehicle = {
      id: crypto.randomUUID(),
      slug: `${slugify(payload.slug || payload.name)}-${Date.now().toString(36)}`,
      name: payload.name.trim(),
      category: payload.category === "Refurbished" ? "Refurbished" : "Brand New",
      priceLabel: payload.priceLabel?.trim() || "Price on request",
      priceNgn: payload.priceNgn ?? null,
      year: Number(payload.year) || new Date().getFullYear(),
      mileage: payload.mileage?.trim() || "Not stated",
      transmission: payload.transmission?.trim() || "Automatic",
      fuel: payload.fuel?.trim() || "Petrol",
      bodyType: payload.bodyType?.trim() || "Vehicle",
      color: payload.color?.trim() || "Not stated",
      location: payload.location?.trim() || "Lagos",
      imageUrl: payload.imageUrl.trim(),
      gallery: payload.gallery?.length ? payload.gallery : [payload.imageUrl.trim()],
      features: payload.features ?? [],
      description: payload.description?.trim() || "Contact Chiben Autos for complete vehicle details.",
      badge: payload.badge?.trim() || "Chiben selection",
      featured: Boolean(payload.featured),
      status: payload.status ?? "draft",
      prototypeVisual: Boolean(payload.prototypeVisual),
    };
    await vehicleInsert(database, vehicle).run();
    return Response.json({ vehicle }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to add vehicle." }, { status: 500 });
  }
}

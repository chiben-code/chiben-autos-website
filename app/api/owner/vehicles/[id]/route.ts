import { requireAdmin } from "../../../../../lib/admin-auth";
import { ensureDatabase, getDatabase } from "../../../../../lib/database";
import type { Vehicle } from "../../../../../lib/vehicles";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAdmin(request);
  if (auth.response) return auth.response;
  try {
    const { id } = await params;
    const payload = await request.json() as Partial<Vehicle>;
    const database = await getDatabase();
    await ensureDatabase(database);
    const result = await database.prepare(`UPDATE vehicles SET
      name = COALESCE(?, name), category = COALESCE(?, category), price_label = COALESCE(?, price_label),
      price_ngn = ?, year = COALESCE(?, year), mileage = COALESCE(?, mileage), transmission = COALESCE(?, transmission),
      fuel = COALESCE(?, fuel), body_type = COALESCE(?, body_type), color = COALESCE(?, color), location = COALESCE(?, location),
      image_url = COALESCE(?, image_url), gallery_json = COALESCE(?, gallery_json), features_json = COALESCE(?, features_json),
      description = COALESCE(?, description), badge = COALESCE(?, badge), featured = COALESCE(?, featured),
      status = COALESCE(?, status), prototype_visual = COALESCE(?, prototype_visual), updated_at = CURRENT_TIMESTAMP WHERE id = ?`)
      .bind(payload.name ?? null, payload.category ?? null, payload.priceLabel ?? null, payload.priceNgn ?? null,
        payload.year ?? null, payload.mileage ?? null, payload.transmission ?? null, payload.fuel ?? null,
        payload.bodyType ?? null, payload.color ?? null, payload.location ?? null, payload.imageUrl ?? null,
        payload.gallery ? JSON.stringify(payload.gallery) : null, payload.features ? JSON.stringify(payload.features) : null,
        payload.description ?? null, payload.badge ?? null, payload.featured === undefined ? null : Number(payload.featured),
        payload.status ?? null, payload.prototypeVisual === undefined ? null : Number(payload.prototypeVisual), id).run();
    if (!result.meta.changes) return Response.json({ error: "Vehicle not found." }, { status: 404 });
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to update vehicle." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = requireAdmin(request);
  if (auth.response) return auth.response;
  try {
    const { id } = await params;
    const database = await getDatabase();
    await ensureDatabase(database);
    const result = await database.prepare("DELETE FROM vehicles WHERE id = ?").bind(id).run();
    if (!result.meta.changes) return Response.json({ error: "Vehicle not found." }, { status: 404 });
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to delete vehicle." }, { status: 500 });
  }
}

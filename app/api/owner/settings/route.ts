import { requireAdmin } from "../../../../lib/admin-auth";
import { ensureDatabase, getDatabase } from "../../../../lib/database";
import type { SiteSettings } from "../../../../lib/vehicles";

export async function PATCH(request: Request) {
  const auth = requireAdmin(request);
  if (auth.response) return auth.response;
  try {
    const payload = await request.json() as Partial<SiteSettings>;
    const database = await getDatabase();
    await ensureDatabase(database);
    await database.prepare(`UPDATE site_settings SET
      phone = COALESCE(?, phone), whatsapp = COALESCE(?, whatsapp), email = COALESCE(?, email),
      address = COALESCE(?, address), tagline = COALESCE(?, tagline), animation_mode = COALESCE(?, animation_mode),
      auctions_status = COALESCE(?, auctions_status), updated_at = CURRENT_TIMESTAMP WHERE id = 'main'`)
      .bind(payload.phone ?? null, payload.whatsapp ?? null, payload.email ?? null, payload.address ?? null, payload.tagline ?? null, payload.animationMode ?? null, payload.auctionsStatus ?? null).run();
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to save settings." }, { status: 500 });
  }
}

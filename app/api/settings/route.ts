import { ensureDatabase, getDatabase, rowToSettings } from "../../../lib/database";
import { defaultSettings } from "../../../lib/vehicles";

export async function GET() {
  try {
    const database = await getDatabase();
    await ensureDatabase(database);
    const row = await database.prepare("SELECT * FROM site_settings WHERE id = 'main'").first<Record<string, unknown>>();
    return Response.json({ settings: row ? rowToSettings(row) : defaultSettings });
  } catch {
    return Response.json({ settings: defaultSettings });
  }
}

import { ensureDatabase, getDatabase, rowToVehicle } from "../../../lib/database";
import { prototypeVehicles } from "../../../lib/vehicles";

export async function GET(request: Request) {
  try {
    const database = await getDatabase();
    await ensureDatabase(database);
    const url = new URL(request.url);
    const conditions: string[] = [];
    const bindings: string[] = [];
    conditions.push("status != 'draft'");
    if (url.searchParams.get("featured") === "true") conditions.push("featured = 1");
    if (url.searchParams.get("slug")) {
      conditions.push("slug = ?");
      bindings.push(url.searchParams.get("slug") ?? "");
    }
    const where = conditions.length ? ` WHERE ${conditions.join(" AND ")}` : "";
    const result = await database.prepare(`SELECT * FROM vehicles${where} ORDER BY featured DESC, created_at DESC`).bind(...bindings).all();
    return Response.json({ vehicles: result.results.map((row) => rowToVehicle(row as never)), source: "database" });
  } catch {
    return Response.json({ vehicles: prototypeVehicles, source: "prototype-fallback" });
  }
}

import { requireAdmin } from "../../../../lib/admin-auth";
import { getBucket } from "../../../../lib/database";

const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  const auth = requireAdmin(request);
  if (auth.response) return auth.response;
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || !allowed.has(file.type)) return Response.json({ error: "Upload a JPEG, PNG or WebP image." }, { status: 400 });
    if (file.size > 8 * 1024 * 1024) return Response.json({ error: "Vehicle images must be 8 MB or smaller." }, { status: 400 });
    const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    const key = `vehicles/${Date.now()}-${crypto.randomUUID()}.${extension}`;
    const bucket = await getBucket();
    await bucket.put(key, file.stream(), { httpMetadata: { contentType: file.type, cacheControl: "public, max-age=31536000, immutable" } });
    return Response.json({ url: `/media/${key}` }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Unable to upload image." }, { status: 500 });
  }
}

import { getAdminEmail } from "../../../../lib/admin-auth";

export async function GET(request: Request) {
  const email = getAdminEmail(request);
  return Response.json({ authenticated: Boolean(email), email });
}

const IDENTITY_HEADERS = [
  "cf-access-authenticated-user-email",
  "oai-authenticated-user-email",
] as const;

export function getAdminEmail(request: Request) {
  const email = IDENTITY_HEADERS.map((name) => request.headers.get(name)).find(Boolean)?.toLowerCase().trim() ?? null;
  if (!email) return null;

  // Cloudflare Access owns the production allowlist and injects this identity
  // only after the user passes the owner policy.
  return email;
}

export function requireAdmin(request: Request) {
  const email = getAdminEmail(request);
  if (!email) {
    return { email: null, response: Response.json({ error: "Owner authentication is required." }, { status: 401 }) };
  }
  return { email, response: null };
}

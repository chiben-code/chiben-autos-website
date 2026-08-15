# Chiben Autos Website

Launch-ready prototype for Chiben Auto Ventures Ltd (RC 9235786).

## Included

- Cinematic front, side, rear and interior vehicle scroll sequence.
- Brand New and Refurbished inventory.
- Vehicle detail galleries and WhatsApp reservations.
- Auctions Coming Soon.
- Registered automotive service categories.
- D1 inventory and editable-site settings.
- R2 vehicle-image uploads.
- Protected owner add, update, publish, reserve, sell and delete controls.

## Local development

Node.js 22.13 or newer is required.

```bash
npm ci
npm run dev -- --host 127.0.0.1 --port 4173
```

Open `http://127.0.0.1:4173`.

## Validation

```bash
npm run lint
npm test
```

## Cloudflare production

1. Create a D1 database named `chiben-autos-db`.
2. Create an R2 bucket named `chiben-autos-assets`.
3. Replace the placeholder D1 ID in `wrangler.production.jsonc`.
4. Run `npm run build`.
5. Deploy with `npx wrangler deploy --config wrangler.production.jsonc`.
6. Protect `/admin*` and `/api/owner/*` with Cloudflare Access.

Do not deploy the company's CAC records, directors' details or internal documentation.

Digital architecture and implementation: BYD Studios Digital / Igwe Benedict.

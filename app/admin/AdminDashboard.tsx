"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { defaultSettings, prototypeVehicles, type SiteSettings, type Vehicle } from "../../lib/vehicles";

const emptyDraft = {
  name: "",
  category: "Brand New" as Vehicle["category"],
  year: new Date().getFullYear(),
  mileage: "",
  transmission: "Automatic",
  fuel: "Petrol",
  bodyType: "",
  color: "",
  location: "Lagos",
  priceLabel: "Price on request",
  imageUrl: "",
  badge: "Chiben selection",
  description: "",
  status: "draft" as Vehicle["status"],
  featured: false,
};

export function AdminDashboard() {
  const [authorized, setAuthorized] = useState(false);
  const [ownerEmail, setOwnerEmail] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>(prototypeVehicles);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [draft, setDraft] = useState(emptyDraft);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/owner/session").then((response) => response.json()),
      fetch("/api/settings").then((response) => response.json()),
    ]).then(([session, settingsPayload]) => {
      setAuthorized(Boolean(session.authenticated));
      setOwnerEmail(session.email ?? null);
      if (settingsPayload.settings) setSettings(settingsPayload.settings);
      if (session.authenticated) return loadVehicles();
    }).catch(() => undefined);
  }, []);

  async function loadVehicles() {
    const response = await fetch("/api/owner/vehicles");
    const payload = await response.json();
    if (response.ok && payload.vehicles) setVehicles(payload.vehicles);
  }

  async function saveSettings(event: FormEvent) {
    event.preventDefault();
    if (!authorized) return;
    setBusy(true);
    const response = await fetch("/api/owner/settings", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify(settings) });
    setBusy(false);
    setMessage(response.ok ? "Company details and site behaviour were saved." : "Settings could not be saved.");
  }

  async function uploadImage(file: File) {
    if (!authorized) return;
    setBusy(true);
    const body = new FormData();
    body.append("file", file);
    const response = await fetch("/api/owner/uploads", { method: "POST", body });
    const payload = await response.json();
    setBusy(false);
    if (response.ok) setDraft((current) => ({ ...current, imageUrl: payload.url }));
    else setMessage(payload.error ?? "Image upload failed.");
  }

  async function addVehicle(event: FormEvent) {
    event.preventDefault();
    if (!authorized) return;
    setBusy(true);
    const response = await fetch("/api/owner/vehicles", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...draft, gallery: draft.imageUrl ? [draft.imageUrl] : [], features: [], prototypeVisual: false }),
    });
    const payload = await response.json();
    setBusy(false);
    if (response.ok) {
      setDraft(emptyDraft);
      setMessage(`${payload.vehicle.name} was added as ${payload.vehicle.status}.`);
      await loadVehicles();
    } else setMessage(payload.error ?? "Vehicle could not be added.");
  }

  async function updateVehicle(id: string, update: Partial<Vehicle>) {
    if (!authorized) return;
    const response = await fetch(`/api/owner/vehicles/${id}`, { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify(update) });
    if (response.ok) {
      setVehicles((current) => current.map((vehicle) => vehicle.id === id ? { ...vehicle, ...update } : vehicle));
      setMessage("Vehicle listing updated.");
    } else setMessage("Vehicle could not be updated.");
  }

  async function deleteVehicle(vehicle: Vehicle) {
    if (!authorized || !window.confirm(`Delete ${vehicle.name}? This cannot be undone.`)) return;
    const response = await fetch(`/api/owner/vehicles/${vehicle.id}`, { method: "DELETE" });
    if (response.ok) {
      setVehicles((current) => current.filter((item) => item.id !== vehicle.id));
      setMessage(`${vehicle.name} was deleted.`);
    } else setMessage("Vehicle could not be deleted.");
  }

  return (
    <div className="admin-dashboard">
      <div className={`admin-access ${authorized ? "verified" : "locked"}`}>
        <div><span>{authorized ? "●" : "○"}</span><strong>{authorized ? "Owner access verified" : "Read-only owner preview"}</strong></div>
        <p>{authorized ? `Authenticated as ${ownerEmail}` : "Publishing controls activate only behind the configured owner authentication. The public website remains safe and unchanged from this screen."}</p>
      </div>

      {message && <button className="admin-message" type="button" onClick={() => setMessage("")}>{message}<span>×</span></button>}

      <div className="admin-layout">
        <section className="admin-panel admin-inventory-panel">
          <div className="admin-panel-heading"><div><span>INVENTORY</span><h2>{vehicles.length} vehicle records</h2></div><small>Publish, reserve, sell or remove</small></div>
          <div className="admin-vehicle-list">
            {vehicles.map((vehicle) => (
              <article key={vehicle.id}>
                <div className="admin-vehicle-thumb"><Image src={vehicle.imageUrl} alt="" fill unoptimized sizes="100px" /></div>
                <div className="admin-vehicle-info"><span>{vehicle.category}</span><strong>{vehicle.name}</strong><small>{vehicle.year} · {vehicle.status}</small></div>
                <label><span>Status</span><select disabled={!authorized} value={vehicle.status} onChange={(event) => updateVehicle(vehicle.id, { status: event.target.value as Vehicle["status"] })}><option value="draft">Draft</option><option value="published">Published</option><option value="reserved">Reserved</option><option value="sold">Sold</option></select></label>
                <label className="admin-check"><input type="checkbox" disabled={!authorized} checked={vehicle.featured} onChange={(event) => updateVehicle(vehicle.id, { featured: event.target.checked })} /><span>Featured</span></label>
                <button className="delete-button" type="button" disabled={!authorized} onClick={() => deleteVehicle(vehicle)}>Delete</button>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-panel">
          <div className="admin-panel-heading"><div><span>NEW LISTING</span><h2>Add a vehicle</h2></div><small>Starts as draft by default</small></div>
          <form className="admin-form" onSubmit={addVehicle}>
            <label className="span-2"><span>Vehicle name</span><input required disabled={!authorized} value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="e.g. 2024 Executive SUV" /></label>
            <label><span>Category</span><select disabled={!authorized} value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as Vehicle["category"] })}><option>Brand New</option><option>Refurbished</option></select></label>
            <label><span>Year</span><input type="number" disabled={!authorized} value={draft.year} onChange={(event) => setDraft({ ...draft, year: Number(event.target.value) })} /></label>
            <label><span>Body type</span><input disabled={!authorized} value={draft.bodyType} onChange={(event) => setDraft({ ...draft, bodyType: event.target.value })} placeholder="SUV, Sedan…" /></label>
            <label><span>Mileage</span><input disabled={!authorized} value={draft.mileage} onChange={(event) => setDraft({ ...draft, mileage: event.target.value })} placeholder="Delivery or 24,000 km" /></label>
            <label><span>Transmission</span><input disabled={!authorized} value={draft.transmission} onChange={(event) => setDraft({ ...draft, transmission: event.target.value })} /></label>
            <label><span>Fuel</span><input disabled={!authorized} value={draft.fuel} onChange={(event) => setDraft({ ...draft, fuel: event.target.value })} /></label>
            <label><span>Colour</span><input disabled={!authorized} value={draft.color} onChange={(event) => setDraft({ ...draft, color: event.target.value })} /></label>
            <label><span>Price display</span><input disabled={!authorized} value={draft.priceLabel} onChange={(event) => setDraft({ ...draft, priceLabel: event.target.value })} /></label>
            <label className="span-2"><span>Main image</span><input type="file" accept="image/png,image/jpeg,image/webp" disabled={!authorized || busy} onChange={(event) => event.target.files?.[0] && uploadImage(event.target.files[0])} /><small>{draft.imageUrl || "Upload a clean landscape vehicle photograph."}</small></label>
            <label className="span-2"><span>Description</span><textarea disabled={!authorized} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} rows={4} /></label>
            <label><span>Initial status</span><select disabled={!authorized} value={draft.status} onChange={(event) => setDraft({ ...draft, status: event.target.value as Vehicle["status"] })}><option value="draft">Draft</option><option value="published">Published</option></select></label>
            <label className="admin-check"><input type="checkbox" disabled={!authorized} checked={draft.featured} onChange={(event) => setDraft({ ...draft, featured: event.target.checked })} /><span>Feature on homepage</span></label>
            <button className="button button-gold span-2" type="submit" disabled={!authorized || busy}>{busy ? "Working…" : "Add vehicle"}</button>
          </form>
        </section>

        <section className="admin-panel admin-settings-panel">
          <div className="admin-panel-heading"><div><span>SITE CONTROL</span><h2>Company details & behaviour</h2></div><small>Editable without touching code</small></div>
          <form className="admin-form" onSubmit={saveSettings}>
            <label><span>Public phone</span><input disabled={!authorized} value={settings.phone} onChange={(event) => setSettings({ ...settings, phone: event.target.value })} /></label>
            <label><span>WhatsApp digits</span><input disabled={!authorized} value={settings.whatsapp} onChange={(event) => setSettings({ ...settings, whatsapp: event.target.value.replace(/\D/g, "") })} /></label>
            <label><span>Email</span><input type="email" disabled={!authorized} value={settings.email} onChange={(event) => setSettings({ ...settings, email: event.target.value })} /></label>
            <label><span>Public location</span><input disabled={!authorized} value={settings.address} onChange={(event) => setSettings({ ...settings, address: event.target.value })} /></label>
            <label className="span-2"><span>Tagline</span><input disabled={!authorized} value={settings.tagline} onChange={(event) => setSettings({ ...settings, tagline: event.target.value })} /></label>
            <label><span>Default animation</span><select disabled={!authorized} value={settings.animationMode} onChange={(event) => setSettings({ ...settings, animationMode: event.target.value as SiteSettings["animationMode"] })}><option value="full">Full</option><option value="balanced">Balanced</option><option value="minimal">Minimal</option></select></label>
            <label><span>Auctions</span><select disabled={!authorized} value={settings.auctionsStatus} onChange={(event) => setSettings({ ...settings, auctionsStatus: event.target.value as SiteSettings["auctionsStatus"] })}><option value="coming-soon">Coming soon</option><option value="live">Live</option><option value="hidden">Hidden</option></select></label>
            <button className="button button-gold span-2" type="submit" disabled={!authorized || busy}>Save site settings</button>
          </form>
        </section>
      </div>
    </div>
  );
}

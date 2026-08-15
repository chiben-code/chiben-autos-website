"use client";

import { useEffect, useMemo, useState } from "react";
import { prototypeVehicles, type Vehicle, type VehicleCategory } from "../../lib/vehicles";
import { useSiteSettings } from "../components/SiteSettingsContext";
import { VehicleCard } from "../components/VehicleCard";

type Filter = "All" | VehicleCategory;

export function InventoryBrowser() {
  const settings = useSiteSettings();
  const [vehicles, setVehicles] = useState<Vehicle[]>(prototypeVehicles);
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("/api/vehicles")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { vehicles?: Vehicle[] }) => {
        if (payload.vehicles?.length) setVehicles(payload.vehicles);
      })
      .catch(() => undefined);
  }, []);

  const visible = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return vehicles.filter((vehicle) => {
      const categoryMatch = filter === "All" || vehicle.category === filter;
      const queryMatch = !normalized || [vehicle.name, vehicle.bodyType, vehicle.color, vehicle.fuel]
        .some((value) => value.toLowerCase().includes(normalized));
      return categoryMatch && queryMatch && vehicle.status !== "draft";
    });
  }, [filter, query, vehicles]);

  return (
    <>
      <div className="inventory-toolbar">
        <div className="inventory-controls">
          {(["All", "Brand New", "Refurbished"] as Filter[]).map((item) => (
            <button key={item} type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
        <label className="inventory-search">
          <span>Search inventory</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Model, body type or colour" />
        </label>
      </div>
      <div className="inventory-results-meta">
        <p>{visible.length} {visible.length === 1 ? "vehicle" : "vehicles"}</p>
        <span>Listings update from the Chiben owner control.</span>
      </div>
      <div className="vehicle-grid inventory-page-grid">
        {visible.map((vehicle, index) => <VehicleCard key={vehicle.id} vehicle={vehicle} priority={index < 2} />)}
      </div>
      {!visible.length && <div className="empty-state"><strong>No exact match yet.</strong><p>Send Chiben Autos your requirements and we can help source the right vehicle.</p><a href={`https://wa.me/${settings.whatsapp.replace(/\D/g, "")}`}>Request a vehicle ↗</a></div>}
    </>
  );
}

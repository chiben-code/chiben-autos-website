"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { prototypeVehicles, type Vehicle, type VehicleCategory } from "../../lib/vehicles";
import { VehicleCard } from "./VehicleCard";

type Filter = "All" | VehicleCategory;

export function HomeInventory() {
  const [filter, setFilter] = useState<Filter>("All");
  const [vehicles, setVehicles] = useState<Vehicle[]>(prototypeVehicles);

  useEffect(() => {
    fetch("/api/vehicles?featured=true")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { vehicles?: Vehicle[] }) => {
        if (payload.vehicles?.length) setVehicles(payload.vehicles);
      })
      .catch(() => undefined);
  }, []);

  const visible = useMemo(
    () => filter === "All" ? vehicles : vehicles.filter((vehicle) => vehicle.category === filter),
    [filter, vehicles],
  );

  return (
    <section className="inventory-section section-pad" id="inventory">
      <div className="section-heading split-heading">
        <div>
          <p className="eyebrow">THE COLLECTION</p>
          <h2>Vehicles, selected<br />with intention.</h2>
        </div>
        <div className="inventory-controls" role="group" aria-label="Filter featured vehicles">
          {(["All", "Brand New", "Refurbished"] as Filter[]).map((item) => (
            <button key={item} type="button" className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>
          ))}
        </div>
      </div>
      <div className="vehicle-grid">
        {visible.map((vehicle, index) => <VehicleCard key={vehicle.id} vehicle={vehicle} priority={index === 0} />)}
      </div>
      <div className="section-foot-link">
        <Link href="/inventory">View complete inventory <span>↗</span></Link>
        <p>Every live listing can include inspection details, gallery images and direct reservation support.</p>
      </div>
    </section>
  );
}

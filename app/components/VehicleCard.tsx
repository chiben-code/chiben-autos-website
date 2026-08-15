"use client";

import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "../../lib/vehicles";
import { useSiteSettings } from "./SiteSettingsContext";

export function VehicleCard({ vehicle, priority = false }: { vehicle: Vehicle; priority?: boolean }) {
  const settings = useSiteSettings();
  const message = `Hello Chiben Autos, I would like to enquire about the ${vehicle.name} (${vehicle.year}). Please share availability and inspection details.`;
  const enquiryUrl = `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(message)}`;
  return (
    <article className="vehicle-card">
      <Link className="vehicle-card-image" href={`/inventory/${vehicle.slug}`}>
        <Image src={vehicle.imageUrl} alt={vehicle.name} fill unoptimized sizes="(max-width: 760px) 100vw, 33vw" priority={priority} />
        <span className="condition-chip">{vehicle.category}</span>
        {vehicle.prototypeVisual && <span className="prototype-chip">Prototype visual</span>}
      </Link>
      <div className="vehicle-card-body">
        <div className="vehicle-heading">
          <div>
            <p>{vehicle.badge}</p>
            <h3><Link href={`/inventory/${vehicle.slug}`}>{vehicle.name}</Link></h3>
          </div>
          <span>{vehicle.year}</span>
        </div>
        <dl>
          <div><dt>Mileage</dt><dd>{vehicle.mileage}</dd></div>
          <div><dt>Transmission</dt><dd>{vehicle.transmission}</dd></div>
          <div><dt>Location</dt><dd>{vehicle.location}</dd></div>
        </dl>
        <div className="vehicle-card-bottom">
          <strong>{vehicle.priceLabel}</strong>
          <a href={enquiryUrl} target="_blank" rel="noreferrer" aria-label={`Enquire about ${vehicle.name}`}>Enquire ↗</a>
        </div>
      </div>
    </article>
  );
}

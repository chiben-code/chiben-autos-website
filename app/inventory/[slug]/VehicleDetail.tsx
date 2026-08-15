"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Vehicle } from "../../../lib/vehicles";
import { useSiteSettings } from "../../components/SiteSettingsContext";

export function VehicleDetail({ slug, initialVehicle }: { slug: string; initialVehicle: Vehicle | null }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(initialVehicle);
  const settings = useSiteSettings();
  const [activeImage, setActiveImage] = useState(initialVehicle?.gallery[0] ?? "");

  useEffect(() => {
    fetch(`/api/vehicles?slug=${encodeURIComponent(slug)}`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((payload: { vehicles?: Vehicle[] }) => {
        const next = payload.vehicles?.[0];
        if (next) {
          setVehicle(next);
          setActiveImage(next.gallery[0] ?? next.imageUrl);
        }
      })
      .catch(() => undefined);
  }, [slug]);

  if (!vehicle) {
    return <div className="empty-state"><strong>Vehicle not found.</strong><p>This listing may have been removed or sold.</p><Link href="/inventory">Return to inventory</Link></div>;
  }

  return (
    <div className="vehicle-detail">
      <div className="detail-gallery">
        <div className="detail-main-image">
          <Image src={activeImage || vehicle.imageUrl} alt={vehicle.name} fill unoptimized sizes="(max-width: 900px) 100vw, 64vw" priority />
          {vehicle.prototypeVisual && <span className="prototype-chip">Prototype visual · not for sale</span>}
        </div>
        {vehicle.gallery.length > 1 && (
          <div className="detail-thumbs">
            {vehicle.gallery.map((image) => (
              <button type="button" key={image} className={activeImage === image ? "active" : ""} onClick={() => setActiveImage(image)}>
                <Image src={image} alt="" fill unoptimized sizes="120px" />
              </button>
            ))}
          </div>
        )}
      </div>
      <aside className="detail-summary">
        <p className="eyebrow">{vehicle.category} · {vehicle.badge}</p>
        <h1>{vehicle.name}</h1>
        <strong className="detail-price">{vehicle.priceLabel}</strong>
        <p>{vehicle.description}</p>
        <dl>
          <div><dt>Year</dt><dd>{vehicle.year}</dd></div>
          <div><dt>Mileage</dt><dd>{vehicle.mileage}</dd></div>
          <div><dt>Body</dt><dd>{vehicle.bodyType}</dd></div>
          <div><dt>Transmission</dt><dd>{vehicle.transmission}</dd></div>
          <div><dt>Fuel</dt><dd>{vehicle.fuel}</dd></div>
          <div><dt>Colour</dt><dd>{vehicle.color}</dd></div>
        </dl>
        <a className="button button-gold detail-cta" href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`Hello Chiben Autos, I would like to enquire about the ${vehicle.name} (${vehicle.year}).`)}`} target="_blank" rel="noreferrer">Enquire or reserve on WhatsApp ↗</a>
        <small>Availability, inspection details and reservation terms are confirmed by a Chiben Autos representative.</small>
      </aside>
    </div>
  );
}

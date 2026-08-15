"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { type Vehicle } from "../../../lib/vehicles";
import { useSiteSettings } from "../../components/SiteSettingsContext";
import { useLanguage } from "../../components/LanguageContext";

export function VehicleDetail({ slug, initialVehicle }: { slug: string; initialVehicle: Vehicle | null }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(initialVehicle);
  const settings = useSiteSettings();
  const { copy } = useLanguage();
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
    return <div className="empty-state"><strong>{copy.inventory.notFound}</strong><p>{copy.inventory.unavailable}</p><Link href="/inventory">{copy.common.returnInventory}</Link></div>;
  }

  return (
    <div className="vehicle-detail">
      <div className="detail-gallery">
        <div className="detail-main-image">
          <Image src={activeImage || vehicle.imageUrl} alt={vehicle.name} fill unoptimized sizes="(max-width: 900px) 100vw, 64vw" priority />
          {vehicle.prototypeVisual && <span className="prototype-chip">{copy.common.prototypeNotForSale}</span>}
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
        <p className="eyebrow">{vehicle.category === "Brand New" ? copy.common.brandNew : copy.common.refurbished} · {vehicle.badge}</p>
        <h1>{vehicle.name}</h1>
        <strong className="detail-price">{vehicle.priceLabel}</strong>
        <p>{vehicle.description}</p>
        <dl>
          <div><dt>{copy.common.year}</dt><dd>{vehicle.year}</dd></div>
          <div><dt>{copy.common.mileage}</dt><dd>{vehicle.mileage}</dd></div>
          <div><dt>{copy.common.body}</dt><dd>{vehicle.bodyType}</dd></div>
          <div><dt>{copy.common.transmission}</dt><dd>{vehicle.transmission}</dd></div>
          <div><dt>{copy.common.fuel}</dt><dd>{vehicle.fuel}</dd></div>
          <div><dt>{copy.common.colour}</dt><dd>{vehicle.color}</dd></div>
        </dl>
        <a className="button button-gold detail-cta" href={`https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(`${copy.whatsapp.vehicleEnquiry} ${vehicle.name} (${vehicle.year}).`)}`} target="_blank" rel="noreferrer">{copy.inventory.reserve} ↗</a>
        <small>{copy.inventory.availability}</small>
      </aside>
    </div>
  );
}

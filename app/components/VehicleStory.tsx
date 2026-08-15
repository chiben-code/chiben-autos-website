"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { WhatsAppLink } from "./SiteSettingsContext";

const frames = [
  { src: "/images/vehicles/burgundy-front.webp", eyebrow: "01 · First impression", title: "Presence, before motion." },
  { src: "/images/vehicles/burgundy-side.webp", eyebrow: "02 · Proportion", title: "Every line considered." },
  { src: "/images/vehicles/burgundy-rear.webp", eyebrow: "03 · Departure", title: "Memorable from every angle." },
  { src: "/images/vehicles/burgundy-interior.webp", eyebrow: "04 · The cabin", title: "A quieter kind of confidence." },
];

export function VehicleStory() {
  const section = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const element = section.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const total = Math.max(rect.height - window.innerHeight, 1);
      const next = Math.max(0, Math.min(1, -rect.top / total));
      setProgress(next);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const active = Math.min(frames.length - 1, Math.floor(progress * frames.length));
  const openingOpacity = Math.max(0, 1 - progress * 5);

  return (
    <section className="vehicle-story" ref={section} aria-label="Cinematic vehicle tour">
      <div className="vehicle-stage">
        <div className="vehicle-frame-stack" aria-live="polite">
          {frames.map((item, index) => (
            <Image
              key={item.src}
              className={index === active ? "vehicle-frame active" : "vehicle-frame"}
              src={item.src}
              alt={index === 3 ? "Premium tan and black vehicle interior" : `Deep burgundy performance sedan view ${index + 1}`}
              fill
              unoptimized
              sizes="100vw"
              priority={index === 0}
            />
          ))}
          <div className="vehicle-vignette" />
        </div>

        <div className="hero-opening" style={{ opacity: openingOpacity }}>
          <p className="eyebrow">A NEW STANDARD FOR THE ROAD</p>
          <h1>Find the car that<br />feels like arrival.</h1>
          <p>Brand new and carefully refurbished vehicles, sourced with judgement and presented with clarity.</p>
          <div className="hero-actions">
            <Link className="button button-gold" href="/inventory">Explore inventory</Link>
            <WhatsAppLink className="text-link" message="Hello Chiben Autos, I would like help finding or reserving a vehicle.">Reserve on WhatsApp <span>↗</span></WhatsAppLink>
          </div>
        </div>

        <div className="frame-caption">
          <p>{frames[active].eyebrow}</p>
          <h2>{frames[active].title}</h2>
        </div>

        <div className="story-progress" aria-hidden="true">
          {frames.map((item, index) => <span key={item.src} className={index <= active ? "filled" : ""} />)}
        </div>
        <p className="scroll-cue">Scroll to discover <span>↓</span></p>
        <p className="prototype-disclosure">Prototype vehicle visual · not offered for sale</p>
      </div>
    </section>
  );
}

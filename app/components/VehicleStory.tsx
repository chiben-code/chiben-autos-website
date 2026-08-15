"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { WhatsAppLink } from "./SiteSettingsContext";
import { useLanguage } from "./LanguageContext";

const frames = [
  { src: "/images/vehicles/burgundy-front-v2.webp", mobileSrc: "/images/vehicles/mobile/burgundy-front-mobile.webp" },
  { src: "/images/vehicles/burgundy-side-v2.webp", mobileSrc: "/images/vehicles/mobile/burgundy-side-mobile.webp" },
  { src: "/images/vehicles/burgundy-rear-v2.webp", mobileSrc: "/images/vehicles/mobile/burgundy-rear-mobile.webp" },
  { src: "/images/vehicles/burgundy-interior-v2.webp", mobileSrc: "/images/vehicles/mobile/burgundy-interior-mobile.webp" },
];

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value));

export function VehicleStory() {
  const { copy } = useLanguage();
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

  const scenePosition = progress * (frames.length - 1);
  const active = Math.min(frames.length - 1, Math.round(scenePosition));
  const openingOpacity = clamp(1 - progress / 0.16);
  const captionOpacity = clamp((progress - 0.075) / 0.09);
  const localizedFrames = frames.map((item, index) => ({
    ...item,
    label: copy.story.frameLabels[index],
    eyebrow: copy.story.frameEyebrows[index],
    title: copy.story.frameTitles[index],
  }));
  const nextLabel = active < frames.length - 1 ? `${copy.story.next} ${localizedFrames[active + 1].label} ${copy.story.view}` : copy.story.continue;
  const stageStyle = { "--story-progress": progress } as CSSProperties;

  return (
    <section className="vehicle-story" ref={section} aria-label={copy.story.aria}>
      <div className="vehicle-stage" style={stageStyle}>
        <div className="vehicle-frame-stack">
          {localizedFrames.map((item, index) => {
            const distance = scenePosition - index;
            const visualDistance = clamp(distance, -1, 1);
            const opacity = clamp(1 - Math.abs(distance));
            const translateX = visualDistance * -4.5;
            const scale = 1.075 - visualDistance * 0.018;

            return (
              <div
                key={item.src}
                className={`vehicle-frame vehicle-frame-${index + 1}${index === active ? " active" : ""}`}
                style={{
                  opacity,
                  transform: `translate3d(${translateX}%, 0, 0) scale(${scale})`,
                  zIndex: Math.round(opacity * 10),
                }}
              >
                <Image
                  className="vehicle-image vehicle-image-desktop"
                  src={item.src}
                  alt={index === 3 ? "Premium burgundy and black vehicle interior" : `Deep burgundy performance sedan ${item.label.toLowerCase()} view`}
                  fill
                  unoptimized
                  sizes="100vw"
                  priority={index < 2}
                />
                <Image
                  className="vehicle-image vehicle-image-mobile"
                  src={item.mobileSrc}
                  alt=""
                  aria-hidden="true"
                  fill
                  unoptimized
                  sizes="100vw"
                  priority={index < 2}
                />
              </div>
            );
          })}
          <div className="story-light-sweep" aria-hidden="true" />
          <div className="vehicle-vignette" />
        </div>

        <div className="hero-opening" style={{ opacity: openingOpacity, pointerEvents: openingOpacity > 0.25 ? "auto" : "none" }}>
          <p className="eyebrow">{copy.story.openingEyebrow}</p>
          <h1>{copy.story.openingLine1}<br />{copy.story.openingLine2}</h1>
          <p>{copy.story.openingBody}</p>
          <div className="hero-actions">
            <Link className="button button-gold" href="/inventory">{copy.story.explore}</Link>
            <WhatsAppLink className="text-link" message={copy.whatsapp.heroReservation}>{copy.story.reserve} <span>↗</span></WhatsAppLink>
          </div>
        </div>

        <div className="frame-caption" style={{ opacity: captionOpacity }} aria-live="polite">
          <div key={active} className="frame-caption-copy">
            <p>{localizedFrames[active].eyebrow}</p>
            <h2>{localizedFrames[active].title}</h2>
          </div>
        </div>

        <div className="story-progress" aria-label={`${active + 1}/${frames.length}: ${localizedFrames[active].label}`}>
          {localizedFrames.map((item, index) => {
            const fill = clamp(progress * frames.length - index);
            return (
              <div key={item.src} className={index === active ? "active" : ""}>
                <small>0{index + 1}</small>
                <span>{item.label}</span>
                <i aria-hidden="true"><b style={{ transform: `scaleX(${fill})` }} /></i>
              </div>
            );
          })}
        </div>
        <p className="scroll-cue"><strong>{Math.round(progress * 100)}%</strong> {progress < 0.035 ? copy.story.scroll : nextLabel} <span>↓</span></p>
        <p className="prototype-disclosure">{copy.story.disclosure}</p>
      </div>
    </section>
  );
}

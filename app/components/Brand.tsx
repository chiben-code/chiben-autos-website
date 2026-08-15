import Image from "next/image";
import Link from "next/link";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={`brand ${compact ? "brand-compact" : ""}`} href="/" aria-label="Chiben Autos home">
      <span className="brand-emblem">
        <Image
          src="/images/brand/chiben-emblem.webp"
          alt="Chiben Autos CA emblem"
          fill
          unoptimized
          sizes="52px"
          priority
        />
      </span>
      <span className="brand-words">
        <strong>CHIBEN AUTOS</strong>
        {!compact && <small>CHIBEN AUTO VENTURES LTD</small>}
      </span>
    </Link>
  );
}

export type VehicleCategory = "Brand New" | "Refurbished";

export type Vehicle = {
  id: string;
  slug: string;
  name: string;
  category: VehicleCategory;
  priceLabel: string;
  priceNgn: number | null;
  year: number;
  mileage: string;
  transmission: string;
  fuel: string;
  bodyType: string;
  color: string;
  location: string;
  imageUrl: string;
  gallery: string[];
  features: string[];
  description: string;
  badge: string;
  featured: boolean;
  status: "published" | "draft" | "reserved" | "sold";
  prototypeVisual: boolean;
};

export type SiteSettings = {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  tagline: string;
  animationMode: "full" | "balanced" | "minimal";
  auctionsStatus: "coming-soon" | "live" | "hidden";
};

export const defaultSettings: SiteSettings = {
  phone: "+234 810 624 3694",
  whatsapp: "2348106243694",
  email: "chibenautos@aol.com",
  address: "Alagbado, Lagos, Nigeria",
  tagline: "Drive with confidence. Arrive in style.",
  animationMode: "balanced",
  auctionsStatus: "coming-soon",
};

export const prototypeVehicles: Vehicle[] = [
  {
    id: "prototype-burgundy-sedan",
    slug: "burgundy-performance-sedan",
    name: "Burgundy Performance Sedan",
    category: "Brand New",
    priceLabel: "Price on request",
    priceNgn: null,
    year: 2026,
    mileage: "Delivery mileage",
    transmission: "Automatic",
    fuel: "Petrol",
    bodyType: "Performance Sedan",
    color: "Deep Burgundy",
    location: "Lagos",
    imageUrl: "/images/vehicles/burgundy-front.webp",
    gallery: [
      "/images/vehicles/burgundy-front.webp",
      "/images/vehicles/burgundy-side.webp",
      "/images/vehicles/burgundy-rear.webp",
      "/images/vehicles/burgundy-interior.webp",
    ],
    features: ["Premium leather", "Driver assistance", "Surround camera"],
    description:
      "A cinematic demonstration listing used to preview Chiben Autos' premium digital showroom experience.",
    badge: "Signature arrival",
    featured: true,
    status: "published",
    prototypeVisual: true,
  },
  {
    id: "prototype-pearl-suv",
    slug: "pearl-seven-seat-suv",
    name: "Pearl Seven-Seat SUV",
    category: "Brand New",
    priceLabel: "Price on request",
    priceNgn: null,
    year: 2026,
    mileage: "Delivery mileage",
    transmission: "Automatic",
    fuel: "Hybrid",
    bodyType: "Full-size SUV",
    color: "Pearl White",
    location: "Lagos",
    imageUrl: "/images/vehicles/pearl-suv.webp",
    gallery: ["/images/vehicles/pearl-suv.webp"],
    features: ["Seven seats", "Panoramic roof", "Premium sound"],
    description:
      "A spacious, premium SUV concept listing for demonstrating new-vehicle enquiries and reservations.",
    badge: "Family flagship",
    featured: true,
    status: "published",
    prototypeVisual: true,
  },
  {
    id: "prototype-graphite-crossover",
    slug: "graphite-urban-crossover",
    name: "Graphite Urban Crossover",
    category: "Refurbished",
    priceLabel: "Price on request",
    priceNgn: null,
    year: 2023,
    mileage: "24,800 km",
    transmission: "Automatic",
    fuel: "Petrol",
    bodyType: "Compact Crossover",
    color: "Graphite Grey",
    location: "Lagos",
    imageUrl: "/images/vehicles/graphite-crossover.webp",
    gallery: ["/images/vehicles/graphite-crossover.webp"],
    features: ["Inspection report", "Service history", "Reverse camera"],
    description:
      "A polished demonstration of how inspected refurbished inventory will appear before a customer reserves an inspection.",
    badge: "Chiben inspected",
    featured: true,
    status: "published",
    prototypeVisual: true,
  },
];

export function whatsappVehicleUrl(vehicle: Vehicle) {
  const message = `Hello Chiben Autos, I would like to enquire about the ${vehicle.name} (${vehicle.year}). Please share availability and inspection details.`;
  return `https://wa.me/${defaultSettings.whatsapp}?text=${encodeURIComponent(message)}`;
}

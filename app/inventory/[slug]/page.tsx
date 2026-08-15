import { prototypeVehicles } from "../../../lib/vehicles";
import { PublicShell } from "../../components/PublicShell";
import { VehicleDetail } from "./VehicleDetail";

export default async function VehiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const initialVehicle = prototypeVehicles.find((vehicle) => vehicle.slug === slug) ?? null;
  return (
    <PublicShell>
      <main className="detail-page section-pad">
        <VehicleDetail slug={slug} initialVehicle={initialVehicle} />
      </main>
    </PublicShell>
  );
}

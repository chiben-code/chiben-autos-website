import type { Metadata } from "next";
import { PublicShell } from "../components/PublicShell";
import { WhatsAppLink } from "../components/SiteSettingsContext";

export const metadata: Metadata = { title: "Auctions — Coming Soon" };

export default function AuctionsPage() {
  return (
    <PublicShell>
      <main className="inner-page auction-page">
        <section className="auction-hero section-pad">
          <div>
            <p className="eyebrow">CHIBEN AUCTIONS</p>
            <h1>A transparent bidding room is being prepared.</h1>
            <p>Future lots will combine verified vehicle information, reserve-price clarity and controlled bidder access.</p>
            <WhatsAppLink className="button button-gold" message="Hello Chiben Autos, please notify me when Chiben Auctions opens.">Join early access ↗</WhatsAppLink>
          </div>
          <div className="auction-countdown-placeholder">
            <span>FIRST AUCTION</span>
            <strong>COMING<br />SOON</strong>
            <div><i /><i /><i /><i /><i /></div>
          </div>
        </section>
        <section className="auction-principles section-pad">
          <article><span>01</span><h2>Verified lots</h2><p>Vehicle identity, available inspection material and seller information presented before bidding.</p></article>
          <article><span>02</span><h2>Clear status</h2><p>Reserve and auction states designed to remain visible from opening through close.</p></article>
          <article><span>03</span><h2>Controlled access</h2><p>Bidder approval and payment rules will be defined before auctions are activated.</p></article>
        </section>
      </main>
    </PublicShell>
  );
}

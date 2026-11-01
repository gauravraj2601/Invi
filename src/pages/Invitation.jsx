import React from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import InvitationSheets from "../components/InvitationSheets/InvitationSheets";
import Countdown from "../components/Countdown/Countdown";
import VenueMap from "../components/VenueMap/VenueMap";
import Footer from "../components/Footer/Footer";

export default function Invitation() {
  return (
    <div className="invitation-page">
      {/* Section 1: Welcome Screen */}
      <HeroSection />

      {/* Section 2: Main Invitation (Top Gate + WebCont1 & WebCont2) */}
      <InvitationSheets />

      {/* Section 3: Countdown */}
      <Countdown />

      {/* Section 4: Venue Map View (Where We Celebrate) */}
      <VenueMap />

      {/* Section 5: Traditional Footer */}
      <Footer />
    </div>
  );
}

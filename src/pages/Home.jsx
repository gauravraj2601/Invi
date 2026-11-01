import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Home.css";

import Envelope from "../components/Envelope/Envelope";
import FloatingFlowers from "../components/FloatingFlowers/FloatingFlowers";
import MusicPlayer from "../components/MusicPlayer/MusicPlayer";
import Invitation from "./Invitation";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <div className={`home ${opened ? "opened" : ""}`}>
      {/* 
        MusicPlayer is OFF by default when user is on the envelope screen.
        When user clicks the envelope to open, ganeshaTitle.mp3 starts playing at 1.2x speed.
        Once opened is true (Invitation reveals), it automatically switches to shreeGanesh.mp3 for all time at 1.2x speed.
      */}
      <MusicPlayer isInvitationOpen={opened} startMusicTrigger={envelopeOpened} />
      <FloatingFlowers />

      <AnimatePresence mode="wait">
        {!opened ? (
          <Envelope
            key="envelope-component"
            onEnvelopeClick={() => {
              setEnvelopeOpened(true);
            }}
            onOpen={() => {
              setOpened(true);
            }}
          />
        ) : (
          <motion.div
            key="invitation-component"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            style={{ width: "100%" }}
          >
            <Invitation />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

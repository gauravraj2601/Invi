import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import envelope from "../../assets/images/envelope-new.png";
import logo from "../../assets/images/MA_nobackground_logo.png";
import weddingVideo from "../../assets/video/video1.mp4";
import "./Envelope.css";

export default function Envelope({ onOpen, onEnvelopeClick }) {
  // States: 'closed' -> 'opening' -> 'video' -> 'closing'
  const [stage, setStage] = useState("closed");
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  // Detect mobile vs laptop screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Triggered when user clicks the envelope to open
  const handleEnvelopeClick = () => {
    if (stage !== "closed") return;

    // Immediately trigger music playback on envelope click at 1.2x speed
    window.dispatchEvent(new CustomEvent("playEnvelopeMusic"));
    if (onEnvelopeClick) {
      onEnvelopeClick();
    }

    setStage("opening");

    // Transition smoothly from envelope to cinematic zoom-in
    setTimeout(() => {
      setStage("video");
    }, 550);
  };

  // Video playback management (video sound muted; ganeshaTitle.mp3 plays in background)
  useEffect(() => {
    if (stage === "video") {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = true; // Video sound muted
        videoRef.current.playbackRate = 0.75; // Video slowed to 0.75x for cinematic sync
        videoRef.current
          .play()
          .catch((err) => {
            console.log("Video play error:", err);
          });
      }

      // 10s video at 0.75x speed lasts ~11.8s; fallback safety timer set to 12.2s
      timerRef.current = setTimeout(() => {
        finishVideo();
      }, 12200);

      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
  }, [stage]);

  // Finish video and transition into Invitation component
  const finishVideo = () => {
    if (stage === "closing") return;
    if (timerRef.current) clearTimeout(timerRef.current);

    setStage("closing");

    if (videoRef.current) {
      videoRef.current.pause();
    }

    // After smooth fade-out transition, open the Invitation component (triggers shreeGanesh.mp3)
    setTimeout(() => {
      onOpen();
    }, 700);
  };

  return (
    <div className="envelope-master-container">
      {/* ============================================================== */}
      {/* 1. ENVELOPE CARD (INITIAL STAGE)                               */}
      {/* ============================================================== */}
      <AnimatePresence>
        {(stage === "closed" || stage === "opening") && (
          <motion.div
            className="envelope-wrapper"
            initial={{ opacity: 1, scale: 1 }}
            animate={{
              opacity: stage === "opening" ? 0 : 1,
              scale: stage === "opening" ? 1.25 : 1,
            }}
            exit={{ opacity: 0, scale: 1.3 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <motion.div
              className="envelope-card"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              onClick={handleEnvelopeClick}
            >
              <img
                src={envelope}
                className="envelope-image"
                alt="वेडिंग इनविटेशन लिफाफा"
              />

              <motion.img
                src={logo}
                className="logo-image"
                initial={{ opacity: 1, x: -70, scale: 0.6, y: -50 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -80, scale: 0.8 }}
                transition={{ duration: 0.6 }}
                alt="MA Monogram"
              />
            </motion.div>

            <motion.p
              className="open-text"
              onClick={handleEnvelopeClick}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ॥ निमंत्रण पत्र खोलें ॥
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================== */}
      {/* 2. FULL VIEW CINEMATIC VIDEO (DYNAMIC ZOOM-IN FOR LAPTOP & MOBILE) */}
      {/* ============================================================== */}
      <AnimatePresence>
        {(stage === "video" || stage === "closing") && (
          <motion.div
            className="cinematic-video-overlay"
            initial={{ opacity: 0 }}
            animate={{
              opacity: stage === "closing" ? 0 : 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Initial Zoom-In from Envelope Center */}
            <motion.div
              className="cinematic-fullscreen-wrapper"
              initial={{ scale: 0.2, opacity: 0 }}
              animate={{
                scale: stage === "closing" ? 1.08 : 1,
                opacity: stage === "closing" ? 0 : 1,
              }}
              exit={{ scale: 1.12, opacity: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.16, 1, 0.3, 1], // Smooth cinematic exponential zoom-in
              }}
            >
              {/* 
                Laptop View: Reduced by 10% (0.90 -> 0.98) to prevent over-zooming.
                Mobile View: Starts with full horizontal view (scale 1.0, 0% crop),
                then dynamically expands height and scale up to 1.75 (+20% extra height) over 10s.
              */}
              <motion.video
                ref={videoRef}
                src={weddingVideo}
                className="wedding-cinematic-video"
                playsInline
                autoPlay
                muted
                onPlay={() => {
                  if (videoRef.current) videoRef.current.playbackRate = 0.75;
                }}
                onLoadedMetadata={() => {
                  if (videoRef.current) videoRef.current.playbackRate = 0.75;
                }}
                onEnded={finishVideo}
                initial={{ scale: isMobile ? 1.0 : 0.90 }}
                animate={{ scale: isMobile ? 2.52 : 0.98 }}
                transition={{
                  duration: 11.8,
                  ease: "easeInOut",
                }}
              />

              {/* Floating Royal Caption */}
              <motion.p
                className="cinematic-caption"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                ॥ मनिष संग आरती • पावन परिणयोत्सव ॥
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

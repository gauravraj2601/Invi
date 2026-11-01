import { useEffect, useState, useRef } from "react";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import ganeshaTitleTrack from "../../assets/music/ganeshaTitle.mp3";
import aajSajeya from "../../assets/music/Aaj_Sajeya.mp3";
import "./MusicPlayer.css";

export default function MusicPlayer({ isInvitationOpen, startMusicTrigger }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const userMutedRef = useRef(false);

  // Dedicated independent audio instances:
  // 1. envelopeAudio: Strictly for Envelope & Video (ganeshaTitleTrack @ 1.25x)
  // 2. invitationAudio: Strictly for HeroSection & Main Invitation (Aaj_Sajeya @ 1.0x)
  const envelopeAudioRef = useRef(null);
  const invitationAudioRef = useRef(null);

  // Initialize both audio elements
  useEffect(() => {
    // 1. Setup Envelope Track (ganeshaTitle.mp3)
    const envAudio = new Audio(ganeshaTitleTrack);
    envAudio.loop = false; // Plays once through envelope + video
    envAudio.playbackRate = 1.25;
    envelopeAudioRef.current = envAudio;

    // 2. Setup Invitation Track (Aaj_Sajeya.mp3)
    const invAudio = new Audio(aajSajeya);
    invAudio.loop = true; // Loops for all-time invitation
    invAudio.playbackRate = 1.0;
    invAudio.preload = "auto";
    invitationAudioRef.current = invAudio;

    // Triggered synchronously when user clicks the envelope to open
    const handleEnvelopeMusicPlay = () => {
      if (userMutedRef.current) return;

      // Start ganeshaTitle at 1.25x speed
      if (envelopeAudioRef.current) {
        envelopeAudioRef.current.playbackRate = 1.25;
        envelopeAudioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Envelope music error:", err));
      }

      // Pre-warm / preload aajSajeya so it's fully ready when video ends
      if (invitationAudioRef.current) {
        invitationAudioRef.current.load();
      }
    };

    window.addEventListener("playEnvelopeMusic", handleEnvelopeMusicPlay);

    return () => {
      window.removeEventListener("playEnvelopeMusic", handleEnvelopeMusicPlay);
      if (envelopeAudioRef.current) {
        envelopeAudioRef.current.pause();
        envelopeAudioRef.current.src = "";
      }
      if (invitationAudioRef.current) {
        invitationAudioRef.current.pause();
        invitationAudioRef.current.src = "";
      }
    };
  }, []);

  // When user clicks the envelope to open (via prop trigger fallback)
  useEffect(() => {
    if (startMusicTrigger && !userMutedRef.current && !isPlaying && !isInvitationOpen) {
      if (envelopeAudioRef.current) {
        envelopeAudioRef.current.playbackRate = 1.25;
        envelopeAudioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.log("Prop start error:", err));
      }
      if (invitationAudioRef.current) {
        invitationAudioRef.current.load();
      }
    }
  }, [startMusicTrigger]);

  // When Invitation opens (HeroSection appears):
  // GUARANTEE: ganeshaTitle stops completely, and aajSajeya plays at normal speed!
  useEffect(() => {
    if (!isInvitationOpen) return;

    // 1. COMPLETELY STOP and UNLOAD ganeshaTitleTrack so it can NEVER play again
    if (envelopeAudioRef.current) {
      envelopeAudioRef.current.pause();
      envelopeAudioRef.current.currentTime = 0;
      envelopeAudioRef.current.src = ""; // Nullify source to prevent any phantom playback in production
      try {
        envelopeAudioRef.current.load();
      } catch (e) {
        // ignore
      }
    }

    // 2. START Aaj Sajeya at normal speed (1.0x)
    if (invitationAudioRef.current && !userMutedRef.current) {
      invitationAudioRef.current.playbackRate = 1.0;
      invitationAudioRef.current.currentTime = 0;
      invitationAudioRef.current
        .play()
        .then(() => {
          if (invitationAudioRef.current) invitationAudioRef.current.playbackRate = 1.0;
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("Aaj Sajeya autoplay waiting for gesture:", err);
          // If mobile browser requires another gesture, start on next user touch/interaction
          const handleNextGesture = () => {
            if (invitationAudioRef.current && !userMutedRef.current) {
              invitationAudioRef.current.playbackRate = 1.0;
              invitationAudioRef.current
                .play()
                .then(() => setIsPlaying(true))
                .catch((e) => console.log("Gesture play error:", e));
            }
            window.removeEventListener("click", handleNextGesture);
            window.removeEventListener("touchstart", handleNextGesture);
          };
          window.addEventListener("click", handleNextGesture, { once: true });
          window.addEventListener("touchstart", handleNextGesture, { once: true });
        });
    }
  }, [isInvitationOpen]);

  // Floating music toggle button
  const togglePlay = (e) => {
    e.stopPropagation();

    // Determine which audio track is active based on current screen
    const activeAudio = isInvitationOpen ? invitationAudioRef.current : envelopeAudioRef.current;
    if (!activeAudio) return;

    if (isPlaying) {
      activeAudio.pause();
      setIsPlaying(false);
      userMutedRef.current = true;
    } else {
      userMutedRef.current = false;
      const targetSpeed = isInvitationOpen ? 1.0 : 1.25;
      activeAudio.playbackRate = targetSpeed;
      activeAudio
        .play()
        .then(() => {
          if (activeAudio) activeAudio.playbackRate = targetSpeed;
          setIsPlaying(true);
        })
        .catch((err) => console.log("Failed to play audio:", err));
    }
  };

  return (
    <button
      className={`music-toggle-btn ${isPlaying ? "playing" : "paused"}`}
      onClick={togglePlay}
      aria-label="संगीत चालू या बंद करें"
      title={isPlaying ? "संगीत बंद करें" : "संगीत चालू करें"}
    >
      <div className="pulse-ring"></div>
      <div className="icon-container">
        {isPlaying ? <FaVolumeUp className="sound-icon" /> : <FaVolumeMute className="sound-icon" />}
      </div>
      {isPlaying && (
        <div className="music-waves">
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
          <span className="wave-bar"></span>
        </div>
      )}
    </button>
  );
}

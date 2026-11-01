import React, { useState, useEffect, useRef } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { fireConfettiBlast } from "./ConfettiHelper";
import "./Countdown.css";

const Countdown = () => {
  const targetDate = "2026-12-09T19:00:00"; // Dec 9, 2026 7:00 PM
  const { days, hours, minutes, seconds } = useCountdown(targetDate);

  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef(null);
  const confettiCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const isDrawingRef = useRef(false);

  // Initialize canvas with gold scratch layer in English
  const setupCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    // High DPI scaling for ultra crisp graphics & typography
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    // Draw luxury gold gradient background
    const gradient = ctx.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, "#D4AF37"); // Metallic Gold
    gradient.addColorStop(0.3, "#FFDF00"); // Bright Gold
    gradient.addColorStop(0.5, "#AA7C11"); // Dark Gold
    gradient.addColorStop(0.8, "#F3E5AB"); // Light Gold
    gradient.addColorStop(1, "#C5A023"); // Bronze Gold

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Inner gold border
    ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 8, rect.width - 16, rect.height - 16);

    // Text in English: "✦ SCRATCH TO REVEAL ✦"
    ctx.fillStyle = "#43352D";
    const fontSize = rect.width < 360 ? 14 : 17;
    ctx.font = `bold ${fontSize}px 'Cinzel', serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", rect.width / 2, rect.height / 2);
  };

  useEffect(() => {
    setupCanvas();

    const handleResize = () => {
      if (!isRevealed) {
        setupCanvas();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isRevealed]);

  // Track the scratch percentage
  const checkScratchPercentage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;
    const step = 32;

    for (let i = 0; i < pixels.length; i += 4 * step) {
      if (pixels[i + 3] === 0) {
        transparentCount++;
      }
    }

    const totalSampled = pixels.length / (4 * step);
    const percentage = (transparentCount / totalSampled) * 100;

    if (percentage > 35) {
      revealCard();
    }
  };

  const revealCard = () => {
    if (isRevealed) return;
    setIsRevealed(true);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Fire dual confetti popper blast
    if (confettiCanvasRef.current) {
      fireConfettiBlast(confettiCanvasRef.current);
    }
  };

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: (clientX - rect.left) * dpr,
      y: (clientY - rect.top) * dpr,
    };
  };

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale for accurate pixel removal
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 38 * dpr, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    checkScratchPercentage();
  };

  const handleStart = (e) => {
    if (isRevealed) return;
    isDrawingRef.current = true;
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const handleMove = (e) => {
    if (!isDrawingRef.current || isRevealed) return;
    if (e.cancelable) e.preventDefault();
    const { x, y } = getCoordinates(e);
    scratch(x, y);
  };

  const handleEnd = () => {
    isDrawingRef.current = false;
  };

  return (
    <section className="countdown-section" id="countdown">
      {/* Confetti blast canvas overlay */}
      <canvas ref={confettiCanvasRef} className="confetti-canvas" />

      <div className="section-header">
        <span className="section-subtitle font-vibes">The Countdown</span>
        <h2 className="section-title font-cinzel">Counting the Days</h2>
        <div className="title-divider">
          <span className="feather">✦</span>
        </div>
      </div>

      <div className="countdown-container-outer" ref={containerRef}>
        {/* Underneath: Revealed Wedding Date and Timer in English */}
        <div className={`revealed-content ${isRevealed ? "revealed-active" : ""}`}>
          <div className="reveal-date-card">
            <span className="save-the-date-txt font-cinzel">SAVE THE DATE</span>
            <h3 className="wedding-date font-vibes">Wednesday</h3>
            <h3 className="wedding-date font-vibes">9th December 2026</h3>
          </div>

          <div className="countdown-timer">
            <div className="timer-box">
              <span className="timer-number">{days}</span>
              <span className="timer-label">DAYS</span>
            </div>
            <div className="timer-box">
              <span className="timer-number">{hours}</span>
              <span className="timer-label">HOURS</span>
            </div>
            <div className="timer-box">
              <span className="timer-number">{minutes}</span>
              <span className="timer-label">MINS</span>
            </div>
            <div className="timer-box">
              <span className="timer-number">{seconds}</span>
              <span className="timer-label">SECS</span>
            </div>
          </div>
        </div>

        {/* Scratch Card Overlay Layer */}
        {!isRevealed && (
          <div className="scratch-overlay-container">
            <canvas
              ref={canvasRef}
              className="scratch-canvas"
              onMouseDown={handleStart}
              onMouseMove={handleMove}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={handleStart}
              onTouchMove={handleMove}
              onTouchEnd={handleEnd}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Countdown;

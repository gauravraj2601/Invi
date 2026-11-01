import React from "react";
import "./FloatingFlowers.css";

const particles = [
  // Butterflies rising
  { id: 1, icon: "🦋", left: "8%", delay: "0s", duration: "22s", size: "24px", type: "butterfly-rise" },
  { id: 2, icon: "🦋", left: "82%", delay: "3s", duration: "25s", size: "20px", type: "butterfly-rise" },
  { id: 3, icon: "🦋", left: "38%", delay: "7s", duration: "20s", size: "28px", type: "butterfly-rise" },
  { id: 4, icon: "🦋", left: "68%", delay: "12s", duration: "18s", size: "22px", type: "butterfly-rise" },
  { id: 5, icon: "🦋", left: "22%", delay: "15s", duration: "26s", size: "25px", type: "butterfly-rise" },
  // Flowers falling down
  { id: 6, icon: "🌸", left: "15%", delay: "1s", duration: "16s", size: "32px", type: "flower-fall" },
  { id: 7, icon: "🌸", left: "55%", delay: "4s", duration: "19s", size: "28px", type: "flower-fall" },
  { id: 8, icon: "🌼", left: "75%", delay: "2s", duration: "15s", size: "26px", type: "flower-fall" },
  { id: 9, icon: "🌼", left: "32%", delay: "8s", duration: "21s", size: "30px", type: "flower-fall" },
  { id: 10, icon: "🌺", left: "92%", delay: "5s", duration: "17s", size: "34px", type: "flower-fall" },
  { id: 11, icon: "🌺", left: "5%", delay: "10s", duration: "24s", size: "26px", type: "flower-fall" },
  { id: 12, icon: "🌷", left: "48%", delay: "6s", duration: "18s", size: "24px", type: "flower-fall" },
  { id: 13, icon: "🌷", left: "88%", delay: "11s", duration: "16s", size: "22px", type: "flower-fall" },
  // Leaves drifting
  { id: 14, icon: "🍃", left: "28%", delay: "0.5s", duration: "13s", size: "20px", type: "flower-fall" },
  { id: 15, icon: "🍃", left: "72%", delay: "9s", duration: "15s", size: "22px", type: "flower-fall" },
  { id: 16, icon: "🍃", left: "50%", delay: "13s", duration: "17s", size: "18px", type: "flower-fall" }
];

export default function FloatingFlowers() {
  return (
    <div className="floating-container">
      {particles.map((item) => (
        <span
          key={item.id}
          className={`floating-particle ${item.type}`}
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size,
          }}
        >
          {item.icon}
        </span>
      ))}
    </div>
  );
}
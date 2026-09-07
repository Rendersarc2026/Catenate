import * as React from "react";

const STARS = [
  { top: "12%", left: "14%", size: 1.5, delay: "0s", duration: "4s" },
  { top: "24%", left: "28%", size: 1, delay: "1.2s", duration: "5.5s" },
  { top: "8%", left: "42%", size: 2, delay: "2.1s", duration: "4.8s" },
  { top: "18%", left: "64%", size: 1.2, delay: "0.7s", duration: "6s" },
  { top: "14%", left: "82%", size: 1.8, delay: "1.8s", duration: "5.2s" },
  { top: "28%", left: "91%", size: 1, delay: "2.5s", duration: "4.5s" },
  { top: "34%", left: "8%", size: 1.4, delay: "1.5s", duration: "5s" },
  { top: "6%", left: "73%", size: 1.2, delay: "3s", duration: "6.2s" },
  { top: "22%", left: "52%", size: 1.6, delay: "0.4s", duration: "4.2s" },
  { top: "30%", left: "38%", size: 1, delay: "2.8s", duration: "5.8s" },
];

export function ContactStars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {STARS.map((star, idx) => (
        <span
          key={idx}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: 0.35,
            animation: `star-twinkle ${star.duration} ease-in-out infinite`,
            animationDelay: star.delay,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
        />
      ))}
    </div>
  );
}

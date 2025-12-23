import { useState, useEffect, useRef } from "react";

export default function HexLogo({ onLoadComplete }) {
  const [showText, setShowText] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const shapeRef = useRef(null);

  useEffect(() => {
    const shape = shapeRef.current;
    if (!shape) return;

    const length = shape.getTotalLength();
    shape.style.strokeDasharray = length;
    shape.style.strokeDashoffset = length;

    requestAnimationFrame(() => {
      setTimeout(() => {
        shape.style.transition = "stroke-dashoffset 1.8s ease-out";
        shape.style.strokeDashoffset = "0";
      }, 200);
    });

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2000);

    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsLoading(false);
        if (onLoadComplete) onLoadComplete();
      }, 700);
    }, 3000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeOutTimer);
    };
  }, [onLoadComplete]);

  if (!isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Diamond Shape */}
        <svg width="100" height="100" viewBox="0 0 100 100">
          <polygon
            ref={shapeRef}
            points="50,2 90,50 50,98 10,50"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            style={{
              filter: "drop-shadow(0 0 25px rgba(15,23,42,0.7))",
              strokeLinecap: "round",
              strokeDasharray: "1000",
              strokeDashoffset: "1000",
            }}
          />
        </svg>

        {/* Floating P */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
            showText ? "opacity-100" : "opacity-0"
          }`}
        >
          <span
            className="text-4xl font-bold text-[#3B82F6]"
            style={{
              textShadow: "0 0 35px rgba(15,23,42,0.7)",
              transform: "translateY(0px)",
            }}
          >
            P
          </span>
        </div>
      </div>
    </div>
  );
}
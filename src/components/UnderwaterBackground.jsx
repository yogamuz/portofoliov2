import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function UnderwaterBackground() {
  const causticsRef = useRef(null);
  const caustics2Ref = useRef(null);
  const spotlightRef = useRef(null);
  const vignetteRef = useRef(null);

  useEffect(() => {
    // Animasi cahaya laut layer 1 - pergerakan diagonal lambat
    const caustics1 = causticsRef.current;
    if (caustics1) {
      gsap.to(caustics1, {
        backgroundPosition: '120% 120%',
        duration: 25,
        ease: 'none',
        repeat: -1,
        yoyo: false,
      });
    }

    // Animasi cahaya laut layer 2 - pergerakan berlawanan arah lebih lambat
    const caustics2 = caustics2Ref.current;
    if (caustics2) {
      gsap.to(caustics2, {
        backgroundPosition: '-20% -20%',
        duration: 30,
        ease: 'none',
        repeat: -1,
        yoyo: false,
      });
    }

    // Spotlight effect yang mengikuti cursor dengan smooth transition
    const handleMouseMove = (e) => {
      if (spotlightRef.current) {
        const x = e.clientX;
        const y = e.clientY;
        
        gsap.to(spotlightRef.current, {
          left: x,
          top: y,
          duration: 0.8,
          ease: 'power1.out',
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* Base underwater gradient background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center 30%, #0d1b2a 0%, #0a1322 40%, #06090f 100%)',
        }}
      />

      {/* Underwater caustics layer 1 - primary light patterns */}
      <div
        ref={causticsRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 800px 600px at 25% 35%, rgba(20, 60, 120, 0.12) 0%, transparent 60%),
            radial-gradient(ellipse 700px 500px at 75% 65%, rgba(25, 70, 130, 0.10) 0%, transparent 55%)
          `,
          backgroundSize: '200% 200%',
          backgroundPosition: '0% 0%',
          opacity: 0.6,
          mixBlendMode: 'screen',
        }}
      />

      {/* Underwater caustics layer 2 - secondary subtle patterns */}
      <div
        ref={caustics2Ref}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 600px 800px at 60% 40%, rgba(30, 80, 140, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse 500px 700px at 40% 70%, rgba(15, 50, 100, 0.06) 0%, transparent 45%)
          `,
          backgroundSize: '180% 180%',
          backgroundPosition: '0% 0%',
          opacity: 0.5,
          mixBlendMode: 'screen',
        }}
      />

      {/* Spotlight effect - flashlight in water */}
      <div
        ref={spotlightRef}
        className="fixed pointer-events-none z-0"
        style={{
          width: '500px',
          height: '500px',
          left: '50%',
          top: '50%',
          background: 'radial-gradient(circle, rgba(240, 248, 255, 0.18) 0%, rgba(180, 210, 240, 0.10) 25%, rgba(140, 180, 220, 0.05) 45%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(-50%, -50%)',
          willChange: 'left, top',
          mixBlendMode: 'screen',
          opacity: 0.7,
        }}
      />

      {/* Natural vignette for depth */}
      <div 
        ref={vignetteRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(5, 8, 12, 0.4) 70%, rgba(3, 5, 8, 0.7) 100%)',
        }}
      />

      {/* Depth gradient overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(6, 10, 15, 0.2) 60%, rgba(4, 6, 10, 0.4) 100%)',
        }}
      />

      {/* Subtle floating particles - minimal and delicate */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              background: 'rgba(160, 200, 240, 0.25)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${Math.random() * 15 + 12}s ease-in-out infinite`,
              animationDelay: `${Math.random() * -10}s`,
              filter: 'blur(0.5px)',
              opacity: 0.4,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float-particle {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0.2;
          }
          25% {
            opacity: 0.4;
          }
          50% {
            transform: translateY(-25px) translateX(8px);
            opacity: 0.5;
          }
          75% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-50px) translateX(15px);
            opacity: 0.1;
          }
        }
      `}</style>
    </>
  );
}
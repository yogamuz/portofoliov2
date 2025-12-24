// components/Certificate/HangingCableButton.jsx
import { useState, useEffect, useRef } from 'react';

export default function HangingCableButton({ onClick, children, isActive }) {
  const [isDragging, setIsDragging] = useState(false);
  const [cableOffset, setCableOffset] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const lastMousePos = useRef({ x: 0, y: 0 });

  // Physics simulation
  useEffect(() => {
    const animate = () => {
      setCableOffset((prev) => {
        const springForce = -0.05;
        const damping = 0.92;

        let newVelX = velocity.x + prev.x * springForce;
        let newVelY = velocity.y + prev.y * springForce;

        newVelX *= damping;
        newVelY *= damping;

        setVelocity({ x: newVelX, y: newVelY });

        const newX = prev.x + newVelX;
        const newY = prev.y + newVelY;

        const maxOffset = 80;
        const clampedX = Math.max(-maxOffset, Math.min(maxOffset, newX));
        const clampedY = Math.max(-20, Math.min(maxOffset, newY));

        return { x: clampedX, y: clampedY };
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    if (!isDragging) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, velocity]);

  const handlePointerDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;

    setCableOffset((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setVelocity({ x: deltaX * 0.5, y: deltaY * 0.5 });
    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handlePointerMove, { passive: false });
      window.addEventListener('touchend', handlePointerUp);

      return () => {
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('mouseup', handlePointerUp);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('touchend', handlePointerUp);
      };
    }
  }, [isDragging]);

  const cableEndX = cableOffset.x;
  const cableEndY = cableOffset.y + 50;
  const controlY = cableEndY * 0.6;

  return (
    <div ref={containerRef} className="relative inline-block" style={{ height: '120px', width: '160px' }}>
      {/* SVG Cable - underwater style */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        width="200"
        height="150"
        viewBox="0 0 200 150"
        style={{ overflow: 'visible' }}
      >
        {/* Cable shadow - subtle underwater */}
        <path
          d={`M 100 0 Q ${100 + cableEndX} ${controlY + 2} ${100 + cableEndX} ${cableEndY + 2}`}
          stroke="rgba(0,0,0,0.2)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Main cable - glass-like */}
        <path
          d={`M 100 0 Q ${100 + cableEndX} ${controlY} ${100 + cableEndX} ${cableEndY}`}
          stroke={isActive ? 'rgba(107, 124, 255, 0.6)' : 'rgba(107, 124, 255, 0.25)'}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{
            filter: isActive ? 'drop-shadow(0 0 6px rgba(138, 127, 255, 0.3))' : 'none',
            transition: 'stroke 0.5s ease, filter 0.5s ease',
          }}
        />
        
        {/* Cable attachment point - glass accent */}
        <circle 
          cx="100" 
          cy="0" 
          r="2.5" 
          fill={isActive ? 'rgba(107, 124, 255, 0.5)' : 'rgba(107, 124, 255, 0.3)'} 
        />
        <circle 
          cx="100" 
          cy="0" 
          r="4.5" 
          fill="none" 
          stroke={isActive ? 'rgba(107, 124, 255, 0.4)' : 'rgba(107, 124, 255, 0.2)'} 
          strokeWidth="1" 
        />
      </svg>

      {/* Draggable Button Container */}
      <div
        onMouseDown={handlePointerDown}
        onTouchStart={handlePointerDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="absolute left-1/2 top-[50px]"
        style={{
          transform: `translate(calc(-50% + ${cableOffset.x}px), ${cableOffset.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.1s',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
      >
        <button
          ref={buttonRef}
          onClick={(e) => {
            if (!isDragging) onClick(e);
          }}
          className="relative px-4 py-2 rounded-lg font-medium text-sm transition-all duration-500 overflow-hidden whitespace-nowrap"
          style={{
            background: isActive 
              ? 'rgba(15, 31, 58, 0.45)' 
              : 'rgba(15, 31, 58, 0.25)',
            border: isActive 
              ? '1px solid rgba(107, 124, 255, 0.35)' 
              : '1px solid rgba(107, 124, 255, 0.15)',
            color: isActive ? '#E6ECFF' : '#8A94B8',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: isActive || isHovered
              ? '0 4px 20px rgba(138, 127, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              : '0 2px 10px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            pointerEvents: 'auto',
          }}
        >
          {/* Glass reflection overlay */}
          <span
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, transparent 50%, rgba(255, 255, 255, 0.06) 100%)',
              opacity: isActive ? 1 : 0.6,
            }}
          />

          {/* Subtle glass refraction pattern */}
          <span
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 20px,
                  rgba(107, 124, 255, 0.03) 20px,
                  rgba(107, 124, 255, 0.03) 21px
                )
              `,
              opacity: isActive ? 0.5 : 0.3,
            }}
          />

          {/* Underwater shimmer effect when active */}
          {isActive && (
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(230, 236, 255, 0.15), transparent)',
                backgroundSize: '200% 100%',
                animation: 'underwater-shimmer 3s ease-in-out infinite',
              }}
            />
          )}

          {/* Glow effect on hover */}
          {(isActive || isHovered) && (
            <span
              className="absolute inset-0 pointer-events-none transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(138, 127, 255, 0.15), transparent 70%)',
                opacity: isHovered ? 1 : 0.5,
              }}
            />
          )}

          {/* Text content */}
          <span className="relative z-10">{children}</span>

          {/* Subtle accent lines for active state */}
          {isActive && (
            <>
              <span
                className="absolute top-0 left-0 w-full h-[1px]"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, rgba(107, 124, 255, 0.3), transparent)' 
                }}
              />
              <span
                className="absolute bottom-0 left-0 w-full h-[1px]"
                style={{ 
                  background: 'linear-gradient(90deg, transparent, rgba(107, 124, 255, 0.3), transparent)' 
                }}
              />
            </>
          )}
        </button>
      </div>

      {/* Custom underwater shimmer animation */}
      <style>{`
        @keyframes underwater-shimmer {
          0% { 
            background-position: -100% 0;
            opacity: 0.3;
          }
          50% {
            opacity: 0.5;
          }
          100% { 
            background-position: 200% 0;
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  );
}
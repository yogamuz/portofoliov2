import React from 'react';

// Inject CSS styles
const styles = `
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes particles {
  from { background-position: 0 0; }
  to { background-position: 30px 30px; }
}

@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.2;
  }
  100% {
    transform: scale(1.3);
    opacity: 0;
  }
}

.holographic-icon {
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
}

.holographic-icon svg {
  width: 20px;
  height: 20px;
  position: relative;
  z-index: 3;
  transition: all 0.3s ease;
  filter: drop-shadow(0 0 5px currentColor);
}

.holographic-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid;
  border-top-color: transparent;
  border-bottom-color: transparent;
  animation: rotate 3s linear infinite;
  opacity: 0.7;
}

.holographic-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    transparent 20%,
    currentColor 20%,
    currentColor 30%,
    transparent 30%,
    transparent 40%,
    currentColor 40%,
    currentColor 50%,
    transparent 50%
  );
  background-size: 15px 15px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.holographic-pulse {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 0 15px currentColor;
  opacity: 0;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.holographic-icon.github {
  color: #6e5494;
}

.holographic-icon.github:hover {
  color: #c9510c;
  transform: translateY(-10px) rotateX(20deg);
}

.holographic-icon.github:hover .holographic-ring {
  border-color: #c9510c;
  border-top-color: transparent;
  border-bottom-color: transparent;
}

.holographic-icon.linkedin {
  color: #0077B5;
}

.holographic-icon.linkedin:hover {
  color: #00a0dc;
  transform: translateY(-10px) rotateX(20deg);
}

.holographic-icon.linkedin:hover .holographic-ring {
  border-color: #00a0dc;
  border-top-color: transparent;
  border-bottom-color: transparent;
}

.holographic-icon:hover svg {
  transform: scale(1.2) rotate(10deg);
}

.holographic-icon:hover .holographic-particles {
  opacity: 0.3;
  animation: particles 3s linear infinite;
}

.holographic-icon:hover .holographic-pulse {
  opacity: 0.5;
  animation: pulse 2s ease-out infinite;
}

.holographic-icon::before {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 5%;
  width: 90%;
  height: 20%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  filter: blur(10px);
  transform: rotateX(80deg) translateZ(-20px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.holographic-icon:hover::before {
  opacity: 0.5;
}
`;

// Inject styles once
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

function HolographicIcon({ type, href, ariaLabel }) {
  const icons = {
    github: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M12,2.2467A10,10,0,0,0,8.83752,21.73419c.5.08752.6875-.21247.6875-.475,0-.23749-.01251-1.025-.01251-1.86249C7,19.85919,6.35,18.78423,6.15,18.22173A3.636,3.636,0,0,0,5.125,16.8092c-.35-.1875-.85-.65-.01251-.66248A2.00117,2.00117,0,0,1,6.65,17.17169a2.13742,2.13742,0,0,0,2.91248.825A2.10376,2.10376,0,0,1,10.2,16.65923c-2.225-.25-4.55-1.11254-4.55-4.9375a3.89187,3.89187,0,0,1,1.025-2.6875,3.59373,3.59373,0,0,1,.1-2.65s.83747-.26251,2.75,1.025a9.42747,9.42747,0,0,1,5,0c1.91248-1.3,2.75-1.025,2.75-1.025a3.59323,3.59323,0,0,1,.1,2.65,3.869,3.869,0,0,1,1.025,2.6875c0,3.83747-2.33752,4.6875-4.5625,4.9375a2.36814,2.36814,0,0,1,.675,1.85c0,1.33752-.01251,2.41248-.01251,2.75,0,.26251.1875.575.6875.475A10.0053,10.0053,0,0,0,12,2.2467Z" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`holographic-icon ${type}`}
      aria-label={ariaLabel}
    >
      <div className="holographic-ring"></div>
      <div className="holographic-particles"></div>
      {icons[type]}
      <div className="holographic-pulse"></div>
    </a>
  );
}

export default function HolographicSocial({ socialLinks, orientation = 'vertical' }) {
  return (
    <div
      className={`flex ${orientation === 'vertical' ? 'flex-col' : 'flex-row'} justify-center items-center gap-6`}
      style={{ perspective: '1000px' }}
    >
      {socialLinks.map((social, index) => (
        <HolographicIcon
          key={index}
          type={social.type}
          href={social.href}
          ariaLabel={social.label}
        />
      ))}
    </div>
  );
}

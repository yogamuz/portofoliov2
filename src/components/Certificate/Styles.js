// components/Certificate/styles.js
export const buttonStyles = `
@keyframes floating-points {
  0% { transform: translateY(0); }
  85% { opacity: 0; }
  100% { transform: translateY(-55px); opacity: 0; }
}
@keyframes dasharray {
  from { stroke-dasharray: 0 0 0 0; }
  to { stroke-dasharray: 68 68 0 0; }
}
@keyframes filled {
  to { fill: white; }
}
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes slideUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
@keyframes thread-shimmer {
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
}
@keyframes cable-sway {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(2deg); }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = buttonStyles;
  document.head.appendChild(styleSheet);
}
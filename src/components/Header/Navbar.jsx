// components/Header/Navbar.jsx
import StaggeredMenu from '../StaggeredMenu';
import { useState, useEffect } from 'react';

function Navbar() {
  const [isGlowing, setIsGlowing] = useState(false);

  // Glow effect setiap 4 detik
  useEffect(() => {
    const glowInterval = setInterval(() => {
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 1000);
    }, 4000);

    return () => clearInterval(glowInterval);
  }, []);

  const handleMenuItemClick = (e, link) => {
    e.preventDefault();

    // Close StaggeredMenu
    const closeEvent = new CustomEvent('closeStaggeredMenu');
    window.dispatchEvent(closeEvent);

    // Smooth scroll ke section
    const targetId = link.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80; // Offset untuk header (dikurangi agar lebih akurat)
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      // Langsung scroll tanpa setTimeout
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    } else {
      console.warn(`Element with id "${targetId}" not found`);
    }
  };

  const menuItems = [
    {
      label: 'HOME',
      link: '#home',
      ariaLabel: 'Navigate to home section',
      onClick: handleMenuItemClick,
    },
    {
      label: 'ABOUT',
      link: '#about',
      ariaLabel: 'Navigate to about section',
      onClick: handleMenuItemClick,
    },
    {
      label: 'PROJECTs',
      link: '#project',
      ariaLabel: 'Navigate to project section',
      onClick: handleMenuItemClick,
    },
    {
      label: 'CERTIFS',
      link: '#certificate',
      ariaLabel: 'Navigate to certificate section',
      onClick: handleMenuItemClick,
    },
  ];

  const socialItems = [
    { label: 'GitHub', link: 'https://github.com/yogamuz' },
    { label: 'LinkedIn', link: 'https://linkedin.com/in/prayogo-' },
    // { label: "Instagram", link: "https://instagram.com/yogamuz" },
  ];

  return (
    <nav className="w-full flex items-center justify-end px-8 md:px-16 lg:px-24 py-6 relative z-50">
      {/* HexLogo with P - Left Section */}
      <div className="fixed top-6 left-6 z-[100]">
        <a
          href="#home"
          onClick={(e) => handleMenuItemClick(e, '#home')}
          className="inline-block cursor-pointer"
          aria-label="Navigate to home"
        >
          <svg 
            width="60" 
            height="60" 
            viewBox="0 0 100 100"
          >
            <defs>
              {/* Gradient untuk efek cahaya dari atas ke bawah */}
              <linearGradient id="lightSweep" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(125,211,252,0.2)">
                  <animate
                    attributeName="offset"
                    values="-0.5; 1.5"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="0%" stopColor="rgba(125,211,252,1)">
                  <animate
                    attributeName="offset"
                    values="-0.3; 1.7"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
                <stop offset="0%" stopColor="rgba(125,211,252,0.2)">
                  <animate
                    attributeName="offset"
                    values="-0.1; 1.9"
                    dur="3s"
                    repeatCount="indefinite"
                  />
                </stop>
              </linearGradient>
            </defs>
            
            {/* Letter P dengan gradient cahaya */}
            <text
              x="50"
              y="50"
              dominantBaseline="middle"
              textAnchor="middle"
              fontSize="80"
              fontWeight="bold"
              fill="url(#lightSweep)"
              style={{
                filter: isGlowing 
                  ? 'drop-shadow(0 0 15px rgba(125,211,252,0.8))' 
                  : 'drop-shadow(0 0 5px rgba(125,211,252,0.4))',
                transition: 'filter 1s ease-in-out',
              }}
            >
              P
            </text>
          </svg>
        </a>
      </div>

      {/* StaggeredMenu: standalone di pojok kanan atas */}
      <div className="fixed top-0 right-0 p-4 z-50">
        <StaggeredMenu
          position="right"
          colors={['#7DD3FC', '#5FBEEA', 'rgba(125, 211, 252, 0.4)', 'rgba(10, 30, 50, 0.9)']}
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#7DD3FC"
          openMenuButtonColor="#7DD3FC"
          accentColor="#7DD3FC"
          changeMenuColorOnOpen={true}
          isFixed={true}
          closeOnClickAway={true}
        />
      </div>
    </nav>
  );
}

export default Navbar;
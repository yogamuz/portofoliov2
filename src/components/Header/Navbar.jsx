// components/Header/Navbar.jsx
import StaggeredMenu from '../StaggeredMenu';
import Magnet from '../Magnet';

function Navbar() {
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
      {/* CV Button with Magnet Effect - Left Section */}
      <div className="fixed top-6 left-6 z-[100]">
        <Magnet
          padding={80}
          magnetStrength={3}
          activeTransition="transform 0.2s ease-out"
          inactiveTransition="transform 0.4s ease-in-out"
          wrapperClassName="pointer-events-auto"
        >
          <a
            href="/Prayogo_Fullstack_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-2.5 text-white border border-[#7DD3FC] rounded font-medium text-sm tracking-wider hover:bg-[#A7F3D0]/20 hover:border-[#7DD3FC] transition-all duration-300 cursor-pointer select-none"
            aria-label="Download CV"
            style={{ pointerEvents: 'auto' }}
          >
            CV
          </a>
        </Magnet>
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

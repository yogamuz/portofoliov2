// components/Header/Navbar.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ID } from "country-flag-icons/react/3x2";
import { GB } from "country-flag-icons/react/3x2";
import StaggeredMenu from "../StaggeredMenu";
import Magnet from "../Magnet";

function Navbar() {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { t, i18n } = useTranslation();

  const languages = [
    { code: "id", label: "Indonesia", Flag: ID },
    { code: "en", label: "English", Flag: GB },
  ];

  const currentLang =
    languages.find((lang) => lang.code === i18n.language) || languages[1];

  const handleMenuItemClick = (e, link) => {
    e.preventDefault();

    // Close StaggeredMenu
    const closeEvent = new CustomEvent("closeStaggeredMenu");
    window.dispatchEvent(closeEvent);

    // Smooth scroll ke section
    const targetId = link.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      const offset = 80; // Offset untuk header (dikurangi agar lebih akurat)
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      // Langsung scroll tanpa setTimeout
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.warn(`Element with id "${targetId}" not found`);
    }
  };

  const menuItems = [
    {
      label: t("nav.home"),
      link: "#home",
      ariaLabel: "Navigate to home section",
      onClick: handleMenuItemClick,
    },
    {
      label: t("nav.about"),
      link: "#about",
      ariaLabel: "Navigate to about section",
      onClick: handleMenuItemClick,
    },
    {
      label: t("nav.project"),
      link: "#project",
      ariaLabel: "Navigate to project section",
      onClick: handleMenuItemClick,
    },
    {
      label: t("nav.contact"),
      link: "#contact",
      ariaLabel: "Navigate to contact section",
      onClick: handleMenuItemClick,
    },
  ];

  const socialItems = [
    { label: "GitHub", link: "https://github.com/yogamuz" },
    { label: "LinkedIn", link: "https://linkedin.com/in/prayogo-" },
    { label: "Instagram", link: "https://instagram.com/yogamuz" },
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
            href="/Prayogo_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-2.5 text-white border border-cyan-400 rounded font-medium text-sm tracking-wider hover:bg-cyan-400/20 hover:border-cyan-300 transition-all duration-300 cursor-pointer select-none"
            aria-label="Download CV"
            style={{ pointerEvents: "auto" }}
          >
            CV
          </a>
        </Magnet>
      </div>

      {/* StaggeredMenu: standalone di pojok kanan atas */}
      <div className="fixed top-0 right-0 p-4 z-50">
        <StaggeredMenu
          position="right"
          colors={["#1a1a2e", "#16213e", "#0f3460", "#533483"]}
          items={menuItems}
          socialItems={socialItems}
          displaySocials={true}
          displayItemNumbering={true}
          menuButtonColor="#fff"
          openMenuButtonColor="#000"
          changeMenuColorOnOpen={true}
          isFixed={true}
          accentColor="#8b5cf6"
          closeOnClickAway={true}
        />
      </div>
    </nav>
  );
}

export default Navbar;

// components/Header/Navbar.jsx
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ID } from "country-flag-icons/react/3x2";
import { GB } from "country-flag-icons/react/3x2";
import StaggeredMenu from "../StaggeredMenu";

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
    { label: "GitHub", link: "https://github.com/yourusername" },
    { label: "LinkedIn", link: "https://linkedin.com/in/yourusername" },
    { label: "Instagram", link: "https://instagram.com/yourusername" },
  ];

  return (
    <nav className="w-full flex items-center justify-end px-8 md:px-16 lg:px-24 py-6 relative z-50">
      {/* Language Switcher - Z-INDEX LEBIH TINGGI */}
      <div className="relative mr-4 z-[60]">
        <button
          onClick={() => setShowLangMenu(!showLangMenu)}
          className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full shadow-xl border border-white/20 hover:bg-white/20 transition-colors duration-200 relative z-[60]"
        >
          {currentLang && <currentLang.Flag className="w-6 h-6 rounded" />}
        </button>

        {showLangMenu && (
          <div className="absolute top-full mt-2 right-0 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden z-[70]">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setShowLangMenu(false);
                }}
                className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-white/20 transition-colors ${
                  i18n.language === lang.code ? "bg-white/30" : ""
                }`}
              >
                <lang.Flag className="w-6 h-6 rounded" />
                <span className="text-sm font-semibold text-white whitespace-nowrap">
                  {lang.label}
                </span>
              </button>
            ))}
          </div>
        )}
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
// components/Header/Navbar.jsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { ID } from 'country-flag-icons/react/3x2';
import { GB } from 'country-flag-icons/react/3x2';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { t, i18n } = useTranslation();

  // Menu items dengan key untuk translasi
  const menuItems = [
    { key: "home", section: "home" },
    { key: "about", section: "about" },
    { key: "project", section: "project" },
    { key: "contact", section: "contact" }
  ];
  
  const languages = [
    { code: 'id', label: 'Indonesia', Flag: ID },
    { code: 'en', label: 'English', Flag: GB }
  ];
  
  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[1];

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => ({
        id: item.section,
        element: document.getElementById(item.section),
      }));

      const viewportMiddle = window.scrollY + window.innerHeight / 2;
      const windowBottom = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (windowBottom >= documentHeight - 50) {
        setActiveSection(sections[sections.length - 1].id);
        return;
      }

      let closestSection = sections[0];
      let closestDistance = Infinity;

      sections.forEach((section) => {
        if (section.element) {
          const sectionTop = section.element.offsetTop;
          const sectionHeight = section.element.offsetHeight;
          const sectionCenter = sectionTop + sectionHeight / 2;
          const distance = Math.abs(viewportMiddle - sectionCenter);

          if (
            viewportMiddle >= sectionTop + sectionHeight * 0.4 &&
            viewportMiddle <= sectionTop + sectionHeight
          ) {
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = section;
            }
          } else if (viewportMiddle >= sectionTop) {
            if (distance < closestDistance) {
              closestDistance = distance;
              closestSection = section;
            }
          }
        }
      });

      setActiveSection(closestSection.id);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (section) => {
    const element = document.getElementById(section);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="w-full flex items-center justify-center px-4">
      {/* Desktop Navigation */}
      <div className="hidden md:inline-flex items-stretch bg-white/10 backdrop-blur-md rounded-full overflow-hidden shadow-xl border border-white/20">
        {menuItems.map((item, index) => (
          <div key={item.key} className="flex items-stretch">
            {index > 0 && <div className="w-px bg-white/30" />}
            <button
              onClick={() => scrollToSection(item.section)}
              className={`flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 transition-all duration-300 ${
                activeSection === item.section ? "bg-white/30" : "hover:bg-white/20"
              }`}
            >
              <span className="text-sm lg:text-base font-semibold text-main">
                {t(`nav.${item.key}`)}
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Language Switcher - Desktop Separated (di pojok kanan) */}
      <div className="hidden md:block absolute right-4">
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full shadow-xl border border-white/20 hover:bg-white/20 transition-colors duration-200"
          >
            {currentLang && <currentLang.Flag className="w-6 h-6 rounded" />}
          </button>
          
          {showLangMenu && (
            <div className="absolute top-full mt-2 right-0 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50">
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
                  <span className="text-sm font-semibold text-main whitespace-nowrap">
                    {lang.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden w-full flex items-center justify-between gap-4">
        {/* Language Switcher - Mobile (di kiri) */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full shadow-xl border border-white/20 hover:bg-white/20 transition-colors duration-200"
          >
            {currentLang && <currentLang.Flag className="w-6 h-6 rounded" />}
          </button>
          
          {showLangMenu && (
            <div className="absolute top-full mt-2 left-0 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden z-50">
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
                  <span className="text-sm font-semibold text-main whitespace-nowrap">
                    {lang.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hamburger Menu Button (di kanan) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md rounded-full shadow-xl border border-white/20 hover:bg-white/20 transition-colors duration-200"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-main" />
          ) : (
            <Menu className="w-6 h-6 text-main" />
          )}
        </button>

        {isOpen && (
          <div className="absolute top-20 right-4 bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200 z-50">
            {menuItems.map((item, index) => (
              <div key={item.key}>
                {index > 0 && <div className="h-px bg-white/30 mx-4" />}
                <button
                  onClick={() => scrollToSection(item.section)}
                  className={`w-full text-left px-6 py-3.5 transition-all duration-300 ${
                    activeSection === item.section ? "bg-white/30" : "hover:bg-white/20"
                  }`}
                >
                  <span className="text-base font-semibold text-main">
                    {t(`nav.${item.key}`)}
                  </span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
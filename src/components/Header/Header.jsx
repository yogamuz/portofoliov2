// components/Header/Header.jsx
import { useState, useEffect } from "react";
import Navbar from "./Navbar";

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full px-8 md:px-16 lg:px-24 py-8 md:py-10 lg:py-12 fixed translate-y-[-17px] left-0 z-50 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-black/30" : ""
      }`}
    >
      <Navbar />
    </header>
  );
}

export default Header;
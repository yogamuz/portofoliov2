import React from "react";
import { useTranslation } from "react-i18next";
import { FaLinkedin, FaGithub, FaTiktok, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/yogamuz",
      hoverColor: "hover:text-white",
      defaultColor: "text-gray-400",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/your-profile",
      hoverColor: "hover:text-[#0077B5]",
      defaultColor: "text-[#0077B5]",
      label: "LinkedIn",
    },
    {
      icon: FaTiktok,
      href: "https://tiktok.com/@your-username",
      hoverColor: "hover:text-[#EE1D52]",
      defaultColor: "text-[#EE1D52]",
      label: "TikTok",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com/your-username",
      hoverColor: "hover:text-[#E4405F]",
      defaultColor: "text-[#E4405F]",
      label: "Instagram",
    },
  ];

  return (
    <footer className="relative w-full overflow-hidden bg-transparent">
      {/* Fixed Left Social Media Bar - Desktop Only */}
      <div className="fixed left-8 bottom-0 z-50 hidden lg:flex flex-col items-center gap-5">
        {/* Social Icons */}
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-400 ${social.hoverColor} hover:-translate-y-1 transition-all duration-300 hover:scale-110`}
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5" />
          </a>
        ))}

        {/* Vertical Line with Gradient */}
        <div className="w-[1.5px] h-28 bg-gradient-to-b from-gray-400 to-transparent"></div>
      </div>
      {/* Fixed Right Email Bar - Desktop Only */}
      <div className="fixed right-8 bottom-0 z-50 hidden lg:flex flex-col items-center gap-5">
        {/* Email Link */}

        <a
          href="mailto:yogamuz13@gmail.com"
          className="text-gray-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300 writing-mode-vertical"
          style={{ writingMode: "vertical-rl" }}
          aria-label="Email"
        >
          <span className="text-sm tracking-widest font-light">
            yogamuz13@gmail.com
          </span>
        </a>

        {/* Vertical Line with Gradient */}
        <div className="w-[1.5px] h-28 bg-gradient-to-b from-gray-400 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-16 md:pt-20 pb-8">
        {/* Mobile Social Icons - Horizontal */}
        <div className="flex lg:hidden items-center justify-center gap-6 mb-10">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-gray-400 ${social.hoverColor} hover:-translate-y-1 transition-all duration-300 hover:scale-110`}
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        {/* Text Container with Enhanced Borders */}
        <div className="flex items-center justify-center gap-6 md:gap-10 ">
          {/* Left Border (Horizontal with Gradient) */}
          <div className="w-20 md:w-32 h-[1.5px] bg-gradient-to-r from-transparent via-gray-400 to-gray-400"></div>

          {/* Text */}
          <p className="text-gray-300 text-sm md:text-base whitespace-nowrap font-light tracking-wide">
            Designed & Built by{" "}
            <span className="text-cyan-400 font-normal">Prayogo</span>
          </p>

          {/* Right Border (Horizontal with Gradient) */}
          <div className="w-20 md:w-32 h-[1.5px] bg-gradient-to-l from-transparent via-gray-400 to-gray-400"></div>
        </div>
      </div>
    </footer>
  );
}

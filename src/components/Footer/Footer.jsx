import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative w-full overflow-hidden bg-gradient-to-b from-black via-purple-950/10 to-black">
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-12 md:py-16">
        {/* Social Icons Container */}
        <div className="flex items-center justify-center gap-6 md:gap-8 mb-8">
          {/* Left Border (Horizontal) */}
          <div className="w-16 md:w-24 h-px bg-gray-600"></div>
          
          {/* Icons Group */}
          <div className="flex items-center gap-6 md:gap-8">
            {/* LinkedIn */}
            
            <a  href="https://linkedin.com/in/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
            >
              <FaLinkedin className="w-7 h-7 md:w-8 md:h-8" />
            </a>

            {/* Email */}
            
            <a  href="mailto:yogamuz13@gmail.com"
              className="text-gray-400 hover:text-red-500 transition-colors duration-300"
            >
              <MdEmail className="w-7 h-7 md:w-8 md:h-8" />
            </a>

            {/* GitHub */}
            
            <a  href="https://github.com/yogamuz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#24292E] transition-colors duration-300"
            >
              <FaGithub className="w-7 h-7 md:w-8 md:h-8" />
            </a>
          </div>

          {/* Right Border (Horizontal) */}
          <div className="w-16 md:w-24 h-px bg-gray-600"></div>
        </div>

        {/* Made with React Text */}
        <div className="text-center">
          <p className="text-gray-500 text-sm md:text-base">
            {t('footer.madeWith')} <span className="text-cyan-400">React</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
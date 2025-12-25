import React from 'react';
import HolographicSocial from '../HolographicSosial';
export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-transparent">
      {/* Fixed Left Social Media Bar - Desktop Only */}
      <div className="fixed left-8 bottom-0 z-50 hidden lg:flex flex-col items-center gap-6">
        {/* Holographic Social Icons */}
        <HolographicSocial
          orientation="vertical"
          socialLinks={[
            {
              type: 'github',
              href: 'https://github.com/yogamuz',
              label: 'GitHub',
            },
            {
              type: 'linkedin',
              href: 'https://linkedin.com/in/prayogo-',
              label: 'LinkedIn',
            },
          ]}
        />

        {/* Vertical Line with Gradient */}
        <div className="w-[1.5px] h-28 bg-gradient-to-b from-[#7DD3FC] to-transparent"></div>
      </div>
      {/* Fixed Right Email Bar - Desktop Only */}
      <div className="fixed right-8 bottom-0 z-50 hidden lg:flex flex-col items-center gap-5">
        {/* Email Link */}

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=prayogo.dev@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            if (isMobile) {
              e.preventDefault();
              const gmailAppLink = `googlegmail://co?to=prayogo.dev@gmail.com`;
              const gmailWebLink = `https://mail.google.com/mail/?view=cm&to=prayogo.dev@gmail.com`;
              window.location.href = gmailAppLink;
              setTimeout(() => {
                window.open(gmailWebLink, '_blank');
              }, 1000);
            }
          }}
          className="text-gray-400 hover:text-[#8a7fff] hover:-translate-y-1 transition-all duration-300 writing-mode-vertical"
          style={{ writingMode: 'vertical-rl' }}
          aria-label="Email"
        >
          <span className="text-sm tracking-widest font-light">prayogo.dev@gmail.com</span>
        </a>

        {/* Vertical Line with Gradient */}
        <div className="w-[1.5px] h-28 bg-gradient-to-b from-[#7DD3FC] to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-16 md:pt-20 pb-8">
        {/* Mobile Social Icons - Horizontal */}
        <div className="flex lg:hidden items-center justify-center mb-10">
          <HolographicSocial
            orientation="horizontal"
            socialLinks={[
              {
                type: 'github',
                href: 'https://github.com/yogamuz',
                label: 'GitHub',
              },
              {
                type: 'linkedin',
                href: 'https://linkedin.com/in/prayogo-',
                label: 'LinkedIn',
              },
            ]}
          />
        </div>

        {/* Text Container with Enhanced Borders */}
        <div className="flex items-center justify-center gap-6 md:gap-10 ">
          {/* Left Border (Horizontal with Gradient) */}
          <div className="w-20 md:w-32 h-[1.5px] bg-gradient-to-r from-transparent via-[#7DD3FC] to-[#7DD3FC]"></div>

          {/* Text */}
          <p className="text-gray-300 text-sm md:text-base whitespace-nowrap font-light tracking-wide">
            Made with
            <span className="text-cyan-400 font-normal"> React 💖 </span>
            by <span className="text-secondary font-normal">Prayogo</span>
          </p>

          {/* Right Border (Horizontal with Gradient) */}
          <div className="w-20 md:w-32 h-[1.5px] bg-gradient-to-l from-transparent via-[#7DD3FC] to-[#7DD3FC]"></div>
        </div>
      </div>
    </footer>
  );
}

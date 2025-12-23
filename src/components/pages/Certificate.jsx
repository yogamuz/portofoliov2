import { ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

// CSS untuk GradientButton dan animasi
const buttonStyles = `
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
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = buttonStyles;
  document.head.appendChild(styleSheet);
}

// Gradient Button Component (dari Uiverse - ilkhoeri version)
function GradientButton({ onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative inline-flex items-center justify-center overflow-hidden transition-all duration-250 rounded-xl border-none outline-none px-5 py-0.5 cursor-pointer active:scale-95"
      style={{
        background:
          'radial-gradient(65.28% 65.28% at 50% 100%, rgba(223, 113, 255, 0.8) 0%, rgba(223, 113, 255, 0) 100%), linear-gradient(0deg, #7a5af8, #7a5af8)',
      }}
    >
      {/* Before pseudo element */}
      <span
        className="absolute inset-[1px] rounded-[11px] z-0 transition-all duration-500"
        style={{
          background:
            'linear-gradient(177.95deg, rgba(255, 255, 255, 0.19) 0%, rgba(255, 255, 255, 0) 100%)',
        }}
      />

      {/* After pseudo element */}
      <span
        className="absolute inset-[2px] rounded-[10px] z-0 transition-all duration-500"
        style={{
          background:
            'radial-gradient(65.28% 65.28% at 50% 100%, rgba(223, 113, 255, 0.8) 0%, rgba(223, 113, 255, 0) 100%), linear-gradient(0deg, #7a5af8, #7a5af8)',
        }}
      />

      {/* Fold corner */}
      <span
        className="z-[1] absolute top-0 right-0 h-4 w-4 inline-block transition-all duration-500 rounded-br-none rounded-tl-xl group-hover:-mt-4 group-hover:-mr-4"
        style={{
          background:
            'radial-gradient(100% 75% at 55%, rgba(223, 113, 255, 0.8) 0%, rgba(223, 113, 255, 0) 100%)',
          boxShadow: '0 0 3px black',
          borderBottomLeftRadius: '0.5rem',
        }}
      >
        <span
          className="absolute top-0 right-0 w-[150%] h-[150%] bg-[#e8e8e8] pointer-events-none"
          style={{ transform: 'rotate(45deg) translateX(0%) translateY(-18px)' }}
        />
      </span>

      {/* Floating points */}
      <div className="overflow-hidden w-full h-full pointer-events-none absolute z-[1]">
        {[...Array(10)].map((_, i) => (
          <i
            key={i}
            className="absolute bottom-[-10px] w-[2px] h-[2px] bg-white rounded-full pointer-events-none"
            style={{
              left: `${[10, 30, 25, 44, 50, 75, 88, 58, 98, 65][i]}%`,
              opacity: [1, 0.7, 0.8, 0.6, 1, 0.5, 0.9, 0.8, 0.6, 1][i],
              animation: `floating-points ${
                [2.35, 2.5, 2.2, 2.05, 1.9, 1.5, 2.2, 2.25, 2.6, 2.5][i]
              }s ease-in-out infinite`,
              animationDelay: `${[0.2, 0.5, 0.1, 0, 0, 1.5, 0.2, 0.2, 0.1, 0.2][i]}s`,
            }}
          />
        ))}
      </div>

      {/* Inner content */}
      <span className="z-[2] relative w-full text-white inline-flex items-center justify-center gap-2 text-base font-medium leading-6 transition-colors duration-200">
        {children}
      </span>
    </button>
  );
}
// Tooltip Component
function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        {children}
      </div>
      {isVisible && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
          {text}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-1 border-4 border-transparent border-b-gray-900"></div>
        </div>
      )}
    </div>
  );
}

function CertificateCard({ caption, certificateUrl, certificateImage, shadowColor }) {
  return (
    <div className="group relative flex flex-col items-center">
      {/* Landscape Image with Outline */}
      <a
        href={certificateUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-gray-700/50 hover:border-gray-600 transition-all duration-300"
        style={{
          transform: 'translateY(0)',
          boxShadow: `0 4px 6px rgba(0, 0, 0, 0.1)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translate(10px, -10px) scale(1.02)';
          e.currentTarget.style.boxShadow = `
        -15px 15px 30px ${shadowColor}60,
        -8px 8px 15px ${shadowColor}40
         `;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translate(0, 0) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }}
      >
        <img
          src={certificateImage}
          alt={`${caption} certificate`}
          className="w-full h-full object-contain bg-gray-900"
        />

        {/* Hover Overlay with Icon */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Tooltip text="View Certificate">
            <ExternalLink className="w-8 h-8 text-white" />
          </Tooltip>
        </div>
      </a>

      {/* Caption */}
      <div className="mt-3 text-center w-full px-2">
        <p className="text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider">
          {caption}
        </p>
      </div>
    </div>
  );
}

// Main Certificate Section
export default function Certificate() {
  const [activeCategory, setActiveCategory] = useState('Programming');
  const [visibleCount, setVisibleCount] = useState(3);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const certificateSectionRef = useRef(null);

  useEffect(() => {
    setVisibleCount(3);
  }, [activeCategory]);
  const certificates = {
    Programming: [
      {
        caption: 'KELASFULLSTACK',
        certificateUrl:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766498035/certificate1_vknlpt.webp',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766498035/certificate1_vknlpt.webp',
        shadowColor: '#10b981', // Green color untuk certificate ini
      },
      {
        caption: 'KELASFULLSTACK',
        certificateUrl: 'https://codepolitan.com/c/HSRTACE',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766498035/certificate1_vknlpt.webp',
        shadowColor: '#10b981', // Green color untuk certificate ini
      },
      {
        caption: 'KELASFULLSTACK',
        certificateUrl: 'https://codepolitan.com/c/HSRTACE',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766498035/certificate1_vknlpt.webp',
        shadowColor: '#10b981', // Green color untuk certificate ini
      },
      {
        caption: 'KELASFULLSTACK',
        certificateUrl: 'https://codepolitan.com/c/HSRTACE',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766498035/certificate1_vknlpt.webp',
        shadowColor: '#10b981', // Green color untuk certificate ini
      },
      {
        caption: 'KELASFULLSTACK',
        certificateUrl: 'https://codepolitan.com/c/HSRTACE',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766498035/certificate1_vknlpt.webp',
        shadowColor: '#10b981', // Green color untuk certificate ini
      },
      {
        caption: 'KELASFULLSTACK',
        certificateUrl: 'https://codepolitan.com/c/HSRTACE',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766498035/certificate1_vknlpt.webp',
        shadowColor: '#10b981', // Green color untuk certificate ini
      },
      {
        caption: 'KELASFULLSTACK',
        certificateUrl: 'https://codepolitan.com/c/HSRTACE',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766498035/certificate1_vknlpt.webp',
        shadowColor: '#10b981', // Green color untuk certificate ini
      },
      {
        caption: 'KELASFULLSTACK',
        certificateUrl: 'https://codepolitan.com/c/HSRTACE',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766498035/certificate1_vknlpt.webp',
        shadowColor: '#10b981', // Green color untuk certificate ini
      },
    ],
    TOEFL: [],
  };

  return (
    <div
      ref={certificateSectionRef}
      className="w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-main mb-4 text-center">
            Certificates
          </h2>
          <p className="text-gray-400 text-center max-w-2xl mx-auto text-sm sm:text-base mb-6">
            Course Completion Certificates (Programming & Web Development)
          </p>

          {/* Category Tabs */}
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveCategory('Programming')}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeCategory === 'Programming'
                  ? 'bg-[#8a7fff] text-white shadow-lg shadow-[#8a7fff]/30'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
              }`}
            >
              Programming
            </button>
            <button
              onClick={() => setActiveCategory('TOEFL')}
              className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeCategory === 'TOEFL'
                  ? 'bg-[#8a7fff] text-white shadow-lg shadow-[#8a7fff]/30'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-gray-300'
              }`}
            >
              TOEFL
            </button>
          </div>
        </div>

        {/* Certificates Content */}
        {certificates[activeCategory].length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {certificates[activeCategory].slice(0, visibleCount).map((certificate, index) => (
                <div
                  key={index}
                  style={{
                    animation: isCollapsing
                      ? `slideUp 0.3s ease-out forwards`
                      : `slideDown 0.5s ease-out forwards`,
                    animationDelay: isCollapsing
                      ? `${
                          (certificates[activeCategory].slice(0, visibleCount).length - 1 - index) *
                          0.05
                        }s`
                      : `${(index % 3) * 0.1}s`,
                    opacity: isCollapsing ? 1 : 0,
                  }}
                >
                  <CertificateCard
                    caption={certificate.caption}
                    certificateUrl={certificate.certificateUrl}
                    certificateImage={certificate.certificateImage}
                    shadowColor={certificate.shadowColor}
                  />
                </div>
              ))}
            </div>

            {/* Load More / Show Less Button */}
            {certificates[activeCategory].length > 3 && (
              <div className="flex justify-center mt-8">
                {visibleCount < certificates[activeCategory].length ? (
                  <GradientButton onClick={() => setVisibleCount((prev) => prev + 3)}>
                    Load More
                  </GradientButton>
                ) : (
                  <GradientButton
                    onClick={() => {
                      setIsCollapsing(true);

                      // Hitung durasi animasi total
                      const itemsToHide = visibleCount - 3;
                      const animationDuration = (itemsToHide * 0.05 + 0.3) * 1000;

                      // Tunggu animasi selesai baru update visibleCount
                      setTimeout(() => {
                        setVisibleCount(3);
                        setIsCollapsing(false);

                        // Smooth scroll ke atas section certificate
                        if (certificateSectionRef.current) {
                          const offsetTop = certificateSectionRef.current.offsetTop - 100;
                          window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth',
                          });
                        }
                      }, animationDuration);
                    }}
                  >
                    Show Less
                  </GradientButton>
                )}
              </div>
            )}
          </div>
        ) : (
          // Coming Soon for TOEFL
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8a7fff] mb-2">
                Coming Soon
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                TOEFL certificates will be available soon
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

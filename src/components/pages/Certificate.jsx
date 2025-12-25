// components/Certificate/index.jsx
import { useState, useEffect, useRef } from 'react';
import CertificateCard from '../Certificate/CertificateCard';
import '../Certificate/Styles';

export default function Certificate() {
  const [activeCategory, setActiveCategory] = useState('Programming');
  const [visibleCount, setVisibleCount] = useState(4);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const certificateSectionRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');

  useEffect(() => {
    setVisibleCount(4);
    // Reset transition setelah animasi enter selesai
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, );

      return () => clearTimeout(timer);
    }
  }, [activeCategory]);

  const handleCategoryChange = (category) => {
    if (category === activeCategory || isTransitioning) return;

    // Tentukan arah slide berdasarkan perpindahan
    const categories = ['Programming', 'TOEFL'];
    const currentIndex = categories.indexOf(activeCategory);
    const nextIndex = categories.indexOf(category);

    setSlideDirection(nextIndex > currentIndex ? 'right' : 'left');
    setIsTransitioning(true);

    // Delay untuk animasi exit selesai dulu
    setTimeout(() => {
      setActiveCategory(category);
    }, );
  };
  const certificates = {
    Programming: [
      {
        caption: 'HTML',
        certificateUrl: 'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766565626/HTML_xzumar.png',
        certificateImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766565626/HTML_xzumar.png',
        shadowColor: '#E34F26',
      },
      {
        caption: 'CSS',
        certificateUrl: 'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564791/CSS_innhzm.png',
        certificateImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564791/CSS_innhzm.png',
        shadowColor: '#1572B6',
      },
      {
        caption: 'GIT',
        certificateUrl: 'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564324/git1_ukkcnq.png',
        certificateImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564324/git1_ukkcnq.png',
        shadowColor: '#F05032',
      },
      {
        caption: 'GIT II',
        certificateUrl: 'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564324/git2_tjuyfv.png',
        certificateImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564324/git2_tjuyfv.png',
        shadowColor: '#F05032',
      },
      {
        caption: 'TERMINAL ',
        certificateUrl: 'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564324/git2_tjuyfv.png',
        certificateImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564324/git2_tjuyfv.png',
        shadowColor: '#0F2544',
      },
      {
        caption: 'BASIC JS',
        certificateUrl: 'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564839/BASIC_JS_etzf6h.png',
        certificateImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564839/BASIC_JS_etzf6h.png',
        shadowColor: '#F7DF1E',
      },
      {
        caption: 'JS OOP',
        certificateUrl: 'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564889/OOP_JS_ktlgeo.png',
        certificateImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564889/OOP_JS_ktlgeo.png',
        shadowColor: '#F7DF1E',
      },

      {
        caption: 'JS AJAX & WEB API',
        certificateUrl: 'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564987/JS_AJAX_WEBAPI_bsxbzp.png',
        certificateImage: 'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564987/JS_AJAX_WEBAPI_bsxbzp.png',
        shadowColor: '#F7DF1E',
      },
    ],
    TOEFL: [],
  };

  return (
    <>
      <style>{`
  @keyframes slideInFromRight {
    0% {
      opacity: 0;
      transform: translateX(50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInFromLeft {
    0% {
      opacity: 0;
      transform: translateX(-50px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutToLeft {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(-50px);
    }
  }
  
  @keyframes slideOutToRight {
    0% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(50px);
    }
  }
  
  @keyframes slideUp {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-20px);
    }
  }
  
  @keyframes slideDown {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .button-indicator {
    position: absolute;
    top: 2px;
    bottom: 2px;
    border-radius: 9999px;
    background: rgba(107, 124, 255, 0.25);
    box-shadow: 0 0 30px rgba(125, 211, 252, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 0;
  }
`}</style>

      <div ref={certificateSectionRef} className="w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-main mb-4 text-center">Courses & Certifications</h2>
            <p className="text-secondary text-center max-w-2xl mx-auto text-sm sm:text-base mb-6">
              Certificates from online learning platforms
            </p>
            <div className="flex justify-center items-center">
              {/* Button Group dengan sliding indicator */}
              <div
                className="inline-flex rounded-full overflow-visible relative"
                style={{
                  background: 'rgba(15, 31, 58, 0.25)',
                  border: '1px solid rgba(107, 124, 255, 0.15)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  padding: '2px',
                }}
              >
                {/* Sliding Indicator Background */}
                <div
                  className="button-indicator"
                  style={{
                    left: '2px',
                    width: 'calc(50% - 2px)',
                    transform: activeCategory === 'TOEFL' ? 'translateX(calc(100% + 2px))' : 'translateX(0)',
                  }}
                />

                {/* Button Programming */}
                <button
                  onClick={() => handleCategoryChange('Programming')}
                  disabled={isTransitioning}
                  className="relative px-3 rounded-full font-medium text-sm transition-all duration-500 overflow-hidden whitespace-nowrap z-10"
                  style={{
                    background: 'transparent',
                    color: activeCategory === 'Programming' ? '#7DD3FC' : '#8A94B8',
                    cursor: isTransitioning ? 'default' : 'pointer',
                    opacity: isTransitioning ? 0.7 : 1,
                  }}
                >
                  <span className="relative z-10">Programming</span>
                </button>

                {/* Button TOEFL */}
                <button
                  onClick={() => handleCategoryChange('TOEFL')}
                  disabled={isTransitioning}
                  className="relative px-7 py-2.5 rounded-full font-medium text-sm transition-all duration-500 overflow-hidden whitespace-nowrap z-10"
                  style={{
                    background: 'transparent',
                    color: activeCategory === 'TOEFL' ? '#7DD3FC' : '#8A94B8',
                    cursor: isTransitioning ? 'default' : 'pointer',
                    opacity: isTransitioning ? 0.7 : 1,
                  }}
                >
                  <span className="relative z-10">TOEFL</span>
                </button>
              </div>
            </div>
          </div>

          {certificates[activeCategory].length > 0 ? (
            <div
              key={activeCategory}
              style={{
                animation: isTransitioning
                  ? `slideOut${slideDirection === 'right' ? 'ToLeft' : 'ToRight'} 0.3s ease-out forwards`
                  : `slideInFrom${slideDirection === 'right' ? 'Right' : 'Left'} 0.5s ease-out forwards`,
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {certificates[activeCategory].slice(0, visibleCount).map((certificate, index) => (
                  <div
                    key={index}
                    style={{
                      animation: isCollapsing ? `slideUp 0.3s ease-out forwards` : `slideDown 0.5s ease-out forwards`,
                      animationDelay: isCollapsing
                        ? `${(certificates[activeCategory].slice(0, visibleCount).length - 1 - index) * 0.05}s`
                        : `${(index % 4) * 0.1}s`,
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

              {certificates[activeCategory].length > 4 && (
                <div className="flex justify-center mt-8">
                  {visibleCount < certificates[activeCategory].length ? (
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 4)}
                      className="
                      relative
                      px-7 py-2.5
                      rounded-full
                      font-medium text-sm
                      transition-all duration-500
                      overflow-hidden
                      whitespace-nowrap
                      cursor-pointer
                    "
                      style={{
                        background: 'rgba(15, 31, 58, 0.35)',
                        border: '1px solid rgba(107, 124, 255, 0.25)',
                        color: '#7DD3FC',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        boxShadow: `
                      0 0 30px rgba(125, 211, 252, 0.35),
                      inset 0 1px 0 rgba(255, 255, 255, 0.12)
                    `,
                      }}
                    >
                      <span className="relative z-10">Load More</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsCollapsing(true);
                        const itemsToHide = visibleCount - 3;
                        const animationDuration = (itemsToHide * 0.05 + 0.3) * 1000;

                        setTimeout(() => {
                          setVisibleCount(4);
                          setIsCollapsing(false);
                          if (certificateSectionRef.current) {
                            const offsetTop = certificateSectionRef.current.offsetTop - 100;
                            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                          }
                        }, animationDuration);
                      }}
                      className="
                      relative
                      px-7 py-2.5
                      rounded-full
                      font-medium text-sm
                      transition-all duration-500
                      overflow-hidden
                      whitespace-nowrap
                      cursor-pointer
                    "
                      style={{
                        background: 'rgba(15, 31, 58, 0.35)',
                        border: '1px solid rgba(107, 124, 255, 0.25)',
                        color: '#7DD3FC',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        boxShadow: `
                      0 0 30px rgba(125, 211, 252, 0.35),
                      inset 0 1px 0 rgba(255, 255, 255, 0.12)
                    `,
                      }}
                    >
                      <span className="relative z-10">Show Less</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[300px]">
              <div className="text-center">
                <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2">Coming Soon</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

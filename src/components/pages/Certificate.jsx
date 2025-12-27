// components/Certificate/index.jsx
import { useState, useEffect, useRef } from 'react';
import { FaHtml5, FaCss3Alt, FaGitAlt, FaJs, FaVuejs, FaReact, FaNodeJs, FaLaravel, FaServer } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';
import CertificateCard from '../Certificate/CertificateCard';
import certificates from '@/components/certificates.json';
import '../Certificate/Styles';

export default function Certificate() {
  const [activeCategory, setActiveCategory] = useState('Programming');
  const [visibleCount, setVisibleCount] = useState(4);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const certificateSectionRef = useRef(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('left');
  const [activeSubCategory, setActiveSubCategory] = useState('HTML/CSS');

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    setVisibleCount(4);
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
      return () => clearTimeout(timer);
    }

    // Set initial load selesai setelah mount
    if (isInitialLoad) {
      setTimeout(() => setIsInitialLoad(false), 100);
    }
  }, [activeCategory, isTransitioning]);

  const handleCategoryChange = (category) => {
    if (category === activeCategory || isTransitioning) return;

    const categories = ['Programming', 'TOEFL'];
    const currentIndex = categories.indexOf(activeCategory);
    const nextIndex = categories.indexOf(category);

    setSlideDirection(nextIndex > currentIndex ? 'right' : 'left');
    setIsTransitioning(true);
    setActiveSubCategory('HTML/CSS');

    setTimeout(() => {
      setActiveCategory(category);
    }, 300);
  };
  const handleSubCategoryChange = (subCategory) => {
    if (subCategory === activeSubCategory) return;
    setActiveSubCategory(subCategory);
    setVisibleCount(4); // Reset visible count saat ganti filter
  };

  const categoryColors = {
    'HTML/CSS': '#E34F26',
    Git: '#F05032',
    JavaScript: '#F7DF1E',
    'Vue JS': '#42B883',
    'React JS': '#61DAFB',
    'Node JS': '#339933',
    'Express JS': '#000000',
    MongoDB: '#47A248',
    Laravel: '#FF2D20',
  };

  const categoryIcons = {
    'HTML/CSS': FaHtml5,
    Git: FaGitAlt,
    JavaScript: FaJs,
    'Vue JS': FaVuejs,
    'React JS': FaReact,
    'Node JS': FaNodeJs,
    MongoDB: SiMongodb,
    Laravel: FaLaravel,
  };

  const getSubCategories = () => {
    if (activeCategory !== 'Programming') return [];
    const categories = [...new Set(certificates.certificates.Programming.map((cert) => cert.category))];
    return categories;
  };

  const getFilteredCertificates = () => {
    let filtered;
    if (activeCategory !== 'Programming') {
      filtered = certificates.certificates[activeCategory];
    } else {
      filtered = certificates.certificates.Programming.filter((cert) => cert.category === activeSubCategory);
    }
    return filtered.filter((cert) => cert.certificateImage && cert.certificateUrl);
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
      
      @keyframes fadeUp {
        0% {
          opacity: 0;
          transform: translateY(30px);
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

            {/* Button Group Programming/TOEFL */}
            <div className="flex justify-center items-center">
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
            {/* Chip Filter - Sub Categories */}
{activeCategory === 'Programming' && (
  <div className="flex justify-center items-center gap-3 mt-4 flex-wrap px-4">
    {getSubCategories().map((subCat) => {
      const isActive = activeSubCategory === subCat;
      const chipColor = categoryColors[subCat] || '#7DD3FC';
      const IconComponent = categoryIcons[subCat];

      return (
        <div key={subCat} className="relative group">
          <button
            onClick={() => handleSubCategoryChange(subCat)}
            className="rounded-full transition-all duration-300 flex items-center justify-center"
            style={{
              width: '40px',
              height: '40px',
              background: isActive ? 'rgba(107, 124, 255, 0.2)' : 'rgba(15, 31, 58, 0.2)',
              border: isActive ? `2px solid ${chipColor}` : '2px solid rgba(107, 124, 255, 0.1)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              boxShadow: isActive ? `0 0 20px ${chipColor}50` : 'none',
            }}
          >
            {IconComponent && (
              <IconComponent
                style={{
                  color: isActive ? chipColor : '#8A94B8',
                  fontSize: '1.5rem',
                }}
              />
            )}
          </button>
          
          {/* Tooltip - Sama seperti Project.jsx */}
          <div
            className="
              absolute top-full left-1/2 -translate-x-1/2 mt-2
              px-2 py-1
              bg-secondary/15
              text-secondary
              text-xs
              rounded-lg
              whitespace-nowrap
              z-10
              backdrop-blur-sm
              border border-secondary/30
              shadow-[0_0_20px_rgba(125,211,252,0.35)]
              opacity-0 group-hover:opacity-100
              transition-opacity duration-200
              pointer-events-none
            "
          >
            {subCat}
            {/* Arrow */}
            <div
              className="
                absolute bottom-full left-1/2 -translate-x-1/2 -mb-1
                border-4 border-transparent
                border-b-secondary/30
              "
            />
          </div>
        </div>
      );
    })}
  </div>
)}
          </div>

          {getFilteredCertificates().length > 0 ? (
            <div
              key={`${activeCategory}-${activeSubCategory}`}
              style={{
                animation: isTransitioning
                  ? `slideOut${slideDirection === 'right' ? 'ToLeft' : 'ToRight'} 0.3s ease-out forwards`
                  : isInitialLoad
                  ? 'none' // 
                  : `slideInFrom${slideDirection === 'right' ? 'Right' : 'Left'} 0.5s ease-out forwards`,
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {getFilteredCertificates()
                  .slice(0, visibleCount)
                  .map((certificate, index) => {
                    const IconComponent = categoryIcons[certificate.category];

                    return (
                      <div
                        key={index}
                        style={{
                          animation: isCollapsing ? `slideUp 0.3s ease-out forwards` : `slideDown 0.5s ease-out forwards`,
                          animationDelay: isCollapsing
                            ? `${(getFilteredCertificates().slice(0, visibleCount).length - 1 - index) * 0.05}s`
                            : `${(index % 4) * 0.1}s`,
                          opacity: isCollapsing ? 1 : 0,
                        }}
                      >
                        <CertificateCard
                          caption={certificate.caption}
                          certificateUrl={certificate.certificateUrl}
                          certificateImage={certificate.certificateImage}
                          shadowColor={certificate.shadowColor}
                          Icon={IconComponent}
                        />
                      </div>
                    );
                  })}
              </div>

              {getFilteredCertificates().length > 4 && (
                <div className="flex justify-center mt-8">
                  {visibleCount < getFilteredCertificates().length ? (
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 4)}
                      className="relative px-7 py-2.5 rounded-full font-medium text-sm transition-all duration-500 overflow-hidden whitespace-nowrap cursor-pointer"
                      style={{
                        background: 'rgba(15, 31, 58, 0.35)',
                        border: '1px solid rgba(107, 124, 255, 0.25)',
                        color: '#7DD3FC',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        boxShadow: '0 0 30px rgba(125, 211, 252, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
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
                      className="relative px-7 py-2.5 rounded-full font-medium text-sm transition-all duration-500 overflow-hidden whitespace-nowrap cursor-pointer"
                      style={{
                        background: 'rgba(15, 31, 58, 0.35)',
                        border: '1px solid rgba(107, 124, 255, 0.25)',
                        color: '#7DD3FC',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        boxShadow: '0 0 30px rgba(125, 211, 252, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                      }}
                    >
                      <span className="relative z-10">Show Less</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div
              className="flex items-center justify-center min-h-[300px]"
              style={{
                animation: 'fadeUp 0.6s ease-out forwards',
              }}
            >
              <div className="text-center">
                <p
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2"
                  style={{
                    color: activeSubCategory === 'Laravel' ? '#FF2D20' : '#38BDF8',
                  }}
                >
                  Coming Soon
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

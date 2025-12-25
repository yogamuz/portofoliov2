// components/Certificate/index.jsx
import { useState, useEffect, useRef } from 'react';
import CertificateCard from '../Certificate/CertificateCard';
import HangingCableButton from '../Certificate/HangingCableButton';
import '../Certificate/Styles';

export default function Certificate() {
  const [activeCategory, setActiveCategory] = useState('Programming');
  const [visibleCount, setVisibleCount] = useState(4);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const certificateSectionRef = useRef(null);

  useEffect(() => {
    setVisibleCount(4);
  }, [activeCategory]);

  const certificates = {
    Programming: [
      {
        caption: 'HTML',
        certificateUrl:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766565626/HTML_xzumar.png',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766565626/HTML_xzumar.png',
        shadowColor: '#E34F26',
      },
      {
        caption: 'CSS',
        certificateUrl:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564791/CSS_innhzm.png',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564791/CSS_innhzm.png',
        shadowColor: '#1572B6',
      },
      {
        caption: 'GIT',
        certificateUrl:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564324/git1_ukkcnq.png',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564324/git1_ukkcnq.png',
        shadowColor: '#F05032',
      },
      {
        caption: 'GIT II',
        certificateUrl:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564324/git2_tjuyfv.png',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564324/git2_tjuyfv.png',
        shadowColor: '#F05032',
      },
      {
        caption: 'TERMINAL ',
        certificateUrl:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564324/git2_tjuyfv.png',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564324/git2_tjuyfv.png',
        shadowColor: '#0F2544',
      },
      {
        caption: 'BASIC JS',
        certificateUrl:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564839/BASIC_JS_etzf6h.png',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564839/BASIC_JS_etzf6h.png',
        shadowColor: '#F7DF1E',
      },
      {
        caption: 'JS OOP',
        certificateUrl:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564889/OOP_JS_ktlgeo.png',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564889/OOP_JS_ktlgeo.png',
        shadowColor: '#F7DF1E',
      },

      {
        caption: 'JS AJAX & WEB API',
        certificateUrl:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/v1766564987/JS_AJAX_WEBAPI_bsxbzp.png',
        certificateImage:
          'https://res.cloudinary.com/dzfqsajp3/image/upload/w_600,f_auto,q_auto/v1766564987/JS_AJAX_WEBAPI_bsxbzp.png',
        shadowColor: '#F7DF1E',
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
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-main mb-4 text-center">
            Courses & Certifications
          </h2>
          <p className="text-secondary text-center max-w-2xl mx-auto text-sm sm:text-base mb-6">
            Certificates from online learning platforms
          </p>

          <div className="flex justify-center gap-8 items-start" style={{ minHeight: '140px' }}>
            <HangingCableButton
              onClick={() => setActiveCategory('Programming')}
              isActive={activeCategory === 'Programming'}
            >
              Programming
            </HangingCableButton>
            <HangingCableButton
              onClick={() => setActiveCategory('TOEFL')}
              isActive={activeCategory === 'TOEFL'}
            >
              TOEFL
            </HangingCableButton>
          </div>
        </div>

        {certificates[activeCategory].length > 0 ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
                  <HangingCableButton onClick={() => setVisibleCount((prev) => prev + 4)}>
                    Load More
                  </HangingCableButton>
                ) : (
                  <HangingCableButton
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
                  >
                    Show Less
                  </HangingCableButton>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-[300px]">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-2">
                Coming Soon
              </p>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}

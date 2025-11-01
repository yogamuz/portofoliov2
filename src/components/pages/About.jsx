import { useState, useEffect, useRef } from "react";
import Skills from "../Skills";
import GitHubCalendar from 'react-github-calendar';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const sectionRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCalendarVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (calendarRef.current) {
      observer.observe(calendarRef.current);
    }

    return () => {
      if (calendarRef.current) {
        observer.unobserve(calendarRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full px-8 py-8 md:py-12 flex flex-col">
      {/* Header Section */}
      <div className="w-full pt-4 md:pt-6 mb-6 md:mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-main text-center">
          {t('about.title')}
        </h2>
      </div>

      {/* Content Section - Paragraf About */}
      <div className="max-w-5xl mx-auto w-full mb-16">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
          <div className="flex-shrink-0">
            <div className="w-1 h-full bg-white/30 rounded-full"></div>
          </div>
          <div
            className={`text-base sm:text-lg md:text-xl text-justify leading-relaxed text-main transition-opacity duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            {t('about.description')}
          </div>
        </div>
      </div>

      {/* GitHub Calendar Section */}
      <div
        ref={calendarRef}
        className={`max-w-5xl mx-auto w-full mb-16 transition-opacity duration-700 ${
          isCalendarVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-main text-left mb-2">
            {t('about.github.title')}
          </h3>
          <p className="text-gray-400 text-left text-sm md:text-base">
            {t('about.github.subtitle')}
          </p>
        </div>

        <GitHubCalendar
          username="yogamuz" 
          blockSize={12}
          blockMargin={4}
          fontSize={14}
          colorScheme="dark"
          theme={{
            dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
          }}
          style={{
            width: '100%',
          }}
        />
      </div>

      {/* Skills Component - Tanpa Header */}
      <Skills showHeader={false} />
    </div>
  );
}
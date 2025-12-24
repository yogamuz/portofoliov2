import { useState, useEffect, useRef } from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const calendarRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
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

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
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

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;

      const element = textRef.current;
      const rect = element.getBoundingClientRect();
      const elementHeight = rect.height;
      const windowHeight = window.innerHeight;

      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      if (elementBottom > windowHeight) {
        setScrollProgress(0);
      } else if (elementTop < 0) {
        setScrollProgress(1);
      } else {
        const visibleHeight = windowHeight - elementTop;
        const totalScrollDistance = elementHeight + windowHeight;
        const progress = Math.min(Math.max(visibleHeight / totalScrollDistance, 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const description =
    'I am a fifth-semester student in the Information Technology program at Universitas Bina Sarana Informatika. Currently, I am deepening my knowledge of web development on both the frontend and backend sides, with the goal of becoming a Full Stack Web Developer. Although I study both areas, I am more inclined toward backend development because I enjoy working with logic, data structures, and understanding how systems operate behind the scenes. I have a strong passion for learning and am committed to continuously improving my skills, especially in adapting to the fast-paced and ever-evolving world of technology.';
  const words = description.split(' ');

  return (
    <div ref={sectionRef} className="w-full px-8 py-8 md:py-12 flex flex-col">
      {/* Header Section */}
      <div className="w-full pt-4 md:pt-6 mb-6 md:mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-main text-center">About Me</h2>
      </div>

      {/* Content Section - Paragraf About */}
      <div className="max-w-5xl mx-auto w-full mb-16">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8">
          <div
            ref={textRef}
            className={`text-base sm:text-lg md:text-xl text-justify leading-relaxed transition-opacity duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {words.map((word, index) => {
              const wordProgress = index / words.length;
              const opacity = scrollProgress >= wordProgress ? 1 : 0.3;
              const color =
                scrollProgress >= wordProgress ? 'rgb(255, 255, 255)' : 'rgb(50, 50, 50)';

              return (
                <span
                  key={index}
                  style={{
                    color: color,
                    opacity: opacity,
                    transition: 'color 0.3s ease, opacity 0.3s ease',
                  }}
                >
                  {word}{' '}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* GitHub Calendar Section - CENTERED */}
      <div
        ref={calendarRef}
        className={`max-w-5xl mx-auto w-full mb-16 transition-opacity duration-700 ${
          isCalendarVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="mb-6">
          <h3 className="text-2xl md:text-3xl font-bold text-main text-center mb-2">
            GitHub Contributions
          </h3>
          <p className="text-gray-400 text-center text-sm md:text-base">
            My coding activity over the past year
          </p>
        </div>

        {/* Wrapper untuk center calendar */}
        <div className="flex justify-center items-center w-full overflow-x-auto">
          <div className="inline-block">
            <GitHubCalendar
              username="yogamuz"
              blockSize={12}
              blockMargin={4}
              fontSize={14}
              colorScheme="dark"
              theme={{
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

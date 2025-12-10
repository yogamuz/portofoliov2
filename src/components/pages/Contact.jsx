import { useState, useEffect, useRef } from "react";
import Magnet from "@/components/Magnet";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

  const emailSubject = "Hello from your Portfolio Website";

  const handleSayHi = () => {
    // Detect if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Try to open Gmail app first (will fallback to web if app not installed)
      const gmailAppLink = `googlegmail://co?to=yogamuz13@gmail.com&subject=${encodeURIComponent(emailSubject)}`;
      const gmailWebLink = `https://mail.google.com/mail/?view=cm&to=yogamuz13@gmail.com&su=${encodeURIComponent(emailSubject)}`;
      
      // Try app link first
      window.location.href = gmailAppLink;
      
      // Fallback to web if app doesn't open within 1 second
      setTimeout(() => {
        window.open(gmailWebLink, '_blank');
      }, 1000);
    } else {
      // Desktop: always open Gmail web
      const gmailWebLink = `https://mail.google.com/mail/?view=cm&to=yogamuz13@gmail.com&su=${encodeURIComponent(emailSubject)}`;
      window.open(gmailWebLink, '_blank');
    }
  };

  return (
    <div
      ref={sectionRef}
      className="w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-main mb-4 text-center">
            Get In Touch
          </h2>
          <p className="text-gray-300 text-center text-sm md:text-base max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        {/* Contact Button with Magnet Effect */}
        <div
          className={`flex justify-center transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Magnet padding={120} magnetStrength={2.5}>
            <button
              onClick={handleSayHi}
              className="px-8 py-4 text-white border border-cyan-400 rounded-lg font-semibold text-lg tracking-wider hover:bg-cyan-400/20 hover:border-cyan-300 transition-all duration-300 cursor-pointer select-none"
            >
              Say Hi
            </button>
          </Magnet>
        </div>
      </div>
    </div>
  );
}
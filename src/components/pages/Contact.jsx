import { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/Accordion";

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

  return (
    <div
      ref={sectionRef}
      className="w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-24 "
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

        {/* Accordion Section */}
        <div
          className={`max-w-3xl mx-auto transition-opacity duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>How can I contact you?</AccordionTrigger>
              <AccordionContent >
                You can reach me through email at <a href="mailto:yogamuz13@gmail.com">yogamuz13@gmail.com</a> or connect
                with me on LinkedIn{" "}
                <a
                  href="https://www.linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  here
                </a>
                . I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>What services do you offer?</AccordionTrigger>
              <AccordionContent>
                I specialize in full-stack web development, including frontend
                development with React and Vue.js, backend development with
                Node.js, and database management with MongoDB. I also offer
                consultation for web application architecture and UI/UX design.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                What is your typical response time?
              </AccordionTrigger>
              <AccordionContent>
                I typically respond to all inquiries within 24-48 hours during
                business days. For urgent matters, please mention it in your
                message subject line, and I'll do my best to get back to you as
                soon as possible.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

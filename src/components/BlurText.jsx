import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const BlurText = ({
  text = "Blur Text",
  delay = 150,
  animateBy = "words",
  direction = "top",
  onAnimationComplete = () => {},
  className = "",
}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const words = text.split(" ");

  const getAnimationProps = (direction) => {
    const directions = {
      top: { y: -20, x: 0 },
      bottom: { y: 20, x: 0 },
      left: { y: 0, x: -20 },
      right: { y: 0, x: 20 },
    };
    return directions[direction] || directions.top;
  };

  const animationProps = getAnimationProps(direction);

  return (
    <div
      ref={ref}
      className={className}
      style={{ overflow: "visible", lineHeight: "1.5" }}
    >
      {animateBy === "words" ? (
        <span
          className="inline-flex flex-wrap gap-x-2"
          style={{ overflow: "visible" }}
        >
          {words.map((word, wordIndex) => {
            // Check if word is "Prayogo" for gradient
            const isPrayogo = word.toLowerCase().includes("prayogo");

            return (
              <motion.span
                key={wordIndex}
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                  ...animationProps,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        filter: "blur(0px)",
                        y: 0,
                        x: 0,
                      }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  delay: wordIndex * (delay / 1000),
                  ease: "easeOut",
                }}
                onAnimationComplete={() => {
                  if (wordIndex === words.length - 1) {
                    onAnimationComplete();
                  }
                }}
                className={
                  isPrayogo
                    ? "inline-block bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-bold"
                    : "inline-block text-white"
                }
                style={{ lineHeight: "1.4" }} // Tambahkan ini
              >
                {word}
              </motion.span>
            );
          })}
        </span>
      ) : (
        <span className="inline-flex flex-wrap" style={{ overflow: "visible" }}>
          {words.map((word, wordIndex) => {
            const isPrayogo = word.toLowerCase().includes("prayogo");
            const letters = word.split("");

            return (
              <span key={wordIndex} className="inline-flex mr-2">
                {letters.map((letter, letterIndex) => {
                  const totalIndex =
                    words.slice(0, wordIndex).join("").length + letterIndex;

                  return (
                    <motion.span
                      key={letterIndex}
                      initial={{
                        opacity: 0,
                        filter: "blur(10px)",
                        ...animationProps,
                      }}
                      animate={
                        isInView
                          ? {
                              opacity: 1,
                              filter: "blur(0px)",
                              y: 0,
                              x: 0,
                            }
                          : {}
                      }
                      transition={{
                        duration: 0.6,
                        delay: totalIndex * (delay / 1000),
                        ease: "easeOut",
                      }}
                      onAnimationComplete={() => {
                        if (
                          wordIndex === words.length - 1 &&
                          letterIndex === letters.length - 1
                        ) {
                          onAnimationComplete();
                        }
                      }}
                      className={
                        isPrayogo
                          ? "inline-block bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent font-bold"
                          : "inline-block text-white"
                      }
                      style={{ lineHeight: "1.4" }} // Tambahkan ini
                    >
                      {letter}
                    </motion.span>
                  );
                })}
              </span>
            );
          })}
        </span>
      )}
    </div>
  );
};

export default BlurText;

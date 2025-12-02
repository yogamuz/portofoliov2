// App.jsx
import { useState, useEffect } from "react";
import HexLogo from "@/components/HexLogo";
import FloatingLines from "@/components/FloatingLines";
import Header from "@/components/Header/Header";
import Home from "@/components/pages/Index";
import About from "@/components/pages/About";
import Skills from "@/components/Skills";
import Project from "@/components/pages/Project";
import SplashCursor from "@/components/SplashCursor";
import Contact from "@/components/pages/Contact";
import Footer from "@/components/Footer/Footer";

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle overflow: hidden saat loading, auto setelah loaded
  useEffect(() => {
    if (!isLoaded) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
    };
  }, [isLoaded]);

  return (
    <>
      <HexLogo onLoadComplete={() => setIsLoaded(true)} />

      <div
        className={`relative w-full min-h-screen overflow-x-hidden transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: '#0a0e1a' }}
      >
        <div className="fixed inset-0 z-0 ">
          <FloatingLines
            enabledWaves={["top", "middle", "bottom"]}
            lineCount={[2, 3, 5]}
            lineDistance={[5]}
            bendRadius={2.0}
            bendStrength={-1.5}
            mouseDamping={0.08}
            interactive={true}
            parallax={true}
          />
        </div>

        <div className="relative z-10 w-full">
          <Header />

          <main className="w-full pt-24 md:pt-28 lg:pt-32">
            <SplashCursor />

            <section id="home">
              <Home />
            </section>

            <section id="about">
              <About />
            </section>

            <section id="skills">
              <Skills />
            </section>

            <section id="project">
              <Project />
            </section>

            <section id="contact">
              <Contact />
              <Footer />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
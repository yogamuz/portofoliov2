// App.jsx
import { useState, useEffect, lazy, Suspense } from 'react';
import HexLogo from '@/components/HexLogo';
import SplashCursor from '@/components/SplashCursor';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import UnderwaterBackground from '@/components/UnderwaterBackground';

// Lazy load components
const Home = lazy(() => import('@/components/pages/Index'));
const About = lazy(() => import('@/components/pages/About'));
const Skills = lazy(() => import('@/components/Skills'));
const Project = lazy(() => import('@/components/pages/Project'));
const Contact = lazy(() => import('@/components/pages/Contact'));
const Certificate = lazy(() => import('./components/pages/Certificate'));

// Preload Home component saat app pertama kali mount
const preloadHome = () => {
  const HomeComponent = import('@/components/pages/Index');
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload Home component segera setelah mount
  useEffect(() => {
    preloadHome();
  }, []);

  // Handle overflow: hidden saat loading, auto setelah loaded
  useEffect(() => {
    if (!isLoaded) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, [isLoaded]);

  return (
    <>
      <HexLogo onLoadComplete={() => setIsLoaded(true)} />

      <div
        className={`relative w-full min-h-screen overflow-x-hidden transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Underwater Background Effect */}
        <UnderwaterBackground />

        <div className="relative z-10 w-full">
          <Header />

          <main className="w-full pt-24 md:pt-28 lg:pt-32">
            <SplashCursor />

            <section id="home">
              <Home />
            </section>

            <Suspense fallback={<div className="min-h-screen" />}>
              <section id="about">
                <About />
              </section>
            </Suspense>

            <Suspense fallback={<div className="min-h-screen" />}>
              <section id="skills">
                <Skills />
              </section>
            </Suspense>

            <Suspense fallback={<div className="min-h-screen" />}>
              <section id="project">
                <Project />
              </section>
            </Suspense>

            <Suspense fallback={<div className="min-h-screen" />}>
              <section id="certificate">
                <Certificate />
                <Footer />
              </section>
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}
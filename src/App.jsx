// App.jsx
import { Toaster } from "react-hot-toast";

import DarkVeil from "./components/DarkVeil";
import FloatingLines from "@/components/FloatingLines";
import Header from "@/components/Header/Header";
import Home from "@/components/pages/Index";
import About from "@/components/pages/About";
import Skills from "@/components/Skills";
import Project from "@/components/pages/Project";
import SplashCursor from "@/components/SplashCursor";
import Footer from "@/components/Footer/Footer";

export default function App() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black">
      <div className="fixed inset-0 z-0">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          // Array - specify line count per wave; Number - same count for all waves
          lineCount={[2, 3, 5]}
          // Array - specify line distance per wave; Number - same distance for all waves
          lineDistance={[5]}
          bendRadius={5.0}
          bendStrength={-0.5}
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
            <Footer />
          </section>
        </main>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
          },
        }}
      />
    </div>
  );
}

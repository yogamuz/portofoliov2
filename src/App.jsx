// App.jsx
import { Toaster } from "react-hot-toast";

import DarkVeil from "./components/DarkVeil";
import Header from "@/components/Header/Header";
import Home from "@/components/pages/Index";
import About from "@/components/pages/About";
import Project from "@/components/pages/Project";
// HAPUS: import Skills from "@/components/pages/Skills";
import Contact from "@/components/pages/Contact";
import SplashCursor from "@/components/SplashCursor";
import Footer from "@/components/Footer/Footer";

export default function App() {
  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black">
      <div className="fixed inset-0 z-0">
        <DarkVeil />
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

          <section id="project">
            <Project />
          </section>

          {/* HAPUS section skills ini */}
          {/* <section id="skills">
            <Skills />
          </section> */}

          <section id="contact">
            <Contact />
          </section>
          
          <Footer />
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
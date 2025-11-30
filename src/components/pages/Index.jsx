import { useRef, useEffect, useState, useMemo, useId } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import ProfileCard from "@/components/ProfileCard";
import TextPressure from "@/components/TextPressure";

const REPEAT_COUNT = 8;

// ========== MAIN HOME COMPONENT ==========
export default function Home() {
  const handleContactClick = () => {
    console.log("Contact button clicked");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 py-8">
      <div className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto gap-8">
        {/* TextPressure di Atas - Interactive Text Effect */}
        <div className="w-full flex justify-center">
          <div className="w-full flex justify-center" style={{ height: '150px' }}>
            <TextPressure
              text="Welcome to My Portfolio!"
              flex={true}
              alpha={false}
              stroke={true}
              width={true}
              weight={true}
              italic={true}
              scale={false}
              textColor="#ffffff"
              strokeColor="#8b5cf6"
              strokeWidth={2}
              minFontSize={24}
              fontFamily="Compressa VF"
              fontUrl="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2"
            />
          </div>
        </div>

        {/* ProfileCard di Tengah */}
        <div className="z-10">
          <ProfileCard
            avatarUrl="https://res.cloudinary.com/dzfqsajp3/image/upload/v1761733354/Screenshot_2025-10-29_172205-removebg-preview_m24hpm.png"
            name="Prayogo"
            title="Fullstack Web Developer"
            status="Available"
            contactText="Contact"
            showUserInfo={false}
            enableTilt={true}
            enableMobileTilt={false}
            behindGlowEnabled={true}
            onContactClick={handleContactClick}
          />
        </div>
      </div>
    </div>
  );
}
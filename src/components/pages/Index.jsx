// pages/index.jsx (Home)
import SplitText from "@/components/SplitText.jsx";
import ProfileCard from "@/components/ProfileCard";
import TrueFocus from "@/components/TrueFocus";
import BlurText from "@/components/BlurText";
import Lanyard from "@/components/Lanyard"
import { useTranslation } from 'react-i18next';
function Home() {
  const { t } = useTranslation(); 
  
  return (
    <div className="w-full px-8 py-16 md:py-20 lg:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)] lg:min-h-[calc(100vh-12rem)]">
          {/* Kolom Kiri - Text */}
          <div className="flex flex-col justify-center text-center md:text-left">
            {/* Welcome Text with BlurText Animation */}
            <div className="space-y-4 overflow-visible ">
              <p className="text-sm md:text-base text-main font-bold tracking-widest uppercase ">
                — {t('home.greeting')} 
              </p>
              <div style={{ lineHeight: "1.5", paddingBottom: "0.5rem" }}>
                <BlurText
                  text={t('home.intro')}
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold"
                />
              </div>
            </div>

            {/* Role with TrueFocus Animation */}
            <div className="flex justify-center md:justify-start  pb-4 overflow-visible">
              <div className="overflow-visible" style={{ padding: "8px 0" }}>
                <TrueFocus
                  sentence={t('home.role')}
                  manualMode={false}
                  blurAmount={5}
                  borderColor="#3b82f6"
                  glowColor="rgba(59, 130, 246, 0.6)"
                  animationDuration={1.5}
                  pauseBetweenAnimations={1.5}
                />
              </div>
            </div>
          </div>

          {/* Kolom Kanan - Profile Card */}
          <div className="flex items-center justify-center">
            <div className="w-full flex justify-center scale-90 md:scale-75 lg:scale-85 xl:scale-100">
              <ProfileCard
                name={t('home.card.name')}
                title={t('home.card.title')}
                handle={t('home.card.handle')} 
                status={t('home.card.status')}
                contactText={t('home.card.contactText')}
                avatarUrl="https://res.cloudinary.com/dzfqsajp3/image/upload/v1761733354/Screenshot_2025-10-29_172205-removebg-preview_m24hpm.png"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => console.log("Contact clicked")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;

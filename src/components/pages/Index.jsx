import ProfileCard from '@/components/ProfileCard';
import TextPressure from '@/components/TextPressure';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const REPEAT_COUNT = 8;

// ========== MAIN HOME COMPONENT ==========
export default function Home() {
  const handleContactClick = () => {
    console.log('Contact button clicked');
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
              textColor="#7DD3FC"
              strokeColor="rgba(120, 220, 255, 0.6)"
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
            avatarUrl="https://res.cloudinary.com/dzfqsajp3/image/upload/w_300,f_auto,q_auto/v1761733354/Screenshot_2025-10-29_172205-removebg-preview_m24hpm.png"
            iconUrl="https://res.cloudinary.com/dzfqsajp3/image/upload/w_200,f_auto,q_auto/v1766410570/ss-code_icgwak.png"
            name="Prayogo"
            title="Fullstack Web Developer"
            status="Available"
            contactText="Send me a message!"
            showUserInfo={true}
            enableTilt={true}
            enableMobileTilt={true}
            behindGlowEnabled={true}
            onContactClick={handleContactClick}
          />
        </div>
      </div>
    </div>
  );
}

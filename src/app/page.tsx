"use client";

import { useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import LandingFooter from '@/app/sections/LandingPage/LandingFooter';
import YellowButton from '@/app/components/YellowButton';
import FeatureCard from '@/app/components/FeatureCard';
import { Wand2, Zap, Share2 } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const primaryBlue = '#4A90E2'; 
  const accentGreen = '#50E3C2';

  if (typeof document !== 'undefined') {
    document.documentElement.style.scrollBehavior = 'smooth';
  }
  
  const handleGetStarted = () => {
    // TODO: Navigate to login page when ready
    // For now, go directly to upload
    router.push('/sections/UploadImagePage');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <Header />

      <section 
        className="relative min-h-[600px] flex items-center justify-center overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #4A90E2 0%, #8CB8E8 50%, rgba(255, 255, 255, 1) 100%)',
        }}
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at top right, rgba(74, 144, 226, 0.9) 1px, transparent 1px),
              radial-gradient(circle at 70% 30%, rgba(74, 144, 226, 0.7) 1.5px, transparent 1.5px),
              radial-gradient(circle at 50% 60%, rgba(74, 144, 226, 0.3) 2px, transparent 2px),
              radial-gradient(circle at bottom center, rgba(255, 255, 255, 0.1) 2px, transparent 2px)
            `,
            backgroundSize: '15px 15px, 25px 25px, 40px 40px, 50px 50px',
            backgroundPosition: 'top right, 20% 20%, 50% 50%, bottom center'
          }}
        />
        
        <div className="relative z-10 text-center px-6 py-20">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-black mb-6 leading-tight">
            Make it stand out.
            <br />
            <span style={{ color: primaryBlue }}>FrameIt</span> <span className="text-gray-900">now.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-black mb-8 font-medium">
            Create, customize, and be post-ready.
          </p>
          <YellowButton size="lg" onClick={handleGetStarted}>
            Get Started
          </YellowButton>
        </div>

        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.8) 50%, white 100%)'
          }}
        />
      </section>

      <section id="about-us" className="py-16 md:py-24 bg-white overflow-hidden scroll-mt-16">
        <div className="max-w-5xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-x-8">
        

        <div className="relative w-full max-w-sm h-64 md:h-80 mb-10 md:mb-0 md:shrink-0 flex items-center">

          <div 
            style={{ 
              backgroundColor: accentGreen,
              transform: 'rotate(-15.13deg) translate(-60px, 32px)' 
            }}
            className="absolute w-64 h-64 shadow-xl opacity-90"
          />
          

          <div 
            style={{ 
              backgroundColor: primaryBlue,
              transform: 'rotate(-5.42deg) translate(50px, -20px)' 
            }}
            className="absolute w-64 h-64 shadow-2xl"
          />
        </div>


        <div className="text-center md:text-left md:max-w-md shrink-0"> 
          <h2 
            className="text-3xl sm:text-4xl font-extrabold text-gray-900 italic leading-tight" 
            style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.4)' }} 
          >
            Turn 
            <span style={{ color: primaryBlue }} className="font-extrabold"> moments</span> into 
            <br />
            <span style={{ color: accentGreen }} className="font-extrabold">masterpieces</span> with 
            <br />
            just one frame.
          </h2>
        </div>
        </div>
      </section>

      <section id="features" className="py-16 md:py-20 bg-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-black">
            Why <span style={{ color: primaryBlue }}>FrameIt</span> is Your Picture <span style={{ color: accentGreen }}>Essential</span>.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            
            <FeatureCard
              title="Design Your Posts"
              description="Pick from a collection of stylish, ready-made frames to enhance your photos. No need to fuss with designs, your photos get a polished look instantly"
              icon={Wand2}
              borderColor={primaryBlue}
              iconColor={primaryBlue}
            />

            <FeatureCard
              title="Effortless"
              description="FrameIt makes it super easy to turn any photo into something unique. Just select a frame, write a caption, upload your picture, and you're done."
              icon={Zap}
              borderColor={accentGreen}
              iconColor={accentGreen}
            />

            <FeatureCard
              title="Share Your Work"
              description="Show your framed photos with friends, family or online. The ready-made frames makes sharing your memories quick, fun, and eye-catching."
              icon={Share2}
              borderColor={primaryBlue}
              iconColor={accentGreen}
            />

          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
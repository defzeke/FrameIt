"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Header from '@/app/components/Header';
import LandingFooter from '@/app/components/LandingFooter';
import YellowButton from '@/app/components/YellowButton';
import FeatureCard from '@/app/components/FeatureCard';
import { Wand2, Zap, Share2 } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();
  const primaryBlue = '#4A90E2'; 
  const accentGreen = '#50E3C2';

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  const handleGetStarted = () => {
    router.push('/login');
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

        {/* Floating decorative shapes */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ 
            backgroundColor: accentGreen,
            top: '5%',
            left: '10%',
            animation: 'heroFloat 12s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ 
            backgroundColor: primaryBlue,
            bottom: '20%',
            right: '15%',
            animation: 'heroFloat 15s ease-in-out infinite 3s'
          }}
        />

        {/* Geometric shapes */}
        <div 
          className="absolute w-32 h-32 opacity-10"
          style={{ 
            backgroundColor: accentGreen,
            top: '15%',
            right: '20%',
            transform: 'rotate(45deg)',
            animation: 'spin 20s linear infinite'
          }}
        />
        
        <div className="relative z-10 text-center px-6 py-20">
          {/* Decorative element above title */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <div 
              className="h-0.5 w-12 rounded-full"
              style={{ backgroundColor: accentGreen }}
            />
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentGreen }}
            />
            <div 
              className="h-0.5 w-12 rounded-full"
              style={{ backgroundColor: accentGreen }}
            />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-black mb-6 leading-tight animate-fadeIn">
            Make it stand out.
            <br />
            <span style={{ color: primaryBlue }}>FrameIt</span> <span className="text-gray-900">now.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-black mb-8 font-medium">
            Create, customize, and be post-ready.
          </p>
          
          {/* Enhanced button with glow effect */}
          <div className="relative inline-block">
            <div 
              className="absolute inset-0 rounded-full blur-xl opacity-50 pointer-events-none"
              style={{ backgroundColor: '#FFD700' }}
            />
            <YellowButton size="lg" onClick={handleGetStarted}>
              Get Started
            </YellowButton>
          </div>
        </div>

        <div 
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.8) 50%, white 100%)'
          }}
        />
      </section>

      <section 
        id="about-us" 
        className="py-16 md:py-24 overflow-hidden scroll-mt-16 relative"
        style={{
          background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
        }}
      >

        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, ${primaryBlue} 2px, transparent 2px),
              radial-gradient(circle at 80% 20%, ${accentGreen} 1.5px, transparent 1.5px),
              radial-gradient(circle at 30% 70%, ${accentGreen} 1px, transparent 1px),
              radial-gradient(circle at 75% 80%, ${primaryBlue} 2.5px, transparent 2.5px),
              radial-gradient(circle at 10% 90%, ${primaryBlue} 1.5px, transparent 1.5px),
              radial-gradient(circle at 90% 60%, ${accentGreen} 2px, transparent 2px)
            `,
            backgroundSize: '100px 100px, 150px 150px, 120px 120px, 180px 180px, 90px 90px, 110px 110px',
            backgroundPosition: '0 0, 40px 40px, 80px 20px, 20px 60px, 60px 80px, 30px 30px'
          }}
        />

        <div className="max-w-5xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-center gap-x-12 relative z-10">
        

          <div className="relative w-full max-w-sm h-64 md:h-80 mb-10 md:mb-0 md:shrink-0 flex items-center justify-center">
            <div 
              style={{ 
                transform: 'rotate(-15.13deg) translate(50px, -20px)',
                boxShadow: `0 15px 50px rgba(74, 144, 226, 0.5), 0 0 30px rgba(74, 144, 226, 0.3)`,
                animation: 'float 6s ease-in-out infinite 1s'
              }}
              className="absolute w-80 h-80 overflow-hidden"
            >
              <img 
                src="/duck.jpg" 
                alt="FrameIt Preview" 
                className="w-full h-full object-cover"
              />
            </div>

            <div 
              className="absolute w-12 h-12 rounded-full opacity-60"
              style={{ 
                backgroundColor: primaryBlue,
                top: '-10px',
                right: '20px',
                animation: 'pulse 3s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute w-8 h-8 rounded-full opacity-70"
              style={{ 
                backgroundColor: accentGreen,
                bottom: '10px',
                left: '10px',
                animation: 'pulse 3s ease-in-out infinite 1.5s'
              }}
            />
          </div>

          <div className="text-center md:text-left md:max-w-md shrink-0"> 
            <h2 
              className="text-3xl sm:text-4xl font-extrabold text-gray-900 italic leading-tight mb-4" 
              style={{ textShadow: '4px 4px 8px rgba(0,0,0,0.4)' }} 
            >
              Turn 
              <span style={{ color: primaryBlue }} className="font-extrabold"> moments</span> into 
              <br />
              <span style={{ color: accentGreen }} className="font-extrabold">masterpieces</span> with 
              <br />
              just one frame.
            </h2>
            
            <p className="text-gray-700 text-lg leading-relaxed">
              FrameIt transforms your everyday photos into stunning visual stories. 
              Choose a frame, customize it your way, and share your creativity with the world.
            </p>
          </div>
        </div>
      </section>

      <section 
        id="features" 
        className="py-16 md:py-20 scroll-mt-16 relative overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
        }}
      >

        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, ${primaryBlue} 2px, transparent 2px),
              radial-gradient(circle at 80% 20%, ${accentGreen} 1.5px, transparent 1.5px),
              radial-gradient(circle at 30% 70%, ${accentGreen} 1px, transparent 1px),
              radial-gradient(circle at 75% 80%, ${primaryBlue} 2.5px, transparent 2.5px),
              radial-gradient(circle at 10% 90%, ${primaryBlue} 1.5px, transparent 1.5px),
              radial-gradient(circle at 90% 60%, ${accentGreen} 2px, transparent 2px)
            `,
            backgroundSize: '100px 100px, 150px 150px, 120px 120px, 180px 180px, 90px 90px, 110px 110px',
            backgroundPosition: '0 0, 40px 40px, 80px 20px, 20px 60px, 60px 80px, 30px 30px'
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-black">
              Why <span style={{ color: primaryBlue }}>FrameIt</span> is Your Picture <span style={{ color: accentGreen }}>Essential</span>.
            </h2>
            
            <div className="flex items-center justify-center gap-2 mt-6">
              <div 
                className="h-1 w-16 rounded-full"
                style={{ backgroundColor: primaryBlue }}
              />
              <div 
                className="h-1 w-8 rounded-full"
                style={{ backgroundColor: accentGreen }}
              />
              <div 
                className="h-1 w-16 rounded-full"
                style={{ backgroundColor: primaryBlue }}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="transform hover:scale-105 transition-transform duration-300">
              <FeatureCard
                title="Design Your Posts"
                description="Pick from a collection of stylish, ready-made frames to enhance your photos. No need to fuss with designs, your photos get a polished look instantly"
                icon={Wand2}
                borderColor={primaryBlue}
                iconColor={primaryBlue}
              />
            </div>

            <div className="transform hover:scale-105 transition-transform duration-300 md:mt-8">
              <FeatureCard
                title="Effortless"
                description="FrameIt makes it super easy to turn any photo into something unique. Just select a frame, write a caption, upload your picture, and you're done."
                icon={Zap}
                borderColor={accentGreen}
                iconColor={accentGreen}
              />
            </div>

            <div className="transform hover:scale-105 transition-transform duration-300">
              <FeatureCard
                title="Share Your Work"
                description="Show your framed photos with friends, family or online. The ready-made frames makes sharing your memories quick, fun, and eye-catching."
                icon={Share2}
                borderColor={primaryBlue}
                iconColor={primaryBlue}
              />
            </div>

          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
// This is the landing page


// Imported Header, Footer, and the HeroSection components for code reusability
import Header from '@/app/sections/LandingPage/LandingHeader'; 
import Footer from '@/app/sections/LandingPage/LandingFooter' 
import AboutUs from '@/app/sections/LandingPage/AboutUs'; 

export default function LandingPage() {
  return (
    // landing-page container as white background
    <div className="min-h-screen flex flex-col bg-white"> 
      
      {/* 1. Header */}
      <Header />
      
      {/* 2. Main Content */}
      <main className="flex-grow">
        {/* Hero section content */}
        <AboutUs /> 
        
        {/* For other contents: */}

      </main>
      
      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
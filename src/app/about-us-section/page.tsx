// This is the landing page


// Imported Header, Footer, and the HeroSection components for code reusability
import Header from './components/header'; 
import Footer from './components/footer' 
import HeroSection from './components/hero-section'; 

export default function LandingPage() {
  return (
    // landing-page container as white background
    <div className="min-h-screen flex flex-col bg-white"> 
      
      {/* 1. Header */}
      <Header />
      
      {/* 2. Main Content */}
      <main className="flex-grow">
        {/* Hero section content */}
        <HeroSection /> 
        
        {/* For other contents: */}

      </main>
      
      {/* 3. Footer */}
      <Footer />
    </div>
  );
}
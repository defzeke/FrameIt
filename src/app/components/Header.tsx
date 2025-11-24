'use client';

import { useRouter, usePathname } from 'next/navigation';
import YellowButton from './YellowButton';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const headerBgColor = '#4A90E2';

  const handleHomeClick = () => {
    router.push('/');
  };

  const handleAboutClick = () => {
    if (pathname === '/') {
      const aboutSection = document.getElementById('about-us');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#about-us');
    }
  };

  const handleFeaturesClick = () => {
    if (pathname === '/') {
      const featuresSection = document.getElementById('features');
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push('/#features');
    }
  };

  return (
    <header 
      style={{ 
        backgroundColor: headerBgColor, 
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.6)' 
      }} 
      className="text-white z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div 
          className="text-xl font-bold text-white cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={handleHomeClick}
        > 
          FrameIt
        </div>

        <nav className="flex space-x-6 items-center">
          <button onClick={handleAboutClick} className="text-white hover:text-gray-200 transition-colors text-base font-medium cursor-pointer">About Us</button> 
          <button onClick={handleFeaturesClick} className="text-white hover:text-gray-200 transition-colors text-base font-medium cursor-pointer">Features</button> 
          <YellowButton size="md" fullRounded={true} onClick={handleHomeClick}>
            Home
          </YellowButton>
        </nav>
      </div>
    </header>
  );
}

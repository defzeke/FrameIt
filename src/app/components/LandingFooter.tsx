'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function LandingFooter() {
  const router = useRouter();
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const contactEmail = "contact@frameit.com";
  
  const footerBgColor = '#4A90E2';

  const scrollToSection = (sectionId: string) => {
    if (pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  return (
    <footer 
      style={{ 
        backgroundColor: footerBgColor,
        boxShadow: '0 -8px 12px -3px rgba(0, 0, 0, 0.3), 0 -4px 6px -4px rgba(0, 0, 0, 0.3)'
      }} 
      className="text-white pt-6 pb-2" 
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-xs items-start">
          <div className="flex items-center h-full"> 
            <h3 className="text-xl font-bold text-white cursor-pointer hover:opacity-80 transition-opacity" onClick={() => router.push('/')}>FrameIt</h3>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-white">Quick Links</h4>
            <ul className="space-y-1">
              <li><button onClick={() => router.push('/')} className="hover:text-gray-300 cursor-pointer">Home</button></li>
              <li><button onClick={() => scrollToSection('about-us')} className="hover:text-gray-300 cursor-pointer">About</button></li>
              <li><button onClick={() => scrollToSection('features')} className="hover:text-gray-300 cursor-pointer">Features</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-white">Support</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-300 cursor-pointer">Report an Issue</a></li>
              <li><a href="#" className="hover:text-gray-300 cursor-pointer">Help Center</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-white">Contact Us</h4>
            <ul className="space-y-1">
              <li>
                <a 
                  href={`mailto:${contactEmail}`} 
                  className="hover:text-gray-300 cursor-pointer"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500 py-2 text-center text-xs text-blue-200">
          © {currentYear} FrameIt. All rights reserved. | Designed for your story.
        </div>
      </div>
    </footer>
  );
}

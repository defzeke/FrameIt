export default function Footer() {
  const currentYear = new Date().getFullYear();
  const contactEmail = "contact@frameit.com";
  
  const footerBgColor = '#4A90E2'; 

  return (
    <footer 
      style={{ 
        backgroundColor: footerBgColor,
        // Shadow: Upward cast, deeper and wider
        boxShadow: '0 -8px 12px -3px rgba(0, 0, 0, 0.3), 0 -4px 6px -4px rgba(0, 0, 0, 0.3)'
      }} 
      className="text-white pt-6 pb-2" 
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-xs items-start">
          
          {/* Column 1: FrameIt Text */}
          <div className="flex items-center h-full"> 
            <h3 className="text-xl font-bold text-white">FrameIt</h3>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-semibold mb-2 text-white">Quick Links</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">About</a></li>
              <li><a href="#" className="hover:text-gray-300">Features</a></li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h4 className="font-semibold mb-2 text-white">Support</h4>
            <ul className="space-y-1">
              <li><a href="#" className="hover:text-gray-300">Report an Issue</a></li>
              <li><a href="#" className="hover:text-gray-300">Help Center</a></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div>
            <h4 className="font-semibold mb-2 text-white">Contact Us</h4>
            <ul className="space-y-1">
              <li>
                <a 
                  href={`mailto:${contactEmail}`} 
                  className="hover:text-gray-300"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Text */}
        <div className="border-t border-blue-500 py-2 text-center text-xs text-blue-200">
          © {currentYear} FrameIt. All rights reserved. | Designed for your story.
        </div>
      </div>
    </footer>
  );
}
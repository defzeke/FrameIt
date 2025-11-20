export default function Header() {
  const headerBgColor = '#4A90E2';

  return (
    <header 
      style={{ 
        backgroundColor: headerBgColor, 
        // Shadow: Downward cast
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.6)' 
      }} 
      className="text-white z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Logo/Site Name */}
        <div className="text-xl font-bold text-white"> 
          FrameIt
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-sm font-medium">
          <a href="#" className="text-white hover:text-gray-200 transition-colors">About Us</a> 
          <a href="#" className="text-white hover:text-gray-200 transition-colors">Features</a> 
          {/* Highlighted CTA button (Home) */}
          <a 
            href="#" 
            className="px-3 py-1 rounded-[2rem] bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition-colors shadow-md"
          >
            Home
          </a>
        </nav>
      </div>
    </header>
  );
}
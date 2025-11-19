export default function HeroSection() {
  const primaryBlue = '#4A90E2'; 
  const accentGreen = '#50E3C2';

  return (
    <div className="flex items-center justify-center min-h-[500px] py-16 bg-white overflow-hidden md:py-24">
      
      <div className="max-w-7xl w-full mx-auto px-6 flex flex-col md:flex-row items-center justify-center md:justify-between gap-x-8">
        
        {/* =================================
            Left Side: The Overlapping Shapes 
            ================================= */}
        <div className="relative w-full max-w-sm h-64 md:h-80 mb-10 md:mb-0 md:flex-shrink-0">
          
          {/*  Green Square */}
          <div 
            style={{ 
              backgroundColor: accentGreen,
              transform: 'rotate(-15.13deg) translate(-4px, 32px)' 
            }}
            className="absolute w-64 h-64 shadow-xl opacity-90"
          />
          
          {/* Blue Square */}
          <div 
            style={{ 
              backgroundColor: primaryBlue,
              transform: 'rotate(-5.42deg) translate(80px, -20px)' 
            }}
            className="absolute w-64 h-64 shadow-2xl"
          />
        </div>

        {/* =================================
            Right Side: The Headline Text
            ================================= */}
        <div className="text-center md:text-left md:max-w-md"> 
          <h2 
            // CHANGE: Re-added 'italic' class
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
    </div>
  );
}
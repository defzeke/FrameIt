"use client";

interface FramePreviewProps {
  frameUrl?: string;
  frameColor?: string;
}

export default function FramePreview({
  frameUrl,
  frameColor = '#4A90E2'
}: FramePreviewProps) {
  return (
    <div className="flex flex-col items-center">
      <div 
        id="frame-preview"
        className="relative w-[360px] h-[360px] md:w-[420px] md:h-[420px] shadow-2xl overflow-hidden"
        style={{
          backgroundColor: frameColor
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white text-opacity-30">
            <div className="text-6xl mb-2">📷</div>
            <p className="text-sm">User photo will appear here</p>
          </div>
        </div>
        
        {frameUrl && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <img 
              src={frameUrl}
              alt="Frame overlay"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}

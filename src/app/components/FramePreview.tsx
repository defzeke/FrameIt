"use client";

interface FramePreviewProps {
  imageUrl?: string;
  scale?: number;
  rotate?: number;
  frameColor?: string;
}

export default function FramePreview({
  imageUrl,
  scale = 100,
  rotate = 0,
  frameColor = '#4A90E2'
}: FramePreviewProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Frame Container with ID for downloading */}
      <div 
        id="frame-preview"
        className="relative w-[360px] h-[360px] md:w-[420px] md:h-[420px] shadow-2xl"
        style={{
          backgroundColor: frameColor,
          padding: '24px'
        }}
      >
        <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img 
              src={imageUrl}
              alt="Preview"
              className="object-cover"
              style={{
                transform: `scale(${scale / 100}) rotate(${rotate}deg)`,
                transition: 'transform 0.2s ease'
              }}
            />
          ) : (
            <span className="text-6xl font-bold text-gray-800">FRAME</span>
          )}
        </div>
      </div>
    </div>
  );
}

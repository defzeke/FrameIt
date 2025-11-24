interface FrameCardProps {
  title: string;
  caption: string;
  frameColor?: string;
}

export default function FrameCard({ 
  title, 
  caption,
  frameColor = '#FFC107' 
}: FrameCardProps) {
  return (
    <div className="flex flex-col items-center">
      {/* Frame Box */}
      <div 
        className="w-24 h-24 rounded-sm shadow-lg mb-3"
        style={{ backgroundColor: frameColor }}
      />
      
      {/* Title and Caption */}
      <div className="text-center">
        <h3 className="font-bold text-white text-sm mb-1">{title}</h3>
        <p className="text-white text-xs opacity-90">{caption}</p>
      </div>
    </div>
  );
}

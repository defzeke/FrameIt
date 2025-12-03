

interface FrameCardProps {
	title: string;
	caption: string;
	frameColor?: string;
	imageUrl?: string;
}

// (Removed duplicate and misplaced function body)
export default function FrameCard({
	title, 
	caption,
	frameColor = '#FFC107',
	imageUrl
}: FrameCardProps) {
	return (
		<div className="flex flex-col items-center">
			{imageUrl ? (
				<img 
					src={imageUrl} 
					alt={title}
					className="w-24 h-24 object-cover rounded-sm shadow-lg mb-3 border border-gray-200"
					style={{ backgroundColor: frameColor }}
				/>
			) : (
				<div 
					className="w-24 h-24 rounded-sm shadow-lg mb-3"
					style={{ backgroundColor: frameColor }}
				/>
			)}
			<div className="text-center">
				<h3 className="font-bold text-gray-800 text-sm mb-1 truncate max-w-[6rem]">{title}</h3>
				<p className="text-gray-500 text-xs opacity-90 truncate max-w-[6rem]">{caption}</p>
			</div>
		</div>
	);
}

"use client";
import Image from 'next/image';

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
				className="relative w-[520px] h-[520px] md:w-[680px] md:h-[680px] shadow-2xl overflow-hidden ml-10"
				style={{
					backgroundColor: frameColor
				}}
			>
				<div className="absolute inset-0 flex items-center justify-center bg-white">
					<div className="text-center text-gray-400">
						<div className="text-6xl mb-2">📷</div>
						<p className="text-sm">User photo will appear here</p>
					</div>
				</div>
				{frameUrl && (
					<div className="absolute inset-0 pointer-events-none z-10">
						<Image
							src={frameUrl}
							alt="Frame overlay"
							fill
							className="object-cover"
							priority
							sizes="(max-width: 680px) 100vw, 680px"
						/>
					</div>
				)}
			</div>
		</div>
	);
}

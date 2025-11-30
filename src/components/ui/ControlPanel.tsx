"use client";

import Slider from './Slider';
import TextArea from './TextArea';
import YellowButton from './YellowButton';

interface ControlPanelProps {
	scale: number;
	rotate: number;
	caption: string;
	onScaleChange: (value: number) => void;
	onRotateChange: (value: number) => void;
	onCaptionChange: (value: string) => void;
	onSave: () => void;
	onShare: () => void;
	backgroundColor?: string;
	isDownloading?: boolean;
}

export default function ControlPanel({
	scale,
	rotate,
	caption,
	onScaleChange,
	onRotateChange,
	onCaptionChange,
	onSave,
	onShare,
	backgroundColor = '#4A90E2',
	isDownloading = false
}: ControlPanelProps) {
	return (
		   <div 
			   className="bg-white/80 rounded-3xl shadow-xl px-10 py-12 w-full border border-[#e0e7ef] backdrop-blur-md flex flex-col gap-6"
			   style={{
				   background: `linear-gradient(135deg, #fff 70%, ${backgroundColor}10 100%)`,
				   boxShadow: '0 8px 32px 0 rgba(74,144,226,0.10), 0 1.5px 8px 0 rgba(80,227,194,0.08)'
			   }}
		   >
			{/* Scale Slider */}
			   {/* Scale and Rotate sliders removed for /edit page */}

			   {/* Download button removed for /edit page */}

			   {/* Caption Input */}
			   <div className="mb-2 bg-white/80 rounded-xl p-2 border border-[#e0e7ef] shadow-sm">
				   <TextArea
					   value={caption}
					   onChange={onCaptionChange}
					   placeholder="Enter your caption here..."
				   />
			   </div>

			   {/* Share Frame Button */}
			   <YellowButton 
				   size="md" 
				   className="w-full py-3 text-base rounded-xl shadow-md hover:shadow-lg transition-all"
				   onClick={onShare}
			   >
				   Share Frame
			   </YellowButton>
		</div>
	);
}

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
      className="rounded-3xl shadow-2xl p-8 flex flex-col"
      style={{ backgroundColor }}
    >
      {/* Scale Slider */}
      <Slider
        label="Scale"
        value={scale}
        onChange={onScaleChange}
        min={50}
        max={150}
        step={1}
      />

      <Slider
        label="Rotate"
        value={rotate}
        onChange={onRotateChange}
        min={0}
        max={360}
        step={1}
      />

      {/* Save/Download Button */}
      <div className="mb-4">
        <YellowButton 
          size="md" 
          className={`w-full ${isDownloading ? 'opacity-50 cursor-wait' : ''}`}
          onClick={onSave}
        >
          {isDownloading ? 'Downloading...' : 'Download'}
        </YellowButton>
      </div>

      {/* Caption Input */}
      <div className="mb-4 bg-white rounded-lg p-1">
        <TextArea
          value={caption}
          onChange={onCaptionChange}
          placeholder="Enter your caption here..."
        />
      </div>

      {/* Share Frame Button */}
      <YellowButton 
        size="md" 
        className="w-full"
        onClick={onShare}
      >
        Share Frame
      </YellowButton>
    </div>
  );
}

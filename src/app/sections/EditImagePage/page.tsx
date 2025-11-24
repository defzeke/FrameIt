"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFrame } from '@/app/contexts/FrameContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FramePreview from '@/app/components/FramePreview';
import ControlPanel from '@/app/components/ControlPanel';
import YellowButton from '@/app/components/YellowButton';
import ShareModal from '@/app/components/ShareModal';
import { saveFrame, fileToBase64 } from '@/app/utils/frameStorage';
import { downloadFrame } from '@/app/utils/downloadFrame';

export default function EditImagePage() {
  const router = useRouter();
  const { 
    imageUrl, 
    scale, 
    rotate, 
    caption, 
    frameColor,
    frameId,
    setScale, 
    setRotate, 
    setCaption,
    setFrameId
  } = useFrame();
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Redirect to upload page if no image is loaded
  useEffect(() => {
    if (!imageUrl) {
      router.push('/sections/UploadImagePage');
    }
  }, [imageUrl, router]);
  
  const primaryBlue = frameColor || '#4A90E2';

  const handleSave = async () => {
    setIsDownloading(true);
    try {
      const success = await downloadFrame('frame-preview', {
        filename: `frameit-${Date.now()}`,
        format: 'png'
      });
      
      if (success) {
        console.log('Frame downloaded successfully');
      } else {
        alert('Failed to download frame. Please try again.');
      }
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download frame. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    if (!imageUrl) return;
    
    // Generate temporary frameId if not exists
    let currentFrameId = frameId;
    if (!currentFrameId) {
      currentFrameId = generateTempFrameId();
      setFrameId(currentFrameId);
    }
    
    console.log('Sharing frame with ID:', currentFrameId);
    
    // Save frame to localStorage
    try {
      // Convert blob URL to base64 for persistent storage
      let imageData = imageUrl;
      if (imageUrl.startsWith('blob:')) {
        console.log('Converting blob URL to base64...');
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        imageData = await fileToBase64(blob as File);
        console.log('Conversion complete, base64 length:', imageData.length);
      }
      
      const frameData = {
        frameId: currentFrameId,
        imageUrl: imageData, // Save base64 instead of blob URL
        scale,
        rotate,
        caption,
        frameColor: frameColor || '#4A90E2',
        createdAt: new Date().toISOString(),
      };
      
      console.log('Saving frame data:', { ...frameData, imageUrl: `${imageData.substring(0, 50)}...` });
      const saved = saveFrame(frameData);
      console.log('Frame saved:', saved);
      
      // Verify it was saved
      const retrieved = JSON.parse(localStorage.getItem('frameit_frames') || '{}');
      console.log('Stored frames:', Object.keys(retrieved));
      
      // Generate shareable URL
      const baseUrl = window.location.origin;
      const url = `${baseUrl}/user/${currentFrameId}`;
      setShareUrl(url);
      setShowShareModal(true);
    } catch (error) {
      console.error('Failed to save frame:', error);
      alert('Failed to create shareable link. Please try again.');
    }
  };
  
  // Temporary ID generator (will be replaced with API-generated ID)
  const generateTempFrameId = () => {
    return 'frame_' + Math.random().toString(36).substring(2, 11);
  };

  const handleChangeFrame = () => {
    if (confirm('Do you want to upload a new frame? Current progress will be lost.')) {
      router.push('/sections/UploadImagePage');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="grow py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:pl-2">
            
            <div className="flex flex-col items-center gap-6">
              <FramePreview
                imageUrl={imageUrl || undefined}
                scale={scale}
                rotate={rotate}
                frameColor={primaryBlue}
              />
              
              <YellowButton 
                size="lg"
                onClick={handleChangeFrame}
              >
                + Change Frame
              </YellowButton>
            </div>

            <div className="flex items-center justify-center lg:justify-start lg:pl-4">
              <div className="w-full max-w-md">
                <ControlPanel
                  scale={scale}
                  rotate={rotate}
                  caption={caption}
                  onScaleChange={setScale}
                  onRotateChange={setRotate}
                  onCaptionChange={setCaption}
                  onSave={handleSave}
                  onShare={handleShare}
                  backgroundColor={primaryBlue}
                  isDownloading={isDownloading}
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        shareUrl={shareUrl}
      />
    </div>
  );
}

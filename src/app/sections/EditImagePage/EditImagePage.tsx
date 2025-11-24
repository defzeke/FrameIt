"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFrame } from '@/app/contexts/FrameContext';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FramePreview from '@/app/components/FramePreview';
import ControlPanel from '@/app/components/ControlPanel';
import YellowButton from '@/app/components/YellowButton';

export default function EditImagePage() {
  const router = useRouter();
  const { 
    imageUrl, 
    scale, 
    rotate, 
    caption, 
    frameColor,
    setScale, 
    setRotate, 
    setCaption 
  } = useFrame();
  
  // Redirect to upload page if no image is loaded
  useEffect(() => {
    if (!imageUrl) {
      router.push('/sections/UploadImagePage');
    }
  }, [imageUrl, router]);
  
  const primaryBlue = frameColor || '#4A90E2';

  const handleSave = () => {
    // TODO: Implement save functionality with API
    console.log('Saving frame with:', { imageUrl, scale, rotate, caption, frameColor });
    // Future: Save to database and get frameId
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Sharing frame with caption:', caption);
    // Future: Generate shareable link
  };

  const handleChangeFrame = () => {
    // TODO: Implement frame selection
    console.log('Opening frame selector');
    // Future: Open modal to select different frame styles
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="grow py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:pl-2">
            
            <div className="flex flex-col items-center gap-6">
              <FramePreview
                imageUrl={imageUrl}
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
                />
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

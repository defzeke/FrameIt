"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFrame } from '@/contexts/FrameContext';
import Footer from '@/components/sections/Footer';
import FramePreview from '@/components/ui/FramePreview';
import ControlPanel from '@/components/ui/ControlPanel';
import YellowButton from '@/components/ui/YellowButton';
import ShareModal from '@/components/modals/ShareModal';
import { saveFrame, fileToBase64 } from '@/lib/frameStorage';
import { downloadFrame } from '@/lib/downloadFrame';

export default function EditImagePage() {
    const handleShare = async () => {
      if (!imageUrl) return;
      let currentFrameId = frameId;
      if (!currentFrameId) {
        currentFrameId = generateTempFrameId();
        setFrameId(currentFrameId);
      }
      try {
        let imageData = imageUrl;
        if (imageUrl.startsWith('blob:')) {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          imageData = await fileToBase64(blob as File);
        }
        const frameData = {
          frameId: currentFrameId,
          imageUrl: imageData,
          scale,
          rotate,
          caption,
          frameColor: frameColor || '#4A90E2',
          createdAt: new Date().toISOString(),
        };
        const saved = await saveFrame(frameData);
        if (!saved) {
          alert('Failed to save frame. Storage quota may be exceeded. Try deleting old frames.');
          return;
        }
        const baseUrl = window.location.origin;
        const url = `${baseUrl}/user/${currentFrameId}`;
        setShareUrl(url);
        setShowShareModal(true);
      } catch (error) {
        console.error('Failed to save frame:', error);
        alert('Failed to create shareable link. Storage may be full. Try clearing old frames.');
      }
    };
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
  
  useEffect(() => {
    if (!imageUrl) {
      router.push('/upload');
    }
  }, [imageUrl, router]);
  
  const primaryBlue = frameColor || '#4A90E2';
  const accentGreen = '#50E3C2';

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
  
  const generateTempFrameId = () => {
    return 'frame_' + Math.random().toString(36).substring(2, 11);
  };

  const handleChangeFrame = () => {
    if (confirm('Do you want to upload a new frame? Current progress will be lost.')) {
      router.push('/upload');
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans relative overflow-hidden bg-gradient-to-b from-[#4A90E2] via-[#8CB8E8] to-white">
      {/* Decorative dots pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${primaryBlue} 2px, transparent 2px),
            radial-gradient(circle at 80% 20%, ${accentGreen} 1.5px, transparent 1.5px),
            radial-gradient(circle at 30% 70%, ${accentGreen} 1px, transparent 1px),
            radial-gradient(circle at 75% 80%, ${primaryBlue} 2.5px, transparent 2.5px),
            radial-gradient(circle at 10% 90%, ${primaryBlue} 1.5px, transparent 1.5px),
            radial-gradient(circle at 90% 60%, ${accentGreen} 2px, transparent 2px)
          `,
          backgroundSize: '100px 100px, 150px 150px, 120px 120px, 180px 180px, 90px 90px, 110px 110px',
          backgroundPosition: '0 0, 40px 40px, 80px 20px, 20px 60px, 60px 80px, 30px 30px'
        }}
      />

      {/* Floating decorative shapes */}
      <div 
        className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ 
          backgroundColor: primaryBlue,
          top: '15%',
          left: '10%',
          animation: 'floatSlow 12s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ 
          backgroundColor: accentGreen,
          bottom: '20%',
          right: '10%',
          animation: 'floatSlow 15s ease-in-out infinite 3s'
        }}
      />

      <main className="grow flex items-center justify-center py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="flex flex-col items-center gap-6">
              <FramePreview
                frameUrl={imageUrl || undefined}
                frameColor={primaryBlue}
              />
              
              <YellowButton 
                size="lg"
                onClick={handleChangeFrame}
              >
                + Change Frame
              </YellowButton>
            </div>

            <div className="flex items-center justify-center lg:justify-center">
              <div className="w-full max-w-md">
                <ControlPanel
                  caption={caption}
                  onCaptionChange={setCaption}
                  onShare={handleShare}
                  backgroundColor={primaryBlue}
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

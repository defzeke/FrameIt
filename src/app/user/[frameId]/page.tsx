"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FramePreview from '@/app/components/FramePreview';
import Slider from '@/app/components/Slider';
import TextArea from '@/app/components/TextArea';
import YellowButton from '@/app/components/YellowButton';
import { getFrame, SavedFrame } from '@/app/utils/frameStorage';

export default function SharedFramePage() {
  const params = useParams();
  const router = useRouter();
  const frameId = params.frameId as string;
  
  const [frame, setFrame] = useState<SavedFrame | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Load frame data on mount
  useEffect(() => {
    if (!frameId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    // Fetch frame from localStorage
    const savedFrame = getFrame(frameId);
    
    if (savedFrame) {
      setFrame(savedFrame);
    } else {
      setNotFound(true);
    }
    
    setLoading(false);
  }, [frameId]);

  const handleDownload = () => {
    // TODO: Implement download functionality
    console.log('Downloading frame:', frameId);
  };

  const handleCreateYourOwn = () => {
    router.push('/sections/UploadImagePage');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading frame...</p>
        </div>
      </div>
    );
  }

  if (notFound || !frame) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="grow flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🖼️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Frame Not Found</h1>
            <p className="text-gray-600 mb-8">
              This frame doesn't exist or has been removed. Create your own frame to get started!
            </p>
            <YellowButton size="lg" onClick={handleCreateYourOwn}>
              Create Your Own Frame
            </YellowButton>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />

      <main className="grow py-12 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Shared Frame Banner */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Shared Frame
            </h1>
            <p className="text-gray-600">
              Created on {new Date(frame.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Left: Frame Preview */}
            <div className="flex flex-col items-center gap-6">
              <FramePreview
                imageUrl={frame.imageUrl}
                scale={frame.scale}
                rotate={frame.rotate}
                frameColor={frame.frameColor}
              />
              
              <div className="flex gap-4">
                <YellowButton 
                  size="lg"
                  onClick={handleDownload}
                >
                  Download Frame
                </YellowButton>
                
                <YellowButton 
                  size="lg"
                  onClick={handleCreateYourOwn}
                >
                  Create Your Own
                </YellowButton>
              </div>
            </div>

            {/* Right: Frame Info (Read-only) */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="w-full max-w-md">
                <div 
                  className="rounded-3xl shadow-2xl p-8 flex flex-col"
                  style={{ backgroundColor: frame.frameColor }}
                >
                  <h2 className="text-2xl font-bold text-white mb-6">Frame Details</h2>

                  <div className="mb-4">
                    <label className="block text-white text-sm font-medium mb-2">
                      Scale: {frame.scale}%
                    </label>
                    <div className="h-2 bg-white bg-opacity-30 rounded-full">
                      <div 
                        className="h-full bg-white rounded-full"
                        style={{ width: `${((frame.scale - 50) / 100) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-white text-sm font-medium mb-2">
                      Rotate: {frame.rotate}°
                    </label>
                    <div className="h-2 bg-white bg-opacity-30 rounded-full">
                      <div 
                        className="h-full bg-white rounded-full"
                        style={{ width: `${(frame.rotate / 360) * 100}%` }}
                      />
                    </div>
                  </div>

                  {frame.caption && (
                    <div className="mb-4 bg-white rounded-lg p-4">
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Caption
                      </label>
                      <p className="text-gray-900 whitespace-pre-wrap">
                        {frame.caption}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg">
                    <p className="text-white text-sm text-center">
                      This is a shared frame. Create your own to customize!
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

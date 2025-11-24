"use client";

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FramePreview from '@/app/components/FramePreview';
import Slider from '@/app/components/Slider';
import YellowButton from '@/app/components/YellowButton';
import TextArea from '@/app/components/TextArea';
import CarouselSection from '@/app/components/CarouselSection';

export default function UserPage() {
  const [scale, setScale] = useState(100);
  const [rotate, setRotate] = useState(0);
  const [caption, setCaption] = useState('');
  
  const primaryBlue = '#4A90E2';

  const handleDownload = () => {
    console.log('Downloading frame');
  };

  const handleAddPhoto = () => {
    console.log('Opening photo upload');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />

      <main className="grow py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            <div className="flex flex-col items-center gap-6">
              <FramePreview
                imageUrl=""
                scale={scale}
                rotate={rotate}
                frameColor={primaryBlue}
              />
              
              <YellowButton 
                size="lg"
                onClick={handleAddPhoto}
              >
                + Add your Photo
              </YellowButton>
            </div>

            <div className="flex items-center justify-center lg:justify-start">
              <div className="w-full max-w-md">
                <div 
                  className="rounded-3xl shadow-2xl p-8 flex flex-col"
                  style={{ backgroundColor: primaryBlue }}
                >

                  <Slider
                    label="Scale"
                    value={scale}
                    onChange={setScale}
                    min={50}
                    max={150}
                    step={1}
                  />

                  <Slider
                    label="Rotate"
                    value={rotate}
                    onChange={setRotate}
                    min={0}
                    max={360}
                    step={1}
                  />

                  <div className="mb-4">
                    <YellowButton 
                      size="md" 
                      className="w-full"
                      onClick={handleDownload}
                    >
                      Download Frame
                    </YellowButton>
                  </div>

                  <div className="mb-4 bg-white rounded-lg p-1">
                    <TextArea
                      value={caption}
                      onChange={setCaption}
                      placeholder="Shared Caption"
                      rows={4}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <CarouselSection />

      <Footer />
    </div>
  );
}

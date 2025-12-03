"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Copy, Check, Camera } from 'lucide-react';
import Footer from '@/components/sections/Footer';
import Slider from '@/components/ui/Slider';
import TextArea from '@/components/ui/TextArea';
import YellowButton from '@/components/ui/YellowButton';
import { downloadFrameImage } from '@/lib/downloadFrameImage';
import { useDraggableImage } from '@/hooks/useDraggableImage';
import { useLoadFrame } from '@/hooks/useLoadFrame';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';
import { useFileInput } from '@/hooks/useFileInput';

export default function SharedFrameSection() {
  const params = useParams();
  const router = useRouter();
  const frameId = params.frameId as string;
  const [userImage, setUserImage] = useState<string>('');
  const [userScale, setUserScale] = useState(100);
  const [userRotate, setUserRotate] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const { frame, loading, notFound, userCaption, setUserCaption } = useLoadFrame(frameId);
  const { copied: captionCopied, copy } = useCopyToClipboard();
  const { fileInputRef, handleAddPhoto, handleFileChange } = useFileInput(setUserImage);
  const { userImgPos, setUserImgPos, handleImgMouseDown, dragging } = useDraggableImage();

  const handleDownload = async () => {
    if (!frame) return;
    await downloadFrameImage({
      frame,
      userImage,
      userImgPos,
      userScale,
      userRotate,
      frameId,
      onStart: () => setIsDownloading(true),
      onFinish: () => setIsDownloading(false),
    });
  };

  const handleCreateYourOwn = () => {
    router.push('/upload');
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

  const accentGreen = '#50E3C2';
  const primaryBlue = '#4A90E2';

  if (notFound || !frame) {
    return (
      <div className="min-h-screen flex flex-col relative overflow-hidden" style={{
        background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
      }}>
        {/* Decorative dots pattern */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, ${primaryBlue} 2px, transparent 2px),
              radial-gradient(circle at 80% 20%, ${accentGreen} 1.5px, transparent 1.5px),
              radial-gradient(circle at 30% 70%, ${accentGreen} 1px, transparent 1px),
              radial-gradient(circle at 75% 80%, ${primaryBlue} 2.5px, transparent 2.5px)
            `,
            backgroundSize: '100px 100px, 150px 150px, 120px 120px, 180px 180px',
            backgroundPosition: '0 0, 40px 40px, 80px 20px, 20px 60px'
          }}
        />
        
        <main className="grow flex items-center justify-center px-6 relative z-10">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-4">🖼️</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Frame Not Found</h1>
            <p className="text-gray-600 mb-8">
              This frame doesn't exist or has been removed.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center overflow-x-hidden relative bg-gradient-to-b from-[#4A90E2] via-[#8CB8E8] to-white">
      {/* Decorative dots pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, ${frame.frameColor} 2px, transparent 2px),
            radial-gradient(circle at 80% 20%, ${accentGreen} 1.5px, transparent 1.5px),
            radial-gradient(circle at 30% 70%, ${accentGreen} 1px, transparent 1px),
            radial-gradient(circle at 75% 80%, ${frame.frameColor} 2.5px, transparent 2.5px),
            radial-gradient(circle at 10% 90%, ${frame.frameColor} 1.5px, transparent 1.5px),
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
          backgroundColor: frame.frameColor,
          top: '15%',
          left: '5%',
          animation: 'floatSlow 12s ease-in-out infinite'
        }}
      />
      <div 
        className="absolute w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ 
          backgroundColor: accentGreen,
          bottom: '20%',
          right: '5%',
          animation: 'floatSlow 15s ease-in-out infinite 3s'
        }}
      />

      <main className="grow py-12 px-6 relative z-10 flex items-center justify-center w-full">
        <div className="max-w-7xl mx-auto w-full flex flex-col items-center justify-center">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Customize This Frame
            </h1>
            <p className="text-gray-600">
              Upload your photo and customize the frame template
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            <div className="flex flex-col items-center gap-6">
              <div id="frame-preview" className="relative w-[480px] h-[480px] md:w-[600px] md:h-[600px] shadow-2xl overflow-hidden" style={{ backgroundColor: frame.frameColor }}>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ zIndex: 0 }}>
                  {userImage ? (
                    <img 
                      src={userImage}
                      alt="Your photo"
                      className="w-full h-full object-cover cursor-grab"
                      style={{
                        transform: `translate(${userImgPos.x}px, ${userImgPos.y}px) scale(${userScale / 100}) rotate(${userRotate}deg)`,
                        transition: dragging ? 'none' : 'transform 0.2s ease',
                        display: 'block',
                        opacity: 1
                      }}
                      onMouseDown={handleImgMouseDown}
                      onLoad={(e) => {
                      }}
                      onError={(e) => {}}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100">
                      <span className="text-4xl mb-2">📷</span>
                      <span className="text-xl font-bold text-gray-400">Upload your Photo</span>
                    </div>
                  )}
                </div>
                
                <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
                  <img 
                    src={frame.imageUrl}
                    alt="Frame overlay"
                    className="w-full h-full object-cover"
                    style={{
                      pointerEvents: 'none',
                      mixBlendMode: 'normal',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                    onLoad={(e) => {
                      // ...existing code...
                    }}
                  />
                </div>
              </div>
              
              <YellowButton 
                size="lg"
                onClick={handleAddPhoto}
              >
                + Add Your Photo
              </YellowButton>
            </div>

            {/* Right: Customization Controls */}
            <div className="flex items-center justify-center lg:justify-start">
              <div className="w-full max-w-md">
                <div
                  className="rounded-3xl shadow-2xl p-8 flex flex-col border border-gray-200"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.85) 60%, ${frame.frameColor} 100%)`,
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: '0 8px 32px 0 rgba(74,144,226,0.12)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                >
                  <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight drop-shadow-sm">Customize Frame</h2>

                  <div className="space-y-6">
                    <Slider
                      label="Scale"
                      value={userScale}
                      onChange={setUserScale}
                      min={50}
                      max={150}
                      step={1}
                    />

                    <Slider
                      label="Rotate"
                      value={userRotate}
                      onChange={setUserRotate}
                      min={0}
                      max={360}
                      step={1}
                    />
                  </div>

                  <div className="my-6">
                    <YellowButton
                      size="md"
                      className={`w-full transition-all duration-200 ${isDownloading ? 'opacity-50 cursor-wait' : 'hover:scale-[1.03] hover:shadow-lg'}`}
                      onClick={handleDownload}
                    >
                      {isDownloading ? 'Downloading...' : 'Download Frame'}
                    </YellowButton>
                  </div>

                  <div className="mb-4 bg-white/80 rounded-xl p-2 relative border border-gray-100 shadow-sm">
                    <button
                      onClick={() => copy(userCaption)}
                      className="absolute top-2 right-2 bg-white text-gray-600 hover:text-gray-900 p-2 rounded-full hover:bg-gray-50 transition-all z-10 shadow"
                      title="Copy caption"
                    >
                      {captionCopied ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <Copy size={16} />
                      )}
                    </button>
                    <TextArea
                      value={userCaption}
                      onChange={setUserCaption}
                      placeholder="Edit caption..."
                      rows={4}
                    />
                  </div>

                  <div className="mt-4 p-4 bg-white/40 rounded-lg border border-gray-100">
                    <p className="text-gray-700 text-sm text-center font-medium">
                      Template by: <span className="font-semibold text-blue-600">Original Creator</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/jpg"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

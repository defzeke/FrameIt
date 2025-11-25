"use client";

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Copy, Check } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import FramePreview from '@/app/components/FramePreview';
import Slider from '@/app/components/Slider';
import TextArea from '@/app/components/TextArea';
import YellowButton from '@/app/components/YellowButton';
import CarouselSection from '@/app/components/CarouselSection';
import { getFrame, SavedFrame } from '@/app/utils/frameStorage';
import { downloadFrame } from '@/app/utils/downloadFrame';

export default function SharedFramePage() {
  const params = useParams();
  const router = useRouter();
  const frameId = params.frameId as string;
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [frame, setFrame] = useState<SavedFrame | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [captionCopied, setCaptionCopied] = useState(false);
  
  const [userImage, setUserImage] = useState<string>('');
  const [userScale, setUserScale] = useState(100);
  const [userRotate, setUserRotate] = useState(0);
  const [userCaption, setUserCaption] = useState('');

  useEffect(() => {
    if (!frameId) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    const savedFrame = getFrame(frameId);
    
    if (savedFrame) {
      setFrame(savedFrame);

      setUserCaption(savedFrame.caption);
    } else {
      setNotFound(true);
    }
    
    setLoading(false);
  }, [frameId]);

  const handleDownload = async () => {
    if (!frame) return;
    
    setIsDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      const size = 1200;
      canvas.width = size;
      canvas.height = size;

      ctx.fillStyle = frame.frameColor || '#4A90E2';
      ctx.fillRect(0, 0, size, size);

      if (userImage) {
        const userImg = new Image();
        userImg.crossOrigin = 'anonymous';
        await new Promise((resolve, reject) => {
          userImg.onload = resolve;
          userImg.onerror = reject;
          userImg.src = userImage;
        });

        ctx.save();
        ctx.translate(size / 2, size / 2);
        ctx.rotate((userRotate * Math.PI) / 180);
        ctx.scale(userScale / 100, userScale / 100);
        ctx.drawImage(userImg, -size / 2, -size / 2, size, size);
        ctx.restore();
      }

      const frameImg = new Image();
      frameImg.crossOrigin = 'anonymous';
      await new Promise((resolve, reject) => {
        frameImg.onload = resolve;
        frameImg.onerror = reject;
        frameImg.src = frame.imageUrl;
      });
      ctx.drawImage(frameImg, 0, 0, size, size);

      canvas.toBlob((blob) => {
        if (!blob) {
          alert('Failed to create image');
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `frameit-${frameId}.png`;
        link.click();
        URL.revokeObjectURL(url);
      }, 'image/png');

    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download frame. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleAddPhoto = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      console.log('User uploaded photo:', file.name, 'URL:', url);
      console.log('File type:', file.type, 'Size:', file.size);
      setUserImage(url);
      console.log('userImage state should now be:', url);
    }
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
        <Header />
        <main className="grow flex items-center justify-center px-6 relative z-10">
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
    <div className="min-h-screen flex flex-col overflow-x-hidden relative" style={{
      background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 50%, #ffffff 100%)',
    }}>
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

      <Header />

      <main className="grow py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          
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
              <div id="frame-preview" className="relative w-[360px] h-[360px] md:w-[420px] md:h-[420px] shadow-2xl overflow-hidden" style={{ backgroundColor: frame.frameColor }}>
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ zIndex: 0 }}>
                  {userImage ? (
                    <img 
                      src={userImage}
                      alt="Your photo"
                      className="w-full h-full object-cover"
                      style={{
                        transform: `scale(${userScale / 100}) rotate(${userRotate}deg)`,
                        transition: 'transform 0.2s ease',
                        display: 'block',
                        opacity: 1
                      }}
                      onLoad={(e) => {
                        console.log('User photo rendered:', userImage);
                        console.log('Image dimensions:', e.currentTarget.naturalWidth, 'x', e.currentTarget.naturalHeight);
                        console.log('Image display:', window.getComputedStyle(e.currentTarget).display);
                        console.log('Image opacity:', window.getComputedStyle(e.currentTarget).opacity);
                      }}
                      onError={(e) => console.error('User photo failed to render:', userImage)}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <span className="text-4xl font-bold text-gray-400">Upload Photo</span>
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
                      console.error('Frame image failed to load:', frame.imageUrl);
                      e.currentTarget.style.display = 'none';
                    }}
                    onLoad={(e) => {
                      console.log('Frame image loaded successfully');
                      console.log('Frame image natural size:', e.currentTarget.naturalWidth, 'x', e.currentTarget.naturalHeight);
                      console.log('Is PNG?', frame.imageUrl.includes('image/png'));
                      console.log('Frame z-index:', window.getComputedStyle(e.currentTarget.parentElement!).zIndex);
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
                  className="rounded-3xl shadow-2xl p-8 flex flex-col"
                  style={{ backgroundColor: frame.frameColor }}
                >
                  <h2 className="text-2xl font-bold text-black mb-6">Customize Frame</h2>

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

                  <div className="mb-4">
                    <YellowButton 
                      size="md" 
                      className={`w-full ${isDownloading ? 'opacity-50 cursor-wait' : ''}`}
                      onClick={handleDownload}
                    >
                      {isDownloading ? 'Downloading...' : 'Download Frame'}
                    </YellowButton>
                  </div>

                  <div className="mb-4 bg-white rounded-lg p-1 relative">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(userCaption);
                        setCaptionCopied(true);
                        setTimeout(() => setCaptionCopied(false), 2000);
                      }}
                      className="absolute top-2 right-2 bg-white text-gray-600 hover:text-gray-900 p-2 rounded hover:bg-gray-50 transition-all z-10"
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

                  <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-lg">
                    <p className="text-black text-sm text-center font-medium">
                      Template by: Original Creator
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <CarouselSection />

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

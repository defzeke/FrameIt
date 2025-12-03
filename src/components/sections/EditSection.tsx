"use client";

import { useFrame } from '@/contexts/FrameContext';
import Footer from '@/components/sections/Footer';
import FramePreview from '@/components/ui/FramePreview';
import ControlPanel from '@/components/ui/ControlPanel';
import React, { useState } from 'react';
import { useUserDisplayName } from '@/hooks/useUserDisplayName';
import YellowButton from '@/components/ui/YellowButton';
import ShareModal from '@/components/modals/ShareModal';
import { useShareFrame } from '@/hooks/useShareFrame';
import { useRedirectIfNoImage } from '@/hooks/useRedirectIfNoImage';

export default function EditSection() {
  const [domain, setDomain] = useState('');
  const [template, setTemplate] = useState('');
  const templateBy = useUserDisplayName();
  const {
    imageUrl,
    scale,
    rotate,
    caption,
    frameColor,
    frameId,
    setCaption,
    setFrameId,
  } = useFrame();

  useRedirectIfNoImage(imageUrl);
  const { handleShare, showShareModal, setShowShareModal, shareUrl } = useShareFrame({
    imageUrl: imageUrl as string,
    scale,
    rotate,
    caption,
    frameColor: frameColor as string,
    frameId,
    setFrameId,
  });

  const primaryBlue = frameColor || '#4A90E2';
  const accentGreen = '#50E3C2';

  const handleChangeFrame = () => {
    if (confirm('Do you want to upload a new frame? Current progress will be lost.')) {
      window.location.href = '/upload';
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
          backgroundPosition: '0 0, 40px 40px, 80px 20px, 20px 60px, 60px 80px, 30px 30px',
        }}
      />

      {/* Floating decorative shapes */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          backgroundColor: primaryBlue,
          top: '15%',
          left: '10%',
          animation: 'floatSlow 12s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{
          backgroundColor: accentGreen,
          bottom: '20%',
          right: '10%',
          animation: 'floatSlow 15s ease-in-out infinite 3s',
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
              <YellowButton size="lg" onClick={handleChangeFrame}>
                + Change Frame
              </YellowButton>
            </div>
            <div className="flex items-center justify-center lg:justify-center">
              <div className="w-full max-w-md flex flex-col gap-4 mb-20">
                {/* Domain name input */}
                <div>
                  <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-1">Custom Domain</label>
                  <div className="flex items-center">
                    <input
                      id="domain"
                      name="domain"
                      type="text"
                      className="w-full px-4 py-2 rounded-l-xl bg-white border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                      placeholder="yourdomain"
                      value={domain}
                      onChange={e => setDomain(e.target.value.replace(/\s/g, ''))}
                    />
                    <span className="px-4 py-2 rounded-r-xl bg-gray-100 border border-l-0 border-gray-300 text-gray-600 select-none">.vercel.app</span>
                  </div>
                </div>
                {/* Template by input */}
                <div>
                  <label htmlFor="templateBy" className="block text-sm font-medium text-gray-700 mb-1">Template by</label>
                  <input
                    id="templateBy"
                    name="templateBy"
                    type="text"
                    className="w-full px-4 py-2 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                    placeholder="your org's name"
                    value={templateBy}
                    readOnly
                  />
                </div>
                {/* Template input (now below template by) */}
                <div>
                  <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-1">Template</label>
                  <input
                    id="template"
                    name="template"
                    type="text"
                    className="w-full px-4 py-2 rounded-xl bg-white border border-gray-300 text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4A90E2]"
                    placeholder="Enter template name"
                    value={template}
                    onChange={e => setTemplate(e.target.value)}
                  />
                </div>
                {/* Caption writer */}
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

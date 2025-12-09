
type UseShareFrameArgs = {
  imageUrl: string;
  scale: number;
  rotate: number;
  caption: string;
  frameColor: string;
  templateName?: string;
  customPath?: string;
  frameId: string | null | undefined;
  setFrameId: (id: string) => void;
};


type UseShareFrameResult = {
  handleShare: () => Promise<void>;
  showShareModal: boolean;
  setShowShareModal: (open: boolean) => void;
  shareUrl: string;
  loading: boolean;
};


export function useShareFrame({ imageUrl, scale, rotate, caption, frameColor, templateName, customPath, frameId, setFrameId }: UseShareFrameArgs): UseShareFrameResult {
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateTempFrameId = () => {
    return 'frame_' + Math.random().toString(36).substring(2, 11);
  };

  const handleShare = async () => {
    if (!imageUrl) return;
    setLoading(true);
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
        templateName: templateName || 'name',
        customPath: customPath ? `${customPath}.vercel.app` : '',
        createdAt: new Date().toISOString(),
      };
      const saved = await saveFrame(frameData);
      if (!saved) {
        setLoading(false);
        return;
      }
      // Use custom domain if provided, otherwise use current origin
      const baseUrl = customPath && customPath.trim() 
        ? `https://${customPath}.vercel.app` 
        : window.location.origin;
      const url = `${baseUrl}/user/${currentFrameId}`;
      setShareUrl(url);
      setShowShareModal(true);
    } catch (error) {
      console.error('Failed to save frame:', error);
      alert(`Failed to create shareable link: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return { handleShare, showShareModal, setShowShareModal, shareUrl, loading };
}
import { useState } from 'react';
import { saveFrame, fileToBase64 } from '@/lib/frameStorage';

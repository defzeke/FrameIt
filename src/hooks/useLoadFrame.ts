import { useEffect, useState } from 'react';
import { getFrame, SavedFrame } from '@/lib/frameStorage';

export function useLoadFrame(frameId: string) {
  const [frame, setFrame] = useState<SavedFrame | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [userCaption, setUserCaption] = useState('');

  useEffect(() => {
    if (!frameId) {
      setTimeout(() => {
        setNotFound(true);
        setLoading(false);
      }, 0);
      return;
    }
    const savedFrame = getFrame(frameId);
    if (savedFrame) {
      setTimeout(() => {
        setFrame(savedFrame);
        setUserCaption(savedFrame.caption);
        setLoading(false);
      }, 0);
    } else {
      setTimeout(() => {
        setNotFound(true);
        setLoading(false);
      }, 0);
    }
  }, [frameId]);

  return { frame, loading, notFound, userCaption, setUserCaption };
}

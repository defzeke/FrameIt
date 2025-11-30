import { useEffect, useState } from 'react';
import { getAllFrames, SavedFrame } from '@/lib/frameStorage';

export function useFrames() {
  const [frames, setFrames] = useState<SavedFrame[]>([]);

  useEffect(() => {
    const savedFrames = getAllFrames();
    const framesArray = Object.values(savedFrames);
    setFrames(framesArray);
  }, []);

  return frames;
}

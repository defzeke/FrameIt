import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useUploadHandler(setImageFile: (file: File) => void) {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleFileDrop = useCallback((file: File) => {
    setImageFile(file);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      router.push('/edit');
    }, 2000);
  }, [setImageFile, router]);

  return { showSuccess, handleFileDrop };
}

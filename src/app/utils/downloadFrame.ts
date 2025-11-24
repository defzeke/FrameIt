import html2canvas from 'html2canvas';

interface DownloadOptions {
  filename?: string;
  format?: 'png' | 'jpg';
  quality?: number;
}

/**
 * Download a frame by capturing the DOM element as an image
 * @param elementId - The ID of the element to capture
 * @param options - Download options (filename, format, quality)
 */
export const downloadFrame = async (
  elementId: string,
  options: DownloadOptions = {}
): Promise<boolean> => {
  const {
    filename = `frame-${Date.now()}`,
    format = 'png',
    quality = 0.95
  } = options;

  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.error('Element not found:', elementId);
      return false;
    }

    // Capture the element as canvas
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      scale: 2,
      logging: false,
      useCORS: true,
      allowTaint: true,
      foreignObjectRendering: false,
    });

    // Convert canvas to blob
    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob),
        format === 'jpg' ? 'image/jpeg' : 'image/png',
        quality
      );
    });

    if (!blob) {
      console.error('Failed to create blob');
      return false;
    }

    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${format}`;
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Cleanup
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error downloading frame:', error);
    return false;
  }
};

/**
 * Download frame with custom dimensions
 */
export const downloadFrameWithDimensions = async (
  elementId: string,
  width: number,
  height: number,
  options: DownloadOptions = {}
): Promise<boolean> => {
  const {
    filename = `frame-${Date.now()}`,
    format = 'png',
    quality = 0.95
  } = options;

  try {
    const element = document.getElementById(elementId);
    
    if (!element) {
      console.error('Element not found:', elementId);
      return false;
    }

    // Capture with specific dimensions
    const canvas = await html2canvas(element, {
      backgroundColor: null,
      width,
      height,
      logging: false,
      useCORS: true,
    });

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob),
        format === 'jpg' ? 'image/jpeg' : 'image/png',
        quality
      );
    });

    if (!blob) {
      console.error('Failed to create blob');
      return false;
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${format}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    
    return true;
  } catch (error) {
    console.error('Error downloading frame:', error);
    return false;
  }
};

// Frame storage utility using localStorage

export interface SavedFrame {
  frameId: string;
  imageUrl: string;
  imageData?: string; // Base64 encoded image for persistence
  scale: number;
  rotate: number;
  caption: string;
  frameColor: string;
  createdAt: string;
}

const STORAGE_KEY = 'frameit_frames';

// Save a frame to localStorage
export const saveFrame = (frame: SavedFrame): boolean => {
  try {
    const frames = getAllFrames();
    frames[frame.frameId] = frame;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(frames));
    return true;
  } catch (error) {
    console.error('Failed to save frame:', error);
    return false;
  }
};

// Get a specific frame by ID
export const getFrame = (frameId: string): SavedFrame | null => {
  try {
    const frames = getAllFrames();
    return frames[frameId] || null;
  } catch (error) {
    console.error('Failed to get frame:', error);
    return null;
  }
};

// Get all frames
export const getAllFrames = (): Record<string, SavedFrame> => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Failed to get frames:', error);
    return {};
  }
};

// Delete a frame
export const deleteFrame = (frameId: string): boolean => {
  try {
    const frames = getAllFrames();
    delete frames[frameId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(frames));
    return true;
  } catch (error) {
    console.error('Failed to delete frame:', error);
    return false;
  }
};

// Convert File/Blob to base64 for storage
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

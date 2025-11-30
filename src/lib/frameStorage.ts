export interface SavedFrame {
	frameId: string;
	imageUrl: string;
	imageData?: string;
	scale: number;
	rotate: number;
	caption: string;
	frameColor: string;
	createdAt: string;
}

const STORAGE_KEY = 'frameit_frames';
const MAX_FRAMES = 10;

const compressImage = async (base64Image: string, maxWidth = 800, quality = 0.7): Promise<string> => {
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			const canvas = document.createElement('canvas');
			let width = img.width;
			let height = img.height;

			if (width > maxWidth) {
				height = (height * maxWidth) / width;
				width = maxWidth;
			}

			canvas.width = width;
			canvas.height = height;

			const ctx = canvas.getContext('2d');
			if (!ctx) {
				reject(new Error('Could not get canvas context'));
				return;
			}

			ctx.clearRect(0, 0, width, height);
			ctx.drawImage(img, 0, 0, width, height);
      
			const isPNG = base64Image.startsWith('data:image/png');
			const compressedBase64 = isPNG 
				? canvas.toDataURL('image/png')
				: canvas.toDataURL('image/jpeg', quality);
			resolve(compressedBase64);
		};
		img.onerror = () => reject(new Error('Failed to load image'));
		img.src = base64Image;
	});
};

export const saveFrame = async (frame: SavedFrame): Promise<boolean> => {
	try {
		const frames = getAllFrames();
    
		if (frame.imageUrl && frame.imageUrl.startsWith('data:image')) {
			try {
				frame.imageUrl = await compressImage(frame.imageUrl, 800, 0.7);
			} catch (compressionError) {
				console.warn('Image compression failed, using original:', compressionError);
			}
		}
    
		const frameCount = Object.keys(frames).length;
		if (frameCount >= MAX_FRAMES && !frames[frame.frameId]) {
			const sortedFrames = Object.values(frames).sort(
				(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
			);
			const oldestFrameId = sortedFrames[0].frameId;
			delete frames[oldestFrameId];
			console.log(`Removed oldest frame ${oldestFrameId} to make space`);
		}
    
		frames[frame.frameId] = frame;
		localStorage.setItem(STORAGE_KEY, JSON.stringify(frames));
		return true;
	} catch (error) {
		console.error('Failed to save frame:', error);
    
		if (error instanceof Error && error.name === 'QuotaExceededError') {
			try {
				const frames = getAllFrames();
				const frameIds = Object.keys(frames);
				if (frameIds.length > 0) {
					const sortedFrames = Object.values(frames).sort(
						(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					);
          
					const framesToRemove = Math.max(1, Math.ceil(frameIds.length * 0.3));
					for (let i = 0; i < framesToRemove; i++) {
						delete frames[sortedFrames[i].frameId];
					}
          
					localStorage.setItem(STORAGE_KEY, JSON.stringify(frames));
          
					frames[frame.frameId] = frame;
					localStorage.setItem(STORAGE_KEY, JSON.stringify(frames));
          
					console.log(`Cleared ${framesToRemove} old frames and saved new frame`);
					return true;
				}
			} catch (recoveryError) {
				console.error('Failed to recover from quota error:', recoveryError);
			}
		}
    
		return false;
	}
};

export const getFrame = (frameId: string): SavedFrame | null => {
	try {
		const frames = getAllFrames();
		return frames[frameId] || null;
	} catch (error) {
		console.error('Failed to get frame:', error);
		return null;
	}
};

export const getAllFrames = (): Record<string, SavedFrame> => {
	try {
		const data = localStorage.getItem(STORAGE_KEY);
		return data ? JSON.parse(data) : {};
	} catch (error) {
		console.error('Failed to get frames:', error);
		return {};
	}
};

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

export const getStorageInfo = (): { used: number; total: number; frames: number } => {
	try {
		const frames = getAllFrames();
		const frameCount = Object.keys(frames).length;
		const dataSize = JSON.stringify(frames).length;
		const estimatedTotal = 5 * 1024 * 1024;
    
		return {
			used: dataSize,
			total: estimatedTotal,
			frames: frameCount
		};
	} catch (error) {
		console.error('Failed to get storage info:', error);
		return { used: 0, total: 5 * 1024 * 1024, frames: 0 };
	}
};

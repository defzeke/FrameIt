"use client";

import CloudUploadIcon from './CloudUpload';
import YellowButton from './YellowButton';
import React, { useState, useCallback } from 'react';
// ===============================================================================================

// Validation constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MIN_DIMENSION = 100; // 100px minimum
const MAX_DIMENSION = 8000; // 8000px maximum
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export interface UploadCardModelProps {
    onFileDrop: (file: File) => void;
    uploadedFile: File | null;
}
export const UploadCardModel: React.FC<UploadCardModelProps> = ({ onFileDrop, uploadedFile }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [isValidating, setIsValidating] = useState(false);

    // Use the file name from the parent state if only available
    const fileName = uploadedFile?.name || null;

    // Function to show a status message
    const showStatus = (message: string, type: 'error' | 'success' = 'error') => {
        setStatusMessage(message);
        setTimeout(() => setStatusMessage(null), type === 'error' ? 4000 : 3000);
    };

    // Comprehensive file validation
    const validateFile = useCallback(async (file: File): Promise<boolean> => {
        // Check file type
        if (!ALLOWED_TYPES.includes(file.type)) {
            showStatus('Invalid file type. Please upload JPG or PNG images only.');
            return false;
        }

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            showStatus(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`);
            return false;
        }

        if (file.size === 0) {
            showStatus('File is empty. Please select a valid image.');
            return false;
        }

        // Check image dimensions
        try {
            const dimensions = await getImageDimensions(file);
            
            if (dimensions.width < MIN_DIMENSION || dimensions.height < MIN_DIMENSION) {
                showStatus(`Image too small. Minimum dimensions: ${MIN_DIMENSION}x${MIN_DIMENSION}px.`);
                return false;
            }

            if (dimensions.width > MAX_DIMENSION || dimensions.height > MAX_DIMENSION) {
                showStatus(`Image too large. Maximum dimensions: ${MAX_DIMENSION}x${MAX_DIMENSION}px.`);
                return false;
            }

            return true;
        } catch (error) {
            showStatus('Failed to read image. Please try another file.');
            return false;
        }
    }, []);

    // Helper function to get image dimensions
    const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            const url = URL.createObjectURL(file);

            img.onload = () => {
                URL.revokeObjectURL(url);
                resolve({ width: img.width, height: img.height });
            };

            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to load image'));
            };

            img.src = url;
        });
    };

    // --- Drag/Drop Handlers (Typed for HTMLLabelElement) ---

    const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);


    const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);


    const handleDrop = useCallback(async (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        
        if (files.length === 0) return;
        
        if (files.length > 1) {
            showStatus('Please upload only one image at a time.');
            return;
        }

        const file = files[0];
        setIsValidating(true);
        
        const isValid = await validateFile(file);
        setIsValidating(false);
        
        if (isValid) {
            onFileDrop(file);
        }
    }, [onFileDrop, validateFile]);

    // Handles file selection via the hidden input
    const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        setIsValidating(true);
        const isValid = await validateFile(file);
        setIsValidating(false);
        
        if (isValid) {
            onFileDrop(file);
        }
        
        // Reset input to allow selecting the same file again
        e.target.value = '';
    }, [onFileDrop, validateFile]);


    // --- Styling Classes ---
    
    // Gradient for the large oval drop zone
    const ovalGradient = 'linear-gradient(90deg, #f0fdf4 0%, #ffffff 100%)';
    
    const dropZoneClasses = `
        w-full max-w-2xl mx-auto p-16 md:p-24 
        border-4 rounded-[4rem] 
        flex flex-col items-center justify-center text-center 
        transition-all duration-300 ease-in-out
        shadow-2xl hover:shadow-3xl
        ${isValidating
            ? 'border-blue-400 bg-blue-50 text-blue-600 cursor-wait'
            : isDragging || fileName
            ? 'border-teal-500 bg-teal-50 text-teal-600 scale-[1.01] cursor-pointer' 
            : 'border-gray-200 bg-white text-gray-400 cursor-pointer'
        }
    `;

    return (
        <div className="w-full p-8 md:p-16">
            {statusMessage && (
                <div className="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-xl z-50 transition-opacity duration-300">
                    {statusMessage}
                </div>
            )}
            
            {/*
                Clicking anywhere on this entire card will open the file explorer.
            */}
            <label 
                htmlFor="file-upload"
                className={dropZoneClasses}
                style={{
                    backgroundImage: isDragging || fileName ? undefined : ovalGradient,
                    borderColor: isDragging || fileName ? 'rgb(13 148 136)' : '#e5e7eb',
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <CloudUploadIcon className={`w-32 h-32 mb-6 ${isValidating ? 'text-blue-500 animate-pulse' : isDragging || fileName ? 'text-teal-500' : 'text-teal-400'}`} />
                
                <p className="text-3xl font-bold text-gray-700 mb-2">
                    {isValidating ? 'Validating image...' : fileName ? `File Selected: ${fileName}` : 'Drag or Drop your Frame here'}
                </p>
                <p className={`text-sm ${isValidating ? 'text-blue-600' : isDragging || fileName ? 'text-teal-600' : 'text-gray-500'}`}>
                    {isValidating ? 'Please wait...' : 'JPG or PNG only. Max 10MB. Min 100x100px.'}
                </p>
            </label>

            <input 
                id="file-upload"
                type="file" 
                accept=".jpg,.jpeg,.png"
                onChange={handleFileSelect} 
                className="hidden" 
            />

            <div className="text-center mt-8">
                <YellowButton 
                    size="lg" 
                    fullRounded={true}
                    onClick={() => !isValidating && document.getElementById('file-upload')?.click()}
                    className={isValidating ? 'opacity-50 cursor-not-allowed' : ''}
                >
                    {isValidating ? 'Validating...' : 'Browse'}
                </YellowButton>
            </div>
        </div>
    );
};

export default UploadCardModel;
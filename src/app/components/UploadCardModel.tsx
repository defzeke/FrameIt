"user client";

import CloudUploadIcon from './CloudUpload';
import React, { useState, useCallback } from 'react';
// ===============================================================================================

export interface UploadCardModelProps {
    onFileDrop: (file: File) => void;
    uploadedFile: File | null;
}
export const UploadCardModel: React.FC<UploadCardModelProps> = ({ onFileDrop, uploadedFile }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    // Use the file name from the parent state if only available
    const fileName = uploadedFile?.name || null;

    // Function to show a status message
    const showStatus = (message: string) => {
        setStatusMessage(message);
        setTimeout(() => setStatusMessage(null), 3000); // Clear after 3 seconds
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


    const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);
        
        if (files.length > 0) {
            const file = files[0];
            
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                onFileDrop(file); // Pass the file up to the parent component
            } else {
                showStatus('Validation Error: Only JPG or PNG files are accepted.');
            }
        }
    }, [onFileDrop]);

    // Handles file selection via the hidden input
    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type === 'image/jpeg' || file.type === 'image/png') {
                 onFileDrop(file);
            } else {
                 showStatus('Validation Error: Only JPG or PNG files are accepted.');
            }
        }
    }, [onFileDrop]);


    // --- Styling Classes ---
    
    // Gradient for the large oval drop zone
    const ovalGradient = 'linear-gradient(90deg, #f0fdf4 0%, #ffffff 100%)';
    
    const dropZoneClasses = `
        w-full max-w-2xl mx-auto p-16 md:p-24 
        border-4 rounded-[4rem] 
        flex flex-col items-center justify-center text-center 
        transition-all duration-300 ease-in-out cursor-pointer
        shadow-2xl hover:shadow-3xl
        ${isDragging || fileName
            ? 'border-teal-500 bg-teal-50 text-teal-600 scale-[1.01]' 
            : 'border-gray-200 bg-white text-gray-400'
        }
    `;

    return (
        <div className="w-full p-8 md:p-16">
            {/* Temporary Status Message Modal */}
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
                {/* Cloud Icon */}
                <CloudUploadIcon className={`w-20 h-20 mb-6 ${isDragging || fileName ? 'text-teal-500' : 'text-teal-400'}`} />
                
                <p className="text-3xl font-bold text-gray-700 mb-2">
                    {fileName ? `File Selected: ${fileName}` : 'Drag or Drop your Frame here'}
                </p>
                <p className={`text-sm ${isDragging || fileName ? 'text-teal-600' : 'text-gray-500'}`}>
                    Click or drop files here. JPG or PNG only.
                </p>
            </label>

            {/* Opens the file explorer */}
            <input 
                id="file-upload" // Linked by the label's htmlFor
                type="file" 
                accept=".jpg,.jpeg,.png"
                onChange={handleFileSelect} 
                className="hidden" 
            />

            {/* Visible Browse Button */}
            <div className="text-center mt-8">
                <button
                    onClick={() => document.getElementById('file-upload')?.click()}
                    className="py-3 px-10 text-lg font-bold text-white rounded-full 
                               bg-yellow-500 shadow-md hover:bg-yellow-600 transition-colors 
                               shadow-yellow-500/50"
                >
                    Browse
                </button>
            </div>
        </div>
    );
};

export default UploadCardModel;
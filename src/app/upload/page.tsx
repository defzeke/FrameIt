"use client";

import Footer from '@/components/sections/Footer';
import { UploadCardModel } from '@/components/ui/UploadCardModel';
import React, { useCallback, useEffect, useState } from 'react';
import { useFrame } from '@/contexts/FrameContext';
import { useRouter } from 'next/navigation';


export default function App() {
    const { imageFile, setImageFile } = useFrame();
    const router = useRouter();
    const primaryBlue = '#4A90E2';
    const accentGreen = '#50E3C2';

    const [showSuccess, setShowSuccess] = useState(false);

    const handleFileDrop = useCallback((file: File) => {
        console.log("File received:", file.name);
        setImageFile(file);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
            router.push('/edit');
        }, 2000);
    }, [setImageFile, router]);

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
                    backgroundPosition: '0 0, 40px 40px, 80px 20px, 20px 60px, 60px 80px, 30px 30px'
                }}
            />

            {/* Floating decorative shapes */}
            <div 
                className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ 
                    backgroundColor: primaryBlue,
                    top: '15%',
                    left: '10%',
                    animation: 'floatSlow 12s ease-in-out infinite'
                }}
            />
            <div 
                className="absolute w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
                style={{ 
                    backgroundColor: accentGreen,
                    bottom: '20%',
                    right: '10%',
                    animation: 'floatSlow 15s ease-in-out infinite 3s'
                }}
            />

            <main className="grow flex flex-col items-center justify-center px-4 py-2 relative z-10">
                {imageFile && showSuccess && (
                    <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg max-w-xl w-full text-center text-sm font-medium shadow-md transition-opacity duration-500">
                        Successfully selected: {imageFile.name} ({Math.round(imageFile.size / 1024)} KB). Redirecting...
                    </div>
                )}

                <UploadCardModel 
                    onFileDrop={handleFileDrop}
                    uploadedFile={imageFile}
                />
            </main>

            <Footer />
        </div>
    );
}
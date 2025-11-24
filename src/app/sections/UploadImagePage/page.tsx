"use client";

import Header from '@/app/components/Header'

// Use this Header import from the LandingPage directory
// import Header from '../LandingPage/LandingHeader'

import Footer from '@/app/components/Footer';
import { UploadCardModel } from '../../components/UploadCardModel';
import React, { useCallback } from 'react';
import { useFrame } from '@/app/contexts/FrameContext';
import { useRouter } from 'next/navigation';


export default function App() {
    const { imageFile, setImageFile } = useFrame();
    const router = useRouter();

    const handleFileDrop = useCallback((file: File) => {
        console.log("File received:", file.name);
        setImageFile(file);
        
        setTimeout(() => {
            router.push('/sections/EditImagePage');
        }, 500);
    }, [setImageFile, router]);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            

            <Header />
            
            <main className="grow flex flex-col items-center justify-center p-4">
                
                {imageFile && (
                    <div className="mb-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg max-w-xl w-full text-center font-medium shadow-md">
                        Successfully selected: **{imageFile.name}** ({Math.round(imageFile.size / 1024)} KB). Redirecting to editor...
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
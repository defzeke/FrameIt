"use client";


// Use this Header import from the LandingPage directory
// import Header from '../LandingPage/LandingHeader'

import BottomLabel from '../../components/BottomLabel';
import { UploadCardModel } from '../../components/UploadCardModel';
import React, { useState, useCallback } from 'react';


export default function App() {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFileDrop = useCallback((file: File) => {
        console.log("File received:", file.name);
        setUploadedFile(file);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
            
            {/* 1. NavBar
            <Header />  Uncomment this if the Header is available to be imported */}
            
            {/* Main Content Area */}
            <main className="flex-grow flex flex-col items-center justify-center p-4">
                
                {/* Status Message */}
                {uploadedFile && (
                    <div className="mb-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg max-w-xl w-full text-center font-medium shadow-md">
                        Successfully selected: **{uploadedFile.name}** ({Math.round(uploadedFile.size / 1024)} KB). Ready for processing.
                    </div>
                )}

                {/* 2. Upload Card (Exportable) */}
                <UploadCardModel 
                    onFileDrop={handleFileDrop}
                    uploadedFile={uploadedFile}
                />
            </main>

            {/* 3. Bottom Label / Footer */}
            <BottomLabel />
        </div>
    );
}
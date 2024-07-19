"use client";

import { useState, useEffect } from 'react';
import { UploadImageForm } from "@/components/uploadImageForm";
import ImageGallery from '@/components/galerie/galerie';

export default function Galerie() {
  const [images, setImages] = useState([]);
  const [uploadCount, setUploadCount] = useState(0); // State to track uploads

  useEffect(() => {
    // Fetch the images from the API route
    fetch('/api/galerie')
      .then(response => response.json())
      .then(data => {
        setImages(data.images);
      });
  }, [uploadCount]); // Dependency on uploadCount to refetch images on upload

  const handleImageUpload = () => {
    // Increment uploadCount to trigger useEffect
    setUploadCount(prevCount => prevCount + 1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadImageForm onImageUpload={handleImageUpload}/>
      <div className="gallery">
        <ImageGallery images={images} />
      </div>
    </main>
  );
}
"use client";

import React, { useState } from 'react';

interface UploadImageFormProps {
  onImageUpload?: (imageName: string) => void; // Optional prop
}

export const UploadImageForm = ({ onImageUpload }: UploadImageFormProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Generate a preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Store the selected file in state
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/galerie", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        alert("Upload ok : " + result.name);
        // Reset preview and selected file after successful upload
        setPreviewUrl(null);
        setSelectedFile(null);
        onImageUpload?.(result.name);
      } else {
        alert("Upload failed");
      }
    }
  };

  return (
    <div>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
      />
      {previewUrl && <img src={previewUrl} alt="Image preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />}
      <button onClick={handleUpload} disabled={!selectedFile}>Upload</button>
    </div>
  );
};
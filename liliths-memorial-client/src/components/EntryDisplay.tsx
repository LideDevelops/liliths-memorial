import React from 'react';
import Image from 'next/image'; // Import the Image component

interface EntryProps {
    entry: {
      title: string;
      text: string;
      imageUrl?: string; // Optional image URL
    };
    width?: number; // Optional width for the image
    height?: number; // Optional height for the image
    imagePosition?: 'left' | 'right'; // Optional image position
  }
  
  const EntryDisplay: React.FC<EntryProps> = ({ entry, width, height, imagePosition = 'left' }) => {
      return (
        <div className={`w-3/4 mx-auto my-4 p-4 bg-black text-white border border-2 border-gray-500 hover:scale-110 transition-transform duration-300 flex ${imagePosition === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
          {entry.imageUrl && (
            <div className={`flex-none ${width && height ? '' : 'w-1/3'} relative`}>
              <Image 
              src={entry.imageUrl} 
              alt="Entry Image" 
              layout={width && height ? 'intrinsic' : 'fill'}
              objectFit={width && height ? 'none' : 'contain'}
              width={width ? width : undefined}
              height={height ? height : undefined}
              />  
            </div>
          )}
          <div className="flex-grow mr-4">
            <h2 className="text-3xl font-semibold mb-2">{entry.title}</h2>
            <p className="text-gray-200 text-base">{entry.text}</p>
          </div>
        </div>
      );
  };

export default EntryDisplay;
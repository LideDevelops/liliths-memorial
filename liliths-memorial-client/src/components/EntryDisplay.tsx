import React from 'react';

// Define the props type
interface EntryProps {
  entry: {
	title: string;
	text: string;
  };
}

const EntryDisplay: React.FC<EntryProps> = ({ entry }) => {
  return (
	<div className="max-w-4xl mx-auto p-5 bg-white shadow-lg rounded-lg my-10">
	  <h2 className="text-3xl font-semibold mb-2">{entry.title}</h2>
	  <p className="text-gray-700 text-base">{entry.text}</p>
	</div>
  );
};

export default EntryDisplay;
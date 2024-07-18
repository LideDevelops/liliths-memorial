"use client"
import React, { useState } from 'react';

export default function Edit() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
	e.preventDefault();

	// Assuming your API expects title and content for an entry
	const entryData = { title, text };

	try {
	  const response = await fetch('/api/entries', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify(entryData),
	  });

	  if (!response.ok) {
		throw new Error('Failed to save the entry');
	  }

	  // Handle success - maybe clear form or show a success message
	  setTitle('');
	  setText('');
	  console.log('Entry saved successfully');
	} catch (error) {
	  console.error('Error saving entry:', error);
	}
  };

  return (
	<div className="max-w-4xl mx-auto px-4 py-8">
	  <h1 className="text-2xl font-bold mb-6">Edit Entry</h1>
	  <form onSubmit={handleSubmit} className="space-y-6">
		<div>
		  <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
		  <input
			id="title"
			type="text"
			value={title}
			onChange={(e) => setTitle(e.target.value)}
			required
			className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
		  />
		</div>

		<div>
		  <label htmlFor="text" className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
            ></textarea>
		</div>

		<button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
		  Save
		</button>
	  </form>
	</div>
  );
}
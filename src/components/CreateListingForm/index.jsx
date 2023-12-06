import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQueryClient } from 'react-query';

const CreateListingForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [media, setMedia] = useState('');
  const [endsAt, setEndsAt] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);

  const queryClient = useQueryClient();

  const handleCreateListing = async () => {
    try {
      // Validation
      const errors = [];
      if (!title.trim()) errors.push('Title is required');
      if (!description.trim()) errors.push('Description is required');
      if (!tags.trim()) errors.push('Tags are required');
      if (!media.trim()) errors.push('Media URL is required');
      if (!endsAt.trim()) errors.push('Ends At date is required');
      if (new Date(endsAt) > new Date().setFullYear(new Date().getFullYear() + 1)) {
        errors.push('Ends At date cannot be more than a year from now');
      }

      if (errors.length > 0) {
        setErrorMessages(errors);
        return;
      }

      const accessToken = localStorage.getItem('accessToken');

      const newListing = {
        title,
        description,
        tags: tags.split(',').map((tag) => tag.trim()),
        media: media.split(',').map((mediaUrl) => mediaUrl.trim()),
        endsAt: new Date(endsAt).toISOString(),
      };

      const response = await fetch('https://api.noroff.dev/api/v1/auction/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newListing),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error creating listing: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      console.log('Created listing:', data);

      // Clear form fields after successful creation (if needed)
      setTitle('');
      setDescription('');
      setTags('');
      setMedia('');
      setEndsAt('');
      setErrorMessages([]);

      // Manually trigger a refetch of the listings
      queryClient.refetchQueries('listings');

      // Invoke the onSuccess callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error creating listing:', error.message);
      // Handle errors as needed
    }
  };

  return (
    <div className="max-w-md p-4 mx-auto mb-8 bg-white rounded-md shadow-md">
      <h2 className="mb-4 text-2xl font-semibold">Create Listing</h2>
      <form>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Tags:</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Media URL for Image:</label>
          <input
            type="text"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700">Ends At:</label>
          <input
            type="datetime-local"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        {errorMessages.length > 0 && (
          <div className="mb-4 text-red-500">
            {errorMessages.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={handleCreateListing}
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700"
        >
          Create Listing
        </button>
      </form>
    </div>
  );
};

// Define propTypes
CreateListingForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default CreateListingForm;

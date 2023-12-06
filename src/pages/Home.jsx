
import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import ListingFetcher from '../components/ListingFetcher/index';
import CreateListingForm from '../components/CreateListingForm/index';
import SearchBar from '../components/SearchBar/index';

// Placeholder image URL
const placeholderImage = 'https://via.placeholder.com/300';

const ListingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    
    <div className="min-h-screen p-8">
      
      <CreateListingForm />
      <SearchBar onSearch={setSearchQuery} />
      <ListingFetcher>
        {listings => (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {listings
              .filter(listing =>
                listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (listing.tags && listing.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
              )
              .map(listing => (
                <Link
                  to={`/details/${listing.id}`}
                  key={listing.id}
                  className="block w-full transition-transform duration-300 transform hover:shadow-lg hover:scale-105"
                >
                  <div className="overflow-hidden bg-white rounded-md shadow-md">
                    <figure>
                      {listing.media.length > 0 ? (
                        <img
                          src={listing.media[0]}
                          alt={listing.title}
                          className="object-cover w-full h-48 md:h-56 rounded-t-md"
                        />
                      ) : (
                        <img
                          src={placeholderImage}
                          alt="Placeholder"
                          className="object-cover w-full h-48 md:h-56 rounded-t-md"
                        />
                      )}
                    </figure>
                    <div className="p-4">
                      <h2 className="mb-2 text-lg font-bold">{listing.title}</h2>
                      <div className="flex justify-between text-sm text-gray-500">
                        <p>
                          <strong>Time Left:</strong> {listing.endsAt}
                        </p>
                        <p>
                          <strong>Current Bids:</strong> {listing._count?.bids || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            }
          </div>
        )}
      </ListingFetcher>
    </div>
  );
};

export default ListingsPage;

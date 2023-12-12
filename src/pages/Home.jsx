
import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import ListingFetcher from '../components/ListingFetcher/index';
import FormModal from '../components/FormModal/index';
import SearchBar from '../components/SearchBar/index';

// Placeholder image URL
const placeholderImage = 'https://via.placeholder.com/300';

const ListingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Hero Section */}
      <div className="min-h-screen hero" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col items-center min-h-screen p-8">
        {/* FormModal Component */}
        <div className="mb-4">
          <FormModal />
        </div>

        {/* SearchBar Component */}
        <div className="flex items-center w-full max-w-md mb-4">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        {/* ListingFetcher Component */}
        <ListingFetcher>
          {listings => (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Listing items */}
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
                    {/* Listing Card */}
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
                            <strong>Time Left:</strong> {new Date(listing.endsAt).toLocaleString()}
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
    </>
  );
};

export default ListingsPage;

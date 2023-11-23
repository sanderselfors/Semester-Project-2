import React from 'react';
import { useQuery } from 'react-query';

const fetchListings = async () => {
  const response = await fetch('https://api.noroff.dev/api/v1/auction/listings/');
  if (!response.ok) {
    throw new Error('Failed to fetch listings');
  }
  return response.json();
};

const ListingsPage = () => {
  const { data: listings, isLoading, error } = useQuery('listings', fetchListings);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <div className="min-h-screen hero" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="text-center hero-content text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">Hello there</h1>
            <p className="mb-5 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <div key={listing.id} className="shadow-xl card w-96 bg-base-100">
            <figure><img src={listing.media[0]} alt={listing.title} className="w-full h-auto rounded-md" /></figure>
            <div className="card-body">
              <h2 className="card-title">{listing.title}</h2>
              <p>{listing.description}</p>
              <div className="flex justify-between mt-4">
                <p className="text-gray-500">Current Bids: {listing._count.bids}</p>
                <p className="text-gray-500">Time Left: {calculateTimeLeft(listing.endsAt)}</p>
              </div>
              <div className="justify-end card-actions">
                <button className="btn btn-primary">Bid Now</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};


function calculateTimeLeft(endTime) {
  const now = new Date();
  const end = new Date(endTime);
  const timeLeft = end - now;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `${days}d ${hours}h`;
};

export default ListingsPage;

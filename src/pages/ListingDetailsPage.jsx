import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { motion } from 'framer-motion';

const ListingDetailsPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState('');
  const [bidError, setBidError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const fetchListingDetails = async () => {
    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/auction/listings/${id}?_bids=true&_seller=true`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch listing: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data) {
        throw new Error('Empty data received');
      }

      data.bids = data.bids ? data.bids.sort((a, b) => b.amount - a.amount) : [];

      setListing(data);
    } catch (error) {
      setError(error.message || 'Failed to fetch listing details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListingDetails();
  }, [id]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount) || +amount <= 0) {
      setBidError('Please enter a valid bid amount.');
      return;
    }

    const accessToken = localStorage.getItem('accessToken');

    // Check if the user is authenticated
    if (!accessToken) {
      setBidError('Please log in to place a bid.');
      return;
    }

    try {
      const response = await fetch(
        `https://api.noroff.dev/api/v1/auction/listings/${id}/bids`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            amount: Number(amount),
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Unknown error');
      }

      fetchListingDetails();
      setAmount('');
      setBidError(null);

      const hasHighestBid =
        listing.bids?.length > 0 && responseData.id === listing.bids[0].id;

      setSuccessMessage(
        hasHighestBid
          ? 'You currently have the highest bid!'
          : 'Bid placed successfully!'
      );
    } catch (error) {
      console.error('Bid Error:', error);
      setBidError(
        `Failed to place bid: ${
          error.message === 'Failed to fetch' || !error.message
            ? 'Network error. Please try again.'
            : 'Bid must be higher than the current highest bid.'
        }`
      );
      setSuccessMessage(null);
    }
  };

  const handleImageClick = () => {
    if (listing?.media.length > 1) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === listing.media.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No listing found
      </div>
    );
  }

  const sellerName = listing.seller?.name || 'Unknown Seller';
  const sellerAvatar = listing.seller?.avatar;
  const endsAt = new Date(listing.endsAt).toLocaleString();
  const currentBids = listing._count?.bids || 0;
  const highestBidder = listing.bids?.length > 0 ? listing.bids[0].bidderName : null;
  const currentHighestBid = listing.bids?.length > 0 ? listing.bids[0].amount : null;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="w-full max-w-3xl p-6 bg-white rounded-md shadow-md"
      >
        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div
            className="mb-4 overflow-hidden rounded-md cursor-pointer lg:w-full"
            onClick={handleImageClick}
          >
            {listing.media?.length > 0 ? (
              <img
                src={listing.media[currentImageIndex]}
                alt={`Media ${currentImageIndex + 1}`}
                className="object-cover w-full h-64 lg:h-96"
              />
            ) : (
              <div className="flex items-center justify-center h-64 bg-gray-200">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
          <div className="lg:w-1/2 lg:ml-6">
            <div className="mb-4">
              <h2
                className="mb-2 overflow-hidden text-2xl font-semibold lg:max-w-lg overflow-ellipsis"
              >
                {listing.title}
              </h2>
              <div className="flex items-center">
                {sellerAvatar && (
                  <img
                    src={sellerAvatar}
                    alt="Seller Avatar"
                    className="w-8 h-8 mr-2 rounded-full"
                  />
                )}
                <span className="text-sm">{sellerName}</span>
              </div>
            </div>
            <div className="mb-4">
              <strong className="text-lg">Ends At:</strong> {endsAt}
              <br />
              <strong className="text-lg">Current Bids:</strong> {currentBids}
            </div>
            {highestBidder && (
              <div className="mb-4">
                <p className="text-lg text-green-500">
                  {highestBidder === localStorage.getItem('profileName')
                    ? 'You currently have the highest bid!'
                    : `${highestBidder} currently has the highest bid!`}
                </p>
              </div>
            )}
            {currentHighestBid !== null && (
              <div className="mb-4">
                <strong className="text-lg">Current Highest Bid:</strong> {currentHighestBid}
              </div>
            )}
            <form onSubmit={handleBidSubmit} className="mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Bid Amount
                </label>
                <motion.input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter your bid amount"
                  whileFocus={{ borderColor: '#6366F1' }}
                />
                {bidError && (
                  <motion.p
                    className="mt-2 text-sm text-red-500"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {bidError}
                  </motion.p>
                )}
              </div>
              <motion.button
                type="submit"
                className="w-full px-4 py-2 text-white transition duration-300 ease-in-out bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                whileHover={{ backgroundColor: '#4C51BF' }}
              >
                Place Bid
              </motion.button>
              {successMessage && (
                <motion.p
                  className="mt-2 text-lg text-green-500"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {successMessage}
                </motion.p>
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-6">
          <div className="p-4 mb-4 overflow-y-auto border rounded-md lg:w-1/2 lg:max-h-80">
            <h3 className="mb-2 text-xl font-bold">Description</h3>
            <p className="text-gray-600">{listing.description}</p>
          </div>
          <div className="p-4 overflow-y-auto border rounded-md lg:w-1/2 lg:max-h-80">
            <h3 className="mb-2 text-xl font-bold">Offers</h3>
            {localStorage.getItem('accessToken') ? (
              <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {listing.bids?.map((bid, index) => (
                  <div key={index} className="mb-2">
                    <p>
                      <strong>Bidder:</strong> {bid.bidderName}
                    </p>
                    <p>
                      <strong>Time:</strong>{' '}
                      {new Date(bid.created).toLocaleString()}
                    </p>
                    <p>
                      <strong>Bid Amount:</strong> {bid.amount}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-500">Please log in to view offers.</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ListingDetailsPage;

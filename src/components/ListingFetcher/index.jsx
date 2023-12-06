// ListingsFetcher.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

const fetchListings = async (searchQuery) => {
  const baseUrl = 'https://api.noroff.dev/api/v1/auction/listings';
  const activeFlag = '_active=true';
  const sortParams = 'sort=created&sortOrder=desc';
  const searchParams = searchQuery ? `_tag=${searchQuery}` : '';

  const url = `${baseUrl}?${activeFlag}&${sortParams}&${searchParams}`;
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch listings');
  }

  return response.json();
};

const ListingsFetcher = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data: listings, isLoading, error } = useQuery(['listings', searchQuery], () => fetchListings(searchQuery));

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (typeof children === 'function') {
    return children(listings, handleSearch);
  }

  return null;
};

ListingsFetcher.propTypes = {
  children: PropTypes.func.isRequired,
};

export default ListingsFetcher;

import React, { useState, useEffect } from 'react';
import './SearchPage.css';


const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [ads, setAds] = useState([]);

  useEffect(() => {
    fetchAds();
  }, []);

  const fetchAds = async () => {
    // Fetch ads from the backend
    const response = await fetch(`http://localhost:8000/api/search?q=${query}`);
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    setAds(data);
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
    if(query==="")
    {
      fetchAds()
    }
  };

  const handleButtonClick = () => {
    fetchAds();
  };

  return (
    <div className="search-page">
     <div className="search-bar">
        <input
          type="text"
          placeholder="Search ads"
          value={query}
          onChange={handleSearch}
        />
        <button onClick={handleButtonClick}>Search</button>
      </div>
      <div className="grid">
        {ads.map((ad) => (
          <div key={ad._id} className="card">
            <img src={ad.imageUrl} alt={ad.primaryText} />
            <h3>{ad.primaryText}</h3>
            <p>{ad.headline}</p>
            <p>{ad.description}</p>
            <a href={ad.CTA}>{ad.CTA}</a>
            <p>{ad.name}</p>
            <a href={ad.companyurl}>{ad.companyurl}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;

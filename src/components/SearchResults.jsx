import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Database, Search, MapPin, Star, ChevronRight, ChevronLeft, Menu, X } from 'lucide-react';

const SearchResults = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useState({ q: '', location: '' });
  const [results, setResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const locationParam = params.get('location');
    setSearchParams({ q: query || '', location: locationParam || '' });

    if (query === 'Traffic ticket' && locationParam === 'Palo Alto, CA') {
      setResults([
        { id: 1, name: 'Shreya Joshi', specialty: 'Traffic Law', rating: 4.9, reviews: 125, distance: '3.2 mi', address: '123 Main St, Palo Alto, CA 94301', availability: ['Oct 30', 'Nov 1', 'Nov 3'], image: 'https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/9a796db0-154e-424b-ab7f-e1bd94b28f3e/ShreyaPic.jpeg', lat: 37.4419, lng: -122.1430 },
        { id: 2, name: 'Shrish Janarthanan', specialty: 'Traffic Violations', rating: 4.8, reviews: 98, distance: '5.1 mi', address: '456 Oak Ave, Menlo Park, CA 94025', availability: ['Oct 31', 'Nov 2'], image: 'https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/a8ffe94f-a07d-4684-acf8-28c9a457b0ba/ShrishPic.jpeg', lat: 37.4530, lng: -122.1817 },
        { id: 3, name: 'Justin Blumencranz', specialty: 'DUI Defense', rating: 4.7, reviews: 210, distance: '4.5 mi', address: '789 Pine St, Mountain View, CA 94041', availability: ['Nov 1', 'Nov 4', 'Nov 5'], image: 'https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/0f21401d-42ba-4203-a95f-6734b786daca/1C4A6DF7-5628-4C8A-BB91-6C5FD11A343B.jpeg', lat: 37.3861, lng: -122.0839 },
      ]);
    } else {
      setResults([]);
    }
  }, [location]);

  useEffect(() => {
    if (results.length > 0 && window.google) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.4419, lng: -122.1430 },
        zoom: 11,
      });

      results.forEach((lawyer) => {
        new window.google.maps.Marker({
          position: { lat: lawyer.lat, lng: lawyer.lng },
          map: map,
          title: lawyer.name,
        });
      });
    }
  }, [results]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50 font-sans font-light">
      <nav className="w-full px-4 sm:px-8 py-4 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-gray-900" />
          <span className="text-xl text-gray-900">Data<span className="font-bold">BASES</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-4">
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700">Browse</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700">Help</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700">List your practice</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700">Log in</button>
          <button className="bg-yellow-300 px-6 py-2 rounded-lg text-gray-900">Sign up</button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <button className="w-full px-4 py-2 text-left hover:bg-gray-100">Browse</button>
          <button className="w-full px-4 py-2 text-left hover:bg-gray-100">Help</button>
          <button className="w-full px-4 py-2 text-left hover:bg-gray-100">List your practice</button>
          <button className="w-full px-4 py-2 text-left hover:bg-gray-100">Log in</button>
          <button className="w-full px-4 py-2 text-left bg-yellow-300 hover:bg-yellow-400">Sign up</button>
        </div>
      )}

      <main className="w-full p-4 sm:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2 sm:mb-0">{results.length} Lawyers</h1>
          <div className="flex items-center">
            <span className="mr-2 text-gray-900 text-sm sm:text-base">Today, Oct 24 - Wed, Nov 6</span>
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {['I\'m flexible', 'Time of day', 'Practice area', 'Distance', 'In-person/video', 'Years of experience', 'Language'].map((filter) => (
            <button key={filter} className="px-3 py-1 bg-white rounded-full border border-gray-300 text-gray-700 text-sm whitespace-nowrap">{filter}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {results.map((lawyer) => (
              <div key={lawyer.id} className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                  <img src={lawyer.image} alt={lawyer.name} className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg mb-4 sm:mb-0 sm:mr-4 object-cover" />
                  <div className="flex-grow text-center sm:text-left">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900">{lawyer.name}</h2>
                    <p className="text-gray-700">{lawyer.specialty}</p>
                    <div className="flex items-center justify-center sm:justify-start mt-1">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-semibold mr-2 text-gray-900">{lawyer.rating}</span>
                      <span className="text-gray-700">({lawyer.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center justify-center sm:justify-start mt-1">
                      <MapPin className="w-4 h-4 text-gray-700 mr-1" />
                      <span className="text-gray-700">{lawyer.distance} • {lawyer.address}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
                  {lawyer.availability.map((date) => (
                    <button key={date} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                      {date}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Map</h3>
              <div id="map" className="h-[300px] sm:h-[calc(100vh-200px)]"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchResults;

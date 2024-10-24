import React, { useState, useEffect } from 'react';
import { Database, Search, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LawyerSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');

  const specialties = [
    "personal injury",
    "family law",
    "criminal defense",
    "immigration",
    "estate planning",
    "business law",
    "employment law",
    "intellectual property",
    "tax law",
    "civil litigation"
  ];

  const [currentSpecialty, setCurrentSpecialty] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSpecialty((prev) => (prev + 1) % specialties.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}&location=${location}`);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50 font-sans font-light">
      {/* Navigation */}
      <nav className="w-full px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Database className="w-6 h-6 text-gray-900" />
          <span className="text-xl text-gray-900">Data<span className="font-bold">BASES</span></span>
        </div>
        
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700">Browse</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700">Help</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700">List your practice on DataBASES</button>
          <button className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700">Log in</button>
          <button className="bg-yellow-300 px-6 py-2 rounded-lg text-gray-900">Sign up</button>
        </div>
      </nav>

      {/* Main Section with Hero, Search, and Illustration */}
      <div className="relative w-full px-8 mt-16 flex justify-between items-center">
        {/* Left Content */}
        <div className="max-w-4xl">
          <h1 className="text-6xl font-light text-gray-900 mb-6">
            Find local{' '}
            <span className="font-medium text-blue-600 transition-all duration-300">
              {specialties[currentSpecialty]}
            </span>
            <br />
            attorneys who match your needs
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-6xl">
            <div className="flex items-center">
              <div className="flex-1 border-r border-gray-200">
                <div className="flex items-center p-4">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    type="text"
                    placeholder="Search for lawyers, practice areas, or legal issues..."
                    className="w-full text-lg text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center p-4">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    type="text"
                    placeholder="City, State, or Zip Code"
                    className="w-full text-lg text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <button type="submit" className="bg-yellow-300 p-4 hover:bg-yellow-400">
                <Search className="w-6 h-6 text-gray-900" />
              </button>
            </div>
          </form>
        </div>

        {/* Right Content - Scale Illustration */}
        <div className="w-[400px] h-[400px]">
          <svg viewBox="0 0 100 100" className="w-full h-full" stroke="currentColor" fill="none">
            <path d="M50,20 L20,50 L80,50 Z" className="text-blue-200" strokeWidth="1" />
            <line x1="50" y1="20" x2="50" y2="80" className="text-blue-200" strokeWidth="1" />
            <circle cx="50" cy="50" r="2" className="text-blue-300" fill="currentColor" />
            <circle cx="20" cy="50" r="5" className="text-yellow-300" fill="currentColor" />
            <circle cx="80" cy="50" r="5" className="text-yellow-300" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Info Section - Below Both Search and Illustration */}
      <div className="w-full px-8 py-16 bg-white/50 mt-16">
        <div className="max-w-2xl">
          <p className="text-xl text-gray-800 mb-4">
            Meet DataBASES, the intelligent legal search platform built for modern
            legal professionals. Available nationwide. Free for everyone.
          </p>
          <p className="text-lg text-gray-600">
            Instantly search through millions of legal cases and find the right attorney for
            your needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LawyerSearch;

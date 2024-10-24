import React, { useState, useEffect } from 'react';
import { Database, Search, MapPin, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CityAutosuggest from './CityAutoSuggest';

const LawyerSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSpecialty, setCurrentSpecialty] = useState(0);

  const specialties = [
    "persewweonal injury",
    "family law",
    "crimewwewinal defense",
    "immigration",
    "estaewewte planning",
    "employment law",
    "tax law",
    "civil litigation"
  ];

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

      <main className="w-full px-4 sm:px-8 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center w-full">
            <div className="w-full lg:w-2/3 xl:w-3/4 mb-8 lg:mb-0">
              <h1 className="text-4xl sm:text-6xl font-light text-gray-900 mb-6 text-left">
                Find local{' '}
                <span className="font-medium text-blue-600 transition-all duration-300">
                  {specialties[currentSpecialty]}
                </span>
                <br />
                attorneys who match your needs
              </h1>

              <form onSubmit={handleSearch} className="bg-white shadow-lg rounded-lg overflow-visible w-full">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r border-gray-200">
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
                  <div className="w-full sm:w-1/2 relative">
                    <CityAutosuggest location={location} setLocation={setLocation} />
                  </div>
                </div>
                <button type="submit" className="w-full sm:w-auto bg-yellow-300 p-4 hover:bg-yellow-400">
                  <Search className="w-6 h-6 text-gray-900 mx-auto" />
                </button>
              </form>
            </div>

            <div className="w-full lg:w-1/3 xl:w-1/4 max-w-[300px] lg:max-w-[400px]">
              <svg viewBox="0 0 100 100" className="w-full h-full" stroke="currentColor" fill="none">
                <path d="M50,20 L20,50 L80,50 Z" className="text-blue-200" strokeWidth="1" />
                <line x1="50" y1="20" x2="50" y2="80" className="text-blue-200" strokeWidth="1" />
                <circle cx="50" cy="50" r="2" className="text-blue-300" fill="currentColor" />
                <circle cx="20" cy="50" r="5" className="text-yellow-300" fill="currentColor" />
                <circle cx="80" cy="50" r="5" className="text-yellow-300" fill="currentColor" />
              </svg>
            </div>
          </div>
        </div>
      </main>

      <div className="w-full px-4 sm:px-8 py-8 sm:py-16 bg-white/50 mt-8 sm:mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="w-full lg:w-2/3 xl:w-3/4">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4 text-left">
              Why Choose DataBASES?
            </h2>
            <p className="text-lg sm:text-xl text-gray-800 mb-4 text-left">
              Meet DataBASES, the intelligent legal search platform built for modern
              legal professionals. Available nationwide. Free for everyone.
            </p>
            <p className="text-base sm:text-lg text-gray-600 mb-6 text-left">
              Instantly search through millions of legal cases and find the right attorney for
              your needs.
            </p>
            <ul className="list-disc list-inside text-left text-gray-700 space-y-2">
              <li>Access to a vast network of experienced attorneys across various specialties</li>
              <li>Advanced search algorithms to match you with the most suitable legal professionals</li>
              <li>Transparent ratings and reviews from verified clients</li>
              <li>Easy scheduling and communication tools</li>
              <li>Comprehensive legal resources and guides</li>
            </ul>
            <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Learn More About Our Platform
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerSearch;

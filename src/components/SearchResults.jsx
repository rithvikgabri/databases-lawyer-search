import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Database, Search, MapPin, Star, ChevronRight, ChevronLeft, Menu, X, ThumbsUp } from 'lucide-react';
import BookingModal from './BookingModal';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({ q: '', location: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [results, setResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reviewsOpen, setReviewsOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q');
    const locationParam = params.get('location');
    setSearchParams({ q: query || '', location: locationParam || '' });
    setSearchTerm(query || '');
    setSearchLocation(locationParam || '');

    setResults([
      {
        id: 1,
        name: 'Shreya Joshi',
        specialty: 'Traffic Ticket Defense',
        rating: 4.9,
        reviews: 125,
        distance: '3.2 mi',
        address: '123 Main St, Palo Alto, CA 94301',
        image: 'https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/9a796db0-154e-424b-ab7f-e1bd94b28f3e/ShreyaPic.jpeg',
        availability: [
          { day: 'Oct 30', slots: 0 },
          { day: 'Nov 1', slots: 0 },
          { day: 'Nov 3', slots: 3 },
        ],
        lat: 37.4419, 
        lng: -122.1430,
        sampleReviews: [
          { author: 'John D.', rating: 5, text: 'Shreya was incredibly helpful with my traffic ticket case. Her expertise and attention to detail made all the difference.' },
          { author: 'Sarah M.', rating: 5, text: 'I highly recommend Shreya for any traffic-related legal issues. She\'s professional, knowledgeable, and got my ticket dismissed.' },
          { author: 'Michael R.', rating: 4, text: 'Great experience working with Shreya. She explained everything clearly and helped me navigate the legal process with ease.' },
        ],
        referrals: 87,
        successfulCases: {
          "Traffic Violations": 95,
          "DUI Defense": 82,
          "License Suspension": 89
        },
      },
      { id: 2, name: 'Shrish Janarthanan', specialty: 'Traffic Violations', rating: 4.8, reviews: 98, distance: '5.1 mi', address: '456 Oak Ave, Menlo Park, CA 94025', image: 'https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/a8ffe94f-a07d-4684-acf8-28c9a457b0ba/ShrishPic.jpeg', availability: [
        { day: 'Oct 27', slots: 3 },
        { day: 'Nov 4', slots: 3 },
        { day: 'Nov 9', slots: 11 },
      ],  lat: 37.4530, lng: -122.1817 },
      { id: 3, name: 'Justin Blumencranz', specialty: 'Traffic Defense', rating: 4.7, reviews: 210, distance: '4.5 mi', address: '789 Pine St, Mountain View, CA 94041', image: 'https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/0f21401d-42ba-4203-a95f-6734b786daca/1C4A6DF7-5628-4C8A-BB91-6C5FD11A343B.jpeg', availability: ['Nov 1', 'Nov 4', 'Nov 5'], lat: 37.3861, lng: -122.0839 },
        { id: 4, name: 'Amber Kwok', specialty: 'Traffic Ticket Defense', rating: 4.6, reviews: 178, distance: '3.8 mi', address: '321 Elm St, Redwood City, CA 94063', image: 'https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/70c0f68b-4cfb-4583-a2eb-78d777953a36/IMG_1711+-+Amber+Kwok.jpeg?format=1000w', availability: ['Oct 29', 'Nov 2', 'Nov 6'],  lat: 37.4852, lng: -122.2364 },
        { id: 5, name: 'Antonio Alonso-Stepanov', specialty: 'Moving Violations', rating: 4.9, reviews: 156, distance: '6.2 mi', address: '987 Maple Ave, San Jose, CA 95110', image: 'https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/4b88591e-a622-440e-bfc3-979db8ff1fa7/Antonio+Alonso+Photo+Me+-+Antonio+Jose+Alonso-Stepanov.png?format=1000w', availability: ['Oct 30', 'Nov 3', 'Nov 5'],  lat: 37.3382, lng: -121.8863 },
        { id: 6, name: 'Sumedha Kethini', specialty: 'Traffic Law Expert', rating: 4.8, reviews: 189, distance: '2.9 mi', address: '654 Cedar Blvd, Sunnyvale, CA 94086', image: 'https://images.squarespace-cdn.com/content/v1/574bf85e3c44d8bd12ba29d6/04f0cc71-13f7-4df5-ba99-0e84c72a376d/IMG_1334+-+Sumedha+Kethini.jpg?format=1000w', availability: ['Oct 31', 'Nov 2', 'Nov 4'],  lat: 37.3688, lng: -122.0363 },
      
      // Add more mock results here...
    ]);
  }, [location]);

  useEffect(() => {
    if (results.length > 0 && window.google) {
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: 37.4419, lng: -122.1430 }, // Default to Palo Alto coordinates
        zoom: 11,
      });

      const bounds = new window.google.maps.LatLngBounds();
      results.forEach((lawyer) => {
        if (lawyer.lat && lawyer.lng) {
          const position = { lat: lawyer.lat, lng: lawyer.lng };
          new window.google.maps.Marker({
            position: position,
            map: map,
            title: lawyer.name,
          });
          bounds.extend(position);
        }
      });

      if (bounds.isEmpty()) {
        map.setCenter({ lat: 37.4419, lng: -122.1430 }); // Default center if no markers
        map.setZoom(11);
      } else {
        map.fitBounds(bounds);
      }
    }
  }, [results]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}&location=${searchLocation}`);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-yellow-50 via-blue-50 to-purple-50 font-sans font-light">
      <nav className="w-full px-4 sm:px-8 py-4 flex justify-between items-center bg-white shadow-sm">
        <Link to="/" className="flex items-center gap-2">
          <Database className="w-6 h-6 text-gray-900" />
          <span className="text-xl text-gray-900">Data<span className="font-bold">BASES</span></span>
        </Link>
        
        <form onSubmit={handleSearch} className="flex-grow mx-4 hidden md:flex">
          <div className="flex w-full max-w-3xl mx-auto">
            <div className="w-1/2 border-r border-gray-200">
              <div className="flex items-center p-2">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input 
                  type="text"
                  placeholder="Search for lawyers, practice areas, or legal issues..."
                  className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="w-1/2">
              <div className="flex items-center p-2">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <input 
                  type="text"
                  placeholder="City, State, or Zip Code"
                  className="w-full text-sm text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" className="bg-yellow-300 px-4 hover:bg-yellow-400">
              <Search className="w-5 h-5 text-gray-900" />
            </button>
          </div>
        </form>

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
          <form onSubmit={handleSearch} className="p-4">
            <div className="mb-2">
              <input 
                type="text"
                placeholder="Search for lawyers, practice areas, or legal issues..."
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <input 
                type="text"
                placeholder="City, State, or Zip Code"
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
            <button type="submit" className="w-full bg-yellow-300 p-2 rounded-md text-gray-900 hover:bg-yellow-400">
              Search
            </button>
          </form>
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
              <div key={lawyer.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between">
                  <div className="flex">
                    <img src={lawyer.image} alt={lawyer.name} className="w-32 h-32 rounded-lg mr-6 object-cover" />
                    <div className="flex flex-col justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold text-left text-gray-900">{lawyer.name}</h2>
                        <p className="text-gray-700 mb-2 text-left">{lawyer.specialty}</p>
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <Star className="w-5 h-5 text-yellow-400 mr-1" />
                          <span className="font-semibold mr-2 text-gray-900">{lawyer.rating}</span>
                          <span className="text-gray-700">({lawyer.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center text-gray-700">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{lawyer.distance} • {lawyer.address}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-2 hover:bg-blue-600 transition-colors">
                      Direct Chat
                    </button>
                    {lawyer.referrals && (
                      <p className="text-sm text-gray-600">Referred {lawyer.referrals} times</p>
                    )}
                  </div>
                </div>
                {lawyer.successfulCases && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Successful Cases</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(lawyer.successfulCases).map(([category, percentage]) => (
                        <div key={category} className="bg-gray-100 p-2 rounded">
                          <p className="text-sm font-medium text-gray-900">{category}</p>
                          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                            <div className="bg-green-600 h-2.5 rounded-full" style={{width: `${percentage}%`}}></div>
                          </div>
                          <p className="text-xs text-right mt-1">{percentage}% success rate</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {lawyer.availability.map((date, index) => (
                    <div 
                      key={index} 
                      className={`text-center cursor-pointer rounded p-2 ${
                        date.slots > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-500'
                      }`}
                      onClick={() => {
                        if (lawyer.name === 'Shreya Joshi' && date.slots > 0) {
                          setSelectedLawyer(lawyer);
                          setSelectedDate(date);
                          setIsBookingModalOpen(true);
                        }
                      }}
                    >
                      <div className="text-xs mb-1">{date.day}</div>
                      <div className="text-sm font-semibold">
                        {date.slots > 0 ? `${date.slots} appts` : 'No appts'}
                      </div>
                    </div>
                  ))}
                </div>
                {lawyer.name === 'Shreya Joshi' && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-2 cursor-pointer text-gray-900" onClick={() => setReviewsOpen(!reviewsOpen)}>
                      Recent Reviews {reviewsOpen ? '▲' : '▼'}
                    </h3>
                    {reviewsOpen && (
                      <div className="space-y-4">
                        {lawyer.sampleReviews.map((review, index) => (
                          <div key={index} className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Star className="w-5 h-5 text-yellow-400 mr-1" />
                              <span className="font-semibold mr-2">{review.rating}</span>
                              <span className="text-gray-600">{review.author}</span>
                            </div>
                            <p className="text-gray-700 text-left">{review.text}</p>
                            <div className="mt-2 flex items-center text-gray-500">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              <span>Helpful</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
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

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        lawyer={selectedLawyer}
        date={selectedDate}
      />
    </div>
  );
};

export default SearchResults;

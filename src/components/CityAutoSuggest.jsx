import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import { MapPin } from 'lucide-react';

const cities = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
  'San Antonio, TX',
  'San Diego, CA',
  'Dallas, TX',
  'San Jose, CA'
];

const CityAutosuggest = ({ location, setLocation }) => {
  const [suggestions, setSuggestions] = useState(cities);

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? cities : cities.filter(city =>
      city.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  useEffect(() => {
    console.log('Current suggestions:', suggestions);
  }, [suggestions]);

  return (
    <div className="relative w-full">
      <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={({ value }) => {
          const newSuggestions = getSuggestions(value);
          console.log('Fetched suggestions:', newSuggestions);
          setSuggestions(newSuggestions);
        }}
        onSuggestionsClearRequested={() => {
          console.log('Clearing suggestions');
          setSuggestions(cities);
        }}
        getSuggestionValue={suggestion => suggestion}
        renderSuggestion={suggestion => (
          <div className="p-2 hover:bg-gray-100 text-gray-800">
            {suggestion}
          </div>
        )}
        inputProps={{
          placeholder: 'City, State, or Zip Code',
          value: location,
          onChange: (_, { newValue }) => {
            console.log('Input value changed:', newValue);
            setLocation(newValue);
          },
          className: 'w-full pl-12 pr-4 py-4 text-lg text-gray-800 placeholder-gray-400 focus:outline-none bg-transparent'
        }}
        renderSuggestionsContainer={({ containerProps, children, query }) => (
          <div
            {...containerProps}
            className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          >
            {children}
          </div>
        )}
        alwaysRenderSuggestions={true}
      />
    </div>
  );
};

export default CityAutosuggest;
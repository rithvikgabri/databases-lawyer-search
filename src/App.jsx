import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LawyerSearch from './components/lawyersearch';
import SearchResults from './components/SearchResults';
import './App.css';

function App() {
  return (
    <div className="w-full">
      <Router>
        <Routes>
          <Route path="/" element={<LawyerSearch />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

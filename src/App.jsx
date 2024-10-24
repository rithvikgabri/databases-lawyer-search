import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LawyerSearch from './components/lawyersearch';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LawyerSearch />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;

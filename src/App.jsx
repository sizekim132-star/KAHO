// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import PhotoSorterTool from './pages/PhotoSorterTool';

function App() {
  return (
    <Router>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorter" element={<PhotoSorterTool onBack={() => window.history.back()} />} />
      </Routes>
    </Router>
  );
}
export default App;

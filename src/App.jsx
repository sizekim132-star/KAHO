// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import MemberDetail from './pages/MemberDetail';
import LoadingScreen from './components/LoadingScreen';
import { DataProvider } from './contexts/DataContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <DataProvider>
      {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/member/:name" element={<MemberDetail />} />
        </Routes>
      </Router>
    </DataProvider>
  );
}
export default App;
// redeploy trigger

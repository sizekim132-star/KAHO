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
  const [isLoading, setIsLoading] = useState(() => {
    // 세션 스토리지를 확인하여 이미 방문했는지 검사 (새로고침 시 로딩 생략)
    return !sessionStorage.getItem('kaho-visited');
  });

  const handleLoadingFinished = () => {
    setIsLoading(false);
    sessionStorage.setItem('kaho-visited', 'true');
  };

  return (
    <DataProvider>
      {isLoading && <LoadingScreen onFinished={handleLoadingFinished} />}
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

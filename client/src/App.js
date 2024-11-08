import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BackgroundMusic from './BackgroundMusic';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Task from './components/Task';
import Header from './Header';
import './styles/home.css';
import './styles/index.css';
import { useState, useEffect } from 'react';
import Preloader from './components/Preloader'

function App() {
  const location = useLocation();
  let hideNavbar = false;
  if(location.pathname === '/login' || location.pathname === '/register') {
    hideNavbar = true;
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fakeDataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
        removePreloader();
      }, 4000);
    };

    fakeDataFetch();
  }, []);

  const removePreloader = () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.transition = 'opacity 1s ease';
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.remove();
      }, 1000);
    }
  };

  return isLoading ? (
    <Preloader />
  ) : (
    <div className="App h-screen">
      {!hideNavbar && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />}/>
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}/>
        
      </Routes>
      <BackgroundMusic />
    </div>
  );
} 

export default App;

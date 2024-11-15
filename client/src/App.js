import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BackgroundMusic from './BackgroundMusic';
import Challenge from './components/Challenge';
import Home from './components/Home';
import Login from './components/Login';
import Preloader from './components/Preloader';
import Register from './components/Register';
import Task from './components/Task';
import Header from './Header';
import './styles/home.css';
import './styles/index.css';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      setIsLoggedIn(true);
    }
    else {
      setIsLoggedIn(false);
    }
  }, []);

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
        
      }, 4000);
    };

    fakeDataFetch();
  }, []);

  

  return (
    <div className="App h-screen">
      {!hideNavbar && <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}
      <Preloader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/challenge' element={<Challenge/>}/>
      </Routes>
      <BackgroundMusic/>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import BackgroundMusic from './BackgroundMusic';
import Challenge from './components/Challenge';
import FriendList from './components/friendList';
import { AuthProvider } from "./components/helper/auth";
import Home from './components/Home';
import Login from './components/Login';
import PendingFriend from './components/PendingFriend';
import Preloader from './components/Preloader';
import Progress from './components/Progress';
import Register from './components/Register';
import Task from './components/Task';
import Footer from './Footer';
import Header from './Header';
import './styles/home.css';
import './styles/index.css';
import Setting from './components/Setting';

import ProgressTracker from './components/ProgressTracker';

import Profile from './components/Profile';

import ChangePassword from './components/ChangePassword';


function App() {

  const location = useLocation();
  let hideNavbar = false;
  if(location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/change-password') {
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
    <AuthProvider>
    <div className="App h-screen">
      {!hideNavbar && <Header />}
      <Preloader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task" element={<Task />} />
        <Route path="/login" element={<Login />} />
        <Route path='/register' element={<Register />}/>
        <Route path='/challenge' element={<Challenge/>}/>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path='/progresstracker' element={<ProgressTracker/>} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/progress/:userId" element={<Progress />} />
        <Route path="/friend" element={<FriendList />} />
        <Route path="/pendingFriend" element={<PendingFriend />} />
        <Route path='/settings' element={<Setting/>} />
      </Routes>
      <BackgroundMusic/>
      {!hideNavbar && <Footer />}
    </div>
    </AuthProvider>
  );
}

export default App;

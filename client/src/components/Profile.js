import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import defaultAvatar from '../assets/default-avatar.png';
import Comment from "./Comment.js";
import { AuthContext } from './helper/auth';

function Profile() {
  const { userId } = useParams();

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const [isUser, setIsUser] = useState(false);
  const [ownerId, setOwnerId] = useState(null);

  //check user logged in or not
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!userId) {
      setError('User not Exist');
      return;
    }

    if (isLoggedIn) {
      const id = localStorage.getItem('userId');
      setOwnerId(id);
      if (id === userId) {
          setIsUser(true);
      }
    }

    const fetchUserData = async () => {
      try {
        const response = await fetch(`https://grinddaily-backend.onrender.com/api/user/${userId}`);
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setUser(data.user); 
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return (
      <div className="text-center mt-12 text-red-500">
        <h2>{error}</h2>
        <NavLink to="/login" className="text-blue-500 underline">
          Go to Login
        </NavLink>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center mt-12 text-blue-500">
        <h2>Loading...</h2>
      </div>
    );
  }


  return (
    <div className="px-8 py-32">
      {!isUser && (
        <div className="absolute top-20 left-4">
          <NavLink to="/friend" className="text-sm font-semibold text-normal hover:text-white transition">
              <span aria-hidden="true">&#128072;</span> Back
          </NavLink>
        </div>
      )}
      <div className="absolute top-4 left-4">
      </div>
      <div className="grid gap-8 items-start justify-center">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

          <main className="profile-page">
            <section className="relative py-16 bg-blueGray-200">
              <div className="container mx-auto px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg">
                  <div className="px-6">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div className="relative">
                          <img
                            alt="Profile"
                            src={user.avatarUrl || defaultAvatar}
                            className="shadow-xl rounded-full h-72 w-72 align-middle border-none max-w-xs -mt-12"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                          <div className="px-8 py-32">
                            <div className="grid gap-8 items-start justify-center">
                              <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                                <NavLink to={`/progress/${userId}`}>
                                  <button className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600">
                                    <span className="flex items-center space-x-5">
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 -rotate-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                      </svg>
                                      <span className="pr-6 text-gray-100 pixelify-sans-bold px-2 animate__animated animate__flipInX">Progress Tracker </span>
                                    </span>
                                    <span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200 pixelify-sans-bold px-2 animate__animated animate__flipInX">Check Your Progress &rarr;</span>
                                  </button>
                                </NavLink>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-200">
                              {user.friends.length}
                            </span>
                            <span className="text-sm text-gray-200 pixelify-sans-bold px-2 animate__animated animate__flipInX">Friends</span>
                          </div>
                          <div className="mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-200">
                              {user.challengesCompleted || 0}
                            </span>
                            <span className="text-sm text-gray-200 pixelify-sans-bold px-2 animate__animated animate__flipInX">Challenges Completed</span>
                          </div>
                          <div className="lg:mr-4 p-3 text-center">
                            <span className="text-xl font-bold block uppercase tracking-wide text-gray-200">
                              {user.comments.length}
                            </span>
                            <span className="text-sm text-gray-200 pixelify-sans-bold px-2 animate__animated animate__flipInX">Comments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-12">
                      <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-200 mb-2 pixelify-sans-bold px-2 animate__animated animate__flipInX">
                        {user.username}
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-gray-200 font-bold uppercase animate__animated animate__flipInX">
                        Email: {user.email}
                      </div>
                      <div className="text-sm leading-normal mt-0 mb-2 text-gray-200 font-bold animate__animated animate__flipInX">
                        User ID: {userId}
                      </div>
                      <div className="mb-2 text-gray-200 mt-10 pixelify-sans-bold px-2 animate__animated animate__flipInX">
                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400 "></i>
                        {user.bio || "No bio available"}
                      </div>
                    </div>
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                      <div className="flex flex-wrap justify-center">
                        <div className="w-full lg:w-9/12 px-4 ">
                          <Comment Comments={user.comments} profileUser={userId} commentUser={ownerId} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Profile;

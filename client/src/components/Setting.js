import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './helper/auth';

function Setting() {
  const [user, setUser] = useState(null);

  //check user logged in or not
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {

    if(!isLoggedIn) {
      console.log("user not logged in");
      return;
    }

    const userId = localStorage.getItem('userId');

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
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {

    if(!isLoggedIn) {
      console.log("user not logged in");
      return;
    }

    const userId = localStorage.getItem('userId');
  
    if (!user.username || !user.email) {
      console.error("Username and Email are required");
      return;
    }

    try {
      const response = await fetch(`https://grinddaily-backend.onrender.com/api/user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      const data = await response.json();
      console.log("User updated successfully:", data);
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="text-center mt-12 text-blue-500">
        <h2>Loading...</h2>
      </div>
    );
  }


  return (
    <>
      <div className="container w-full mx-auto px-2 pt-8 lg:pt-16 mt-16">
        <form className="flex flex-wrap" onSubmit={handleSubmit}>
        <div className="w-full lg:w-1/5 px-6 text-xl text-gray-800 leading-normal">
          <p className="text-base font-bold py-2 lg:pb-6 text-gray-400 block lg:block hidden">Menu</p>
          <div
            className="w-full sticky inset-0 hidden max-h-64 lg:h-auto overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:block mt-0 my-2 lg:my-0 border border-gray-400 lg:border-transparent bg-white shadow lg:shadow-none lg:bg-transparent z-20"
            style={{ top: "6em" }}
            id="menu-content"
          >
            <ul className="list-reset py-2 md:py-0">
              <li className="py-1 md:my-2 hover:bg-blue-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section1"
                  className="block pl-4 align-middle text-gray-400 no-underline hover:text-blue-600"
                >
                  <span className="pb-1 md:pb-0 text-sm">Change Username</span>
                </a>
              </li>
              <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section2"
                  className="block pl-4 align-middle text-gray-400 no-underline hover:text-blue-600"
                >
                  <span className="pb-1 md:pb-0 text-sm">Change Bio</span>
                </a>
              </li>
              <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section3"
                  className="block pl-4 align-middle text-gray-400 no-underline hover:text-blue-600"
                >
                  <span className="pb-1 md:pb-0 text-sm">Change Email</span>
                </a>
              </li>
              <li className="py-1 md:my-2 hover:bg-yellow-100 lg:hover:bg-transparent border-l-4 border-transparent">
                <a
                  href="#section4"
                  className="block pl-4 align-middle text-gray-400 no-underline hover:text-blue-600"
                >
                  <span className="pb-1 md:pb-0 text-sm">Change Avatar</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <section className="w-full lg:w-4/5">
          <h1 className="flex items-center font-sans font-bold break-normal text-gray-400 px-2 text-xl mt-12 lg:mt-0 md:text-2xl">
            User Settings
          </h1>
          
          <hr className="bg-gray-300 my-12" />
        
          <h2
            id="section1"
            className="font-sans font-bold break-normal text-gray-400 px-2 pb-8 text-xl"
          >
            Change Username
          </h2>
          
          <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow">
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="my-textfield"
                >
                  New Username
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="p-2 rounded-md text-gray-400 form-input block w-full focus:bg-neutral-600 bg-neutral-700"
                  id="my-textfield"
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                />
                <p className="py-2 text-sm text-gray-600">
                  Please type into the input box and hit save to change your username
                </p>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3" />
                <div className="md:w-2/3">
                </div>
              </div>
            </div>
          </div>

          <hr className="bg-gray-300 my-12" />

          <h2 className="font-sans font-bold break-normal text-gray-400 px-2 pb-8 text-xl">
            Bio
          </h2>
          
          <div id="section2" className="p-8 mt-6 lg:mt-0 rounded shadow">
              <div className="md:flex mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                    htmlFor="my-textarea"
                  >
                    Edit Bio
                  </label>
                </div>
                <div className="md:w-2/3">
                  <textarea
                    className="p-2 rounded-md text-gray-400 form-textarea block w-full focus:bg-neutral-600 bg-neutral-700"
                    id="my-textarea"
                    rows={8}
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  />
                  <p className="py-2 text-sm text-gray-600">
                    Type into the text area and hit save to add a bio to your profile
                  </p>
                </div>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3" />
              </div>
          </div>
          
          <hr className="bg-gray-300 my-12" />
          
          <h2 className="font-sans font-bold break-normal text-gray-400 px-2 pb-8 text-xl">
            Change Email
          </h2>
          
          <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow">
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="my-textfield"
                >
                  Change Email
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="p-2 rounded-md text-gray-400 form-input block w-full focus:bg-neutral-600 bg-neutral-700"
                  id="my-textfield"
                  type="text"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <p className="py-2 text-sm text-gray-600">
                  Please type into the input box and hit save to change your email
                </p>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3" />
              </div>
            </div>
          </div>
          
          <hr className="bg-gray-300 my-12" />

          <h2 className="font-sans font-bold break-normal text-gray-400 px-2 pb-8 text-xl">
            Change Avatar
          </h2>
          
          <div className="p-8 mt-6 lg:mt-0 leading-normal rounded shadow">
            <div className="md:flex mb-6">
              <div className="md:w-1/3">
                <label
                  className="block text-gray-600 font-bold md:text-left mb-3 md:mb-0 pr-4"
                  htmlFor="my-textfield"
                >
                  Image URL
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="p-2 rounded-md text-gray-400 form-input block w-full focus:bg-neutral-600 bg-neutral-700"
                  id="my-textfield"
                  type="text"
                  value={user.avatarUrl}
                  onChange={(e) => setUser({ ...user, avatarUrl: e.target.value })}
                />
                <p className="py-2 text-sm text-gray-600">
                  Please type into the input box and hit save to change your avatar
                </p>
              </div>
              <div className="md:flex md:items-center">
                <div className="md:w-1/3" />
              </div>
            </div>
          </div>

          <div>
          <button
            type="submit"
            className="w-64 py-2 m-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:bg-gradient-to-r hover:from-violet-400 hover:to-fuchsia-400 text-white font-bold rounded-md transition-transform duration-500 transform hover:scale-105"
            disabled={!user.username || !user.email}
        >
            Submit
          </button>
          </div>

        </section>

        <div className="w-full lg:w-4/5 lg:ml-auto text-base md:text-sm text-gray-600 px-4 py-24 mb-12">
          <span className="text-base text-blue-600 font-bold">&lt;</span>{" "}
          <a
            href="#"
            className="text-base md:text-sm text-blue-600 font-bold no-underline hover:underline"
          >
            Back link
          </a>
        </div>
        </form>
      </div>
    </>


  );
}



export default Setting;
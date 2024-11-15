import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Lottie from "lottie-react";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import pixelAnimation from "./assets/pixel.json";

export default function Header({ isLoggedIn, setIsLoggedIn }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    setIsLoggedIn(false);
    window.location.reload();
  }

  return (
    <header className="bg-transparent">
      <nav className="w-full mx-auto flex items-center justify-between p-4 lg:px-8">
        {/* Logo Section */}
        <div className="flex lg:flex-1">
          <NavLink to="/" className="pixelify-sans-bold text-lg text-link flex items-center">
            <Lottie
              animationData={pixelAnimation}
              loop={true}
              style={{ width: "40px", height: "40px" }}
            />
            <span className="ml-2">GRINDDAILY</span>
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open main menu"}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="-m-2.5 p-2.5 text-link rounded-md"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `text-sm font-semibold ${isActive ? "text-indigo-400" : "text-link"}`
            }
          >
            Home
          </NavLink>

          <NavLink 
            to="/challenge" 
            className={({ isActive }) => 
              `text-sm font-semibold ${isActive ? "text-indigo-400" : "text-link"}`
            }
          >
            Challenges
          </NavLink>
          <NavLink 
            to="/task" 
            className={({ isActive }) => 
              isActive ? "text-sm font-semibold text-indigo-400" : "text-sm font-semibold text-link"
            }
          >
            Calendar
          </NavLink>
        </div>

        {/* User Dropdown or Login Link */}
        {isLoggedIn ? (
          <div className="relative hidden lg:flex lg:flex-1 lg:justify-end">
            <button onClick={() => setDropDown(!dropDown)} className="focus:outline-none">
              <UserIcon className="h-6 w-6 rounded-full text-link" aria-hidden="true" />
            </button>

            {dropDown && (
              <div className="absolute right-0 mt-6 w-48 bg-zinc-800 rounded-lg shadow-lg z-20">
                <div className="py-2">
                  <NavLink to="/profile" className="block px-4 py-2 text-link font-semibold hover:bg-gray-700">
                    Profile
                  </NavLink>
                  <NavLink to="/friends" className="block px-4 py-2 text-link font-semibold hover:bg-gray-700">
                    Friends
                  </NavLink>
                  <NavLink to="/settings" className="block px-4 py-2 text-link font-semibold hover:bg-gray-700">
                    Settings
                  </NavLink>
                  <button onClick={ handleLogout }className="block w-full px-4 py-2 text-link font-semibold text-left hover:bg-gray-700">
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <NavLink to="/login" className="text-sm font-semibold text-link">
              Log in <span aria-hidden="true">&rarr;</span>
            </NavLink>
          </div>
        )}
      </nav>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel 
          style={{ backgroundColor: 'var(--custom-background-color)' }}
          className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-transparent px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
        >
          <div className="flex items-center justify-between">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="pixelify-sans-bold text-link">
              GRINDDAILY
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 p-2.5 text-link rounded-md"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-base font-semibold text-link hover:bg-gray-700">
                  Home
                </NavLink>
                <NavLink to="/task" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-base font-semibold text-link hover:bg-gray-700">
                  Challenges
                </NavLink>
                <NavLink to="/yourChallenge" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base text-link font-semibold hover:bg-gray-700">
                  Create Challenges
                </NavLink>
              </div>
              {!isLoggedIn && (
                <div className="py-6">
                  <NavLink to="/login" onClick={() => setMobileMenuOpen(false)} className="block rounded-lg px-3 py-2.5 text-base font-semibold text-link hover:bg-gray-700">
                    Log in
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}


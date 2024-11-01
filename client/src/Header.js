import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Lottie from "lottie-react";
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import pixelAnimation from "./assets/pixel.json";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-transparent">
      <nav className="w-full mx-auto flex items-center justify-between p-4 lg:px-8">
        <div className="flex lg:flex-1">
          <NavLink to="/" className="pixelify-sans-bold text-lg text-link">
            <Lottie
              animationData={pixelAnimation}
              loop={true}
              style={{
                position: "relative",
                top: "0px",
                left: "-15px",
                width: "40px",
                height: "40px",
                display: "inline-block",
              }}
            />
            <span style={{ position: "relative", top: "-12px" }}>GRINDDAILY</span>
          </NavLink>
        </div>
        <div className="flex lg:hidden">
        {mobileMenuOpen ? (
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-link"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="Open main menu"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-link"
            >
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? "text-sm font-semibold text-indigo-400" : "text-sm font-semibold text-link"
            }
          >
            Home
          </NavLink>

          <NavLink 
            to="/task" 
            className={({ isActive }) => 
              isActive ? "text-sm font-semibold text-indigo-400" : "text-sm font-semibold text-link"
            }
          >
            Challenges
          </NavLink>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <NavLink to="/login" className="text-sm font-semibold text-link">
            Log in <span aria-hidden="true">&rarr;</span>
          </NavLink>
        </div>
      </nav>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <DialogPanel 
        style= {{ backgroundColor: 'var(--custom-background-color)' }}
        className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-transparent px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="pixelify-sans-bold text-link">
              GRINDDAILY
            </NavLink>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-link"
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <NavLink to="/" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-link hover:bg-gray-700">
                  Home
                </NavLink>
                <NavLink to="/task" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2 text-base text-link font-semibold hover:bg-gray-700">
                  Challenges
                </NavLink>
              </div>
              <div className="py-6">
                <NavLink to="/login" onClick={() => setMobileMenuOpen(false)} className="-mx-3 block rounded-lg px-3 py-2.5 text-base text-link font-semibold hover:bg-gray-700">
                  Log in
                </NavLink>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}

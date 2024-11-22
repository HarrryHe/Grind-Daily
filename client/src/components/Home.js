import EastIcon from '@mui/icons-material/East';
import 'animate.css';
import Lottie from "lottie-react";
import React from 'react';
import { NavLink } from 'react-router-dom';
import chatBox from '../assets/chatBox.svg';
import hand from '../assets/hand.json';
import motivate from '../assets/motivate.json';
import Bar from './helper/Bar';


function Home() {
    return (
        <div className="home flex flex-col justify-center items-center">
            <div className="my-20 mx-3 text-center">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl pixelify-sans-bold px-2 animate__animated animate__flipInX header-text-gradient">WELCOME!</h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl pixelify-sans second-header-text-gradient animate__animated animate__flipInX">
                    to GrindDaily
                </h2>
            </div>

            <Bar title="Core Features"></Bar>

            <div className="grid grid-cols-1 gap-6 mt-12 mb-10 text-lg text-gray-400 w-10/12 h-auto sm:grid-cols-3">
                <NavLink
                    to="/task"
                    className="relative bg-slate-300 p-8 h-96 w-full text-center text-xl font-semibold text-gray-800 rounded-lg shadow-lg hover:bg-slate-400 hover:scale-105 transition duration-500 flex flex-col justify-between items-center"
                >
                    Daily Challenges
                    <Lottie
                        animationData={hand}
                        style={{ width: "80%", height: "auto", margin: "auto" }}
                        className="w-80 max-w-80 sm:max-w-xs md:max-w-sm lg:max-w-md"
                    />
                    <EastIcon className="absolute bottom-4 right-4" />
                </NavLink>

                <NavLink
                    to="/login"
                    className="relative bg-slate-300 p-8 h-96 w-full text-center text-xl font-semibold text-gray-800 rounded-lg shadow-lg hover:bg-slate-400 hover:scale-105 transition duration-500 flex flex-col justify-between items-center"
                >
                    Progress Tracking
                    <div className="my-svg-icon-container w-full max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md overflow-hidden">
                        <img src={chatBox} alt="My SVG Icon" className="my-svg-icon h-auto" />
                    </div>
                    <EastIcon className="absolute bottom-4 right-4" />
                </NavLink>
                <NavLink
                    to="/login"
                    className="relative bg-slate-300 p-8 h-96 w-full text-center text-xl font-semibold text-gray-800 rounded-lg shadow-lg hover:bg-slate-400 hover:scale-105 transition duration-500 flex flex-col justify-between items-center"
                >
                    Community Support
                    <Lottie
                        animationData={motivate}
                        style={{ width: "80%", height: "auto", margin: "auto" }}
                        className="w-80 max-w-80 sm:max-w-xs md:max-w-sm lg:max-w-md"
                    />
                    <EastIcon className="absolute bottom-4 right-4" />
                </NavLink>
            </div>


            <Bar title="Meet Our Dev Team"></Bar>

            <div className="flex flex-wrap justify-center gap-10 mt-12">

            <div className="dev-card bg-white p-6 rounded-lg shadow-lg max-w-xs w-full hover:bg-slate-100 transition-all duration-300">
                <h3 className='text-gray-800 text-lg font-semibold'>Jie Huang</h3>
                <ul>
                    <li className='text-gray-600 text-lg font-semibold'>Email: tuo77200@temple.edu</li>
                    <li className='text-gray-600 text-lg font-semibold'>Phone #: 215-###-####</li>
                </ul>
            </div>

            <div className="dev-card bg-white p-6 rounded-lg shadow-lg max-w-xs w-full hover:bg-slate-100 transition-all duration-300">
                <h3 className='text-gray-800 text-lg font-semibold'>Peter Ly</h3>
                <ul>
                    <li className='text-gray-600 text-lg font-semibold'>Email: tul6700@temple.edu</li>
                    <li className='text-gray-600 text-lg font-semibold'>Phone #: 215-###-####</li>
                </ul>
            </div>

            <div className="dev-card bg-white p-6 rounded-lg shadow-lg max-w-xs w-full hover:bg-slate-100 transition-all duration-300">
                <h3 className='text-gray-800 text-lg font-semibold'>Harry He</h3>
                <ul>
                    <li className='text-gray-600 text-lg font-semibold'>Email: tuo77200@temple.edu</li>
                    <li className='text-gray-600 text-lg font-semibold'>Phone #: 215-###-####</li>
                </ul>
            </div>

            <div className="dev-card bg-white p-6 rounded-lg shadow-lg max-w-xs w-full hover:bg-slate-100 transition-all duration-300">
                <h3 className='text-gray-800 text-lg font-semibold'>Kyle Wilson</h3>
                <ul>
                    <li className='text-gray-600 text-lg font-semibold'>Email: tuk30460@temple.edu</li>
                    <li className='text-gray-600 text-lg font-semibold'>Phone #: 215-###-#####</li>
                </ul>
            </div>

            <div className="dev-card bg-white p-6 rounded-lg shadow-lg max-w-xs w-full hover:bg-slate-100 transition-all duration-300">
                <h3 className='text-gray-800 text-lg font-semibold'>Antonio Mongeluzi</h3>
                <ul>
                    <li className='text-gray-600 text-lg font-semibold'>Email: tuj46268@temple.edu</li>
                    <li className='text-gray-600 text-lg font-semibold'>Phone #: 215-960-####</li>
                    <li className='text-gray-600 text-lg font-semibold'>Address: 1234 Temple University Rd</li>
                </ul>
            </div>

            <div className="dev-card bg-white p-6 rounded-lg shadow-lg max-w-xs w-full hover:bg-slate-100 transition-all duration-300">
                <h3 className='text-gray-800 text-lg font-semibold'>Yousuf Qari</h3>
                <ul>
                    <li className='text-gray-600 text-lg font-semibold'>Email: tuo65470@temple.edu</li>
                    <li className='text-gray-600 text-lg font-semibold'>Phone #: 215-###-####</li>
                </ul>
            </div>

        </div>

            
            
        </div>
    );
}

export default Home;
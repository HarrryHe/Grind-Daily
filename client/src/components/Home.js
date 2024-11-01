import EastIcon from '@mui/icons-material/East';
import 'animate.css';
import Lottie from "lottie-react";
import { NavLink } from 'react-router-dom';
import chatBox from '../assets/chatBox.svg';
import hand from '../assets/hand.json';
import motivate from '../assets/motivate.json';

function Home() {
    return (
        <div className="home flex flex-col justify-center items-center">
            <div className="my-20 mx-3 text-center">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl pixelify-sans-bold px-2 animate__animated animate__flipInX header-text-gradient">WELCOME!</h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl pixelify-sans second-header-text-gradient animate__animated animate__flipInX">
                    to GrindDaily
                </h2>
            </div>

            <div className="flex items-center w-10/12 lg:mt-32 sm:mt-24">
                <div className="flex-grow border-t-2 border-gray-500"></div>
                <span className="px-2 text-gray-500 text-lg font-semibold">Core Features</span>
                <div className="flex-grow border-t-2 border-gray-500"></div>
            </div>
            <div className='text-gray-500'></div>
            <div className="grid grid-cols-1 gap-6 mt-12 mb-10 text-lg text-gray-400 w-10/12 sm:grid-cols-3">
                <NavLink
                    to="/task"
                    className="relative bg-slate-300 p-8 h-96 w-full text-center text-xl font-semibold text-gray-800 rounded-lg shadow-lg hover:bg-slate-400 hover:scale-105 transition duration-500 flex flex-col justify-between items-center"
                >
                    Daily Challenges
                    <Lottie
                        animationData={hand}
                        style={{ width: "80%", height: "auto", margin: "auto" }}
                    />
                    <EastIcon className="absolute bottom-4 right-4" />
                </NavLink>

                <NavLink
                    to="/login"
                    className="relative bg-slate-300 p-8 h-96 w-full text-center text-xl font-semibold text-gray-800 rounded-lg shadow-lg hover:bg-slate-400 hover:scale-105 transition duration-500 flex flex-col justify-between items-center"
                >
                    Progress Tracking
                    <div className="my-svg-icon-container" style={{ margin: "auto", width: "80%", height: "auto" }}>
                        <img src={chatBox} alt="My SVG Icon" className="my-svg-icon" />
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
                    />
                    <EastIcon className="absolute bottom-4 right-4" />
                </NavLink>
            </div>

            <div className="flex items-center w-10/12 lg:mt-32 sm:mt-24">
                <div className="flex-grow border-t-2 border-gray-500"></div>
                <span className="px-2 text-gray-500 text-lg font-semibold">Meet Our Dev Team</span>
                <div className="flex-grow border-t-2 border-gray-500"></div>
            </div>

            <div>
                <h3 className='px-2 text-gray-500 text-lg font-semibold'>Kyle Wilson</h3>
                        <ul>
                            <li className='px-2 text-gray-500 text-lg font-semibold'>Email: tuk30460@temple.edu</li>
                            <li className='px-2 text-gray-500 text-lg font-semibold'>Phone #: 215-###-#####</li>
                        </ul>
            </div>
            <div>
                <h3 className='px-2 text-gray-500 text-lg font-semibold'>Antonio Mongeluzi</h3>
                        <ul>
                            <li className='px-2 text-gray-500 text-lg font-semibold'>Email: tuj46268@temple.edu</li>
                            <li className='px-2 text-gray-500 text-lg font-semibold'>Phone #: 215-960-####</li>
                            <li className='px-2 text-gray-500 text-lg font-semibold'>Address: 1234 Temple University Rd</li>
                        </ul>
            </div>
            
            <div>
                <h3 className='px-2 text-gray-500 text-lg font-semibold'>Yousuf Qari</h3>
                        <ul>
                            <li className='px-2 text-gray-500 text-lg font-semibold'>Email: tuo65470@temple.edu</li>
                            <li className='px-2 text-gray-500 text-lg font-semibold'>Phone #: 215-###-####</li>
                        </ul>
            </div>

            <div>
                <h3 className='px-2 text-gray-500 text-lg font-semibold'>Jie Huang</h3>
                        <ul>
                            <li className='px-2 text-gray-500 text-lg font-semibold'>Email: tuo77200@temple.edu</li>
                            <li className='px-2 text-gray-500 text-lg font-semibold'>Phone #: 215-###-####</li>
                        </ul>
            </div>
            
        </div>
    );
}

export default Home;
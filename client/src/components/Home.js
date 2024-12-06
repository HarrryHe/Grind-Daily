import EastIcon from '@mui/icons-material/East';
import 'animate.css';
import Lottie from "lottie-react";
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import chatBox from '../assets/chatBox.svg';
import hand from '../assets/hand.json';
import motivate from '../assets/motivate.json';
import Bar from './helper/Bar';
import GithubProfile from './helper/GithubProfile';
import { AuthContext } from './helper/auth';

function Home() {

    //check user logged in or not
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const userId = localStorage.getItem('userId');

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
                    to="/challenge"
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
                    to={isLoggedIn ? `/progress/${userId}` : "/login"}
                    className="relative bg-slate-300 p-8 h-96 w-full text-center text-xl font-semibold text-gray-800 rounded-lg shadow-lg hover:bg-slate-400 hover:scale-105 transition duration-500 flex flex-col justify-between items-center"
                >
                    Progress Tracking
                    <div className="my-svg-icon-container w-full max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md overflow-hidden">
                        <img src={chatBox} alt="My SVG Icon" className="my-svg-icon h-auto" />
                    </div>
                    <EastIcon className="absolute bottom-4 right-4" />
                </NavLink>
                <NavLink
                    to={isLoggedIn ? `/friend` : "/login"}
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

            <Bar title="Persist"></Bar>
            <div className="text-center mt-6 sm:mb-10 mb-10">
                <h1 className="text-3xl font-bold text-gray-300 mt-10 mb-10">Σ</h1>
                <h2 className="text-2xl font-bold text-gray-300 pixelify-sans-bold">START YOUR SIGMA JOURNEY</h2>
                <p className="mt-2 text-gray-300 w-96">
                Our platform is designed to help you take consistent steps towards self-improvement by completing daily challenges. Whether it's developing new skills, forming healthy habits, or pushing your limits, we’ve got the right challenge to keep you motivated every day. Start today, take one challenge at a time, and watch yourself grow!
                </p>
            </div>


            <Bar title="Meet Our Dev Team"></Bar>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12 mb-10">
                <GithubProfile username='HarrryHe'/>
                <GithubProfile username='PeterLy2'/>
                <GithubProfile username='JayTSXF'/>
                <GithubProfile username='AntonioMongeluzi'/>
                <GithubProfile username='KYWILS21'/>
                <GithubProfile username='qari7'/>
            </div>
            
        </div>
    );
}

export default Home;
// Card.js
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Tilt } from 'react-tilt';
import cardBackground from '../../assets/tarotCard.png';
import { AuthContext } from './auth';

function Card({ image, task, handleGenerateCard }) {
    const defaultOptions = {
        reverse: false,      // reverse the tilt direction
        max: 35,             // max tilt rotation (degrees)
        perspective: 1000,   // Transform perspective, the lower the more extreme the tilt gets.
        speed: 1000,         // Speed of the enter/exit transition (increase for smoother)
        transition: true,    // Set a transition on enter/exit.
        axis: null,          // What axis should be disabled. Can be X or Y.
        reset: true,         // If the tilt effect has to be reset on exit.
        easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",  // Smooth easing function
    };

    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handlePost = async() => {
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("User not logged in");
            return;
        }

        const challengeData = {
            userId,
            title: task.title || "Untitled",
            genre: task.genre || "Unknown",
            description: task.description || "No description provided",
            duration: task.duration || 0,
            difficulty: task.difficulty || 1,
            generatedBy: task.generatedBy || "system",
        };

        fetch('https://grinddaily-backend.onrender.com/api/challenge', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON. stringify(challengeData),
        })
        .then((response) => response.json())
        .then((data) => {
            if(!data.error) {
                console.log('Challenge Successfully Stored!', data);
            }
            else {
                console.log('Failed to store', data.error);
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    const flipSoundRef = useRef(null);
    const [isStart, setIsStart] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const debounceRef = useRef(false);

    //timer
    const remainingTimeRef = useRef(task.duration * 60);
    const [timer, setTimer] = useState('00:00:00');
    const timerIdRef = useRef(null);

    //calculate the remaining time
    const remainTime = () => {
        const seconds = Math.floor((remainingTimeRef.current) % 60);
        const minutes = Math.floor((remainingTimeRef.current / 60) % 60);
        const hours = Math.floor((remainingTimeRef.current / 60 / 60) % 24);

        remainingTimeRef.current -= 1;

        return {seconds, minutes, hours};
    }

    //start the Timer
    const startTime = () => {

        timerIdRef.current = setInterval(function() {

            let { seconds, minutes, hours } = remainTime();

            setTimer(
                (hours > 9 ? hours : "0" + hours) +
                ":" +
                (minutes > 9
                    ? minutes
                    : "0" + minutes) +
                ":" +
                (seconds > 9 ? seconds : "0" + seconds)
            );

            if (remainingTimeRef.current <= 0) {
                clearInterval(timerIdRef.current);
                timerIdRef.current = null;
                setIsStart(false);
                alert("Time up! Sorry that you did not complete the task");
                remainingTimeRef.current = task.duration * 60;
                setTimer('00:00:00');
            }

        }, 1000);
    }

    const handleStart = () => {
        setIsStart(!isStart);
        if (!isStart) {
            //start
            alert("Timer Start! Good Luck! Σ!");
            startTime();
        } else {
            //user completed
            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
            alert("Congratulation on Completing The Challenge! Σ");
            setTimeout(() => {handleGenerateCard()}, 2000);

            if(isLoggedIn){
                handlePost();
            }
        }
    }

    const handleCancel = () => {
        setIsStart(false);
        if(timerIdRef.current){
            clearInterval(timerIdRef.current);
            timerIdRef.current = null;
            remainingTimeRef.current = task.duration * 60;
            setTimer('00:00:00');
        }
    }

    useEffect(() => {
        flipSoundRef.current = new Audio('/music/flipcard-91468.mp3');
        return () => clearInterval(timerIdRef.current);
    }, []);

    const handleMouseOver = () => {
        if (!debounceRef.current) {
            setIsFlipped(true);
            debounceRef.current = true;
            setTimeout(() => (debounceRef.current = false), 300);
        }
    };

    const handleMouseLeave = () => {
        if (!debounceRef.current) {
            setIsFlipped(false);
            debounceRef.current = true;
            setTimeout(() => (debounceRef.current = false), 300);
            flipSoundRef.current?.play().catch(console.error);
        }
    };

    return (
        <div>
            <Tilt options={defaultOptions}>
                <div
                    className={`relative shadow-xl w-[300px] h-[450px] 
  sm:w-[350px] sm:h-[500px] 
  lg:w-[400px] lg:h-[550px]
  xl:w-[450px] xl:h-[600px]
  max-w-[95%] max-h-[95%] rounded-3xl transition-transform duration-700 ease-in-out ${
                        isFlipped ? 'rotate-y-180' : ''
                    }`}
                    onMouseEnter={handleMouseOver}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        transformStyle: 'preserve-3d',
                        perspective: '1000px',
                    }}
                >
                    {/* Back Side */}
                    <div
                        className="card absolute w-full h-full rounded-3xl flex items-center justify-center backface-hidden transition-transform duration-500"
                        style={{
                            backgroundImage: `url(${cardBackground})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backfaceVisibility: 'hidden',
                        }}
                    ></div>

                    {/* Front Side */}
                    <div
                        className="absolute w-full h-full rounded-3xl overflow-hidden backface-hidden rotate-y-180 bg-black shadow-lg text-white transition-transform duration-500"
                        style={{
                            backfaceVisibility: 'hidden',
                        }}
                    >
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>
                        <img src={image} className="absolute inset-0 w-full h-full object-cover z-0" alt="Card Front" />

                        <div className="relative z-20 p-4 text-neutral-300 lg:space-y-4 sm:space-y-2">
                            <div>
                                <span className="font-extrabold lg:text-2xl sm:text-lg">{task.title}</span>
                            </div>
                            <div className="flex-grow border-t-2 border-gray-400"></div>
                            <div className="flex flex-col lg:space-y-2 sm:space-y-1">
                                <span className="font-normal lg:text-base sm:text-sm">Genre: {task.genre}</span>
                                <span className="lg:text-2xl sm:text-lg font-extrabold">Duration: {task.duration} mins</span>
                                <span className="font-normal lg:text-base sm:text-xs">{task.description}</span>
                            </div>
                            <div className="flex flex-col space-y-4">
                                <span className="font-extrabold lg:text-1xl sm:text-base">Difficulty: {task.difficulty}</span>
                            </div>

                            <h2 className="lg:mt-2 sm:mt-1 p-2 w-full text-center lg:text-3xl sm:text-2xl font-extrabold">{timer}</h2>

                            {isStart ? (
                                <div>
                                    <button
                                        onClick={handleStart}
                                        className="w-full py-1 bg-green-500 hover:bg-green-400 text-white font-bold rounded-md transition-transform duration-500 transform hover:scale-105"
                                    >
                                        Complete
                                    </button>
                                    <button
                                        onClick={handleCancel}
                                        className="lg:mt-2 sm:mt-1 w-full py-1 bg-red-500 hover:bg-red-400 text-white font-bold rounded-md transition-transform duration-500 transform hover:scale-105"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            ):(
                                <div>
                                    <button
                                        onClick={handleStart}
                                        className="w-full py-1 bg-green-500 hover:bg-green-400 text-white font-bold rounded-md transition-transform duration-500 transform hover:scale-105"
                                    >
                                        Start
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Tilt>
        </div>

    );
}

export default Card;
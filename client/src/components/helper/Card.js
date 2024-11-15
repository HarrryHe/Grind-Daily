// Card.js
import React, { useEffect, useRef } from 'react';

function Card({
    id,
    image,
    task,
    isSelected,
    isHovered,
    isCardMoving,
    onClick,
    onMouseEnter,
    onMouseLeave,
    }) {
    const flipSoundRef = useRef(null);

    useEffect(() => {
        flipSoundRef.current = new Audio('/music/flipcard-91468.mp3');
    }, []);

    const handleCardFlip = () => {
        if (flipSoundRef.current) {
        flipSoundRef.current.play().catch((error) => {
            console.error('Error playing audio: ', error);
        });
        }
    };

    return (
        <div
        className={`absolute w-[300px] h-[450px] bg-transparent cursor-pointer rounded-3xl perspective-1000 transition-transform duration-700 ease-in-out ${
            isSelected && !isCardMoving ? 'z-50 left-1/2 top-1/2' : ''
        }`}
        style={{
            transform: isSelected && !isCardMoving
            ? 'translate(-50%, -50%) scale(1)'
            : `translateX(${id * 20 + 50}px) translateY(-${id * 10}px) scale(0.9)`,
            transition: isCardMoving ? 'transform 0.7s ease-in-out' : 'transform 0.3s ease-in-out',
            position: 'absolute',
        }}
        onClick={() => onClick(id)}
        onMouseEnter={() => {
            onMouseEnter(id);
            handleCardFlip();
        }}
        onTouchStart={() => {
            onMouseEnter(id);
            handleCardFlip();
        }}
        onMouseLeave={onMouseLeave}
        onTouchEnd={onMouseLeave}
        >
        <div
            className={`relative w-full h-full preserve-3d ${
            isHovered ? 'rotate-y-180' : ''
            } duration-500`}
        >
            {/* Front Face of the Card */}
            <div className="absolute w-full h-full bg-gradient-to-b from-pink-500 to-blue-500 rounded-3xl shadow-lg flex items-center justify-center backface-hidden">
            <h1 className="text-3xl md:text-4xl lg:text-5xl pixelify-sans-bold text-center text-white">
                GRIND DAILY
            </h1>
            </div>

            {/* Flipped Side of the Card */}
            <div className="absolute w-full h-full rounded-3xl overflow-hidden backface-hidden rotate-y-180">
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm z-10"></div>

            <img src={image} className="absolute inset-0 w-full h-full object-cover z-0" alt="Card" />

            <div className="relative z-20 p-5 text-neutral-300 space-y-5">
                <div>
                <span className="font-bold text-2xl">{task.title}</span>
                </div>
                <div className="flex flex-col space-y-2">
                <span className="font-semibold">Genre: {task.genre}</span>
                <span className="text-2xl font-bold">Duration: {task.duration} mins</span>
                <span>{task.description}</span>
                </div>
                <div className="flex flex-col space-y-5">
                <span className="font-bold">Difficulty: {task.difficulty}</span>
                </div>
            </div>
            </div>

        </div>
        </div>
    );
}

export default Card;


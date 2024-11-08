import React, { useEffect, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';


export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);


  const togglePlay = () => {
    setIsPlaying(prev => !prev);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };


    useEffect(() => {
      const startMusicOnInteraction = () => {
        audioRef.current.play();
        setIsPlaying(true);
        window.removeEventListener('click', startMusicOnInteraction);
        window.removeEventListener('keydown', startMusicOnInteraction);
    };


    
    window.addEventListener('click', startMusicOnInteraction);
    window.addEventListener('keydown', startMusicOnInteraction);


    return () => {
      window.removeEventListener('click', startMusicOnInteraction);
      window.removeEventListener('keydown', startMusicOnInteraction);
    };
  }, []);


  return (
    <div>
      <audio ref={audioRef} src="/music/Interlinked.mp3" loop />
      <button onClick={togglePlay} style={{ position: 'fixed', top: '10px', right: '10px' }}>
        {isPlaying ? <FaVolumeUp /> : <FaVolumeMute />}
      </button>
    </div>
  );
}
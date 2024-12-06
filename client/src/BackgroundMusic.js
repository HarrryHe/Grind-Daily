import React, { useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false); 

  const togglePlay = () => {
    setIsPlaying(prev => !prev);
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  return (
    <div>
      <audio ref={audioRef} src="/music/Interlinked.mp3" loop muted={!isPlaying} />
      <button onClick={togglePlay} className="fixed bottom-5 right-5 text-slate-300 active:scale-125 transition-transform duration-200">
        {isPlaying ? <FaVolumeUp className="w-6 h-6"/> : <FaVolumeMute className="w-6 h-6"/>}
      </button>
    </div>
  );
} 
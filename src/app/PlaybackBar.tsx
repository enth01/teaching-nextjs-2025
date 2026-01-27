"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function PlaybackBar() {
  const [paused, setPaused] = useState(false);
  const song_length = 180;
  const song_name = "test_song"
  const [time_percentage, set_time_percentage] = useState("0")
  const [count, setCount] = useState(0);

  function pause() {
    if (paused){
      setPaused(false);
      return;
    }
    setPaused(true);
  }

  function next() {
    setCount(0);
    setPaused(true);
    set_time_percentage("0")
  }

  function previous() {
    setCount(0);
    setPaused(true);
    set_time_percentage("0")
  }

  useEffect(() => {
    if (paused) {
      return
    }

    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    set_time_percentage(String(Math.floor(count / song_length * 100)))

    if (count >= song_length){
      setPaused(true)
    }

    return () => clearInterval(intervalId);
  }, [count, paused]);
  
  function handleChange(value: string) {
    set_time_percentage(value)
    setCount(Math.floor(song_length / 100 * Number(value)));
  }

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4">
      <div className="flex flex-col items-center mb-2">
        <span className="font-bold">{song_name}</span>
        <span className="text-sm text-gray-500">{count}s</span>
      </div>

      <input 
        type="range" 
        min={0} 
        max="100" 
        value={time_percentage} 
        className="range w-full cursor-pointer h-2" 
        onChange={e => handleChange(e.target.value)} 
      />

      <div className="flex items-center justify-center gap-6 mt-4">
        <button onClick={previous} className="hover:opacity-75 transition-opacity">
          <Image src={"/previous.png"} width={30} height={30} alt="Previous" />
        </button>
        
        <button onClick={pause} className="hover:opacity-75 transition-opacity">
          <Image src={paused ? "/play.png" : "/pause.png"} width={30} height={30} alt="Play/Pause" />
        </button>
        
        <button onClick={next} className="hover:opacity-75 transition-opacity">
          <Image src={"/next.png"} width={30} height={30} alt="Next" />
        </button>
      </div>
    </div>
  );
}

"use client"

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function PlaybackBar(props: { songs: { name: string, duration: number, author: string }[] }) {
  const [queue] = useState(props.songs);
  const [paused, setPaused] = useState(false);
  const [song_length, setSongLength] = useState(queue[0].duration);
  const [song_name, setSongName] = useState(queue[0].name);
  const [author_name, setAuthorName] = useState(queue[0].author);
  const [time_percentage, set_time_percentage] = useState("0")
  const [count, setCount] = useState(0);
  const [shuffle, setShuffle] = useState(false);

  function pause() {
    if (paused) {
      setPaused(false);
      return;
    }
    setPaused(true);
  }

  function Next_song() {
    setCount(0);
    set_time_percentage("0")
    const current_index = queue.findIndex((song) => song.name === song_name);
    if (shuffle === true) {
      const random_index = Math.floor(Math.random() * queue.length);
      setSongName(queue[random_index].name);
      setAuthorName(queue[random_index].author);
      setSongLength(queue[random_index].duration);
    } else {
      if (current_index === queue.length - 1) {
        setSongName(queue[0].name);
        setAuthorName(queue[0].author);
        setSongLength(queue[0].duration);
        setPaused(true);
      } else {
        setSongLength(queue[(current_index + 1)].duration)
        setAuthorName(queue[(current_index + 1)].author)
        setSongName(queue[(current_index + 1)].name)
      }
    }
  }

  function previous() {
    // setCount(0);
    // set_time_percentage("0");
    const current_index = queue.findIndex((song) => song.name === song_name);

    if (current_index === 0) {
      setSongName(queue[queue.length - 1].name);
      setAuthorName(queue[queue.length - 1].author);
      setSongLength(queue[queue.length - 1].duration);
      setPaused(true);
    } else {
      setSongLength(queue[(current_index - 1)].duration)
      setAuthorName(queue[(current_index - 1)].author)
      setSongName(queue[(current_index - 1)].name)
    }
    
  }

  useEffect(() => {
    if (paused) {
      return
    }

    const intervalId = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    set_time_percentage(String(Math.floor(count / song_length * 100)))

    if (count >= song_length) {
      Next_song();
    }

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, paused, song_length]);

  function handleChange(value: string) {
    set_time_percentage(value)
    setCount(Math.floor(song_length / 100 * Number(value)));
  }

  function shuffle_songs() {
    setShuffle(!shuffle)
  }

  return (
    <main className="flex flex-col items-center w-full max-w-md mx-auto p-4">
      <div className="flex flex-col items-center mb-2">
        <span className="font-bold">{song_name}</span>
        <span className="text-sm text-gray-500">{author_name}</span>
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
          <Image src={"/previous.png"} width={30} height={30} className='h-auto w-auto' alt="Previous" />
        </button>

        <button onClick={pause} className="hover:opacity-75 transition-opacity">
          <Image src={paused ? "/play.png" : "/pause.png"} width={30} height={30} className='h-auto w-auto' alt="Play/Pause" />
        </button>

        <button onClick={Next_song} className="hover:opacity-75 transition-opacity">
          <Image src={"/next.png"} width={30} height={30} className='h-auto w-auto' alt="Next" />
        </button>

        <button onClick={shuffle_songs}>
          <Image unoptimized src={shuffle ? "/no_shuffle.png" : "/dance-hiphop.gif"} width={30} height={30} alt="Shuffle" />
        </button>
      </div>
    </main>
  );
}

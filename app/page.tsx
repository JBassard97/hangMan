"use client";

import { useRef } from "react";
import Keyboard from "./Components/Keyboard/Keyboard";
import Gallows from "./Components/Gallows/Gallows";
import "./Home.scss";

export default function Home() {
  const keyboardRef = useRef(null);

  const handleKeyboardClick = (letter: string) => {
    console.log(letter);
  };

  return (
    <div className="home-page">
      <h2 className="home-title">Hangman 69</h2>
      <Gallows keyboardRef={keyboardRef} />
      <Keyboard onClick={handleKeyboardClick} ref={keyboardRef} />
    </div>
  );
}

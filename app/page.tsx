"use client";

import { useRef, useState, useEffect } from "react";
import Keyboard from "./Components/Keyboard/Keyboard";
import Gallows from "./Components/Gallows/Gallows";
import "./Home.scss";

export default function Home() {
  const keyboardRef = useRef(null);
  const [clickedLetter, setClickedLetter] = useState<string | null>(null);
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);

  const handleKeyboardClick = (letter: string) => {
    setClickedLetter(letter);
  };

  useEffect(() => {
    console.log("Correct Letters:", correctLetters);
    console.log("Incorrect Letters:", incorrectLetters);
  }, [correctLetters, incorrectLetters]);

  return (
    <div className="home-page">
      <h2 className="home-title">Hangman 69</h2>
      <Gallows
        keyboardRef={keyboardRef}
        clickedLetter={clickedLetter}
        setCorrectLetters={setCorrectLetters}
        setIncorrectLetters={setIncorrectLetters}
      />
      <Keyboard onClick={handleKeyboardClick} ref={keyboardRef} />
    </div>
  );
}

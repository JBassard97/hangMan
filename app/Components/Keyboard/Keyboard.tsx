"use client";
import React, { forwardRef } from "react";
import Keycap from "./Keycap/Keycap";
import "./Keyboard.scss";

interface KeyboardProps {
  onClick: (letter: string) => void;
  correctLetters: string[];
  incorrectLetters: string[];
}

const Keyboard = forwardRef<HTMLDivElement, KeyboardProps>(
  ({ onClick, correctLetters, incorrectLetters }, ref) => {
    const row1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const row2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const row3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const handleClick = (letter: string) => {
      onClick(letter);
    };

    return (
      <div className="full-keyboard" ref={ref}>
        <div className="key-row1">
          {row1.map((letter, index) => (
            <Keycap
              key={index}
              letter={letter}
              correctLetters={correctLetters}
              incorrectLetters={incorrectLetters}
              onClick={() => handleClick(letter)}
            />
          ))}
        </div>
        <div className="key-row2">
          {row2.map((letter, index) => (
            <Keycap
              key={index}
              letter={letter}
              correctLetters={correctLetters}
              incorrectLetters={incorrectLetters}
              onClick={() => handleClick(letter)}
            />
          ))}
        </div>
        <div className="key-row3">
          {row3.map((letter, index) => (
            <Keycap
              key={index}
              letter={letter}
              correctLetters={correctLetters}
              incorrectLetters={incorrectLetters}
              onClick={() => handleClick(letter)}
            />
          ))}
        </div>
      </div>
    );
  }
);

export default Keyboard;

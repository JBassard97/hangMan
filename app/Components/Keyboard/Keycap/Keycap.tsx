"use client";

// Keycap.jsx
import React from "react";
import "./Keycap.scss";

interface KeycapProps {
  letter: string;
  onClick: () => void;
  correctLetters: string[];
  incorrectLetters: string[];
}

const Keycap = ({
  letter,
  onClick,
  correctLetters,
  incorrectLetters,
}: KeycapProps) => {
  const handleKeyClick = () => {
    onClick();
  };

  // Determine if the letter has been guessed correctly or incorrectly
  const isCorrect = correctLetters.includes(letter);
  const isIncorrect = incorrectLetters.includes(letter);

  // Apply appropriate background color based on the guesses
  let backgroundColor = "";
  if (isCorrect) {
    backgroundColor = "green";
  } else if (isIncorrect) {
    backgroundColor = "red";
  }

  // Inline style object to set background color
  const keycapStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <div className="keycap" style={keycapStyle} onClick={handleKeyClick}>
      {letter}
    </div>
  );
};

export default Keycap;

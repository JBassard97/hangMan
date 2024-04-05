"use client";

// Keycap.jsx
import React from "react";
import "./Keycap.scss";

const Keycap = ({ letter }: { letter: string }) => {
  const handleClick = () => {
    console.log(letter);
  };

  return (
    <div className="keycap" onClick={handleClick}>
      {letter}
    </div>
  );
};

export default Keycap;

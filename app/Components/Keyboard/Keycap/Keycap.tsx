"use client";

// Keycap.jsx
import React from "react";
import "./Keycap.scss";

interface KeycapProps {
  letter: string;
  onClick: () => void;
}

const Keycap = ({ letter, onClick }: KeycapProps) => {
  const handleKeyClick = () => {
    onClick();
  }


  return <div className="keycap" onClick={handleKeyClick}>{letter}</div>;
};

export default Keycap;

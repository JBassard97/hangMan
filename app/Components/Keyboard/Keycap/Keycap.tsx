"use client";

// Keycap.jsx
import React from "react";
import "./Keycap.scss";

interface KeycapProps {
  letter: string;
}

const Keycap = ({ letter }: KeycapProps) => {
  return <div className="keycap">{letter}</div>;
};

export default Keycap;

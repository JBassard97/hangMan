"use client";
import React, { useState, MutableRefObject } from "react";
import Modal from "../Modal/Modal";
import "./Gallows.scss";

interface GallowsProps {
  keyboardRef: MutableRefObject<HTMLDivElement | null>;
}

const Gallows = ({ keyboardRef }: GallowsProps) => {
  const [showModal, setShowModal] = useState(false);
  const [beginButtonVisible, setBeginButtonVisible] = useState(true);
  const [gameMode, setGameMode] = useState(null);
  const [gameModeSelected, setGameModeSelected] = useState(false);
  const [wordInput, setWordInput] = useState("");
  const [submittedWord, setSubmittedWord] = useState("");

  let maxInputLength = 30;

  const handleBeginClick = () => {
    setShowModal(true);
    setBeginButtonVisible(false); // Hide the Begin button when clicked
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBeginButtonVisible(true);
    setGameMode(null);
    setGameModeSelected(false);
  };

  const handleGameModeChange = (mode: any) => {
    setGameMode(mode);
    setGameModeSelected(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmittedWord(wordInput);
    setWordInput("");
    setShowModal(false);
    if (keyboardRef.current) {
      keyboardRef.current.style.opacity = "1";
    }
  };

  return (
    <div className="full-gallows">
      {beginButtonVisible && (
        <button className="start-button" onClick={handleBeginClick}>
          Begin?
        </button>
      )}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-background" onClick={handleCloseModal} />
          <Modal onClose={handleCloseModal}>
            {!gameModeSelected && (
              <>
                <button onClick={() => handleGameModeChange("single")}>
                  Single Player
                </button>
                <button onClick={() => handleGameModeChange("multi")}>
                  Multi Player
                </button>
              </>
            )}
            {gameMode === "single" && (
              <div>
                {/* Render content for single player mode */}
                <p>You have chosen single player mode.</p>
                {/* Add additional content for single player mode */}
              </div>
            )}
            {gameMode === "multi" && (
              <div>
                <form onSubmit={handleSubmit}>
                  <p>Enter word or phrase ({maxInputLength} characters max)</p>
                  <input
                    type="text"
                    id="wordInput"
                    value={wordInput}
                    maxLength={maxInputLength}
                    onChange={(e) => setWordInput(e.target.value)}
                  />
                  <p>
                    {wordInput.length} / {maxInputLength}
                  </p>
                  <button type="submit" className="multi-submit">
                    Submit
                  </button>
                </form>
              </div>
            )}
          </Modal>
        </div>
      )}

      {submittedWord && (
        <>
          <div>
            <svg height="300" width="400">
              <g id="body">
                <g id="head">
                  <circle
                    cx="200"
                    cy="80"
                    r="20"
                    stroke="white"
                    strokeWidth="4"
                    fill="white"
                  />
                  <g id="rEyes">
                    <circle cx="193" cy="80" r="4" />
                    <circle cx="207" cy="80" r="4" />
                  </g>
                </g>
                <line
                  x1="200"
                  y1="100"
                  x2="200"
                  y2="150"
                  stroke="white"
                  strokeWidth="4"
                />
                <line
                  id="armL"
                  x1="200"
                  y1="120"
                  x2="170"
                  y2="140"
                  stroke="white"
                  strokeWidth="4"
                />
                <line
                  id="armR"
                  x1="200"
                  y1="120"
                  x2="230"
                  y2="140"
                  stroke="white"
                  strokeWidth="4"
                />
                <line
                  id="legL"
                  x1="200"
                  y1="150"
                  x2="180"
                  y2="190"
                  stroke="white"
                  strokeWidth="4"
                />
                <line
                  id="legR"
                  x1="200"
                  y1="150"
                  x2="220"
                  y2="190"
                  stroke="white"
                  strokeWidth="4"
                />
              </g>
              <line
                x1="10"
                y1="250"
                x2="300"
                y2="250"
                stroke="white"
                strokeWidth="4"
              />
              <line
                x1="100"
                y1="250"
                x2="100"
                y2="20"
                stroke="white"
                strokeWidth="4"
              />
              <line
                x1="100"
                y1="20"
                x2="200"
                y2="20"
                stroke="white"
                strokeWidth="4"
              />
              <line
                id="rope"
                x1="200"
                y1="20"
                x2="200"
                y2="60"
                stroke="white"
                strokeWidth="4"
              />
            </svg>
          </div>
          <div className="word-container">
            {submittedWord.split(" ").map((word, index) => (
              <div key={index} className="word-wrapper">
                {word.split("").map((letter, i) => (
                  <span key={`${index}-${i}`} className="letter-container">
                    <span className="letter">
                      {letter === " " ? "\u00A0" : letter}
                    </span>
                    {letter !== " " && <span className="underline"></span>}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Gallows;

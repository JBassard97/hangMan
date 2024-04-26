"use client";
import React, { useState, useEffect, MutableRefObject } from "react";
import Modal from "../Modal/Modal";
import "./Gallows.scss";

interface GallowsProps {
  keyboardRef: MutableRefObject<HTMLDivElement | null>;
  clickedLetter: string | any;
  setCorrectLetters: React.Dispatch<React.SetStateAction<string[]>>;
  setIncorrectLetters: React.Dispatch<React.SetStateAction<string[]>>;
}

const Gallows = ({
  keyboardRef,
  clickedLetter,
  setCorrectLetters,
  setIncorrectLetters,
}: GallowsProps) => {
  const [showStartModal, setShowStartModal] = useState(false); // State to toggle modal show
  const [beginButtonVisible, setBeginButtonVisible] = useState(true); // State to show or hide begin button
  const [gameMode, setGameMode] = useState(null); // Single or Multi
  const [gameModeSelected, setGameModeSelected] = useState(false); // Did the user select a game mode
  const [wordInput, setWordInput] = useState(""); // Word inputted in modal form
  const [submittedWord, setSubmittedWord] = useState(""); // Word submitted and later looped over
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]); // State for guessed letters
  const [incorrectStrikes, setIncorrectStrikes] = useState(0);

  // Handling guesses from clicking Keycap components
  useEffect(() => {
    if (clickedLetter && submittedWord) {
      if (guessedLetters.includes(clickedLetter)) {
        // If already guessed prevent duplicate processing
        return;
      }

      setGuessedLetters((prevGuessedLetters) => [
        ...prevGuessedLetters,
        clickedLetter,
      ]);

      // Check if the clicked letter is in the submitted word
      if (submittedWord.includes(clickedLetter)) {
        // Add the clicked letter to the correctLetters array
        setCorrectLetters((prevCorrectLetters) => [
          ...prevCorrectLetters,
          clickedLetter,
        ]);
      } else {
        // Add the clicked letter to the incorrectLetters array
        setIncorrectLetters((prevIncorrectLetters) => [
          ...prevIncorrectLetters,
          clickedLetter,
        ]);

        // Increment incorrectStrikes
        setIncorrectStrikes((prevStrikes) => prevStrikes + 1);
      }
    }
  }, [clickedLetter]);

  // Handling guesses from physically typing
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check if submittedWord is not empty
      if (submittedWord) {
        let typedLetter: string = event.key.toUpperCase(); // Grab the typed letter
        const isAlphabetic: boolean = /^[a-zA-Z]$/.test(typedLetter); // Ensure it's A-Z
        if (isAlphabetic) {
          if (guessedLetters.includes(typedLetter)) {
            // If already guessed prevent duplicate processing
            return;
          }

          setGuessedLetters((prevGuessedLetters) => [
            ...prevGuessedLetters,
            typedLetter,
          ]);

          // Check if the typed letter is in the submitted word
          if (submittedWord.includes(typedLetter)) {
            // Add the typed letter to the correctLetters array
            setCorrectLetters((prevCorrectLetters) => [
              ...prevCorrectLetters,
              typedLetter,
            ]);
          } else {
            // Add the typed letter to the incorrectLetters array
            setIncorrectLetters((prevIncorrectLetters) => [
              ...prevIncorrectLetters,
              typedLetter,
            ]);

            // Increment incorrectStrikes
            setIncorrectStrikes((prevStrikes) => prevStrikes + 1);
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [submittedWord]);

  let maxInputLength = 30;

  const handleBeginClick = () => {
    setShowStartModal(true);
    setBeginButtonVisible(false); // Hide the Begin button when clicked
  };

  const handleCloseModal = () => {
    setShowStartModal(false);
    setBeginButtonVisible(true);
    setGameMode(null);
    setGameModeSelected(false);
    setSubmittedWord("");
    setGuessedLetters([]);
    setCorrectLetters([]);
    setIncorrectLetters([]);
    setIncorrectStrikes(0);
    if (keyboardRef.current) {
      keyboardRef.current.style.opacity = "0.1";
    }
  };

  const handleGameModeChange = (mode: any) => {
    setGameMode(mode);
    setGameModeSelected(true);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmittedWord(wordInput.toUpperCase());
    setWordInput("");
    setShowStartModal(false);
    if (keyboardRef.current) {
      keyboardRef.current.style.opacity = "1";
    }
  };

  const hasWon = () => {
    // Check if all letters in the submitted word exist in the guessed letters array
    const allLettersGuessed = submittedWord
      .split("")
      .every((letter) => guessedLetters.includes(letter));
    return incorrectStrikes < 6 && allLettersGuessed;
  };

  return (
    <div className="full-gallows">
      {beginButtonVisible && (
        <button className="start-button" onClick={handleBeginClick}>
          Begin?
        </button>
      )}
      {showStartModal && (
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

      {submittedWord && hasWon() && (
        <Modal onClose={handleCloseModal}>
          <p>You Won!</p>
        </Modal>
      )}

      {submittedWord && (
        <>
          <div>
            <svg height="300" width="400">
              <g id="body">
                {/* Head */}
                {incorrectStrikes >= 1 && (
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
                )}
                {/* Spine */}
                {incorrectStrikes >= 2 && (
                  <line
                    id="spine"
                    x1="200"
                    y1="100"
                    x2="200"
                    y2="150"
                    stroke="white"
                    strokeWidth="4"
                  />
                )}
                {/* Left Arm */}
                {incorrectStrikes >= 3 && (
                  <line
                    id="armL"
                    x1="200"
                    y1="120"
                    x2="170"
                    y2="140"
                    stroke="white"
                    strokeWidth="4"
                  />
                )}
                {/* Right Arm */}
                {incorrectStrikes >= 4 && (
                  <line
                    id="armR"
                    x1="200"
                    y1="120"
                    x2="230"
                    y2="140"
                    stroke="white"
                    strokeWidth="4"
                  />
                )}
                {/* Left Leg */}
                {incorrectStrikes >= 5 && (
                  <line
                    id="legL"
                    x1="200"
                    y1="150"
                    x2="180"
                    y2="190"
                    stroke="white"
                    strokeWidth="4"
                  />
                )}
                {/* Right Leg */}
                {incorrectStrikes >= 6 && (
                  <line
                    id="legR"
                    x1="200"
                    y1="150"
                    x2="220"
                    y2="190"
                    stroke="white"
                    strokeWidth="4"
                  />
                )}
              </g>
              {/* End of body */}
              {/* Rest of SVG should STAY */}
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
                    <span
                      className="letter"
                      style={{
                        opacity: guessedLetters.includes(letter) ? 1 : 0,
                      }}
                    >
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

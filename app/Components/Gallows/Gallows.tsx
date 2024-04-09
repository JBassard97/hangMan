"use client";
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./Gallows.scss";

const Gallows = () => {
  const [showModal, setShowModal] = useState(false);
  const [beginButtonVisible, setBeginButtonVisible] = useState(true);
  const [gameMode, setGameMode] = useState(null);
  const [gameModeSelected, setGameModeSelected] = useState(false);
  const [wordInput, setWordInput] = useState("");

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
    console.log("Word or phrase submitted:", wordInput);
    // setWordInput("");
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
                  <label htmlFor="wordInput">Enter your word or phrase:</label>
                  <input
                    type="text"
                    id="wordInput"
                    value={wordInput}
                    onChange={(e) => setWordInput(e.target.value)}
                  />
                  <button type="submit">Submit</button>
                </form>
              </div>
            )}
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Gallows;

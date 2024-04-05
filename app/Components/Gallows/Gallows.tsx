"use client";

// Gallows.tsx
import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./Gallows.scss";

const Gallows = () => {
  const [showModal, setShowModal] = useState(false);
  const [beginButtonVisible, setBeginButtonVisible] = useState(true);

  const handleBeginClick = () => {
    setShowModal(true);
    setBeginButtonVisible(false); // Hide the Begin button when clicked
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setBeginButtonVisible(true);
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
            <form>
              {/* Your form elements here */}
              <button type="submit">Submit</button>
            </form>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Gallows;

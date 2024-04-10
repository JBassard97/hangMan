"use client";

// Modal.tsx
import React, { ReactNode } from "react";
import "./Modal.scss";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <div className="modal-children">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

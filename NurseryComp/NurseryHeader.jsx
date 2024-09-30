import React from 'react';
import './NurseryHeader.css';
import { FaPuzzlePiece, FaPaintBrush, FaMusic } from 'react-icons/fa'; // Icons for each option
import { useNavigate } from 'react-router-dom';

function NurseryHeader() {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <header className="nursery-header">
      <div className="header-container">
        <h1 className="nursery-title">Welcome to Fun Learning!</h1>
        <div className="nursery-options">
          <div className="option-item" onClick={() => handleNavigate("/Nursury/Puzzle")}>
            <FaPuzzlePiece className="icon" />
            <span>Puzzle Game</span>
          </div>
          <div className="option-item" onClick={() => handleNavigate("/Nursury/PickPaint")}>
            <FaPaintBrush className="icon" />
            <span>Pick & Paint</span>
          </div>
          <div className="option-item" onClick={() => handleNavigate("/Nursury/LearnABC")}>
            <FaMusic className="icon" />
            <span>Musical ABC</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NurseryHeader;

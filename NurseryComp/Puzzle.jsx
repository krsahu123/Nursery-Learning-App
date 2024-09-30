import React, { useState, useEffect } from 'react';
import './PuzzleComponent.css';
import congratsSound from './../Assets/logos/song.mp3';
import defaultPuzzleImage from './../Assets/logos/Dog.png';

import { FaUpload } from 'react-icons/fa';

import leftImage1 from './../Assets/A-To-Z/apple.png';
import leftImage2 from './../Assets/A-To-Z/cat.png';
import rightImage1 from './../Assets/A-To-Z/king.png';
import rightImage2 from './../Assets/A-To-Z/orange.png';

const PUZZLE_SIZE = 3; // Define puzzle size (3x3)

const PuzzleComponent = () => {
  const [pieces, setPieces] = useState([]);
  const [solved, setSolved] = useState(false);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [puzzleImage, setPuzzleImage] = useState(defaultPuzzleImage);

  const leftSelectBoxImages = [leftImage1, leftImage2];
  const rightSelectBoxImages = [rightImage1, rightImage2];

  useEffect(() => {
    const puzzlePieces = generatePuzzlePieces(puzzleImage);
    setPieces(shuffleArray(puzzlePieces));
  }, [puzzleImage]);

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const resizedImage = resizeImage(img, 300, 300); // Resize image to fit puzzle
        setPuzzleImage(resizedImage);
      };
    };
    reader.readAsDataURL(file);
  };

  // Resize image function
  const resizeImage = (image, width, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL(); // Convert resized image to data URL
  };

  const handleDrop = (event, targetIndex) => {
    const sourceIndex = event.dataTransfer.getData('pieceIndex');
    const newPieces = [...pieces];
    [newPieces[sourceIndex], newPieces[targetIndex]] = [newPieces[targetIndex], newPieces[sourceIndex]];
    setHistory([...history, pieces]);
    setPieces(newPieces);
    checkIfSolved(newPieces);
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('pieceIndex', index);
  };

  const checkIfSolved = (pieces) => {
    const isSolved = pieces.every((piece, index) => piece.originalIndex === index);
    if (isSolved) {
      setSolved(true);
      new Audio(congratsSound).play();
    }
  };

  const undoLastMove = () => {
    if (history.length > 0) {
      const previousState = history.pop();
      setPieces(previousState);
      setHistory(history);
    }
  };

  const resetPuzzle = () => {
    const shuffledPieces = shuffleArray(generatePuzzlePieces(puzzleImage));
    setPieces(shuffledPieces);
    setHistory([]);
    setSolved(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleImageSelect = (image) => {
    setPuzzleImage(image);
    const puzzlePieces = generatePuzzlePieces(image);
    setPieces(shuffleArray(puzzlePieces));
    setSolved(false);
  };

  return (
    <div className="puzzle-container">
      <h3 className="title">Complete the Puzzle!</h3>

      <div className="main-puzzle-area">
        {/* Left Select Box */}
        <div className="left-select-box">
          {leftSelectBoxImages.map((img, index) => (
            <div key={index} className="image-box">
              <img
                src={img}
                alt={`Left option ${index + 1}`}
                onClick={() => handleImageSelect(img)}
                className="thumbnail-image"
              />
            </div>
          ))}
        </div>

        {/* Puzzle Board */}
        <div className="puzzle-board">
          {pieces.map((piece, index) => (
            <div
              key={index}
              className={`puzzle-piece ${solved ? 'solved' : ''}`}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDrop(event, index)}
              style={{
                backgroundImage: `url(${puzzleImage})`,
                backgroundPosition: `${piece.backgroundPositionX}px ${piece.backgroundPositionY}px`,
                backgroundSize: `${PUZZLE_SIZE * 100}%`,
                width: `${piece.width}px`,
                height: `${piece.height}px`,
              }}
            />
          ))}
        </div>

        {/* Right Select Box */}
        <div className="right-select-box">
          {rightSelectBoxImages.map((img, index) => (
            <div key={index} className="image-box">
              <img
                src={img}
                alt={`Right option ${index + 1}`}
                onClick={() => handleImageSelect(img)}
                className="thumbnail-image"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Upload Image */}
      <div className="upload-section">
        <label htmlFor="fileInput" className="uploadIcon">
          <FaUpload size={30} />
          <span>Upload Image</span>
        </label>
        <input
          type="file"
          id="fileInput"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />
      </div>

      {/* Controls */}
      <div className="controls">
        <button onClick={undoLastMove} disabled={history.length === 0}>Undo</button>
        <button onClick={resetPuzzle}>Clear</button>
        <button onClick={openModal}>Preview</button>
        <button onClick={() => alert('Next puzzle feature not yet implemented!')}>Next</button>
      </div>

      {solved && <div className="congratulations">🎉 Congratulations! You solved the puzzle! 🎉</div>}

      {/* Modal for Preview */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content">
            <img src={puzzleImage} alt="Preview" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
};

// Function to generate puzzle pieces
const generatePuzzlePieces = (image) => {
  const pieces = [];
  const pieceWidth = 300 / PUZZLE_SIZE;
  const pieceHeight = 300 / PUZZLE_SIZE;

  for (let row = 0; row < PUZZLE_SIZE; row++) {
    for (let col = 0; col < PUZZLE_SIZE; col++) {
      const originalIndex = row * PUZZLE_SIZE + col;
      pieces.push({
        originalIndex,
        backgroundPositionX: -col * pieceWidth,
        backgroundPositionY: -row * pieceHeight,
        width: pieceWidth,
        height: pieceHeight,
      });
    }
  }
  return pieces;
};

// Shuffle array for random puzzle pieces
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

export default PuzzleComponent;

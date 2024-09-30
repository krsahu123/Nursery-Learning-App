import React from 'react';
import './Nersury123.css'; // Import a CSS file for styling

function Nersury123() {
  // Array of numbers from 1 to 10
  const numbers = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <div className="numbers-container">
      {numbers.map((num) => (
        <div key={num} className="number-box">
          {num}
        </div>
      ))}
    </div>
  );
}

export default Nersury123;

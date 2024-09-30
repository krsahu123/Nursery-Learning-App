import React from 'react';
import NurseryHeader from './NurseryHeader';
import NurseryFooter from './NurseryFooter';
import Nersury123 from './Nersury123';
import './NurseryHome.css';

function NurseryHome() {
  return (
    <div className='NurseryMainComponent'>
      <NurseryHeader />
      <div className="main-container">
        <div className="sidebar left-sidebar">
          <Nersury123 />
        </div>
        <div className="main-content">
         <p>Hii</p>
        </div>
        <div className="sidebar right-sidebar">
          <Nersury123/>
        </div>
      </div>
      <NurseryFooter />
    </div>


  );
}

export default NurseryHome;

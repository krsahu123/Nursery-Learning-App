import React, { useState } from 'react';
import appleIcon from './../Assets/A-To-Z/apple.png';
import ballIcon from './../Assets/A-To-Z/ball.png';
import catIcon from './../Assets/A-To-Z/cat.png';
import dogIcon from './../Assets/A-To-Z/dog.png';
import elephantIcon from './../Assets/A-To-Z/elephant.png';
import fishIcon from './../Assets/A-To-Z/fish.png';
import guitarIcon from './../Assets/A-To-Z/guitar.png';
import HippoIcon from './../Assets/A-To-Z/hippo.png';
import iceCreamIcon from './../Assets/A-To-Z/icecream.png';
import jamIcon from './../Assets/A-To-Z/jam.png';
import kingIcon from './../Assets/A-To-Z/king.png';
import lionIcon from './../Assets/A-To-Z/lion.png';
import manIcon from './../Assets/A-To-Z/man.png';
import netIcon from './../Assets/A-To-Z/net.png';
import orangeIcon from './../Assets/A-To-Z/orange.png';
import penIcon from './../Assets/A-To-Z/pen.png';
import queenIcon from './../Assets/A-To-Z/Queen.png';
import rabbitIcon from './../Assets/A-To-Z/rabbit.png';
import sunIcon from './../Assets/A-To-Z/sun.png';
import trainIcon from './../Assets/A-To-Z/train.png';
import umbrellaIcon from './../Assets/A-To-Z/umbrella.png';
import vanIcon from './../Assets/A-To-Z/van.png';
import watchIcon from './../Assets/A-To-Z/watch.png';
import xylophoneIcon from './../Assets/A-To-Z/xylophone.png';
import yatchIcon from './../Assets/A-To-Z/yatch.png';
import zebraIcon from './../Assets/A-To-Z/zebra.png';
import './NurseryABC.css';

const abcItems = [
    { letter: 'A', word: 'Apple', icon: appleIcon },
    { letter: 'B', word: 'Ball', icon: ballIcon },
    { letter: 'C', word: 'Cat', icon: catIcon },
    { letter: 'D', word: 'Dog', icon: dogIcon },
    { letter: 'E', word: 'Elephant', icon: elephantIcon },
    { letter: 'F', word: 'Fish', icon: fishIcon },
    { letter: 'G', word: 'Guitar', icon: guitarIcon },
    { letter: 'H', word: 'Hippo', icon: HippoIcon },
    { letter: 'I', word: 'Ice Cream', icon: iceCreamIcon },
    { letter: 'J', word: 'Jam', icon: jamIcon },
    { letter: 'K', word: 'King', icon: kingIcon },
    { letter: 'L', word: 'Lion', icon: lionIcon },
    { letter: 'M', word: 'Man', icon: manIcon },
    { letter: 'N', word: 'Net', icon: netIcon },
    { letter: 'O', word: 'Orange', icon: orangeIcon },
    { letter: 'P', word: 'Pen', icon: penIcon },
    { letter: 'Q', word: 'Queen', icon: queenIcon },
    { letter: 'R', word: 'Rabbit', icon: rabbitIcon },
    { letter: 'S', word: 'Sun', icon: sunIcon },
    { letter: 'T', word: 'Train', icon: trainIcon },
    { letter: 'U', word: 'Umbrella', icon: umbrellaIcon },
    { letter: 'V', word: 'Van', icon: vanIcon },
    { letter: 'W', word: 'Watch', icon: watchIcon },
    { letter: 'X', word: 'Xylophone', icon: xylophoneIcon },
    { letter: 'Y', word: 'Yatch', icon: yatchIcon },
    { letter: 'Z', word: 'Zebra', icon: zebraIcon },
];

function NurseryABC() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [queue, setQueue] = useState([]);

    const speak = (text) => {
        window.speechSynthesis.cancel(); // Stop any ongoing speech
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        window.speechSynthesis.speak(utterance);
        return utterance;
    };

    const speakAll = () => {
        if (queue.length === 0) return;

        setIsPlaying(true);
        let index = 0;
        const speakNext = () => {
            if (index < queue.length) {
                const utterance = speak(queue[index]);
                utterance.onend = () => {
                    index++;
                    speakNext();
                };
            } else {
                setIsPlaying(false);
                setQueue([]);
            }
        };
        speakNext();
    };

    const handleClick = (letter, word) => {
        if (isPlaying) {
            window.speechSynthesis.cancel(); // Stop current speech if playing
            setIsPlaying(false);
        }
        speak(`${letter} for ${word}`);
    };

    const handlePlayAll = () => {
        if (isPlaying) {
            window.speechSynthesis.cancel(); // Stop current speech if playing
            setIsPlaying(false);
            setQueue([]);
            return;
        }
        const newQueue = abcItems.map(({ letter, word }) => `${letter} for ${word}`);
        setQueue(newQueue);
        speakAll();
    };

    const handlePause = () => {
        if (isPlaying) {
            window.speechSynthesis.pause();
            setIsPlaying(false);
        }
    };

    const handleResume = () => {
        if (isPlaying) {
            window.speechSynthesis.resume();
            setIsPlaying(true);
        }
    };

    return (
        <div className="nursery-abc-container">
            <h4 className="abc-title">Nursery ABC</h4>
            <div className="controls">
                <button className='playbutton' onClick={handlePlayAll}>{isPlaying ? 'Stop' : 'Play All'}</button>
                <button className='playbutton' onClick={handlePause} disabled={!isPlaying}>Pause</button>
                <button className='playbutton' onClick={handleResume} disabled={isPlaying}>Resume</button>
            </div>
            <div className="abc-grid">
                {abcItems.map(({ letter, word, icon }) => (
                    <div className="abc-item" key={letter} onClick={() => handleClick(letter, word)}>
                        <div className="letter">{letter}</div>
                        <div className="icon">
                            <img src={icon} alt={word} />
                        </div>
                        <div className="word">{word}</div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default NurseryABC;

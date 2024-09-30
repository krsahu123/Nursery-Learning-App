import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Bot from './../Assets/image/sboy.png'; // Make sure the path to the Bot image is correct

// Bot icon styling
const BotIcon = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 70px;
  height: 70px;
  background: url(${Bot}) no-repeat center/cover;
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.3s ease-in-out;
  
  &:hover {
    transform: scale(1.1);
  }
`;

// Chat container styling
const ChatContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 350px;
  height: 450px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1);
  display: ${({ open }) => (open ? 'block' : 'none')};
  overflow: hidden;
  animation: slideIn 0.4s ease-in-out;
  @keyframes slideIn {
    from { transform: translateY(100%); }
    to { transform: translateY(0%); }
  }
`;

// Chat box styling
const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0px;
`;

// Messages container styling
const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: scroll;
  margin-bottom: 10px;
`;

// Input container styling
const InputContainer = styled.div`
  display: flex;
  border-top: 1px solid #ddd;
  padding: 10px;
`;

// Input styling
const TextInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #f1f1f1;
`;

// Send button styling
const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  margin-left: 10px;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #0056b3;
  }
`;

// Microphone button styling
const MicButton = styled.button`
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

// Typing dots animation
const TypingDots = keyframes`
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
`;

const Dot = styled.span`
  width: 8px;
  height: 8px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
  animation: ${TypingDots} 1.4s infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
`;

// Message styling
const Message = styled.div`
  background-color: ${({ isBot }) => (isBot ? '#e6f3ff' : '#f9f9f9')};
  border-radius: 10px;
  padding: 10px;
  margin: 5px 0;
  max-width: 80%;
  align-self: ${({ isBot }) => (isBot ? 'flex-start' : 'flex-end')};
`;

const ChatBot2 = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleBotClick = () => {
    setOpen(!open);
  };

  // Voice recognition and Speech to Text
  const handleMicClick = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("SpeechRecognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';

    recognition.start();

    recognition.onstart = () => {
      console.log("Speech recognition service has started.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log("Transcript: ", transcript); // Log the transcript to verify it's being received
      setInput(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error: ", event.error);
    };

    recognition.onend = () => {
      console.log("Speech recognition service has stopped.");
    };
  };

  const handleSend = async () => {
    if (!input) return;

    // Append user message
    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');

    // Simulate bot typing
    setIsBotTyping(true);

    try {
      // Call the Google AI API for a response
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "contents": [
            {
              "parts": [
                { "text": input }
              ]
            }
          ]
        })
      });

      // Parse the response JSON
      const data = await response.json();

      // Extract the bot's reply from the API response
      const botReply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I did not understand that.';

      setTimeout(() => {
        setIsBotTyping(false);
        setMessages([...messages, { text: input, isBot: false }, { text: botReply, isBot: true }]);

        // Text to Speech for bot response
        const utterance = new SpeechSynthesisUtterance(botReply);
        window.speechSynthesis.speak(utterance);
      }, 1000);

    } catch (error) {
      console.error("Error fetching response from API: ", error);
      setIsBotTyping(false);
    }
  };

  return (
    <>
      <BotIcon onClick={handleBotClick} />
      <ChatContainer open={open}>
        <ChatBox>
          <MessagesContainer>
            {messages.map((msg, index) => (
              <Message key={index} isBot={msg.isBot}>
                {msg.text}
              </Message>
            ))}
            {isBotTyping && (
              <Message isBot={true}>
                <TypingIndicator>
                  <Dot delay={0} />
                  <Dot delay={0.2} />
                  <Dot delay={0.4} />
                </TypingIndicator>
              </Message>
            )}
          </MessagesContainer>
          <InputContainer>
            <TextInput
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
            />
            <MicButton onClick={handleMicClick}>
              🎤
            </MicButton>
            <SendButton onClick={handleSend}>
              Send
            </SendButton>
          </InputContainer>
        </ChatBox>
      </ChatContainer>
    </>
  );
};

export default ChatBot2;

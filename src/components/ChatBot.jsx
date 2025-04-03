import React, { useState, useRef, useEffect } from 'react';
import responses from '../data/responses.json';

const ChatBot = () => {
  // State to store messages exchanged in the chat
  const [messages, setMessages] = useState([]);
  // State to handle the input field value
  const [input, setInput] = useState('');
  // Ref to keep track of the last message for auto-scrolling
  const messagesEndRef = useRef(null);

  // Function to scroll to the most recent message automatically
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Runs every time messages update to ensure chat stays scrolled down
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to determine the bot's response based on user input
  const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase(); // Convert input to lowercase for case-insensitive matching
    
    // Iterate through the categories in the response JSON
    for (const category in responses) {
      if (category === 'default') continue; // Skip default category for now
      
      const patterns = responses[category].patterns;
      // Check if the user message contains any of the patterns
      if (patterns.some(pattern => message.includes(pattern))) {
        const responsesList = responses[category].responses;
        // Return a random response from the matched category
        return responsesList[Math.floor(Math.random() * responsesList.length)];
      }
    }

    // If no match is found, return a random default response
    const defaultResponses = responses.default.responses;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  // Function to handle sending a message
  const handleSend = () => {
    if (input.trim()) { // Only send if input is not empty
      const newMessage = { text: input, isUser: true, timestamp: new Date() };
      setMessages([...messages, newMessage]); // Update messages state
      setInput(''); // Clear input field
      
      // Generate bot response after a short delay
      setTimeout(() => {
        const botResponse = { text: getBotResponse(input), isUser: false, timestamp: new Date() };
        setMessages(prev => [...prev, botResponse]);
      }, 1000); // Delay of 1 second for a more natural response time
    }
  };

  // Function to send message when Enter is pressed
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { // Prevents new line on Shift + Enter
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', height: '400px' }}>
      <div style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'white' }}>
        {/* Chatbot Header */}
        <div style={{ padding: '10px', backgroundColor: '#646cff', color: 'white', borderBottom: '1px solid #ccc' }}>
          <h6 style={{ margin: 0 }}>ChatBot</h6>
        </div>
        
        {/* Messages Display Area */}
        <div style={{ flex: 1, overflow: 'auto', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {messages.map((message, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: message.isUser ? 'flex-end' : 'flex-start', gap: '10px' }}>
              {/* Bot avatar appears only for bot messages */}
              {!message.isUser && <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#1976d2', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>B</div>}
              <div style={{ padding: '10px', maxWidth: '70%', backgroundColor: message.isUser ? '#1976d2' : '#f1f1f1', color: message.isUser ? 'white' : 'black', borderRadius: '10px' }}>
                <p style={{ margin: 0 }}>{message.text}</p>
                <span style={{ display: 'block', fontSize: '12px', marginTop: '5px', opacity: 0.7 }}>{message.timestamp.toLocaleTimeString()}</span>
              </div>
              {/* User avatar appears only for user messages */}
              {message.isUser && <div style={{ width: '30px', height: '30px', borderRadius: '50%', backgroundColor: '#d32f2f', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>U</div>}
            </div>
          ))}
          {/* Invisible div for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input and Send Button */}
        <div style={{ padding: '10px', borderTop: '1px solid #ccc', backgroundColor: '#f9f9f9', display: 'flex', gap: '10px' }}>
          <input
            type="text"
            style={{ flex: 1, padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress} // Handles sending with Enter key
          />
          <button
            style={{ padding: '8px 12px', backgroundColor: '#1976d2', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            onClick={handleSend}
            disabled={!input.trim()} // Disable button if input is empty
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;

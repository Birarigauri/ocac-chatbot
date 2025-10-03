import { X, Bot, User, Volume2, Send, Mic, MicOff } from "lucide-react";
import { useState, useRef } from "react";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const questions = [
    "What crops grow best in my region?",
    "How can I improve soil health naturally?",
    "What's the best time to plant this season?",
    "How do I manage pests naturally?"
  ];

  const answers = {
    "What crops grow best in my region?": "For optimal crop selection, consider your local climate zone, soil type, and rainfall patterns. Common high-yield crops include wheat, corn, soybeans, and rice depending on your region. Consult your local agricultural extension office for region-specific recommendations.",
    "How can I improve soil health naturally?": "Improve soil health through crop rotation, cover cropping, composting, and reduced tillage. Add organic matter like compost or manure, test soil pH regularly, and avoid overuse of chemical fertilizers.",
    "What's the best time to plant this season?": "Planting times depend on your crop type and local frost dates. Cool-season crops can be planted 2-4 weeks before the last frost, while warm-season crops should be planted after the last frost date.",
    "How do I manage pests naturally?": "Use integrated pest management: encourage beneficial insects, practice crop rotation, use companion planting, and apply organic pesticides only when necessary. Regular monitoring is key."
  };

  const availableQuestions = questions.filter(q => !askedQuestions.includes(q));

  const handleQuestionClick = (question) => {
    setMessages(prev => [
      ...prev,
      { type: 'user', text: question },
      { type: 'bot', text: answers[question] }
    ]);
    setAskedQuestions(prev => [...prev, question]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    const response = answers[inputText] || "I'm sorry, I don't have information about that specific question. Please try one of the suggested questions or rephrase your query.";
    
    setMessages(prev => [
      ...prev,
      { type: 'user', text: inputText },
      { type: 'bot', text: response }
    ]);
    setInputText('');
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
      };
      
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  if (!isOpen) return null;

  const chatbotStyle = {
    position: 'fixed',
    bottom: '1rem',
    right: '1rem',
    width: '24rem',
    height: '500px',
    zIndex: 9999,
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  };

  const headerStyle = {
    backgroundColor: '#22c55e',
    color: 'white',
    borderTopLeftRadius: '0.5rem',
    borderTopRightRadius: '0.5rem'
  };

  const chatAreaStyle = {
    background: 'linear-gradient(to bottom right, #f9fafb, #dbeafe)',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden'
  };

  const dotBackgroundStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
    backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    animation: 'float 6s ease-in-out infinite'
  };

  return (
    <>
      <div style={chatbotStyle} className="border d-flex flex-column">
        {/* Header */}
        <div style={headerStyle} className="d-flex align-items-center justify-content-between p-3">
          <div className="d-flex align-items-center">
            <Bot size={20} className="me-2" />
            <h5 className="mb-0 fw-semibold">AI Assistant</h5>
          </div>
          <button
            onClick={onClose}
            className="btn btn-link text-white p-1"
            style={{ border: 'none', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Chat Messages */}
        <div style={chatAreaStyle} className="chatbot flex-fill p-3">
          <div style={dotBackgroundStyle}></div>
          <div style={{ position: 'relative', zIndex: 10 }}>
            {messages.length === 0 && (
              <div className="d-flex align-items-center p-3 mb-3 rounded"
                style={{ backgroundColor: 'rgba(255,255,255,0.8)' }}>
                <Bot size={20} className="text-success me-2" />
                <small>Hello! I'm here to help with your farming questions. Choose one below:</small>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`d-flex mb-3 ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                {message.type === 'bot' && <Bot size={20} className="text-success me-2 mt-1" />}
                <div
                  className="p-3 rounded shadow-sm"
                  style={{
                    maxWidth: '75%',
                    backgroundColor: message.type === 'user' ? '#22c55e' : 'rgba(255,255,255,0.9)',
                    color: message.type === 'user' ? 'white' : '#374151',
                    wordBreak: 'break-word'
                  }}
                >
                  <div className="d-flex align-items-start justify-content-between">
                    <small className="flex-fill" style={{ lineHeight: '1.5' }}>{message.text}</small>
                    {message.type === 'bot' && (
                      <button
                        onClick={() => {
                          const utterance = new SpeechSynthesisUtterance(message.text);
                          speechSynthesis.speak(utterance);
                        }}
                        className="btn btn-link p-1 ms-2"
                        style={{ color: '#6b7280', minWidth: 'auto' }}
                        title="Read aloud"
                      >
                        <Volume2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
                {message.type === 'user' && <User size={20} className="text-muted ms-2 mt-1" />}
              </div>
            ))}

            {/* Available Questions */}
            {availableQuestions.length > 0 && (
              <div className="mt-4">
                {availableQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="btn w-100 text-start p-3 mb-2 border rounded"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.8)',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'rgba(255,255,255,0.8)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    <small>{question}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-2 text-center border-top bg-white">
            {
              isListening && <img src="/recording.gif" alt="" />
            }
          <div className="d-flex gap-2 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Type your question..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              style={{ borderRadius: '20px' }}
            />
            <button
              onClick={isListening ? stopListening : startListening}
              className={`btn ${isListening ? 'btn-danger' : 'btn-outline-primary'} rounded-circle`}
              style={{ 
                width: '40px', 
                height: '40px',
                animation: isListening ? 'wave 0.5s ease-in-out infinite alternate' : 'none'
              }}
              title={isListening ? 'Stop listening' : 'Start voice input'}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
            <button
              onClick={handleSendMessage}
              className="btn btn-success rounded-circle"
              style={{ width: '40px', height: '40px' }}
              title="Send message"
            >
              <Send size={16} />
            </button>
          </div>
          <button onClick={onClose} className="btn btn-outline-secondary w-100 btn-sm">
            Close Chat
          </button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-3px); }
        }
        @keyframes wave {
          0% { transform: scale(1) rotate(-5deg); }
          100% { transform: scale(1.1) rotate(5deg); }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
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
    width: '28rem',
    height: '500px',
    zIndex: 9999,
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05)',
    border: 'none',
    overflow: 'hidden'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #059669 0%, #22c55e 100%)',
    color: 'white',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)'
  };

  const chatAreaStyle = {
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
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
        <div style={headerStyle} className="d-flex align-items-center justify-content-between p-4">
          <div className="d-flex align-items-center">
            <div style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              padding: '8px',
              marginRight: '12px'
            }}>
              <Bot size={20} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold">AI Assistant</h5>
              <small style={{ opacity: 0.9 }}>Agricultural Support</small>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn btn-link text-white p-2"
            style={{ 
              border: 'none', 
              background: 'rgba(255,255,255,0.15)', 
              borderRadius: '50%',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
          >
            <X size={16} />
          </button>
        </div>

        {/* Chat Messages */}
        <div style={chatAreaStyle} className="chatbot flex-fill p-3">
          <div style={dotBackgroundStyle}></div>
          <div style={{ position: 'relative', zIndex: 10 }}>
            {messages.length === 0 && (
              <div className="d-flex align-items-start p-4 mb-4 rounded-3"
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}>
                <div style={{
                  background: 'linear-gradient(135deg, #059669, #22c55e)',
                  borderRadius: '50%',
                  padding: '8px',
                  marginRight: '12px',
                  minWidth: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <div className="fw-semibold text-dark mb-1">Welcome! 👋</div>
                  <span className="text-muted">I'm your agricultural assistant. Select a question below or type your own:</span>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`d-flex mb-4 ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                {message.type === 'bot' && (
                  <div style={{
                    background: 'linear-gradient(135deg, #059669, #22c55e)',
                    borderRadius: '50%',
                    padding: '6px',
                    marginRight: '10px',
                    marginTop: '4px',
                    minWidth: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Bot size={16} className="text-white" />
                  </div>
                )}
                <div
                  className="p-3 rounded-3 shadow-sm"
                  style={{
                    maxWidth: '80%',
                    background: message.type === 'user' 
                      ? 'linear-gradient(135deg, #059669, #22c55e)' 
                      : 'white',
                    color: message.type === 'user' ? 'white' : '#1f2937',
                    wordBreak: 'break-word',
                    border: message.type === 'bot' ? '1px solid #e2e8f0' : 'none',
                    boxShadow: message.type === 'bot' ? '0 2px 8px rgba(0,0,0,0.06)' : '0 4px 12px rgba(5, 150, 105, 0.2)'
                  }}
                >
                  <div className="d-flex align-items-start justify-content-between">
                    <span className="flex-fill" style={{ lineHeight: '1.6' }}>{message.text}</span>
                    {message.type === 'bot' && (
                      <button
                        onClick={() => {
                          const utterance = new SpeechSynthesisUtterance(message.text);
                          speechSynthesis.speak(utterance);
                        }}
                        className="btn btn-link p-1 ms-2"
                        style={{ 
                          color: '#059669', 
                          minWidth: 'auto',
                          borderRadius: '50%'
                        }}
                        title="🔊 Read aloud"
                      >
                        <Volume2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
                {message.type === 'user' && (
                  <div style={{
                    background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                    borderRadius: '50%',
                    padding: '6px',
                    marginLeft: '10px',
                    marginTop: '4px',
                    minWidth: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}

            {/* Available Questions */}
            {availableQuestions.length > 0 && (
              <div className="mt-4">
                <div className="text-center mb-3">
                  <small className="text-muted fw-semibold">💬 Suggested Questions</small>
                </div>
                {availableQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuestionClick(question)}
                    className="btn w-100 text-start p-3 mb-3 rounded-3"
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f8fafc';
                      e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.1)';
                      e.target.style.borderColor = '#059669';
                      e.target.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div style={{
                        width: '6px',
                        height: '6px',
                        backgroundColor: '#059669',
                        borderRadius: '50%',
                        marginRight: '12px'
                      }} />
                      <span className="flex-fill">{question}</span>
                      <span style={{ color: '#9ca3af', fontSize: '12px' }}>→</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-top" style={{ backgroundColor: '#f8fafc' }}>
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
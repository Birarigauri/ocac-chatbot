import { X, Bot, User, Volume2, Send, Mic, MicOff, Paperclip } from "lucide-react";
import { useState, useRef } from "react";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null);

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

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name;
      const fileSize = (file.size / 1024).toFixed(1) + ' KB';
      
      setMessages(prev => [
        ...prev,
        { type: 'user', text: `📎 Uploaded: ${fileName} (${fileSize})` },
        { type: 'bot', text: `I've received your file "${fileName}". I can help analyze agricultural documents, images of crops, or soil reports. What would you like to know about this file?` }
      ]);
    }
  };

  const chatbotStyle = {
    width: '100%',
    height: '100vh',
    backgroundColor: 'white',
    borderRadius: '0',
    border: 'none',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #047857 0%, #059669 50%, #10b981 100%)',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0
  };

  const chatAreaStyle = {
    background: 'linear-gradient(135deg, #fafbfc 0%, #f4f6f8 100%)',
    position: 'relative',
    overflowY: 'auto',
    overflowX: 'hidden',
    flex: 1
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
      <div style={chatbotStyle}>
        {/* Header */}
        <div style={headerStyle} className="d-flex align-items-center justify-content-between p-4">
          {/* Decorative background elements */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-20%',
            width: '120px',
            height: '120px',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: '50%',
            animation: 'float 8s ease-in-out infinite'
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30%',
            left: '-10%',
            width: '80px',
            height: '80px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '50%',
            animation: 'float 6s ease-in-out infinite reverse'
          }} />
          
          <div className="d-flex align-items-center position-relative">
            <div style={{
              background: 'rgba(255,255,255,0.25)',
              borderRadius: '50%',
              padding: '10px',
              marginRight: '14px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              animation: 'pulse 3s ease-in-out infinite'
            }}>
              <Bot size={22} />
            </div>
            <div>
              <h5 className="mb-0 fw-bold" style={{ fontSize: '1.1rem' }}>🌾 AgriBot</h5>
              <small style={{ opacity: 0.9, fontSize: '0.8rem' }}>Your Smart Farming Assistant</small>
            </div>
          </div>
          <div style={{ width: '40px' }}></div>
        </div>

        {/* Chat Messages */}
        <div style={chatAreaStyle} className="chatbot p-4">
          <div style={dotBackgroundStyle}></div>
          <div style={{ position: 'relative', zIndex: 10 }}>
            {messages.length === 0 && (
              <div className="d-flex align-items-start p-4 mb-4 rounded-4"
                style={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e1e7ef',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  animation: 'fadeInUp 0.6s ease-out 0.2s both'
                }}>
                <div style={{
                  background: 'linear-gradient(135deg, #047857, #059669, #10b981)',
                  borderRadius: '50%',
                  padding: '10px',
                  marginRight: '14px',
                  minWidth: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <div className="fw-bold text-dark mb-2" style={{ fontSize: '1.05rem' }}>Welcome to AgriBot! 👋</div>
                  <p className="text-muted mb-0" style={{ lineHeight: '1.5', fontSize: '0.9rem' }}>
                    I'm your intelligent farming companion. Ask me anything about crops, soil, weather, or upload documents for analysis.
                  </p>
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
                  className="p-4 rounded-4 shadow-sm"
                  style={{
                    maxWidth: '82%',
                    background: message.type === 'user' 
                      ? 'linear-gradient(135deg, #047857, #059669, #10b981)' 
                      : 'white',
                    color: message.type === 'user' ? 'white' : '#1f2937',
                    wordBreak: 'break-word',
                    border: message.type === 'bot' ? '1px solid #e1e7ef' : 'none',
                    boxShadow: message.type === 'bot' 
                      ? '0 4px 16px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02)' 
                      : '0 6px 20px rgba(4, 120, 87, 0.25)',
                    animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`
                  }}
                >
                  <div className="d-flex align-items-start justify-content-between">
                    <span className="flex-fill" style={{ lineHeight: '1.7', fontSize: '0.95rem' }}>{message.text}</span>
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
                    className="btn w-100 text-start p-4 mb-3 rounded-4"
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #e1e7ef',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                      animation: `fadeInUp 0.5s ease-out ${index * 0.1 + 0.3}s both`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f8fffe';
                      e.target.style.boxShadow = '0 8px 25px rgba(4, 120, 87, 0.12)';
                      e.target.style.borderColor = '#047857';
                      e.target.style.transform = 'translateY(-2px) scale(1.01)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                      e.target.style.borderColor = '#e1e7ef';
                      e.target.style.transform = 'translateY(0) scale(1)';
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: 'linear-gradient(135deg, #047857, #10b981)',
                        borderRadius: '50%',
                        marginRight: '14px',
                        boxShadow: '0 2px 4px rgba(4, 120, 87, 0.3)'
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
        <div className="p-4 border-top" style={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fffe 50%, #f0fdf4 100%)',
          borderTop: '1px solid #d1fae5',
          backdropFilter: 'blur(10px)',
          flexShrink: 0
        }}>
          {isListening && (
            <div className="text-center mb-3">
              <img src="/recording.gif" className="mb-2" alt="Recording" style={{
                width: '40px',
                height: '40px',
                filter: 'drop-shadow(0 4px 8px rgba(4, 120, 87, 0.3))'
              }} />
              <div style={{
                color: '#047857',
                fontSize: '0.85rem',
                fontWeight: '600',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}>🎤 Listening...</div>
            </div>
          )}
          
          <div className="position-relative mb-3">
            <div className="d-flex align-items-center" style={{
              background: 'white',
              borderRadius: '30px',
              padding: '4px',
              boxShadow: '0 8px 32px rgba(4, 120, 87, 0.08), 0 2px 8px rgba(0,0,0,0.04)',
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #10b981, #047857)',
              backgroundOrigin: 'border-box',
              backgroundClip: 'padding-box, border-box',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}>
              <input
                type="text"
                className="form-control border-0"
                placeholder="💬 Ask me anything about farming..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                style={{ 
                  borderRadius: '26px',
                  padding: '16px 24px',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  backgroundColor: 'transparent',
                  boxShadow: 'none',
                  outline: 'none',
                  color: '#1f2937'
                }}
              />
              
              <div className="d-flex gap-1 pe-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn rounded-circle p-0"
                  style={{ 
                    width: '44px', 
                    height: '44px',
                    background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                    border: 'none',
                    color: '#6b7280',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #e5e7eb, #d1d5db)';
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #f3f4f6, #e5e7eb)';
                    e.target.style.transform = 'scale(1)';
                  }}
                  title="📎 Upload file"
                >
                  <Paperclip size={18} />
                </button>
                
                <button
                  onClick={isListening ? stopListening : startListening}
                  className="btn rounded-circle p-0"
                  style={{ 
                    width: '44px', 
                    height: '44px',
                    background: isListening 
                      ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                      : 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    border: 'none',
                    color: 'white',
                    transition: 'all 0.2s ease',
                    animation: isListening ? 'pulse 1s ease-in-out infinite' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isListening 
                      ? '0 4px 16px rgba(239, 68, 68, 0.4)' 
                      : '0 4px 16px rgba(59, 130, 246, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                  title={isListening ? '🛑 Stop listening' : '🎤 Start voice input'}
                >
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                
                <button
                  onClick={handleSendMessage}
                  className="btn rounded-circle p-0"
                  style={{ 
                    width: '44px', 
                    height: '44px',
                    background: 'linear-gradient(135deg, #10b981, #047857)',
                    border: 'none',
                    color: 'white',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(16, 185, 129, 0.4)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #059669, #065f46)';
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #10b981, #047857)';
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 16px rgba(16, 185, 129, 0.4)';
                  }}
                  title="🚀 Send message"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
          

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
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.9; 
          }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
import { Bot, User, Volume2 } from "lucide-react";
import { useState } from "react";
import schemesData from "../data/schemes.json";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [currentFlow, setCurrentFlow] = useState('schemes');
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getAvailableQuestions = () => {
    if (currentFlow === 'schemes') {
      return schemesData.schemes.map(scheme => ({
        text: scheme.name,
        type: 'scheme',
        data: scheme
      }));
    } else if (selectedScheme) {
      return selectedScheme.questions.map(question => ({
        text: question,
        type: 'question',
        data: question
      }));
    }
    return [];
  };

  const handleQuestionClick = (item) => {
    if (item.type === 'scheme') {
      setMessages(prev => [...prev, { type: 'user', text: item.text }]);
      setIsLoading(true);
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: `Great! You've selected ${item.data.name}. ${item.data.description}. Here are some questions I can help you with:` }
        ]);
        setSelectedScheme(item.data);
        setCurrentFlow(item.data.id);
        setIsLoading(false);
      }, 1500);
    } else if (item.type === 'question') {
      setMessages(prev => [...prev, { type: 'user', text: item.text }]);
      setIsLoading(true);
      
      setTimeout(() => {
        const answer = selectedScheme.answers[item.data];
        setMessages(prev => [...prev, { type: 'bot', text: answer }]);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleBackToSchemes = () => {
    setMessages(prev => [
      ...prev,
      { type: 'user', text: 'Show all schemes' },
      { type: 'bot', text: 'Here are all available government schemes for farmers:' }
    ]);
    setCurrentFlow('schemes');
    setSelectedScheme(null);
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
    background: '#22c55e',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0
  };

  const chatAreaStyle = {
    backgroundImage:" url(../public/bg.jpg)",
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
        <div style={headerStyle} className="d-flex align-items-center justify-content-center py-2 px-3">
          <div className="d-flex align-items-center">
            <div style={{
              background: 'rgba(255,255,255,0.25)',
              borderRadius: '8px',
              padding: '6px',
              marginRight: '10px'
            }}>
              <Bot size={16} />
            </div>
            <div>
              <h6 className="mb-0 fw-bold" style={{ fontSize: '1rem' }}>🌾 AgriBot</h6>
              <small style={{ opacity: 0.9, fontSize: '0.7rem' }}>Agricultural Assistant</small>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div style={chatAreaStyle} className="chatbot p-4">
          {/* <div style={dotBackgroundStyle}></div> */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            {messages.length === 0 && (
              <div className="d-flex align-items-start p-4 mb-4 rounded-4 bg-white"
                style={{ 
                  // backgroundColor: 'white',
                  border: '1px solid #e1e7ef',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  animation: 'fadeInUp 0.6s ease-out 0.2s both'
                }}>
                <div style={{
                  background: '#22c55e',
                  borderRadius: '50%',
                  padding: '10px',
                  marginRight: '14px',
                  minWidth: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <div className="fw-bold text-dark mb-2" style={{ fontSize: '1.05rem' }}>Welcome to AgriBot! 👋</div>
                  <p className="text-muted mb-0" style={{ lineHeight: '1.5', fontSize: '0.9rem' }}>
                    I'm here to help you with government schemes for farmers. Select a scheme below to get detailed information.
                  </p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`d-flex mb-4 ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                {message.type === 'bot' && (
                  <div style={{
                    background: '#22c55e',
                    borderRadius: '50%',
                    padding: '8px',
                    marginRight: '12px',
                    marginTop: '4px',
                    minWidth: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(34, 197, 94, 0.4)',
                    border: '2px solid rgba(255,255,255,0.2)'
                  }}>
                    <Bot size={18} className="text-white" />
                  </div>
                )}
                <div
                  className="p-4 rounded-4"
                  style={{
                    maxWidth: '85%',
                    background: message.type === 'user' 
                      ? '#22c55e' 
                      : 'white',
                    color: message.type === 'user' ? 'white' : '#1f2937',
                    wordBreak: 'break-word',
                    border: message.type === 'bot' ? '2px solid #dcfce7' : 'none',
                    boxShadow: message.type === 'bot' 
                      ? '0 8px 25px rgba(34, 197, 94, 0.1)' 
                      : '0 10px 30px rgba(34, 197, 94, 0.3)',
                    animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`,
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {message.type === 'bot' && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: '#22c55e',
                      borderRadius: '20px 20px 0 0'
                    }} />
                  )}
                  <div className="d-flex align-items-start justify-content-between">
                    <span className="flex-fill" style={{ 
                      lineHeight: '1.8', 
                      fontSize: '1.1rem', 
                      whiteSpace: 'pre-line',
                      fontWeight: message.type === 'user' ? '500' : '400'
                    }}>{message.text}</span>
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
                    background: '#16a34a',
                    borderRadius: '50%',
                    padding: '8px',
                    marginLeft: '12px',
                    marginTop: '4px',
                    minWidth: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(22, 163, 74, 0.4)',
                    border: '2px solid rgba(255,255,255,0.2)'
                  }}>
                    <User size={18} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {/* Loading Animation */}
            {isLoading && (
              <div className="d-flex mb-4 justify-content-start">
                <div style={{
                  background: '#22c55e',
                  borderRadius: '50%',
                  padding: '8px',
                  marginRight: '12px',
                  marginTop: '4px',
                  minWidth: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 6px 20px rgba(34, 197, 94, 0.4)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}>
                  <Bot size={18} className="text-white" />
                </div>
                <div className="p-4 rounded-4" style={{
                  maxWidth: '80%',
                  background: 'rgba(255,255,255,0.95)',
                  border: '2px solid rgba(34, 197, 94, 0.2)',
                  boxShadow: '0 8px 25px rgba(34, 197, 94, 0.15)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div className="d-flex align-items-center">
                    <div className="d-flex gap-1">
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#22c55e',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s ease-in-out infinite both'
                      }} />
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#16a34a',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s ease-in-out 0.2s infinite both'
                      }} />
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: '#22c55e',
                        borderRadius: '50%',
                        animation: 'bounce 1.4s ease-in-out 0.4s infinite both'
                      }} />
                    </div>
                    <span className="ms-3" style={{ fontSize: '0.9rem', fontStyle: 'italic', color: '#22c55e' }}>🌾 AgriBot is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Suggested Questions */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          flexShrink: 0,
          maxHeight: '200px',
          overflowY: 'auto',
          borderTop: '3px solid #22c55e',
          padding: '20px'
        }}>
          {currentFlow !== 'schemes' && (
            <div className="text-center mb-3">
              <button 
                onClick={handleBackToSchemes}
                className="btn btn-sm"
                style={{
                  background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  padding: '8px 20px',
                  fontWeight: '500',
                  boxShadow: '0 4px 15px rgba(107, 114, 128, 0.3)'
                }}
              >
                ← Back to All Schemes
              </button>
            </div>
          )}
          
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {getAvailableQuestions().map((item, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(item)}
                className="btn"
                style={{
                  background: 'white',
                  border: '2px solid #dcfce7',
                  borderRadius: '20px',
                  padding: '12px 20px',
                  fontSize: '1rem',
                  fontWeight: '500',
                  color: '#16a34a',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  minWidth: 'fit-content',
                  maxWidth: '300px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#22c55e';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'translateY(-3px)';
                  e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'white';
                  e.target.style.color = '#16a34a';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.1)';
                }}
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-10px) translateX(5px); }
          66% { transform: translateY(5px) translateX(-3px); }
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
        .btn:hover .hover-gradient {
          opacity: 1 !important;
        }
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
};

export default ChatBot;
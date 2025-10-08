import { Bot, User, Volume2 } from "lucide-react";
import { useState } from "react";
import schemesData from "../data/schemes.json";

const ChatBot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [currentFlow, setCurrentFlow] = useState('schemes');
  const [selectedScheme, setSelectedScheme] = useState(null);

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
      setMessages(prev => [
        ...prev,
        { type: 'user', text: item.text },
        { type: 'bot', text: `Great! You've selected ${item.data.name}. ${item.data.description}. Here are some questions I can help you with:` }
      ]);
      setSelectedScheme(item.data);
      setCurrentFlow(item.data.id);
    } else if (item.type === 'question') {
      const answer = selectedScheme.answers[item.data];
      setMessages(prev => [
        ...prev,
        { type: 'user', text: item.text },
        { type: 'bot', text: answer }
      ]);
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
    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)',
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
        <div style={headerStyle} className="d-flex align-items-center justify-content-between p-4">
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
              <small style={{ opacity: 0.9, fontSize: '0.8rem' }}>Government Schemes Assistant</small>
            </div>
          </div>
          <div style={{ width: '40px' }}></div>
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
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  borderRadius: '50%',
                  padding: '10px',
                  marginRight: '14px',
                  minWidth: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
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
                    background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                    borderRadius: '50%',
                    padding: '8px',
                    marginRight: '12px',
                    marginTop: '4px',
                    minWidth: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
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
                      ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%)' 
                      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                    color: message.type === 'user' ? 'white' : '#1f2937',
                    wordBreak: 'break-word',
                    border: message.type === 'bot' ? '2px solid #e2e8f0' : 'none',
                    boxShadow: message.type === 'bot' 
                      ? '0 8px 25px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)' 
                      : '0 10px 30px rgba(59, 130, 246, 0.3)',
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
                      background: 'linear-gradient(90deg, #3b82f6, #1d4ed8, #3b82f6)',
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
                    background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    borderRadius: '50%',
                    padding: '8px',
                    marginLeft: '12px',
                    marginTop: '4px',
                    minWidth: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
                    border: '2px solid rgba(255,255,255,0.2)'
                  }}>
                    <User size={18} className="text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Suggested Questions */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          flexShrink: 0,
          maxHeight: '300px',
          overflowY: 'auto',
          borderTop: '3px solid #3b82f6'
        }}>
          <div className="p-4">
            <div className="text-center mb-4">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                borderRadius: '25px',
                padding: '12px 24px',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '20px', marginRight: '10px' }}>
                  {currentFlow === 'schemes' ? '🏛️' : '📋'}
                </span>
                <span className="fw-bold text-white" style={{ fontSize: '1.2rem' }}>
                  {currentFlow === 'schemes' ? 'Government Schemes' : selectedScheme?.name}
                </span>
              </div>
              {currentFlow !== 'schemes' && (
                <div className="mt-2">
                  <button 
                    onClick={handleBackToSchemes}
                    className="btn"
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
            </div>
            
            <div className="d-flex flex-wrap justify-content-center gap-3">
              {getAvailableQuestions().map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(item)}
                  className="btn"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
                    border: '2px solid #e2e8f0',
                    borderRadius: '20px',
                    padding: '12px 20px',
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#1e293b',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    minWidth: 'fit-content',
                    maxWidth: '300px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #3b82f6, #1d4ed8)';
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'linear-gradient(135deg, #ffffff, #f8fafc)';
                    e.target.style.color = '#1e293b';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                  }}
                >
                  {item.text}
                </button>
              ))}
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
      `}</style>
    </>
  );
};

export default ChatBot;
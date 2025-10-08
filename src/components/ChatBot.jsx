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
          <div style={dotBackgroundStyle}></div>
          <div style={{ position: 'relative', zIndex: 10 }}>
            {messages.length === 0 && (
              <div className="d-flex align-items-start p-4 mb-4 rounded-4"
                style={{ 
                  // backgroundColor: 'white',
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
                    I'm here to help you with government schemes for farmers. Select a scheme below to get detailed information.
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
                    <span className="flex-fill" style={{ lineHeight: '1.7', fontSize: '0.95rem', whiteSpace: 'pre-line' }}>{message.text}</span>
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
          </div>
        </div>

        {/* Sticky Suggested Questions */}
        <div className="border-top" style={{ 
          background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdf4 50%, #ecfdf5 100%)',
          borderTop: '2px solid #d1fae5',
          flexShrink: 0,
          maxHeight: '250px',
          overflowY: 'auto',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)'
        }}>
          <div className="p-4">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <div className="d-flex align-items-center">
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                }}>
                  <span style={{ fontSize: '14px' }}>
                    {currentFlow === 'schemes' ? '🏛️' : '📋'}
                  </span>
                </div>
                <div>
                  <div className="fw-bold" style={{ color: '#1e293b', fontSize: '1rem' }}>
                    {currentFlow === 'schemes' ? 'Government Schemes' : selectedScheme?.name}
                  </div>
                  <small className="text-muted">
                    {currentFlow === 'schemes' ? 'Select a scheme to explore' : 'Choose a question to learn more'}
                  </small>
                </div>
              </div>
              {currentFlow !== 'schemes' && (
                <button 
                  onClick={handleBackToSchemes}
                  className="btn btn-sm"
                  style={{
                    background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    padding: '0.5rem 1rem',
                    fontWeight: '500',
                    boxShadow: '0 2px 8px rgba(107, 114, 128, 0.3)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 2px 8px rgba(107, 114, 128, 0.3)';
                  }}
                >
                  ← Back to Schemes
                </button>
              )}
            </div>
            
            <div className="row g-3">
              {getAvailableQuestions().map((item, index) => (
                <div key={index} className="col-12">
                  <button
                    onClick={() => handleQuestionClick(item)}
                    className="btn w-100 text-start p-4 rounded-4"
                    style={{
                      background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)',
                      border: '2px solid #e2e8f0',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      position: 'relative',
                      overflow: 'hidden',
                      animation: `fadeInUp 0.4s ease-out ${index * 0.1}s both`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #f0fdf4, #dcfce7)';
                      e.target.style.borderColor = '#22c55e';
                      e.target.style.transform = 'translateY(-3px) scale(1.02)';
                      e.target.style.boxShadow = '0 12px 30px rgba(34, 197, 94, 0.15), 0 4px 12px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)';
                      e.target.style.borderColor = '#e2e8f0';
                      e.target.style.transform = 'translateY(0) scale(1)';
                      e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)';
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <div style={{
                        width: '12px',
                        height: '12px',
                        background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                        borderRadius: '50%',
                        marginRight: '16px',
                        boxShadow: '0 2px 6px rgba(34, 197, 94, 0.4)',
                        animation: 'pulse 2s ease-in-out infinite'
                      }} />
                      <span className="flex-fill" style={{ color: '#1e293b', lineHeight: '1.5' }}>
                        {item.text}
                      </span>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        background: 'linear-gradient(135deg, #f1f5f9, #e2e8f0)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '12px',
                        transition: 'all 0.2s ease'
                      }}>
                        <span style={{ color: '#64748b', fontSize: '12px', fontWeight: '600' }}>→</span>
                      </div>
                    </div>
                    
                    {/* Subtle gradient overlay */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.3), transparent)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }} className="hover-gradient" />
                  </button>
                </div>
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
import { Bot, User, Volume2, Sun, Moon, Sprout, Wheat, Globe } from "lucide-react";
import { useState } from "react";
import schemesData from "../data/schemes.json";
import categoriesData from "../data/categories.json";
import portalConfig from "../config/portalConfig.json";

const ChatBot = ({ isOpen, onClose, category, isPopup = false }) => {
  const [messages, setMessages] = useState([]);
  const [currentFlow, setCurrentFlow] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(category || null);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(portalConfig.portal.defaultTheme);
  const config = portalConfig.portal;

  const getAvailableQuestions = () => {
    if (currentFlow === 'categories') {
      return categoriesData.categories.map(category => ({
        text: category.name,
        type: 'category',
        data: category
      }));
    } else if (selectedCategory && currentFlow === 'category-questions') {
      return selectedCategory.questions.map(question => ({
        text: question,
        type: 'question',
        data: question
      }));
    } else if (currentFlow === 'schemes') {
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
    if (item.type === 'category') {
      setMessages(prev => [...prev, { type: 'user', text: item.text }]);
      setIsLoading(true);
      
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: `Great! You've selected ${item.data.name}. ${item.data.description}. Here are some questions I can help you with:` }
        ]);
        setSelectedCategory(item.data);
        setCurrentFlow('category-questions');
        setIsLoading(false);
      }, 1500);
    } else if (item.type === 'scheme') {
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
        const answer = selectedCategory ? selectedCategory.answers[item.data] : selectedScheme.answers[item.data];
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

  const handleBackToCategories = () => {
    setMessages(prev => [
      ...prev,
      { type: 'user', text: 'Show all categories' },
      { type: 'bot', text: 'Please select a category to get specialized assistance:' }
    ]);
    setCurrentFlow('categories');
    setSelectedCategory(null);
    setSelectedScheme(null);
  };

  const handleBack = () => {
    if (selectedScheme) {
      if (selectedCategory) {
        setCurrentFlow('category-questions');
        setSelectedScheme(null);
      } else {
        handleBackToSchemes();
      }
    } else if (selectedCategory) {
      handleBackToCategories();
    } else if (currentFlow === 'schemes') {
      handleBackToCategories();
    }
  };

  const chatbotStyle = {
    width: '100%',
    height: isPopup ? '100%' : '100vh',
    backgroundColor: theme === 'dark' ? '#1f2937' : 'white',
    borderRadius: '0',
    border: 'none',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    background: config.colors.primary,
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
    flexShrink: 0
  };

  const chatAreaStyle = {
    backgroundImage: theme === 'dark' ? 'none' : 'url(../public/bg.jpg)',
    backgroundColor: theme === 'dark' ? '#374151' : 'transparent',
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
        <div style={headerStyle} className="d-flex align-items-center justify-content-between py-2 px-3">
          <div className="d-flex align-items-center">
            <div style={{
              background: 'rgba(252, 252, 252, 0.98)',
              borderRadius: '8px',
              padding: '6px',
              marginRight: '10px'
            }}>
              <img src="/logo.png" width={30} alt="" />
            </div>
            <div>
              <h6 className="mb-0 fw-bold d-flex align-items-center" style={{ fontSize: '1rem' }}>
                {/* <Wheat size={14} className="me-1" /> */}
                 {config.name}
              </h6>
              <small style={{ opacity: 0.9, fontSize: '0.7rem' }}>{config.subtitle}</small>
            </div>
          </div>
          
          <div className="d-flex align-items-center gap-2" style={{ marginRight: isPopup ? '60px' : '0' }}>
            {config.showLanguageOption && (
              <div className="d-flex align-items-center" style={{
                background: 'rgba(255,255,255,0.25)',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '12px',
                padding: '8px 12px',
                backdropFilter: 'blur(15px)',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                minWidth: '70px',
                height: '36px'
              }}>
                <Globe size={14} className="me-2" style={{ opacity: 0.95 }} />
                <select className="form-select form-select-sm border-0" style={{
                  background: 'transparent',
                  color: 'white',
                  fontSize: '0.8rem',
                  padding: '10px',
                  fontWeight: '500',
                  width: '40px'
                }}>
                  {config.supportedLanguages.map(lang => (
                    <option key={lang.code} value={lang.code} style={{ color: '#000', background: 'white' }}>{lang.name}</option>
                  ))}
                </select>
              </div>
            )}
            
            {config.showThemeOption && (
              <button 
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                className="btn p-0 me-4" 
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                style={{
                background: 'rgba(255,255,255,0.25)',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '12px',
                padding: '8px 12px',
                backdropFilter: 'blur(15px)',
                transition: 'all 0.3s ease',
                color: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                minWidth: '70px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.35)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.25)';
                e.target.style.transform = 'scale(1)';
              }}>
                {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div style={chatAreaStyle} className="chatbot p-4">
          {/* <div style={dotBackgroundStyle}></div> */}
          <div style={{ position: 'relative', zIndex: 10 }}>
            {messages.length === 0 && (
              <div className="d-flex align-items-start p-4 mb-4 rounded-4"
                style={{ 
                  backgroundColor: theme === 'dark' ? '#4b5563' : 'white',
                  border: theme === 'dark' ? '1px solid #6b7280' : '1px solid #e1e7ef',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  animation: 'fadeInUp 0.6s ease-out 0.2s both'
                }}>
                <div style={{
                  background: config.colors.primary,
                  borderRadius: '50%',
                  padding: '10px',
                  marginRight: '14px',
                  minWidth: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // boxShadow: `0 4px 12px ${config.colors.primary}4D`,
                  animation: 'pulse 2s ease-in-out infinite'
                }}>
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <div className="fw-bold mb-2 d-flex align-items-center" style={{ fontSize: '1.05rem', color: theme === 'dark' ? '#f9fafb' : '#1f2937' }}>
                    Welcome to {config.name}! <Sprout size={16} className="ms-1" />
                  </div>
                  <p className="mb-0" style={{ lineHeight: '1.5', fontSize: '0.9rem', color: theme === 'dark' ? '#d1d5db' : '#6b7280' }}>
                    {selectedCategory 
                      ? `I'm here to help you with ${selectedCategory.name.toLowerCase()}. Ask me anything about this topic!`
                      : "I'm your agricultural assistant. Please select a category below to get specialized help."
                    }
                  </p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`d-flex mb-4 ${message.type === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                {message.type === 'bot' && (
                  <div style={{
                    background: config.colors.primary,
                    borderRadius: '50%',
                    padding: '8px',
                    marginRight: '12px',
                    marginTop: '4px',
                    minWidth: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // boxShadow: `0 4px 15px ${config.colors.primary}66`,
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
                      ? config.colors.primary 
                      : theme === 'dark' ? '#4b5563' : 'white',
                    color: message.type === 'user' ? 'white' : theme === 'dark' ? '#f9fafb' : '#1f2937',
                    wordBreak: 'break-word',
                    border: message.type === 'bot' ? '2px solid #dcfce7' : 'none',
                    // boxShadow: message.type === 'bot' 
                    //   ? '0 8px 25px rgba(34, 197, 94, 0.1)' 
                    //   : '0 10px 30px rgba(34, 197, 94, 0.3)',
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
                      background: config.colors.primary,
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
                          color: config.colors.secondary, 
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
                    background: config.colors.secondary,
                    borderRadius: '50%',
                    padding: '8px',
                    marginLeft: '12px',
                    marginTop: '4px',
                    minWidth: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    // boxShadow: '0 4px 15px rgba(115, 120, 117, 0.4)',
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
                  background: config.colors.primary,
                  borderRadius: '50%',
                  padding: '8px',
                  marginRight: '12px',
                  marginTop: '4px',
                  minWidth: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // boxShadow: `0 6px 20px ${config.colors.primary}66`,
                  border: '2px solid rgba(255,255,255,0.2)',
                  animation: 'pulse 1.5s ease-in-out infinite'
                }}>
                  <Bot size={18} className="text-white" />
                </div>
                <div className="p-4 rounded-4" style={{
                  maxWidth: '80%',
                  background: 'rgba(255,255,255,0.95)',
                  // border: '2px solid rgba(34, 197, 94, 0.2)',
                  // boxShadow: '0 8px 25px rgba(34, 197, 94, 0.15)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  <div className="d-flex align-items-center">
                    <div className="d-flex gap-1">
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: config.colors.primary,
                        borderRadius: '50%',
                        animation: 'bounce 1.4s ease-in-out infinite both'
                      }} />
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: config.colors.secondary,
                        borderRadius: '50%',
                        animation: 'bounce 1.4s ease-in-out 0.2s infinite both'
                      }} />
                      <div style={{
                        width: '8px',
                        height: '8px',
                        background: config.colors.primary,
                        borderRadius: '50%',
                        animation: 'bounce 1.4s ease-in-out 0.4s infinite both'
                      }} />
                    </div>
                    <span className="ms-3" style={{ fontSize: '1rem', fontStyle: 'italic', color: config.colors.primary }}> {config.name} is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Vertical Scrollable Suggested Questions */}
        <div style={{ 
          background: isPopup ? (theme === 'dark' ? '#374151' : 'white') : (theme === 'dark' 
            ? 'linear-gradient(135deg, #374151 0%, #4b5563 100%)' 
            : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'),
          flexShrink: 0,
          height: isPopup ? '140px' : '180px',
          borderTop: isPopup ? 'none' : `2px solid ${config.colors.primary}`,
          borderTopLeftRadius: isPopup ? '20px' : '0',
          borderTopRightRadius: isPopup ? '20px' : '0',
          padding: isPopup ? '15px' : '15px',
          position: 'relative',
          boxShadow: isPopup ? '0 -4px 20px rgba(0,0,0,0.1)' : 'none'
        }}>
          {currentFlow !== 'categories' && (
            <div className={isPopup ? "position-absolute" : "text-center mb-3"} style={isPopup ? {
              top: '10px',
              left: '10px',
              zIndex: 10
            } : {}}>
              <button 
                onClick={handleBack}
                className="btn btn-sm"
                style={{
                  background: isPopup ? `${config.colors.secondary}E6` : `linear-gradient(135deg, ${config.colors.secondary}, ${config.colors.primary})`,
                  color: 'white',
                  border: 'none',
                  borderRadius: isPopup ? '50%' : '20px',
                  fontSize: '0.8rem',
                  padding: isPopup ? '8px' : '5px 14px',
                  fontWeight: '500',
                  // boxShadow: `0 2px 8px ${config.colors.secondary}4D`,
                  minWidth: isPopup ? '36px' : 'auto',
                  height: isPopup ? '36px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isPopup ? '←' : `← ${selectedScheme ? (selectedCategory ? 'Back to Questions' : 'Back to Schemes') : 'Back to Categories'}`}
              </button>
            </div>
          )}
          
          <div 
            className="d-flex flex-column gap-2 questions-container"
            style={{
              overflowY: 'auto',
              overflowX: 'hidden',
              height: '100%',
              scrollBehavior: 'smooth',
              alignItems: 'center',
              textAlign: 'center',
              paddingLeft: isPopup && currentFlow !== 'categories' ? '50px' : '0',
              paddingRight: isPopup && currentFlow !== 'categories' ? '10px' : '0'
            }}
          >
            {getAvailableQuestions().map((item, index) => (
              <button
                key={index}
                onClick={() => handleQuestionClick(item)}
                className="btn text-start"
                style={{
                  background: isPopup ? 'transparent' : (theme === 'dark' ? '#4b5563' : 'white'),
                  border: isPopup ? 'none' : `1px solid ${theme === 'dark' ? '#6b7280' : '#e5e7eb'}`,
                  borderRadius: isPopup ? '0' : '12px',
                  padding: isPopup ? '12px 0' : '8px 14px',
                  fontSize: isPopup ? '1.1rem' : '0.85rem',
                  fontWeight: '500',
                  color: theme === 'dark' ? '#f3f4f6' : '#374151',
                  boxShadow: isPopup ? 'none' : (theme === 'dark' 
                    ? '0 1px 4px rgba(0,0,0,0.3)' 
                    : '0 1px 4px rgba(0,0,0,0.08)'),
                  transition: 'all 0.2s ease',
                  width: isPopup ? '80%' : '100%',
                  textAlign: 'center',
                  borderBottom: isPopup ? `1px solid ${theme === 'dark' ? '#4b5563' : '#e5e7eb'}` : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isPopup) {
                    e.target.style.background = config.colors.primary;
                    e.target.style.color = 'white';
                    e.target.style.transform = 'translateX(4px)';
                    // e.target.style.boxShadow = `0 2px 8px ${config.colors.primary}66`;
                    e.target.style.borderColor = config.colors.primary;
                  } else {
                    e.target.style.color = config.colors.primary;
                    e.target.style.paddingLeft = '8px';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isPopup) {
                    e.target.style.background = theme === 'dark' ? '#4b5563' : 'white';
                    e.target.style.color = theme === 'dark' ? '#f3f4f6' : config.colors.secondary;
                    e.target.style.transform = 'translateX(0)';
                    e.target.style.boxShadow = theme === 'dark' 
                      ? '0 1px 4px rgba(0,0,0,0.3)' 
                      : '0 1px 4px rgba(0,0,0,0.08)';
                    e.target.style.borderColor = theme === 'dark' ? '#6b7280' : '#e5e7eb';
                  } else {
                    e.target.style.color = theme === 'dark' ? '#f3f4f6' : '#374151';
                    e.target.style.paddingLeft = '0';
                  }
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
        /* Hide scrollbar for suggested questions */
        .questions-container::-webkit-scrollbar {
          display: none;
        }
        .questions-container {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default ChatBot;
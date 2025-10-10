import { Cloud, Shield, TrendingUp, FileText } from 'lucide-react';
import { useState } from 'react';
import categoriesData from '../data/categories.json';
import portalConfig from '../config/portalConfig.json';
import ChatBot from './ChatBot';

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const config = portalConfig.portal;

  const iconMap = {
    Cloud,
    Shield,
    TrendingUp,
    FileText
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Update URL with category
    window.history.pushState({}, '', `?category=${category.id}`);
  };

  const handleCloseChat = () => {
    setSelectedCategory(null);
    setIsFullscreen(false);
    // Reset URL
    window.history.pushState({}, '', '/');
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      // background: `linear-gradient(135deg, ${config.colors.primary}10 0%, ${config.colors.primary}20 100%)`,
      padding: '20px'
    }}>
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold mb-3" style={{ color: config.colors.primary }}>
          {config.name}
        </h1>
        <p className="lead text-muted">{config.subtitle}</p>
        <p className="text-secondary">Choose a category to get specialized assistance</p>
      </div>

      {/* Category Cards */}
      <div className="container">
        <div className="row justify-content-center g-4">
          {categoriesData.categories.map((category) => {
            const IconComponent = iconMap[category.icon];
            return (
              <div key={category.id} className="col-md-3 col-lg-3">
                <div 
                  className="card h-100 shadow-sm border-0"
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    borderRadius: '15px'
                  }}
                  onClick={() => handleCategorySelect(category)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                  }}
                >
                  <div className="card-body text-center p-4">
                    <div 
                      className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                      style={{
                        width: '80px',
                        height: '80px',
                        background: `linear-gradient(135deg, ${config.colors.primary}, ${config.colors.secondary})`,
                        borderRadius: '50%',
                        color: 'white'
                      }}
                    >
                      <IconComponent size={40} />
                    </div>
                    <h5 className="card-title fw-bold mb-3">{category.name}</h5>
                    <p className="card-text text-muted">{category.description}</p>
                    <button 
                      className="btn btn-outline-primary"
                      style={{
                        borderColor: config.colors.primary,
                        color: config.colors.primary
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = config.colors.primary;
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = config.colors.primary;
                      }}
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ChatBot Popup */}
      {selectedCategory && (
        <div 
          className="position-fixed top-0 start-0 w-100 h-100"
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            zIndex: 1050,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseChat();
          }}
        >
          <div 
            className="bg-white rounded-4 shadow-lg position-relative"
            style={{
              width: isFullscreen ? '100vw' : '90%',
              height: isFullscreen ? '100vh' : '80vh',
              maxWidth: isFullscreen ? 'none' : '800px',
              borderRadius: isFullscreen ? '0' : '20px',
              overflow: 'hidden'
            }}
          >
            {/* Floating Controls */}
            <div 
              className="position-absolute d-flex gap-2"
              style={{ 
                top: '10px',
                right: '10px',
                zIndex: 1100
              }}
            >
              <button 
                className="btn btn-sm"
                onClick={toggleFullscreen}
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px'
                }}
              >
                {isFullscreen ? '⊡' : '⊞'}
              </button>
              <button 
                className="btn btn-sm"
                onClick={handleCloseChat}
                style={{
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px'
                }}
              >
                ✕
              </button>
            </div>
            
            {/* ChatBot */}
            <div style={{ height: '100%' }}>
              <ChatBot 
                category={selectedCategory}
                isPopup={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
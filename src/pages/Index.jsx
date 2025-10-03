import { useState } from "react";
import { MessageCircle, Sprout, Tractor, Cloud } from "lucide-react";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const categories = [
    { icon: Sprout, title: "Crop Management", desc: "Get advice on planting and harvesting" },
    { icon: Tractor, title: "Equipment", desc: "Learn about farm machinery" },
    { icon: Cloud, title: "Weather Insights", desc: "Check weather predictions" },
  ];

  const mainStyle = {
    // minHeight: '100vh',
    background: 'linear-gradient(135deg, #f8f9fa 0%, rgba(34, 197, 94, 0.1) 50%, rgba(34, 197, 94, 0.2) 100%)'
  };

  const headerStyle = {
    backgroundColor: 'rgba(248, 249, 250, 0.9)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid #e5e7eb'
  };

  const categoryCardStyle = {
    backgroundColor: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const featureBoxStyle = {
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    border: '1px solid rgba(34, 197, 94, 0.2)',
    borderRadius: '1rem'
  };

  return (
    <div style={{...mainStyle, marginTop: 0}}>
      {/* Header */}
      <header style={headerStyle}>
        <div className="container">
          <div className="d-flex align-items-center justify-content-between py-3">
            <div className="d-flex align-items-center">
              <Sprout size={32} className="text-success me-2" />
              <h1 className="h2 fw-bold mb-0" style={{ color: '#1f2937' }}>Farmer Portal</h1>
            </div>
            <button
              onClick={() => setIsChatOpen(true)}
              className="btn btn-success d-flex align-items-center"
            >
              <MessageCircle size={20} className="me-2" />
              AI Assistant
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5">
        <div className="text-center mb-5" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="display-4 fw-bold mb-4" style={{ color: '#1f2937' }}>
            Welcome to Your Farm Dashboard
          </h2>
          <p className="lead" style={{ color: '#6b7280' }}>
            Choose a category below to get started with our AI assistant
          </p>
        </div>

        {/* Categories */}
        <div className="row g-4 justify-content-center mb-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="col-md-4">
                <div
                  style={categoryCardStyle}
                  className="p-4 text-center h-100"
                  onClick={() => setIsChatOpen(true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#22c55e';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.borderColor = '#e5e7eb';
                  }}
                >
                  <Icon size={48} className="text-success mb-3" />
                  <h3 className="h5 fw-semibold mb-2" style={{ color: '#1f2937' }}>
                    {category.title}
                  </h3>
                  <p className="mb-0" style={{ color: '#6b7280' }}>{category.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div style={featureBoxStyle} className="p-5">
              <h3 className="h4 fw-semibold text-center mb-4" style={{ color: '#1f2937' }}>
                How Our AI Assistant Helps You
              </h3>
              <ul className="list-unstyled">
                <li className="d-flex align-items-start mb-3">
                  <span className="text-success me-3 mt-1 fw-bold">✓</span>
                  <span style={{ color: '#6b7280' }}>Get instant answers to your farming questions</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="text-success me-3 mt-1 fw-bold">✓</span>
                  <span style={{ color: '#6b7280' }}>Receive personalized crop recommendations</span>
                </li>
                <li className="d-flex align-items-start mb-3">
                  <span className="text-success me-3 mt-1 fw-bold">✓</span>
                  <span style={{ color: '#6b7280' }}>Access weather insights and planning tools</span>
                </li>
                <li className="d-flex align-items-start">
                  <span className="text-success me-3 mt-1 fw-bold">✓</span>
                  <span style={{ color: '#6b7280' }}>Learn best practices for sustainable farming</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* ChatBot Component */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Index;
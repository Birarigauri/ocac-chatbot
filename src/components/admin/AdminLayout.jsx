import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "../../pages/admin/Dashboard";
import Styling from "../../pages/admin/Styling";

const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch(activeItem) {
      case 'dashboard':
        return <Dashboard />;
      case 'styling':
        return <Styling />;
      case 'users':
        return <div className="text-center p-5"><h4>Users Management</h4><p className="text-muted">Coming soon...</p></div>;
      case 'conversations':
        return <div className="text-center p-5"><h4>Conversations</h4><p className="text-muted">Coming soon...</p></div>;
      case 'analytics':
        return <div className="text-center p-5"><h4>Analytics</h4><p className="text-muted">Coming soon...</p></div>;
      case 'settings':
        return <div className="text-center p-5"><h4>Settings</h4><p className="text-muted">Coming soon...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  const mainContentStyle = {
    marginLeft: sidebarCollapsed ? '80px' : '250px',
    transition: 'margin-left 0.3s ease',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  };

  const headerStyle = {
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    padding: '1rem 2rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  };

  return (
    <div className="d-flex">
      <Sidebar 
        activeItem={activeItem} 
        onItemClick={setActiveItem}
        onToggle={setSidebarCollapsed}
      />
      
      <div style={mainContentStyle} className="flex-fill">
        {/* Header */}
        <div style={headerStyle}>
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="h4 mb-0 fw-semibold text-capitalize">{activeItem}</h1>
            <div className="d-flex align-items-center">
              <div 
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#22c55e',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}
              >
                A
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
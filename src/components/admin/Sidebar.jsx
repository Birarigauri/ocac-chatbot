import { 
  Home, 
  Users, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Palette
} from "lucide-react";
import { useState } from "react";

const Sidebar = ({ activeItem, onItemClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'conversations', icon: MessageSquare, label: 'Conversations' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'styling', icon: Palette, label: 'Styling' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const sidebarStyle = {
    width: isCollapsed ? '80px' : '250px',
    transition: 'width 0.3s ease',
    backgroundColor: '#1f2937',
    color: 'white',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000,
    boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
  };

  const headerStyle = {
    padding: '1rem',
    borderBottom: '1px solid #374151',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const menuItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    margin: '0.25rem 0.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: isActive ? '#22c55e' : 'transparent',
    color: isActive ? 'white' : '#d1d5db'
  });

  return (
    <div style={sidebarStyle}>
      {/* Header */}
      <div style={headerStyle}>
        {!isCollapsed && (
          <div className="d-flex align-items-center">
            <div 
              style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#22c55e',
                borderRadius: '0.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.5rem'
              }}
            >
              <MessageSquare size={20} />
            </div>
            <span className="fw-bold">Admin Panel</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            padding: '0.25rem'
          }}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav style={{ padding: '1rem 0' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              style={menuItemStyle(activeItem === item.id)}
              onClick={() => onItemClick(item.id)}
              onMouseEnter={(e) => {
                if (activeItem !== item.id) {
                  e.target.style.backgroundColor = '#374151';
                }
              }}
              onMouseLeave={(e) => {
                if (activeItem !== item.id) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon size={20} />
              {!isCollapsed && (
                <span style={{ marginLeft: '0.75rem' }}>{item.label}</span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ position: 'absolute', bottom: '1rem', left: 0, right: 0 }}>
        <div
          style={{
            ...menuItemStyle(false),
            color: '#ef4444'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#374151';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          <LogOut size={20} />
          {!isCollapsed && (
            <span style={{ marginLeft: '0.75rem' }}>Logout</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
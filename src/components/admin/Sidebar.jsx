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
    width: isCollapsed ? '80px' : '280px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
    color: 'white',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    zIndex: 1000,
    boxShadow: '4px 0 32px rgba(0,0,0,0.15), 2px 0 8px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(10px)',
    borderRight: '1px solid rgba(255,255,255,0.1)'
  };

  const headerStyle = {
    padding: '1.5rem 1.25rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.05))',
    backdropFilter: 'blur(10px)'
  };

  const menuItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    margin: '0.25rem 0.75rem',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: isActive 
      ? 'linear-gradient(135deg, #22c55e, #16a34a)' 
      : 'transparent',
    color: isActive ? 'white' : '#cbd5e1',
    fontWeight: isActive ? '600' : '500',
    fontSize: '0.95rem',
    boxShadow: isActive 
      ? '0 8px 25px rgba(34, 197, 94, 0.25), 0 3px 10px rgba(0,0,0,0.1)' 
      : 'none',
    transform: isActive ? 'translateX(4px)' : 'translateX(0)',
    border: isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent'
  });

  return (
    <div style={sidebarStyle}>
      {/* Header */}
      <div style={headerStyle}>
        {!isCollapsed && (
          <div className="d-flex align-items-center">
            <div 
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '0.75rem',
                boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <MessageSquare size={22} />
            </div>
            <div>
              <div className="fw-bold" style={{ fontSize: '1.1rem' }}>🌾 AgriBot</div>
              <small style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Admin Panel</small>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          style={{
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            color: 'white',
            cursor: 'pointer',
            padding: '0.5rem',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(10px)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.2)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255,255,255,0.1)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          {isCollapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav style={{ padding: '1.5rem 0' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              style={menuItemStyle(activeItem === item.id)}
              onClick={() => onItemClick(item.id)}
              onMouseEnter={(e) => {
                if (activeItem !== item.id) {
                  e.target.style.background = 'rgba(255,255,255,0.08)';
                  e.target.style.transform = 'translateX(2px)';
                  e.target.style.color = '#f1f5f9';
                }
              }}
              onMouseLeave={(e) => {
                if (activeItem !== item.id) {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateX(0)';
                  e.target.style.color = '#cbd5e1';
                }
              }}
            >
              <Icon size={20} />
              {!isCollapsed && (
                <span style={{ marginLeft: '1rem' }}>{item.label}</span>
              )}
            </div>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ position: 'absolute', bottom: '1.5rem', left: 0, right: 0 }}>
        <div style={{ padding: '0 0.75rem', marginBottom: '1rem' }}>
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            margin: '0 0.5rem'
          }} />
        </div>
        <div
          style={{
            ...menuItemStyle(false),
            color: '#f87171',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.2)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.2)';
            e.target.style.transform = 'translateX(2px)';
            e.target.style.color = '#fca5a5';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(239, 68, 68, 0.1)';
            e.target.style.transform = 'translateX(0)';
            e.target.style.color = '#f87171';
          }}
        >
          <LogOut size={20} />
          {!isCollapsed && (
            <span style={{ marginLeft: '1rem' }}>Logout</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
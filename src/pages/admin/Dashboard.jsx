import { Users, MessageSquare, TrendingUp, Activity } from "lucide-react";

const Dashboard = () => {
  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: '#3b82f6', change: '+12%' },
    { title: 'Conversations', value: '5,678', icon: MessageSquare, color: '#22c55e', change: '+8%' },
    { title: 'Success Rate', value: '94.5%', icon: TrendingUp, color: '#f59e0b', change: '+2.1%' },
    { title: 'Active Now', value: '89', icon: Activity, color: '#ef4444', change: '+5%' }
  ];

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
    border: '1px solid rgba(226, 232, 240, 0.8)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    background: 'linear-gradient(135deg, #ffffff 0%, #fefefe 100%)'
  };

  const iconStyle = (color) => ({
    width: '56px',
    height: '56px',
    background: `linear-gradient(135deg, ${color}15, ${color}25)`,
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color,
    border: `1px solid ${color}30`,
    boxShadow: `0 8px 25px ${color}20`
  });

  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="col-md-3">
              <div 
                style={{
                  ...cardStyle,
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.12), 0 8px 25px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)';
                }}
              >
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div style={iconStyle(stat.color)}>
                    <Icon size={26} />
                  </div>
                  <span 
                    className="badge"
                    style={{ 
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)', 
                      color: 'white',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '20px',
                      boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="h3 fw-bold mb-2" style={{ color: '#1e293b' }}>{stat.value}</h3>
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem', fontWeight: '500' }}>{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="row g-4">
        <div className="col-md-8">
          <div style={cardStyle}>
            <div className="d-flex align-items-center justify-content-between mb-4">
              <h5 className="fw-bold mb-0" style={{ color: '#1e293b', fontSize: '1.25rem' }}>💬 Recent Conversations</h5>
              <button className="btn btn-outline-primary btn-sm" style={{
                borderRadius: '20px',
                fontSize: '0.85rem',
                fontWeight: '500'
              }}>View All</button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover" style={{ marginBottom: 0 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                    <th style={{ color: '#64748b', fontWeight: '600', fontSize: '0.9rem', padding: '1rem 0.75rem' }}>User</th>
                    <th style={{ color: '#64748b', fontWeight: '600', fontSize: '0.9rem', padding: '1rem 0.75rem' }}>Question</th>
                    <th style={{ color: '#64748b', fontWeight: '600', fontSize: '0.9rem', padding: '1rem 0.75rem' }}>Time</th>
                    <th style={{ color: '#64748b', fontWeight: '600', fontSize: '0.9rem', padding: '1rem 0.75rem' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: '500', color: '#334155' }}>👨‍🌾 John Farmer</td>
                    <td style={{ padding: '1rem 0.75rem', color: '#64748b' }}>What crops grow best in my region?</td>
                    <td style={{ padding: '1rem 0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>2 min ago</td>
                    <td style={{ padding: '1rem 0.75rem' }}><span className="badge" style={{
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: 'white',
                      borderRadius: '20px',
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>Answered</span></td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #f8fafc' }}>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: '500', color: '#334155' }}>👩‍🌾 Mary Smith</td>
                    <td style={{ padding: '1rem 0.75rem', color: '#64748b' }}>How to improve soil health?</td>
                    <td style={{ padding: '1rem 0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>5 min ago</td>
                    <td style={{ padding: '1rem 0.75rem' }}><span className="badge" style={{
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: 'white',
                      borderRadius: '20px',
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>Answered</span></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem 0.75rem', fontWeight: '500', color: '#334155' }}>👨‍🌾 Bob Johnson</td>
                    <td style={{ padding: '1rem 0.75rem', color: '#64748b' }}>Best time to plant corn?</td>
                    <td style={{ padding: '1rem 0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>8 min ago</td>
                    <td style={{ padding: '1rem 0.75rem' }}><span className="badge" style={{
                      background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                      color: 'white',
                      borderRadius: '20px',
                      padding: '0.4rem 0.8rem',
                      fontSize: '0.8rem',
                      fontWeight: '500'
                    }}>Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div style={cardStyle}>
            <h5 className="fw-bold mb-4" style={{ color: '#1e293b', fontSize: '1.25rem' }}>⚡ Quick Actions</h5>
            <div className="d-grid gap-3">
              <button className="btn" style={{
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0.875rem 1.25rem',
                fontWeight: '600',
                fontSize: '0.95rem',
                boxShadow: '0 8px 25px rgba(34, 197, 94, 0.25)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(34, 197, 94, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.25)';
              }}
              >📝 Add New FAQ</button>
              
              <button className="btn" style={{
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0.875rem 1.25rem',
                fontWeight: '500',
                fontSize: '0.95rem',
                boxShadow: '0 8px 25px rgba(59, 130, 246, 0.25)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.25)';
              }}
              >👥 View All Users</button>
              
              <button className="btn" style={{
                background: 'linear-gradient(135deg, #6b7280, #4b5563)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0.875rem 1.25rem',
                fontWeight: '500',
                fontSize: '0.95rem',
                boxShadow: '0 8px 25px rgba(107, 114, 128, 0.25)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(107, 114, 128, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(107, 114, 128, 0.25)';
              }}
              >📄 Export Data</button>
              
              <button className="btn" style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '0.875rem 1.25rem',
                fontWeight: '500',
                fontSize: '0.95rem',
                boxShadow: '0 8px 25px rgba(245, 158, 11, 0.25)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 35px rgba(245, 158, 11, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.25)';
              }}
              >⚙️ System Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
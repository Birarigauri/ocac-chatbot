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
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  };

  const iconStyle = (color) => ({
    width: '48px',
    height: '48px',
    backgroundColor: color + '20',
    borderRadius: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: color
  });

  return (
    <div>
      {/* Stats Cards */}
      <div className="row g-4 mb-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="col-md-3">
              <div style={cardStyle}>
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <div style={iconStyle(stat.color)}>
                    <Icon size={24} />
                  </div>
                  <span 
                    className="badge"
                    style={{ 
                      backgroundColor: '#22c55e20', 
                      color: '#22c55e',
                      fontSize: '0.75rem'
                    }}
                  >
                    {stat.change}
                  </span>
                </div>
                <h3 className="h4 fw-bold mb-1">{stat.value}</h3>
                <p className="text-muted mb-0 small">{stat.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="row g-4">
        <div className="col-md-8">
          <div style={cardStyle}>
            <h5 className="fw-semibold mb-3">Recent Conversations</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Question</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>John Farmer</td>
                    <td>What crops grow best in my region?</td>
                    <td>2 min ago</td>
                    <td><span className="badge bg-success">Answered</span></td>
                  </tr>
                  <tr>
                    <td>Mary Smith</td>
                    <td>How to improve soil health?</td>
                    <td>5 min ago</td>
                    <td><span className="badge bg-success">Answered</span></td>
                  </tr>
                  <tr>
                    <td>Bob Johnson</td>
                    <td>Best time to plant corn?</td>
                    <td>8 min ago</td>
                    <td><span className="badge bg-warning">Pending</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div style={cardStyle}>
            <h5 className="fw-semibold mb-3">Quick Actions</h5>
            <div className="d-grid gap-2">
              <button className="btn btn-success">Add New FAQ</button>
              <button className="btn btn-outline-primary">View All Users</button>
              <button className="btn btn-outline-secondary">Export Data</button>
              <button className="btn btn-outline-warning">System Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
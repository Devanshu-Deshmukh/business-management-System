import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin, userLogin } from '../services/api';

function Login() {
  const navigate = useNavigate();

  // Admin login state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  // User login state
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userError, setUserError] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminError('');
    try {
      const res = await adminLogin(adminEmail, adminPassword);
      if (res.data.success) {
        navigate('/admin/services');
      } else {
        setAdminError(res.data.message);
      }
    } catch {
      setAdminError('Something went wrong. Please try again.');
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    setUserError('');
    try {
      const res = await userLogin(userEmail, userPassword);
      if (res.data.success) {
        navigate('/buyProduct', {
          state: { name: res.data.name, orders: res.data.orders },
        });
      } else {
        setUserError(res.data.message);
      }
    } catch {
      setUserError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-page">
      {/* Admin Login */}
      <div className="login-card">
        <div className="subtitle">BUSINESS</div>
        <h2>
          For <span>Admins</span>
        </h2>
        <form onSubmit={handleAdminLogin}>
          <label>Email :</label>
          <input
            type="email"
            placeholder="Enter email..."
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
          />
          <label>Password :</label>
          <input
            type="password"
            placeholder="Enter password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
          {adminError && <div className="error-msg">{adminError}</div>}
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>

      {/* User Login */}
      <div className="login-card">
        <h2>
          For <span>Users</span>
        </h2>
        <form onSubmit={handleUserLogin}>
          <label>Email :</label>
          <input
            type="email"
            placeholder="Enter email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            required
          />
          <label>Password :</label>
          <input
            type="password"
            placeholder="Enter password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
            minLength={4}
            maxLength={8}
          />
          {userError && <div className="error-msg">{userError}</div>}
          <button type="submit" className="btn btn-primary">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

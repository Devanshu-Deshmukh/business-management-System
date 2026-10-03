import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addAdmin } from '../services/api';

function AddAdmin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    adminNumber: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAdmin(form);
    navigate('/admin/services');
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Add Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="adminName"
              value={form.adminName}
              onChange={handleChange}
              placeholder="Enter admin name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="adminEmail"
              value={form.adminEmail}
              onChange={handleChange}
              placeholder="Enter admin email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="adminPassword"
              value={form.adminPassword}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="adminNumber"
              value={form.adminNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Add Admin
          </button>
          <button
            type="button"
            className="btn btn-back"
            onClick={() => navigate('/admin/services')}
          >
            ← Back
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAdmin;

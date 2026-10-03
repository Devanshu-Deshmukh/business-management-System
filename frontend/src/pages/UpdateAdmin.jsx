import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdmin, updateAdmin } from '../services/api';

function UpdateAdmin() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    adminId: '',
    adminName: '',
    adminEmail: '',
    adminPassword: '',
    adminNumber: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdmin(id)
      .then((res) => {
        setForm(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateAdmin(id, form);
    navigate('/admin/services');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Update Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="adminName"
              value={form.adminName || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="adminEmail"
              value={form.adminEmail || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="adminPassword"
              value={form.adminPassword || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="adminNumber"
              value={form.adminNumber || ''}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Update Admin
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

export default UpdateAdmin;

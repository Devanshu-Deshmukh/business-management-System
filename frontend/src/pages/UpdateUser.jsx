import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../services/api';

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    u_id: '',
    uname: '',
    uemail: '',
    upassword: '',
    unumber: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUser(id)
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
    await updateUser(id, { ...form, unumber: Number(form.unumber) });
    navigate('/admin/services');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="uname"
              value={form.uname || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="uemail"
              value={form.uemail || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="upassword"
              value={form.upassword || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="number"
              name="unumber"
              value={form.unumber || ''}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Update User
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

export default UpdateUser;

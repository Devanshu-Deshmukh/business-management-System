import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../services/api';

function AddUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    uname: '',
    uemail: '',
    upassword: '',
    unumber: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUser({ ...form, unumber: Number(form.unumber) });
    navigate('/admin/services');
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="uname"
              value={form.uname}
              onChange={handleChange}
              placeholder="Enter user name"
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="uemail"
              value={form.uemail}
              onChange={handleChange}
              placeholder="Enter user email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="upassword"
              value={form.upassword}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="number"
              name="unumber"
              value={form.unumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
            />
          </div>
          <button type="submit" className="btn btn-success">
            Add User
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

export default AddUser;

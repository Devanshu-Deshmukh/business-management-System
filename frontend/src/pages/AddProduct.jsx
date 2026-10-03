import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../services/api';

function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pname: '',
    pprice: '',
    pdescription: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addProduct({ ...form, pprice: Number(form.pprice) });
    navigate('/admin/services');
  };

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="pname"
              value={form.pname}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="form-group">
            <label>Product Price (₹)</label>
            <input
              type="number"
              name="pprice"
              value={form.pprice}
              onChange={handleChange}
              placeholder="Enter price"
              required
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="pdescription"
              value={form.pdescription}
              onChange={handleChange}
              placeholder="Enter description"
            />
          </div>
          <button type="submit" className="btn btn-success">
            Add Product
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

export default AddProduct;

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, updateProduct } from '../services/api';

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    pid: '',
    pname: '',
    pprice: '',
    pdescription: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id)
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
    await updateProduct(id, { ...form, pprice: Number(form.pprice) });
    navigate('/admin/services');
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="form-page">
      <div className="form-card">
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="pname"
              value={form.pname || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Product Price (₹)</label>
            <input
              type="number"
              name="pprice"
              value={form.pprice || ''}
              onChange={handleChange}
              required
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="pdescription"
              value={form.pdescription || ''}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Update Product
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

export default UpdateProduct;

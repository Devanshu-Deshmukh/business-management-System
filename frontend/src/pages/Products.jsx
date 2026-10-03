import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts } from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleBuy = () => {
    alert('Please Login as a User to buy Products');
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading products...</div>;

  return (
    <div className="products-page">
      <h1>Our Products</h1>
      {products.length === 0 ? (
        <div className="empty-state">No products available at the moment.</div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.pid}>
              <h4>{product.pname}</h4>
              <div className="price">₹ {product.pprice}</div>
              {product.pdescription && (
                <div className="description">{product.pdescription}</div>
              )}
              <button className="btn btn-primary" onClick={handleBuy}>
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;

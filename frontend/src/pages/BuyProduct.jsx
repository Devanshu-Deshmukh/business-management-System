import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchProduct, placeOrder, getUserOrders } from '../services/api';

function BuyProduct() {
  const location = useLocation();
  const navigate = useNavigate();

  const userName = location.state?.name || 'User';
  const [orders, setOrders] = useState(location.state?.orders || []);

  const [searchName, setSearchName] = useState('');
  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSearch = async (e) => {
    e.preventDefault();
    setMessage('');
    setProduct(null);
    try {
      const res = await searchProduct(searchName);
      if (res.data.product) {
        setProduct(res.data.product);
      } else {
        setMessage(res.data.message || 'Product not found');
      }
      if (res.data.orders) {
        setOrders(res.data.orders);
      }
    } catch {
      setMessage('Error searching product');
    }
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await placeOrder({
        oName: product.pname,
        oPrice: product.pprice,
        oQuantity: quantity,
      });
      navigate('/orderSuccess', {
        state: { amount: res.data.amount },
      });
    } catch {
      setMessage('Error placing order');
    }
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="buy-product-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div className="welcome-banner">Welcome Back, {userName}!</div>
        <button className="btn btn-secondary" onClick={handleBack}>
          ← Back to Login
        </button>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <h2>Product Search</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Please enter the Product Name..."
            required
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>
        {message && <div className="search-message">{message}</div>}
      </div>

      {/* Product Detail */}
      {product && (
        <div className="product-detail">
          <h3>Product Found</h3>
          <form onSubmit={handleOrder}>
            <div className="detail-row">
              <label>Product Name :</label>
              <input type="text" value={product.pname} readOnly />
            </div>
            <div className="detail-row">
              <label>Product Price :</label>
              <input type="text" value={`₹ ${product.pprice}`} readOnly />
            </div>
            <div className="detail-row">
              <label>Quantity :</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Minimum: 1KG"
              />
            </div>
            <button type="submit" className="btn btn-success" style={{ marginTop: '12px' }}>
              Order Now
            </button>
          </form>
        </div>
      )}

      {/* Orders History */}
      {orders.length > 0 && (
        <div className="orders-section">
          <h2>Your Orders</h2>
          <table className="data-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <tr key={order.oId || idx}>
                  <td>{order.oName}</td>
                  <td>₹ {order.oPrice}</td>
                  <td>{order.oQuantity}</td>
                  <td>₹ {order.totalAmmout}</td>
                  <td>
                    {order.orderDate
                      ? new Date(order.orderDate).toLocaleDateString()
                      : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default BuyProduct;

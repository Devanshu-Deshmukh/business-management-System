import { useLocation, useNavigate } from 'react-router-dom';

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const amount = location.state?.amount || 0;

  return (
    <div className="order-success-page">
      <div className="success-card">
        <div className="checkmark">✓</div>
        <h2>Ordered Successfully!</h2>
        <div className="amount">
          Your purchased amount is : ₹ {amount}/-
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/buyProduct', { state: { name: 'User' } })}
        >
          ← Back to Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAdminDashboard,
  deleteAdmin,
  deleteUser,
  deleteProduct,
} from '../services/api';

function AdminDashboard() {
  const [data, setData] = useState({
    admins: [],
    users: [],
    products: [],
    orders: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    getAdminDashboard()
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteAdmin = async (id) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      await deleteAdmin(id);
      fetchData();
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      fetchData();
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      fetchData();
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button className="btn btn-secondary" onClick={() => navigate('/login')}>
          ← Back to Login
        </button>
      </div>

      {/* Admins Section */}
      <div className="admin-section">
        <div className="section-header">
          <h2>Admins</h2>
          <button
            className="btn btn-success btn-sm"
            onClick={() => navigate('/addAdmin')}
          >
            + Add Admin
          </button>
        </div>
        {data.admins.length === 0 ? (
          <div className="empty-state">No admins found.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Admin ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.admins.map((admin) => (
                <tr key={admin.adminId}>
                  <td>{admin.adminId}</td>
                  <td>{admin.adminName}</td>
                  <td>{admin.adminEmail}</td>
                  <td>{admin.adminNumber}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          navigate(`/updateAdmin/${admin.adminId}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteAdmin(admin.adminId)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Users Section */}
      <div className="admin-section">
        <div className="section-header">
          <h2>Users</h2>
          <button
            className="btn btn-success btn-sm"
            onClick={() => navigate('/addUser')}
          >
            + Add User
          </button>
        </div>
        {data.users.length === 0 ? (
          <div className="empty-state">No users found.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user.u_id}>
                  <td>{user.u_id}</td>
                  <td>{user.uname}</td>
                  <td>{user.uemail}</td>
                  <td>{user.unumber}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => navigate(`/updateUser/${user.u_id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteUser(user.u_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Products Section */}
      <div className="admin-section">
        <div className="section-header">
          <h2>Products</h2>
          <button
            className="btn btn-success btn-sm"
            onClick={() => navigate('/addProduct')}
          >
            + Add Product
          </button>
        </div>
        {data.products.length === 0 ? (
          <div className="empty-state">No products found.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product.pid}>
                  <td>{product.pid}</td>
                  <td>{product.pname}</td>
                  <td>₹ {product.pprice}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() =>
                          navigate(`/updateProduct/${product.pid}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteProduct(product.pid)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Orders Section */}
      <div className="admin-section">
        <div className="section-header">
          <h2>Orders</h2>
        </div>
        {data.orders.length === 0 ? (
          <div className="empty-state">No orders found.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>User Name</th>
                <th>User Email</th>
                <th>Product Name</th>
                <th>Product Price</th>
                <th>Quantity</th>
                <th>Total Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.orders.map((order) => (
                <tr key={order.oId}>
                  <td>{order.user?.uname}</td>
                  <td>{order.user?.uemail}</td>
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
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;

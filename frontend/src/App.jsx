import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import LocateUs from './pages/LocateUs';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import AddAdmin from './pages/AddAdmin';
import UpdateAdmin from './pages/UpdateAdmin';
import AddUser from './pages/AddUser';
import UpdateUser from './pages/UpdateUser';
import AddProduct from './pages/AddProduct';
import UpdateProduct from './pages/UpdateProduct';
import BuyProduct from './pages/BuyProduct';
import OrderSuccess from './pages/OrderSuccess';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public pages with Navbar */}
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/home" element={<><Navbar /><Home /></>} />
        <Route path="/products" element={<><Navbar /><Products /></>} />
        <Route path="/about" element={<><Navbar /><About /></>} />
        <Route path="/location" element={<><Navbar /><LocateUs /></>} />
        <Route path="/login" element={<><Navbar /><Login /></>} />

        {/* Admin pages (no public navbar) */}
        <Route path="/admin/services" element={<AdminDashboard />} />
        <Route path="/addAdmin" element={<AddAdmin />} />
        <Route path="/updateAdmin/:id" element={<UpdateAdmin />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/updateProduct/:id" element={<UpdateProduct />} />

        {/* User pages */}
        <Route path="/buyProduct" element={<BuyProduct />} />
        <Route path="/orderSuccess" element={<OrderSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;

import axios from 'axios';

const API_BASE_URL = 'http://localhost:2330/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// ============ PRODUCTS (Public) ============
export const getAllProducts = () => api.get('/products');

// ============ AUTH ============
export const adminLogin = (email, password) =>
  api.post('/admin/login', { email, password });

export const userLogin = (userEmail, userPassword) =>
  api.post('/user/login', { userEmail, userPassword });

// ============ ADMIN DASHBOARD ============
export const getAdminDashboard = () => api.get('/admin/services');

// ============ ADMIN CRUD ============
export const addAdmin = (admin) => api.post('/admin/add', admin);
export const getAdmin = (id) => api.get(`/admin/${id}`);
export const updateAdmin = (id, admin) => api.put(`/admin/update/${id}`, admin);
export const deleteAdmin = (id) => api.delete(`/admin/delete/${id}`);

// ============ USER CRUD ============
export const addUser = (user) => api.post('/user/add', user);
export const getUser = (id) => api.get(`/user/${id}`);
export const updateUser = (id, user) => api.put(`/user/update/${id}`, user);
export const deleteUser = (id) => api.delete(`/user/delete/${id}`);

// ============ PRODUCT CRUD ============
export const addProduct = (product) => api.post('/product/add', product);
export const getProduct = (id) => api.get(`/product/${id}`);
export const updateProduct = (id, product) =>
  api.put(`/product/update/${id}`, product);
export const deleteProduct = (id) => api.delete(`/product/delete/${id}`);

// ============ SEARCH & ORDER ============
export const searchProduct = (productName) =>
  api.post('/product/search', { productName });

export const placeOrder = (orderData) => api.post('/product/order', orderData);

export const getUserOrders = () => api.get('/user/orders');

export default api;

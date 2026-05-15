import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import Checkout from './components/Checkout';
import { CartProvider } from './context/CartContext';
import Profile from './pages/Profile';
import AdminDashboard from './components/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user'); 
  if (!user) {
    alert("Please Login to place an order! 🛍️");
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={ <ProtectedRoute><Profile /></ProtectedRoute> } />
          <Route path="/checkout" element={ <ProtectedRoute><Checkout /></ProtectedRoute> } />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
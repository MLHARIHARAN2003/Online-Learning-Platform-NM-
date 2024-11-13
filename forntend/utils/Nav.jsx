import React from 'react';
import { Link } from 'react-router-dom';
const Nav = () => (
  <nav className="bg-gray-800 text-white py-4">
    <div className="container mx-auto flex items-center justify-between">
      <h2 className="text-2xl font-bold">Scholarly Odyssey</h2>
      <div className="space-x-6">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/login" className="hover:underline">Login</Link>
        <Link to="/register" className="hover:underline">Register</Link>
      </div>
    </div>
  </nav>
);

export default Nav;


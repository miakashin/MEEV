'use client'
import React from 'react';

export default function DashboardPage() {
  // In a real app, you would get the user info from context or a hook
  // For now, this is just a placeholder
  const user = { name: 'John Doe', email: 'john@example.com' };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Account Dashboard</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-2">Welcome, {user.name}!</h2>
          <p className="text-gray-700 mb-4">Email: {user.email}</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded font-semibold hover:bg-red-700 transition">Sign Out</button>
        </div>
        <div className="text-gray-600 text-center">
          <p>This is your private dashboard. More features coming soon!</p>
        </div>
      </div>
    </div>
  );
} 
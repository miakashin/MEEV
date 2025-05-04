'use client'

import React from 'react'

export default function ClientDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Client Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Actions Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Post New Job
              </button>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                View Applications
              </button>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
                Message Center
              </button>
            </div>
          </div>

          {/* Statistics Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Statistics</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Active Jobs</p>
                <p className="text-2xl font-bold text-blue-600">5</p>
              </div>
              <div>
                <p className="text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-green-600">23</p>
              </div>
              <div>
                <p className="text-gray-600">Messages</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="text-sm text-gray-600">2 hours ago</p>
                <p className="text-gray-800">New application received for "Virtual Assistant"</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <p className="text-sm text-gray-600">Yesterday</p>
                <p className="text-gray-800">Interview scheduled with John Doe</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4">
                <p className="text-sm text-gray-600">2 days ago</p>
                <p className="text-gray-800">New message from Sarah Smith</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client'

import React from 'react'

export default function ApplicantDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Applicant Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Profile Overview</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Profile Completion</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full w-[85%]"></div>
                </div>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Complete Profile
              </button>
              <button className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                Update Skills
              </button>
            </div>
          </div>

          {/* Job Applications Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">Active Applications</p>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <div>
                <p className="text-gray-600">Interviews Scheduled</p>
                <p className="text-2xl font-bold text-green-600">1</p>
              </div>
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
                Browse New Jobs
              </button>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <p className="text-sm text-gray-600">1 hour ago</p>
                <p className="text-gray-800">Application viewed by Client XYZ</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <p className="text-sm text-gray-600">Yesterday</p>
                <p className="text-gray-800">Interview invitation received</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4">
                <p className="text-sm text-gray-600">3 days ago</p>
                <p className="text-gray-800">New job match found</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
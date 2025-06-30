'use client'

import React from 'react'
import Link from 'next/link'

const jobs = [
  {
    title: 'Virtual Assistant',
    description: 'Provide administrative support to clients remotely, manage schedules, emails, and more.',
  },
  {
    title: 'Social Media Manager',
    description: 'Create and manage content, grow social media presence, and engage with audiences.',
  },
  {
    title: 'Customer Support Specialist',
    description: 'Assist customers via email, chat, or phone, and resolve their issues efficiently.',
  },
  // Add more jobs as needed
]

export default function JobsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-12">
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Roles & Opportunities</h1>
        <div className="space-y-8">
          {jobs.map((job, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-blue-100 shadow hover:shadow-lg transition">
              <h2 className="text-2xl font-semibold text-blue-800 mb-2">{job.title}</h2>
              <p className="text-gray-700 mb-4">{job.description}</p>
              <Link
                href="/apply"
                className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Apply Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
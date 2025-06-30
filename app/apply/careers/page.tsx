'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function CareersPage() {
  const positions = [
    {
      title: 'Virtual Assistant',
      location: 'Remote',
      type: 'Full-time',
      description: 'Join our team of elite virtual assistants and help professionals reclaim their time through efficient task delegation and management.',
      requirements: [
        'Bachelor’s degree in any field',
        'Excellent communication and organizational skills',
        'Proficient in Microsoft Office and Google Workspace',
        'Strong attention to detail',
        'Ability to work independently and manage multiple tasks',
        'Minimum of 2 years professional experience',
      ],
      benefits: [
        'Competitive salary',
        'Flexible work hours',
        'Professional development opportunities',
        'Access to cutting-edge tools and technologies',
        'Opportunities for career advancement',
      ],
    },
    {
      title: 'Team Lead',
      location: 'Remote',
      type: 'Full-time',
      description: 'Lead a team of virtual assistants and ensure exceptional service delivery while maintaining high standards of quality and efficiency.',
      requirements: [
        'Bachelor’s degree in Business Administration or related field',
        'Minimum of 3 years experience in virtual assistance or customer service',
        'Minimum of 2 years leadership experience',
        'Strong project management skills',
        'Excellent coaching and mentoring abilities',
        'Advanced problem-solving skills',
      ],
      benefits: [
        'Higher base salary',
        'Performance bonuses',
        'Leadership development programs',
        'Team management tools and resources',
        'Priority access to training programs',
      ],
    },
    {
      title: 'Client Success Manager',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and maintain strong relationships with our clients, ensuring their success through effective communication and strategic support.',
      requirements: [
        'Bachelor’s degree in Business or related field',
        'Minimum of 2 years experience in client relations or account management',
        'Strong communication and relationship-building skills',
        'Experience in virtual assistance industry preferred',
        'Excellent problem-solving abilities',
        'Proficient in CRM systems',
      ],
      benefits: [
        'Competitive salary with commission',
        'Client success bonuses',
        'Professional development opportunities',
        'Access to client management tools',
        'Regular performance reviews',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div 
          className="text-center max-w-4xl mx-auto mb-24 py-20 opacity-0 translate-y-5 animate-fade-in"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Build Your Dream Career
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Join our team of elite virtual assistants and help professionals reclaim their time through efficient task delegation and management
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/apply"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
              Apply Now
            </Link>
            <Link 
              href="#positions"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-50 transition-colors transform hover:scale-105"
            >
              View Positions
            </Link>
          </div>
        </div>

        {/* Positions Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto opacity-0 animate-fade-in"
          id="positions"
        >
          {positions.map((position) => (
            <div 
              key={position.title}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 opacity-0 translate-y-5 animate-fade-in"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {position.title}
                  </h3>
                  <div className="flex items-center text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                    {position.type}
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-6">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{position.location}</span>
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">{position.description}</p>

                {/* Requirements */}
                <h4 className="text-lg font-semibold mb-4 text-blue-600">What You'll Need</h4>
                <ul className="space-y-3 mb-8">
                  {position.requirements.map((req, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>

                {/* Benefits */}
                <h4 className="text-lg font-semibold mb-4 text-blue-600">What You'll Get</h4>
                <ul className="space-y-3">
                  {position.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-blue-500 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  href="/apply"
                  className="mt-8 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors transform hover:scale-105"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="mt-24 text-center opacity-0 animate-fade-in"
        >
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join our growing team of professionals and make a difference in people's lives
          </p>
          <Link 
            href="/apply"
            className="inline-flex items-center px-12 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-indigo-700 transition-colors transform hover:scale-105"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function ServicesPage() {
  const services = [
    {
      title: 'Email & Calendar Management',
      description: 'Take back control of your inbox and schedule with professional email management and calendar optimization.',
      features: [
        'Email triage and response drafting',
        'Calendar management and scheduling',
        'Meeting coordination',
        'Follow-up management',
      ],
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Project Management',
      description: 'Keep your projects on track with dedicated project management support and coordination.',
      features: [
        'Task tracking and organization',
        'Deadline management',
        'Team coordination',
        'Progress reporting',
      ],
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
    },
    {
      title: 'Research & Analysis',
      description: 'Get comprehensive research and analysis support for your business decisions.',
      features: [
        'Market research',
        'Competitor analysis',
        'Data compilation',
        'Report preparation',
      ],
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      title: 'Travel & Logistics',
      description: 'Seamless travel arrangements and logistics management for busy professionals.',
      features: [
        'Travel booking and itinerary planning',
        'Accommodation arrangements',
        'Transportation coordination',
        'Expense tracking',
      ],
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
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
            Transform Your Productivity
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Our elite virtual assistants are trained to handle a wide range of tasks,
            allowing you to focus on what matters most
          </p>

        </div>

        {/* Services Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto opacity-0 animate-fade-in"
        >
          {services.map((service) => (
            <div 
              key={service.title}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 opacity-0 translate-y-5 animate-fade-in"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                  <div className="flex items-center text-blue-600 font-medium bg-blue-50 px-4 py-2 rounded-full">
                    Premium Service
                  </div>
                </div>
                
                <div className="mb-8">
                  {service.icon}
                </div>

                <p className="text-gray-600 mb-8 leading-relaxed">
                  {service.description}
                </p>

                <h4 className="text-lg font-semibold text-blue-600 mb-4">
                  What We Offer
                </h4>
                <ul className="space-y-4">
                  {service.features.map((feature, index) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="w-6 h-6 text-green-500 mr-4 mt-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div 
          className="text-center mt-24 opacity-0 animate-fade-in"
        >
          <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Ready to Transform Your Productivity?
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Take the first step towards mastering delegation and reclaiming your time
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/get-started"
              className="inline-flex items-center px-12 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-50 transition-colors transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 
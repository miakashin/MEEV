'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function PricingPage() {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  useEffect(() => {
    // Handle success message from URL
    const searchParams = new URLSearchParams(window.location.search)
    if (searchParams.get('success') === 'true') {
      setShowSuccessMessage(true)
      // Hide the message after 5 seconds
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [])

  const tiers = [
    {
      name: 'Starter',
      price: '$1,200',
      period: '/month',
      description: 'Perfect for professionals starting with delegation',
      features: [
        'Dedicated VA (20 hours/week)',
        'Basic task delegation',
        'Email & calendar management',
        'Basic research tasks',
        'Standard response time',
      ],
    },
    {
      name: 'Professional',
      price: '$1,500-$2,000',
      period: '/month',
      description: 'Ideal for busy executives and entrepreneurs',
      features: [
        'Dedicated VA (40 hours/week)',
        'Advanced task delegation',
        'Complex project management',
        'Travel arrangements',
        'Priority response time',
        'Delegation coaching',
      ],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For teams and organizations',
      features: [
        'Multiple dedicated VAs',
        'Team coordination',
        'Custom workflows',
        'API integration',
        '24/7 support',
        'White-glove service',
      ],
    },
  ]

  return (
    <div className="py-20 bg-gray-50 relative">
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          <p className="text-center">Thank you for your application! We'll be in touch soon.</p>
        </div>
      )}
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the perfect plan to help you master delegation and reclaim your time
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                tier.highlighted ? 'ring-2 ring-blue-600 transform scale-105' : ''
              }`}
            >
              <div className="p-8">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    {tier.price}
                  </span>
                  <span className="text-gray-600 ml-1">{tier.period}</span>
                </div>
                <p className="text-gray-600 mb-6">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-green-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/pricing/submit?plan=${encodeURIComponent(tier.name)}`}
                  className={`block w-full text-center py-3 px-6 rounded-md font-medium ${
                    tier.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: 'How quickly can I get started?',
                answer: 'You can get started within 24-48 hours of signing up. We match you with a VA based on your specific needs and requirements.'
              },
              {
                question: 'Can I change my plan later?',
                answer: 'Yes, you can upgrade, downgrade, or cancel your plan at any time with no hidden fees.'
              },
              {
                question: 'What if I need more hours?',
                answer: 'Additional hours are available at a discounted rate. Contact us for custom packages.'
              },
              {
                question: 'How does the matching process work?',
                answer: 'We carefully match you with a VA based on your specific needs, timezone, and working style preferences.'
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
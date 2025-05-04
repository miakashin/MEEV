import React from 'react'

export default function PricingPage() {
  const tiers = [
    {
      name: 'Starter',
      price: '$1,500',
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
      price: '$3,000',
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
    <div className="py-20 bg-gray-50">
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

                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-2 mt-1"
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
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 px-6 rounded-full font-semibold ${
                    tier.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  } transition-colors`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What's included in each plan?
              </h3>
              <p className="text-gray-600">
                Each plan includes a dedicated virtual assistant, comprehensive training,
                and access to our delegation system. The main differences are in the
                hours of availability and level of service complexity.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. We'll help
                you transition smoothly to ensure continuity in your service.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                What if I need more hours?
              </h3>
              <p className="text-gray-600">
                Additional hours can be purchased as needed, or you can upgrade to a
                higher tier plan for more comprehensive coverage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
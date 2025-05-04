import React from 'react';

export default function JobsPage() {
  const benefits = [
    {
      title: 'Collaboration With Top Leaders',
      description: 'Work with global leaders, gain exposure to high-level decision-making, and use cutting-edge AI tools.'
    },
    {
      title: 'Comprehensive Benefits',
      description: 'Enjoy premium perks including paid time off, wellness initiatives, HMO coverage, and more.'
    },
    {
      title: 'Global Community',
      description: 'Access world-class training facilities and offices, plus a powerful network of peers who support one another.'
    },
    {
      title: 'Limitless Growth',
      description: 'Ongoing coaching, feedback, and strategic training designed for people who want more.'
    },
    {
      title: 'Metis College',
      description: 'Access a fully sponsored MBA through our exclusive partnership with Wolfe University and Oxford.'
    },
  ];

  const values = [
    {
      title: 'Go All In',
      description: 'You show up prepared and take the mission seriously. You bring focus and intensity to everything you do.'
    },
    {
      title: 'Pursue Growth',
      description: 'You want to be better than yesterday. You seek feedback, lean into challenges, and turn mistakes into momentum.'
    },
    {
      title: 'Earn Trust',
      description: 'You follow through, protect confidentiality, and operate with integrity. People rely on you because they know they can.'
    },
    {
      title: 'Think Strategically',
      description: 'You see the big picture and anticipate needs before they surface. You are not a task-taker—you are a strategic partner.'
    },
    {
      title: 'Own Outcomes',
      description: 'You do not wait to be told. You take initiative and deliver. Your attention to detail sets you apart.'
    },
  ];

  const openPositions = [
    { title: 'Analyst, Tools and Access Management', location: 'Philippines, Cebu' },
    { title: 'Administrative Assistant, Compensation and Benefits', location: 'Philippines, Cebu' },
    { title: 'Implementation Manager', location: 'US' },
    { title: 'Manager, Project Management', location: 'Philippines, Quezon City' },
    { title: 'Marketing Director', location: 'Philippines, Cebu' },
    { title: 'Leadership Coach', location: 'US' },
    { title: 'Graphic Designer', location: 'Philippines, Quezon City' },
    { title: 'Content Producer', location: 'Philippines, Quezon City' },
    { title: 'Vice President, Operations', location: 'Philippines, Quezon City' },
    { title: 'Client Partnership Manager', location: 'Philippines, Cebu' },
    // ...add more as needed
  ];

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">Join the Ambitious. Empower the Exceptional.</h1>
          <p className="text-xl text-gray-600 mb-6">
            Become the force behind world-class CEOs, founders, and leaders. Redefine your professional path with us.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition">Explore Opportunities</button>
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Benefits That Move You Forward</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How Our Strongest Show Up</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Open Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {openPositions.map((role) => (
              <div key={role.title} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                  <p className="text-gray-600 mb-4">{role.location}</p>
                </div>
                <a
                  href="/pricing/jobs/analyst-controllership"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-center"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
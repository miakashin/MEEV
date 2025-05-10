import React from 'react'

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Lorenzo M. Mejia Jr.',
      role: 'CEO & Founder',
      image: '/team/sarah.jpg',
      bio: `Enzo is the visionary founder and CEO of MEEV Assistant Services, a pioneering company for virtual solutions. What began as a side hassle project driven by Enzo's curiosity about remote assistant services eventually evolved into a disruptive force in the virtual world. Fueled by his desire to help small- and large-scale businesses save time, and focus on what truly matters, Enzo has built a strong partnership with clients from different business sectors.

That curiosity-driven spirit led to the founding of a company now known for its high caliber virtual assistants. Enzo continues to lead with a hands-on approach, and always pushing his team, to be the first choice of virtual clients across the globe.`,
    },
    {
      name: 'Emmanuel Deocades',
      role: 'Vice President',
      image: '/team/michael.jpg',
      bio: `With 10+ years of professional development and training experience, Emman ensures our VAs meet the highest standards of excellence. Emman is an accomplished Vice President exceptional background designing high-impact learning programs and quality assurance across customer service and operations team. Known for blending strategic vision with hands on execution, Emman
has built a training frameworks that not only elevate performance but also align directly with business outcomes. A certified instructional designer and a Certified Six Sigma Yellow Belt, Emman has led enterprise-wide training transformations, and coached hundreds of team leaders on performance development. At his current company, Emman overseas global training initiatives and quality standards, ensuring that every employee- from onboarding to leadership-has the tools and feedback needed to succeed.`,
    },
    {
      name: 'Monaliza Dagale',
      role: 'CMO',
      image: '/team/lisa.jpg',
      bio: `Mona is a seasoned Operations Director with over a decade of experience leading high-performing teams and driving operational excellence across fast-paced industries. Known for a rare blend of strategic thinking and hand-on leadership, Mona is deeply passionate about optimizing performance through the power of the people. With a strong background in process improvement, and cross-functional collaboration, Mona has led major transformations that increased efficiency, reduced, cost and elevated employee engagement. She believes that sustainable performance starts with empowering people-creating a culture where accountability, clarity and continuous growth are the norm.

Her passion for people development and operational excellence has made her a trusted advisor to executives and a respected mentor to learning professionals.`,
    },
  ]

  const stats = [
    { label: 'Happy Clients', value: '2000+' },
    { label: 'Elite VAs', value: '500+' },
    { label: 'Hours Saved', value: '1M+' },
    { label: 'Client Retention', value: '95%' },
  ]

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Mission
          </h1>
          <p className="text-xl text-gray-600">
            To empower businesses and individuals by providing reliable, efficient, and
            personalized virtual assistant services, enabling them to focus on their core
            objectives and achieve greater success.
          </p>
        </div>
        {/* Vision Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Vision
          </h1>
          <p className="text-xl text-gray-600">
            To be a global leader in virtual support solutions, recognized for excellence,
            innovation and commitment to enhancing organizational performance.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-gray-600 mb-4">
              Founded in 2025, MEEV emerged from a simple observation: talented
              professionals were spending too much time on tasks that could be delegated,
              limiting their potential impact.
            </p>
            <p className="text-gray-600 mb-4">
              We built MEEV to solve this problem by combining elite virtual
              assistants with a scientific approach to delegation. Our unique methodology
              ensures that professionals can effectively delegate tasks while maintaining
              high standards of quality.
            </p>
            <p className="text-gray-600">
              Today, we're proud to serve thousands of clients worldwide, helping them
              reclaim their time and focus on what truly matters - whether that's
              growing their business, spending time with family, or pursuing their
              passions.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <div className="w-full h-full rounded-full bg-gray-200" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-blue-600 mb-4">{member.role}</p>
                <p className="text-gray-600 whitespace-pre-line text-justify">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Integrity</h3>
              <p className="text-gray-600">
                At MEEV Assist, we build trust by consistently doing what is right, ethical and appropriate as our top priority is our client and stakeholder's security.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Professionalism</h3>
              <p className="text-gray-600">
                We carry out each assignment with courtesy, competence, and a strong work ethic in addition to a high degree of accountability and transparency.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-gray-600">
                The foundation of what we do on a daily basis is innovation - challenging the status quo with a growth mindset. We ask for feedback, invest in learning to advance as a company, and customize our services to match the changing needs of various industries and clientele.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Team Collaboration</h3>
              <p className="text-gray-600">
                We foster a collaborative culture so that everyone can work together to achieve seamless support and outcomes. Everyone contributes, stays aligned, supports and motivates one another.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
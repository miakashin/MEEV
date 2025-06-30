'use client';

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface TeamMember {
  name: string
  role: string
  image: string
  bio: string
}

interface Stat {
  label: string
  value: string
}

export default function AboutPage() {
  const teamMembers: TeamMember[] = [
    {
      name: 'Lorenzo M. Mejia Jr.',
      role: 'CEO & Founder',
      image: '/team/enzo.jpg',
      bio: `Enzo is the visionary founder and CEO of MEEV Assistant Services, a pioneering company for virtual solutions. What began as a side hassle project driven by Enzo's curiosity about remote assistant services eventually evolved into a disruptive force in the virtual world. Fueled by his desire to help small- and large-scale businesses save time, and focus on what truly matters, Enzo has built a strong partnership with clients from different business sectors.

That curiosity-driven spirit led to the founding of a company now known for its high caliber virtual assistants. Enzo continues to lead with a hands-on approach, and always pushing his team, to be the first choice of virtual clients across the globe.`,
    },
    {
      name: 'Emmanuel Deocades',
      role: 'Vice President',
      image: '/team/emman.jpg',
      bio: `With 10+ years of professional development and training experience, Emman ensures our VAs meet the highest standards of excellence. Emman is an accomplished Vice President with an exceptional background designing high-impact learning programs and quality assurance across customer service and operations teams. Known for blending strategic vision with hands-on execution, Emman has built training frameworks that not only elevate performance but also align directly with business outcomes. A certified instructional designer and a Certified Six Sigma Yellow Belt, Emman has led enterprise-wide training transformations and coached hundreds of team leaders on performance development. At his current company, Emman oversees global training initiatives and quality standards, ensuring that every employee - from onboarding to leadership - has the tools and feedback needed to succeed.`,
    },
    {
      name: 'Monaliza Dagale',
      role: 'CMO',
      image: '/team/mona.jpg',
      bio: `Mona is a seasoned Operations Director with over a decade of experience leading high-performing teams and driving operational excellence across fast-paced industries. Known for a rare blend of strategic thinking and hands-on leadership, Mona is deeply passionate about optimizing performance through the power of people. With a strong background in process improvement and cross-functional collaboration, Mona has led major transformations that increased efficiency, reduced costs, and elevated employee engagement. She believes that sustainable performance starts with empowering people - creating a culture where accountability, clarity, and continuous growth are the norm.

Her passion for people development and operational excellence has made her a trusted advisor to executives and a respected mentor to learning professionals.`,
    },
  ];



  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <div className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-blue-300/10 to-blue-100/10"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              About MEEV
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Discover our journey, values, and the passionate team behind MEEV Assistant Services.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-white/50 opacity-50"></div>
          <div className="absolute inset-0 bg-[url('https://source.unsplash.com/random/1920x1080/?pattern')] opacity-10 mix-blend-overlay"></div>
        </div>
      </div>

      {/* Mission and Vision Section */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6">
              <h2 className="text-4xl font-bold text-blue-900">Our Mission</h2>
              <p className="text-xl text-gray-700">
                To empower businesses and individuals by providing reliable, efficient, and
                personalized virtual assistant services, enabling them to focus on their core
                objectives and achieve greater success.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6">
              <h2 className="text-4xl font-bold text-blue-900">Our Vision</h2>
              <p className="text-xl text-gray-700">
                To be a global leader in virtual support solutions, recognized for excellence,
                innovation and commitment to enhancing organizational performance.
              </p>
            </motion.div>
          </div>


        </div>
      </div>

      {/* Story and Core Values Section */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">Our Story</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Founded in 2025, MEEV emerged from a simple observation: talented
              professionals were spending too much time on tasks that could be delegated,
              limiting their potential impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6">
              <p className="text-xl text-gray-700">
                We built MEEV to solve this problem by combining elite virtual
                assistants with a scientific approach to delegation. Our unique methodology
                ensures that professionals can effectively delegate tasks while maintaining
                high standards of quality.
              </p>
              <p className="text-xl text-gray-700">
                Today, we're proud to serve thousands of clients worldwide, helping them
                reclaim their time and focus on what truly matters - whether that's
                growing their business, spending time with family, or pursuing their
                passions.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div 
                  className="bg-white/80 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform-gpu"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Integrity</h3>
                  <p className="text-gray-800">
                    At MEEV Assist, we build trust by consistently doing what is right, ethical and appropriate as our top priority is our client and stakeholder's security.
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-white/80 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform-gpu"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Professionalism</h3>
                  <p className="text-gray-800">
                    We carry out each assignment with courtesy, competence, and a strong work ethic in addition to a high degree of accountability and transparency.
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-white/80 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform-gpu"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Innovation</h3>
                  <p className="text-gray-800">
                    The foundation of what we do on a daily basis is innovation - challenging the status quo with a growth mindset. We ask for feedback, invest in learning to advance as a company, and customize our services to match the changing needs of various industries and clientele.
                  </p>
                </motion.div>
                <motion.div 
                  className="bg-white/80 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105 transform-gpu"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-blue-900">Team Collaboration</h3>
                  <p className="text-gray-800">
                    We foster a collaborative culture so that everyone can work together to achieve seamless support and outcomes. Everyone contributes, stays aligned, supports and motivates one another.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>


    </div>
  )}
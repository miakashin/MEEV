'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import IntroVideo from '../components/IntroVideo'
import RegisterModal from '../components/RegisterModal'
import LoginModal from '../components/LoginModal'
// import Navbar from '../components/Navbar'  // <-- REMOVE or comment this out

export default function Home() {
  const [showModal, setShowModal] = useState(false)
  const [userType, setUserType] = useState<'CLIENT' | 'APPLICANT'>('CLIENT')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const openModal = (type: 'CLIENT' | 'APPLICANT') => {
    setUserType(type)
    setShowModal(true)
  }

  return (
    <>
      {/* <Navbar />  <-- REMOVE or comment this out */}
      <main className="min-h-screen pt-28">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                <Image
                  src="/LOGO.png"
                  alt="MEEV Logo"
                  width={400}
                  height={400}
                  className="mx-auto"
                  priority
                />
              </div>
              <div className="relative inline-block">
                <h1 className="text-7xl hero-title mb-4 animate-scale-in animate-glow">
                  MEEV
                </h1>
                {/* Roles & Opportunities button removed from here */}
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl hero-subtitle mb-4">
                  <span className="inline-block opacity-0 animate-slide-left delay-200">
                    VIRTUAL
                  </span>
                  {" "}
                  <span className="inline-block opacity-0 animate-fade-in-up delay-400">
                    ASSISTANCE
                  </span>
                  {" "}
                  <span className="inline-block opacity-0 animate-slide-right delay-600">
                    SERVICES
                  </span>
                </h2>
                <p className="text-2xl italic opacity-0 animate-fade-in-up delay-800 relative">
                  <span className="relative inline-block animate-glow">
                    "VIRTUALLY YOURS"
                  </span>
                </p>
                <div className="mt-12 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-center sm:space-x-4 opacity-0 animate-fade-in-up delay-600">
                  {/*
                  <button
                    onClick={() => openModal('CLIENT')}
                    className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all hover:scale-105"
                  >
                    Register as Client
                  </button>
                  <button
                    onClick={() => openModal('APPLICANT')}
                    className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all hover:scale-105"
                  >
                    Register as Applicant
                  </button>
                  */}
                  {/*
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="bg-white/20 border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/30 transition-all hover:scale-105"
                  >
                    Sign In
                  </button>
                  */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <IntroVideo />
      </main>

      <RegisterModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        userType={userType}
      />

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  )
}
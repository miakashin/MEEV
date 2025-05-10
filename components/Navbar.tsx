'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2 py-2">
            <Image
              src="/LOGO.png"
              alt="MEEV Logo"
              width={100}
              height={100}
              className="object-contain"
            />
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-blue-600">MEEV</span>
              <span className="text-sm text-gray-600">VIRTUALLY YOURS</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/home" className="text-gray-600 hover:text-blue-600">Home</Link>
            <Link href="/services" className="text-gray-600 hover:text-blue-600">Services</Link>
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
            <Link 
              href="/pricing/jobs" 
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              Roles & Opportunities
            </Link>
            <Link 
              href="/get-started" 
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="w-6 h-6 text-gray-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link href="/home" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/services" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Services</Link>
              <Link href="/pricing" className="block px-3 py-2 text-gray-600 hover:text-blue-600">Pricing</Link>
              <Link href="/about" className="block px-3 py-2 text-gray-600 hover:text-blue-600">About</Link>
              <Link 
                href="/pricing/jobs" 
                className="block px-3 py-2 bg-blue-600 text-white rounded-full text-center hover:bg-blue-700"
              >
                Roles & Opportunities
              </Link>
              <Link 
                href="/get-started" 
                className="block px-3 py-2 bg-blue-600 text-white rounded-full text-center hover:bg-blue-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
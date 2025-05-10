'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function HomeNoIntro() {
  return (
    <main className="min-h-screen pt-28">
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Image
                src="/LOGO.png"
                alt="MEEV Logo"
                width={100}
                height={100}
                className="mx-auto"
                priority
              />
            </div>
            <div className="relative inline-block">
              <h1 className="text-7xl hero-title mb-4 animate-scale-in animate-glow">
                MEEV
              </h1>
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
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
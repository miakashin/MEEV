'use client'
import React, { useState } from 'react';

export default function AnalystControllershipPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    resume: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('https://formspree.io/f/mqaqpngr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSubmitted(true);
  };

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold mb-6 text-center">Analyst, Controllership (Accounts Payable)</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Apply for the Analyst, Controllership (Accounts Payable) position. Please fill out the form below to submit your application.
        </p>
        {submitted ? (
          <div className="bg-green-100 text-green-800 p-6 rounded-lg text-center font-semibold">
            Thank you for your application! We will review your submission and contact you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg space-y-6">
            <div>
              <label className="block font-semibold mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Resume (URL or Paste)</label>
              <input
                type="text"
                name="resume"
                value={form.resume}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
                placeholder="Paste a link to your resume or paste your resume text"
              />
            </div>
            <div>
              <label className="block font-semibold mb-2">Message (Optional)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 
"use client"
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default function ApplyPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [educationalAttainment, setEducationalAttainment] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [interview, setInterview] = useState<Date | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/apply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        educationalAttainment,
        schoolName,
        phoneNumber,
        address,
        interview,
      }),
    })
    if (res.ok) setSuccess(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-white py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white/90 rounded-2xl shadow-xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-blue-100"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Applicant Form</h2>
        <div className="space-y-4">
          <input
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            placeholder="First Name"
            required
            className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          <input
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            placeholder="Last Name"
            required
            className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
            className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          <input
            value={educationalAttainment}
            onChange={e => setEducationalAttainment(e.target.value)}
            placeholder="Educational Attainment"
            required
            className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          <input
            value={schoolName}
            onChange={e => setSchoolName(e.target.value)}
            placeholder="School Name"
            required
            className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          <input
            value={phoneNumber}
            onChange={e => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Address"
            className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
          />
          <div>
            <DatePicker
              selected={interview}
              onChange={date => setInterview(date)}
              showTimeSelect
              dateFormat="Pp"
              placeholderText="Select interview date/time"
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition"
        >
          Submit Application
        </button>
        {success && (
          <p className="text-green-600 mt-4 text-center font-semibold">
            Application submitted!
          </p>
        )}
      </form>
    </div>
  )
}
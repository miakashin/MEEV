"use client"
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useRouter } from 'next/navigation'

export default function ApplyPage() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [educationalAttainment, setEducationalAttainment] = useState('')
  const [schoolName, setSchoolName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [interview, setInterview] = useState<Date | null>(null)
  const [resume, setResume] = useState<File | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const formData = new FormData()
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    formData.append('email', email)
    formData.append('educationalAttainment', educationalAttainment)
    formData.append('schoolName', schoolName)
    formData.append('phoneNumber', phoneNumber)
    formData.append('address', address)
    formData.append('interview', interview ? interview.toString() : '')
    if (resume) formData.append('resume', resume)

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      })
      setLoading(false)
      
      if (res.ok) {
        const responseData = await res.json()
        console.log('Submission response:', responseData)
        setSuccess(true)
        setTimeout(() => {
          router.push("/home")
        }, 1500)
      } else {
        // Handle error response
        const errorData = await res.json()
        console.error('Submission error:', errorData)
        alert(`Submission failed: ${errorData.message || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Submission error:', error)
      setLoading(false)
      alert('An error occurred while submitting the application. Please try again.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-white py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white/90 rounded-2xl shadow-xl p-8 transition-transform duration-300 hover:scale-105 hover:shadow-2xl border border-blue-100" encType="multipart/form-data">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Applicant Form</h2>
        <div className="space-y-4">
          <input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" required className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
          <input value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" required className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" type="email" required className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
          <input value={educationalAttainment} onChange={e => setEducationalAttainment(e.target.value)} placeholder="Educational Attainment" required className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
          <input value={schoolName} onChange={e => setSchoolName(e.target.value)} placeholder="School Name" required className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
          <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone Number" className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
          <input value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition" />
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
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Upload Resume (PDF, DOCX):</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => setResume(e.target.files?.[0] || null)}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
        </div>
        <button type="submit" disabled={loading} className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed">
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
        {success && (
          <p className="text-green-600 mt-4 text-center font-semibold">
            Application submitted! Redirecting to home...
          </p>
        )}
      </form>
    </div>
  )
}
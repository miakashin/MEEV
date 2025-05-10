import React, { useEffect, useState } from 'react'

interface Applicant {
  id: string
  firstName: string
  lastName: string
  educationalAttainment: string
  schoolName: string
  phoneNumber?: string
  address?: string
  interview?: string
  createdAt: string
  updatedAt: string
}

export default function ApplicantsAdminPage() {
  const [applicants, setApplicants] = useState<Applicant[]>([])

  useEffect(() => {
    fetch('/api/apply')
      .then(res => res.json())
      .then(data => setApplicants(data))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
        <div className="flex items-center mb-8">
          <div className="flex-grow border-t-2 border-blue-200"></div>
          <h1 className="mx-4 text-3xl font-bold text-blue-700">Applicants</h1>
          <div className="flex-grow border-t-2 border-blue-200"></div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border rounded-lg shadow">
            <thead>
              <tr className="bg-blue-100">
                <th className="border px-4 py-2 text-blue-700">Name</th>
                <th className="border px-4 py-2 text-blue-700">Education</th>
                <th className="border px-4 py-2 text-blue-700">School</th>
                <th className="border px-4 py-2 text-blue-700">Phone</th>
                <th className="border px-4 py-2 text-blue-700">Address</th>
                <th className="border px-4 py-2 text-blue-700">Interview</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map(app => (
                <tr key={app.id} className="hover:bg-blue-50 transition">
                  <td className="border px-4 py-2">{app.firstName} {app.lastName}</td>
                  <td className="border px-4 py-2">{app.educationalAttainment}</td>
                  <td className="border px-4 py-2">{app.schoolName}</td>
                  <td className="border px-4 py-2">{app.phoneNumber}</td>
                  <td className="border px-4 py-2">{app.address}</td>
                  <td className="border px-4 py-2">{app.interview ? new Date(app.interview).toLocaleString() : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
"use client"
import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getDay, setHours, setMinutes } from 'date-fns'
import { toZonedTime, fromZonedTime } from 'date-fns-tz' // Corrected import names: utcToZonedTime -> toZonedTime, zonedTimeToUtc -> fromZonedTime
import { useMemo } from 'react' // Added for useMemo
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

  const targetTimeZone = 'America/New_York'

  // Availability: 0 (Sun) to 6 (Sat) in ET, with specific slots
  const dailyAvailabilityET: { [key: number]: Array<{ hour: number; minute: number }> } = {
    1: [ // Monday ET
      { hour: 11, minute: 30 }, { hour: 14, minute: 0 }, { hour: 17, minute: 0 },
    ],
    2: [ // Tuesday ET
      { hour: 11, minute: 30 }, { hour: 14, minute: 0 }, { hour: 17, minute: 0 },
    ],
    3: [ // Wednesday ET
      { hour: 11, minute: 30 }, { hour: 14, minute: 0 }, { hour: 17, minute: 0 },
    ],
    4: [ // Thursday ET
      { hour: 11, minute: 30 }, { hour: 14, minute: 0 }, { hour: 17, minute: 0 },
    ],
    5: [ // Friday ET
      { hour: 11, minute: 30 }, { hour: 14, minute: 0 }, { hour: 17, minute: 0 },
    ],
    6: [ // Saturday ET
      { hour: 10, minute: 0 }, { hour: 11, minute: 0 }, { hour: 14, minute: 0 }, { hour: 16, minute: 0 },
    ],
  };

  // --- Availability Logic ---
  // Check if the selected date is an available day with configured slots in ET
  const isAvailableDayInET = (date: Date) => {
    const dateInET = toZonedTime(date, targetTimeZone);
    const dayOfWeekInET = getDay(dateInET); // 0 (Sunday) - 6 (Saturday)
    return dailyAvailabilityET[dayOfWeekInET] !== undefined && dailyAvailabilityET[dayOfWeekInET].length > 0;
  };

  // Generate specific time slots based on the selected day's availability in ET, converted to user's local time
  const localTimesForETSlots = useMemo(() => {
    if (!interview) return []; // No date selected yet

    const selectedDateInET = toZonedTime(interview, targetTimeZone);
    const dayOfWeekInET = getDay(selectedDateInET);
    const timeSlotsForDay = dailyAvailabilityET[dayOfWeekInET];

    if (!timeSlotsForDay || timeSlotsForDay.length === 0) return []; // Day is not configured or has no slots

    const slots = timeSlotsForDay.map(slot => {
      // Create a date object for the selected day at the specific hour and minute in ET
      let specificTimeInET = setHours(setMinutes(selectedDateInET, slot.minute), slot.hour);
      // Convert this ET time to the user's local time zone for the DatePicker list
      return toZonedTime(specificTimeInET, Intl.DateTimeFormat().resolvedOptions().timeZone);
    });
    return slots;
  }, [interview, targetTimeZone]); // Recalculate when interview date or timezone changes
  // --- End Availability Logic ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const formData = new FormData()
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('email', email)
      formData.append('educationalAttainment', educationalAttainment)
      formData.append('schoolName', schoolName)
      formData.append('phoneNumber', phoneNumber)
      formData.append('address', address)
      formData.append('interview', interview ? interview.toISOString() : '')
      formData.append('formType', 'applicant')
      
      // Only append resume if it exists
      if (resume) {
        formData.append('resume', resume)
      }

      // Log the form data being sent
      console.log('Submitting form data:', {
        firstName,
        lastName,
        email,
        educationalAttainment,
        schoolName,
        phoneNumber,
        address,
        interview: interview?.toISOString(),
        resume: resume ? `${resume.name} (${(resume.size / 1024).toFixed(2)} KB)` : 'None'
      });

      const res = await fetch('/api/contact', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, let the browser set it with the correct boundary
        headers: {
          'Accept': 'application/json',
        },
      });
      
      // Log the raw response for debugging
      const responseText = await res.text();
      console.log('Raw response:', responseText);
      
      try {
        const responseData = responseText ? JSON.parse(responseText) : {};
        
        if (res.ok) {
          console.log('Submission successful:', responseData);
          setSuccess(true);
          
          // Clear form
          setFirstName('');
          setLastName('');
          setEmail('');
          setEducationalAttainment('');
          setSchoolName('');
          setPhoneNumber('');
          setAddress('');
          setInterview(null);
          setResume(null);
          
          // Reset file input
          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
          
          // Redirect after delay
          setTimeout(() => {
            router.push("/home");
          }, 1500);
        } else {
          // Handle error response
          const errorMessage = responseData.error || 'Unknown error';
          const errorDetails = responseData.details || responseText || 'No details available';
          console.error('Submission failed:', { status: res.status, errorMessage, errorDetails });
          
          // Show more detailed error message
          alert(`Submission failed (${res.status}): ${errorMessage}\n\n${errorDetails}`);
        }
      } catch (jsonError) {
        console.error('Error parsing JSON response:', { error: jsonError, responseText });
        throw new Error(`Failed to process server response. Status: ${res.status}`);
      }
    } catch (error) {
      console.error('Submission error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      alert(`An error occurred while submitting the application: ${errorMessage}`)
    } finally {
      setLoading(false)
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
              filterDate={isAvailableDayInET} // Check if day has available slots in ET
              includeTimes={localTimesForETSlots} // Provide specific ET slots converted to local time
              dateFormat="MMMM d, yyyy h:mm aa"
              placeholderText="Select an available interview slot"
              className="w-full p-2 border border-gray-300 rounded-md"
              minDate={new Date()} // Prevent selecting past local dates
              timeIntervals={30} // Suggest 30-min intervals in UI, though includeTimes is definitive
            />
            <p className="text-xs text-gray-500 mt-1">
              Specific 30-minute slots are shown in your local timezone. Availability is based on US Eastern Time and varies by day.
            </p>
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">Upload Resume (PDF, DOCX):</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) {
                  // Validate file size (5MB max)
                  if (file.size > 5 * 1024 * 1024) {
                    alert('File size should be less than 5MB');
                    e.target.value = ''; // Clear the input
                    return;
                  }
                  setResume(file);
                } else {
                  setResume(null);
                }
              }}
              className="w-full p-2 border rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {resume && (
              <p className="mt-1 text-sm text-gray-600">
                Selected: {resume.name} ({(resume.size / 1024 / 1024).toFixed(2)} MB)
              </p>
            )}
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
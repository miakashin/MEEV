'use client'

import React, { useState, useMemo } from 'react' // Added useMemo
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { getDay, setHours, setMinutes } from 'date-fns'
import { toZonedTime, fromZonedTime } from 'date-fns-tz' // Corrected import names: utcToZonedTime -> toZonedTime, zonedTimeToUtc -> fromZonedTime
import { useRouter } from 'next/navigation'

export default function GetStartedPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    consultationTime: null as Date | null, // Added for the calendar
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

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
    if (!formData.consultationTime) return []; // No date selected yet

    const selectedDateInET = toZonedTime(formData.consultationTime, targetTimeZone);
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
  }, [formData.consultationTime, targetTimeZone]); // Recalculate when consultationTime or timezone changes
  // --- End Availability Logic ---

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataString = new URLSearchParams({
      ...formData,
      consultationTime: formData.consultationTime ? formData.consultationTime.toISOString() : '', // Submit as UTC ISO string
      formType: 'get-started'
    }).toString();

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formDataString,
    });
    if (!response.ok) {
      try {
        const error = await response.json();
        throw new Error(error.error || error.details || 'Failed to send application');
      } catch {
        throw new Error('Failed to send application. Please check your internet connection and try again.');
      }
    }
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      consultationTime: null, // Reset consultation time
    });
    
    // Redirect to pricing page with success message
    router.push('/pricing?success=true');
    
    // Show alert before redirect
    setTimeout(() => {
      alert('Thank you for your application! We will contact you soon.');
    }, 100); // Small delay to ensure alert is shown before redirect
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Start Your Delegation Journey
          </h1>
          <p className="text-xl text-gray-600">
            Fill out the form below and we'll match you with an elite virtual assistant
            within 48 hours
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company (Optional)
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Consultation Time Picker */}
              <div>
                <label htmlFor="consultationTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Consultation Time
                </label>
                <DatePicker
                  selected={formData.consultationTime}
                  onChange={(date: Date | null) => setFormData(prev => ({ ...prev, consultationTime: date }))}
                  showTimeSelect
                  filterDate={isAvailableDayInET} // Check if day has available slots in ET
                  includeTimes={localTimesForETSlots} // Provide specific ET slots converted to local time
                  dateFormat="MMMM d, yyyy h:mm aa"
                  placeholderText="Select an available consultation slot"
                  minDate={new Date()}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  timeIntervals={30} // Suggest 30-min intervals in UI, though includeTimes is definitive
                />
                <p className="text-xs text-gray-500 mt-1">
                  Specific 30-minute slots are shown in your local timezone. Availability is based on US Eastern Time and varies by day.
                </p>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Tell us about your needs
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-700 transition-colors"
              >
                Submit Application
              </button>
            </div>
          </form>

          {/* Additional Information */}
          <div className="mt-8 text-center text-gray-600">
            <p>
              By submitting this form, you agree to our{' '}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-blue-600 hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { calculateSavings } from '@/lib/calculations';
import { createLead } from '@/lib/supabase';

export default function CalculatorPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    postcode: '',
    propertyType: '',
    monthlyBill: 120,
    roofDirection: '',
    batteryInterest: false,
    name: '',
    email: '',
    phone: '',
  });

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const savings = calculateSavings(formData.monthlyBill);

      const lead = await createLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        postcode: formData.postcode,
        property_type: formData.propertyType,
        monthly_bill: formData.monthlyBill,
        roof_direction: formData.roofDirection,
        battery_interest: formData.batteryInterest,
        estimated_savings: savings.annualSavings,
      });

      // Store savings data in sessionStorage for results page
      sessionStorage.setItem('savingsData', JSON.stringify(savings));
      sessionStorage.setItem('leadId', lead.id);

      router.push('/results');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <a href="/" className="text-2xl font-bold text-blue-600">
          ☀️ SolarSavingsUK
        </a>
        <span className="text-gray-600">Step {step} of 6</span>
      </nav>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Step 1: Postcode */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Your Postcode?</h2>
              <input
                type="text"
                placeholder="e.g., BD1 1AA"
                value={formData.postcode}
                onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <p className="text-gray-600 text-sm mt-2">We use this to find local installers</p>
            </div>
          )}

          {/* Step 2: Property Type */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What Type of Property?</h2>
              <div className="space-y-3">
                {['detached', 'semi_detached', 'terrace', 'flat'].map((type) => (
                  <label key={type} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="propertyType"
                      value={type}
                      checked={formData.propertyType === type}
                      onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-lg text-gray-900 capitalize">{type.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Monthly Bill */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Your Monthly Electricity Bill?</h2>
              <div className="space-y-4">
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={formData.monthlyBill}
                  onChange={(e) => setFormData({ ...formData, monthlyBill: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="text-center">
                  <span className="text-4xl font-bold text-blue-600">£{formData.monthlyBill}</span>
                  <p className="text-gray-600 text-sm mt-2">Adjust the slider</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Roof Direction */}
          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Which Direction Does Your Roof Face?</h2>
              <div className="space-y-3">
                {['south', 'east', 'west', 'north', 'not_sure'].map((direction) => (
                  <label key={direction} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="roofDirection"
                      value={direction}
                      checked={formData.roofDirection === direction}
                      onChange={(e) => setFormData({ ...formData, roofDirection: e.target.value })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-lg text-gray-900 capitalize">{direction.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Battery Interest */}
          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Interested in Battery Storage?</h2>
              <div className="space-y-3">
                {[
                  { value: true, label: 'Yes, I want battery storage' },
                  { value: false, label: 'No, just solar panels' },
                ].map((option) => (
                  <label key={String(option.value)} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-blue-50">
                    <input
                      type="radio"
                      name="batteryInterest"
                      checked={formData.batteryInterest === option.value}
                      onChange={() => setFormData({ ...formData, batteryInterest: option.value })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <span className="ml-3 text-lg text-gray-900">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Contact Details */}
          {step === 6 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Almost Done!</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="07700 900000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {step > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={20} />
                Back
              </button>
            )}

            {step < 6 ? (
              <button
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.postcode) ||
                  (step === 2 && !formData.propertyType) ||
                  (step === 4 && !formData.roofDirection)
                }
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight size={20} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !formData.name || !formData.email || !formData.phone}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Get My Savings Report'}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

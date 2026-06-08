'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { formatCurrency } from '@/lib/calculations';
import { SavingsCalculation } from '@/types/lead';

export default function ResultsPage() {
  const [savings, setSavings] = useState<SavingsCalculation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savingsData = sessionStorage.getItem('savingsData');
    if (savingsData) {
      setSavings(JSON.parse(savingsData));
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your results...</p>
        </div>
      </main>
    );
  }

  if (!savings) {
    return (
      <main className="min-h-screen bg-white">
        <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <a href="/" className="text-2xl font-bold text-blue-600">
            ☀️ SolarSavingsUK
          </a>
        </nav>
        <div className="max-w-2xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-600 mb-6">No results found. Please complete the calculator first.</p>
          <Link href="/calculator" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
            Start Calculator
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <a href="/" className="text-2xl font-bold text-blue-600">
          ☀️ SolarSavingsUK
        </a>
        <a href="tel:08001234567" className="text-gray-600 font-medium">
          0800 123 4567
        </a>
      </nav>

      {/* Results Container */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <CheckCircle size={64} className="text-green-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Solar Savings Report</h1>
          <p className="text-xl text-gray-600">Based on your home details, here's what you could save</p>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Annual Savings */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-green-500">
            <p className="text-gray-600 text-sm font-medium mb-2">Estimated Annual Savings</p>
            <p className="text-4xl font-bold text-green-600">{formatCurrency(savings.annualSavings)}</p>
            <p className="text-gray-600 text-sm mt-2">Every year on your energy bills</p>
          </div>

          {/* Lifetime Savings */}
          <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-500">
            <p className="text-gray-600 text-sm font-medium mb-2">Estimated Lifetime Savings</p>
            <p className="text-4xl font-bold text-blue-600">{formatCurrency(savings.lifetimeSavings)}</p>
            <p className="text-gray-600 text-sm mt-2">Over 25 years</p>
          </div>
        </div>

        {/* System Details */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Estimated System</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">System Size</p>
              <p className="text-3xl font-bold text-blue-600">{savings.systemSize} kW</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Installation Cost</p>
              <p className="text-3xl font-bold text-gray-900">{formatCurrency(savings.installCost)}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm font-medium mb-2">Payback Period</p>
              <p className="text-3xl font-bold text-gray-900">{savings.paybackYears} years</p>
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-blue-50 rounded-lg p-8 mb-8 border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How We Calculated This</h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Your monthly bill suggests you use approximately {Math.round((savings.systemSize * 1000) / 250)} kWh per month</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>A {savings.systemSize} kW solar system can generate about 65% of your annual electricity needs</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>This saves you approximately {formatCurrency(savings.annualSavings)} per year</span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold">✓</span>
              <span>Your system will pay for itself in {savings.paybackYears} years</span>
            </li>
          </ul>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What Happens Next?</h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">1</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">We've Received Your Details</h3>
                <p className="text-gray-600">Your information is secure and we'll contact you shortly</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">2</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Compare Local Installers</h3>
                <p className="text-gray-600">We'll connect you with 3-5 trusted installers in your area</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white font-bold">3</div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Get Quotes & Save Money</h3>
                <p className="text-gray-600">Compare quotes and choose the best option for you</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-white text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Compare Quotes?</h2>
          <p className="mb-6 text-blue-100">Local installers are waiting to provide you with personalised quotes</p>
          <button className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Compare Local Installers
            <ArrowRight size={20} />
          </button>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Questions</h2>
          <div className="space-y-4">
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">How accurate is this estimate?</summary>
              <p className="text-gray-600 mt-2">This is a preliminary estimate based on your inputs. Actual savings may vary based on your specific roof condition, shading, and local weather patterns. A site survey will provide a more accurate figure.</p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">What if I want to add battery storage?</summary>
              <p className="text-gray-600 mt-2">Battery storage can increase your savings by 10-20%. Our installers will provide quotes for both options.</p>
            </details>
            <details className="border-b border-gray-200 pb-4">
              <summary className="font-semibold text-gray-900 cursor-pointer">Are there government grants available?</summary>
              <p className="text-gray-600 mt-2">Yes! Various grants and schemes are available. Our installers will help you identify which ones you're eligible for.</p>
            </details>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 px-6 py-12 text-center mt-12">
        <p>&copy; 2024 SolarSavingsUK. All rights reserved.</p>
      </footer>
    </main>
  );
}

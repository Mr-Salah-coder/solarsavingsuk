import Link from 'next/link';
import { ArrowRight, Star, Zap, Home, Battery, Leaf } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <div className="text-2xl font-bold text-blue-600">☀️ SolarSavingsUK</div>
        <a href="tel:08001234567" className="text-gray-600 font-medium">
          0800 123 4567
        </a>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Discover How Much You Could Save With Solar Panels
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Get a free savings estimate and compare quotes from trusted UK installers.
        </p>

        <Link
          href="/calculator"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
        >
          Calculate My Savings
          <ArrowRight size={20} />
        </Link>

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mt-12">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-gray-600">Rated by UK Homeowners</span>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Homeowners Choose Solar</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Zap size={48} className="text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Reduce Electricity Bills</h3>
              <p className="text-gray-600">Save up to 65% on your energy costs</p>
            </div>
            <div className="text-center">
              <Home size={48} className="text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Increase Property Value</h3>
              <p className="text-gray-600">Add £10,000+ to your home value</p>
            </div>
            <div className="text-center">
              <Battery size={48} className="text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Add Battery Storage</h3>
              <p className="text-gray-600">Store energy for use at night</p>
            </div>
            <div className="text-center">
              <Leaf size={48} className="text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Reduce Carbon Footprint</h3>
              <p className="text-gray-600">Help save the environment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Recent Solar Savings</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { city: 'Leeds', savings: '£1,140/year' },
              { city: 'Bradford', savings: '£980/year' },
              { city: 'Manchester', savings: '£1,250/year' },
            ].map((item) => (
              <div key={item.city} className="bg-blue-50 p-8 rounded-lg text-center border border-blue-200">
                <p className="text-gray-600 mb-2">{item.city}</p>
                <p className="text-3xl font-bold text-blue-600">{item.savings}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'How much do solar panels cost?',
                a: 'The average cost is £5,000-£8,000 for a 4kW system. Our calculator provides a personalised estimate based on your home.',
              },
              {
                q: 'Can I add a battery later?',
                a: 'Yes! You can add battery storage at any time. Many customers add batteries 2-3 years after installation.',
              },
              {
                q: 'How long do panels last?',
                a: 'Solar panels typically last 25-30 years and come with a 25-year warranty.',
              },
              {
                q: 'Do solar panels work in winter?',
                a: 'Yes, panels work year-round. While output is lower in winter, they still generate significant energy on cloudy days.',
              },
            ].map((item, i) => (
              <details key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                <summary className="font-semibold cursor-pointer">{item.q}</summary>
                <p className="text-gray-600 mt-4">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Save on Your Energy Bills?</h2>
        <Link
          href="/calculator"
          className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Get Your Free Estimate
          <ArrowRight size={20} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 px-6 py-12 text-center">
        <p>&copy; 2024 SolarSavingsUK. All rights reserved.</p>
      </footer>
    </main>
  );
}

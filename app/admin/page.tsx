'use client';

import { useEffect, useState } from 'react';
import { getLeads } from '@/lib/supabase';
import { Lead } from '@/types/lead';
import { formatCurrency } from '@/lib/calculations';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

export default function AdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalValue: 0,
    todayLeads: 0,
  });

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const data = await getLeads();
        setLeads(data || []);

        // Calculate stats
        const totalLeads = data?.length || 0;
        const totalValue = (data || []).reduce((sum, lead) => sum + lead.estimated_savings, 0);
        
        // Count today's leads
        const today = new Date().toDateString();
        const todayLeads = (data || []).filter(
          (lead) => new Date(lead.created_at).toDateString() === today
        ).length;

        setStats({
          totalLeads,
          totalValue,
          todayLeads,
        });
      } catch (error) {
        console.error('Error fetching leads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" className="text-2xl font-bold text-blue-600">
            ☀️ SolarSavingsUK
          </a>
          <div className="text-sm text-gray-600">Admin Dashboard</div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Total Leads */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalLeads}</p>
              </div>
              <Users size={40} className="text-blue-600 opacity-20" />
            </div>
          </div>

          {/* Today's Leads */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Today's Leads</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.todayLeads}</p>
              </div>
              <TrendingUp size={40} className="text-green-600 opacity-20" />
            </div>
          </div>

          {/* Lead Value */}
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Lead Value</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{formatCurrency(stats.totalValue)}</p>
              </div>
              <BarChart3 size={40} className="text-purple-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Leads</h2>
          </div>

          {leads.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-600">No leads yet. Share your calculator link to start collecting leads!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Postcode</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Property</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Bill</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Est. Savings</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{lead.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lead.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lead.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{lead.postcode}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{lead.property_type.replace('_', ' ')}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">£{lead.monthly_bill}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-green-600">{formatCurrency(lead.estimated_savings)}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(lead.created_at).toLocaleDateString('en-GB', {
                          day: 'short',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Export Button */}
        {leads.length > 0 && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => {
                const csv = [
                  ['Name', 'Email', 'Phone', 'Postcode', 'Property Type', 'Monthly Bill', 'Est. Savings', 'Date'],
                  ...leads.map((lead) => [
                    lead.name,
                    lead.email,
                    lead.phone,
                    lead.postcode,
                    lead.property_type,
                    lead.monthly_bill,
                    lead.estimated_savings,
                    new Date(lead.created_at).toLocaleDateString(),
                  ]),
                ]
                  .map((row) => row.join(','))
                  .join('\n');

                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
                a.click();
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Export to CSV
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

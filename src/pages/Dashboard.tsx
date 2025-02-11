import { Card } from '@/components/ui/Card';
import { Building2, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Property, Lead } from '@/types';

export function Dashboard() {
  const [stats, setStats] = useState({
    totalLeads: 0,
    totalProperties: 0,
    activeLeads: 0,
    availableProperties: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [leadsRes, propertiesRes] = await Promise.all([
          fetch('http://localhost:3000/api/leads'),
          fetch('http://localhost:3000/api/properties'),
        ]);

        const leads: Lead[] = await leadsRes.json();
        const properties: Property[] = await propertiesRes.json();

        setStats({
          totalLeads: leads.length,
          totalProperties: properties.length,
          activeLeads: leads.filter((lead) => lead.status !== 'lost').length,
          availableProperties: properties.filter(
            (property) => property.status === 'available'
          ).length,
        });
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Leads</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalLeads}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Leads</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.activeLeads}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Total Properties
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.totalProperties}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
              <Building2 className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">
                Available Properties
              </h3>
              <p className="text-2xl font-semibold text-gray-900">
                {stats.availableProperties}
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
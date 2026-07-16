import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const [stats, setStats] = useState({ users: 0, courses: 0, gmv: 0 });

  // Dummy chart data
  const data = [
    { name: 'Yan', daromad: 4000000 },
    { name: 'Fev', daromad: 3000000 },
    { name: 'Mar', daromad: 2000000 },
    { name: 'Apr', daromad: 2780000 },
    { name: 'May', daromad: 1890000 },
    { name: 'Iyun', daromad: 2390000 },
    { name: 'Iyul', daromad: 3490000 },
  ];

  useEffect(() => {
    // In real app, fetch from /admin/stats
    setStats({ users: 1540, courses: 42, gmv: 45000000 });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Superadmin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Umumiy Daromad (GMV)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.gmv.toLocaleString()} UZS</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Foydalanuvchilar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.users}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Jami Kurslar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.courses}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daromad O'sishi (Oylar kesimida)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="daromad" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

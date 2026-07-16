import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../store/useAuthStore';

interface Payout {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
}

interface FinancialData {
  totalRevenue: number;
  mentorCut: number;
  availableBalance: number;
  payouts: Payout[];
}

export default function Financials() {
  const token = useAuthStore(state => state.token);
  const [data, setData] = useState<FinancialData>({ totalRevenue: 0, mentorCut: 0, availableBalance: 0, payouts: [] });

  useEffect(() => {
    // In real app, fetch from /payouts/me
    // Mocking for now:
    setData({
      totalRevenue: 10000000,
      mentorCut: 7000000,
      availableBalance: 2000000,
      payouts: [
        { id: '1', amount: 5000000, status: 'APPROVED', createdAt: '2023-10-01' }
      ]
    });
  }, []);

  const requestPayout = async () => {
    const cardInfo = prompt("Karta raqamingizni kiriting (Masalan: 8600 1234 5678 9012):");
    if (!cardInfo) return;

    const amountStr = prompt(`Yechib olinadigan summani kiriting (Maksimum: ${data.availableBalance}):`);
    const amount = Number(amountStr);
    
    if (!amount || amount <= 0 || amount > data.availableBalance) {
      return alert("Noto'g'ri summa kiritildi.");
    }

    try {
      const res = await fetch('http://localhost:3000/payouts/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ amount, cardInfo })
      });
      if (res.ok) {
        alert("So'rov muvaffaqiyatli yuborildi!");
        // Update local state mock
        setData(prev => ({
          ...prev,
          availableBalance: prev.availableBalance - amount,
          payouts: [...prev.payouts, { id: Date.now().toString(), amount, status: 'PENDING', createdAt: new Date().toISOString() }]
        }));
      } else {
        alert("Xatolik yuz berdi");
      }
    } catch {
      alert("Tarmoq xatosi");
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Moliyaviy Hisobotlar</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-sm text-gray-500">Umumiy Sotuvlar</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold">{data.totalRevenue.toLocaleString()} UZS</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-sm text-gray-500">Sizning Ulushingiz (70%)</CardTitle></CardHeader>
          <CardContent><p className="text-3xl font-bold text-blue-600">{data.mentorCut.toLocaleString()} UZS</p></CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
          <CardHeader><CardTitle className="text-sm text-green-700 dark:text-green-400">Yechib olish mumkin</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-700 dark:text-green-400 mb-4">{data.availableBalance.toLocaleString()} UZS</p>
            <Button onClick={requestPayout} className="w-full bg-green-600 hover:bg-green-700">Pulni Yechish</Button>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-8">Yechib olish tarixi</h2>
      <Card>
        <CardContent className="p-0">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-zinc-800">
              <tr>
                <th className="p-4 font-semibold">Sana</th>
                <th className="p-4 font-semibold">Summa</th>
                <th className="p-4 font-semibold">Holat</th>
              </tr>
            </thead>
            <tbody>
              {data.payouts.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="p-4">{new Date(p.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 font-medium">{p.amount.toLocaleString()} UZS</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${p.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}

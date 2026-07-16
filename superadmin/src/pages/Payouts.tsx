import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../store/useAuthStore';

export default function Payouts() {
  const token = useAuthStore(state => state.token);
  const [payouts, setPayouts] = useState([
    { id: '1', mentor: { fullName: 'Kamoliddin', telegramId: '123' }, amount: 2000000, cardInfo: '8600 **** 1234', status: 'PENDING' }
  ]);

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/payouts/${id}/approve`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setPayouts(prev => prev.filter(p => p.id !== id));
        alert('To\'lov tasdiqlandi va pul yuborildi!');
      }
    } catch {
      alert("Xato");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/payouts/${id}/reject`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setPayouts(prev => prev.filter(p => p.id !== id));
        alert('To\'lov rad etildi!');
      }
    } catch {
      alert("Xato");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Payoutlar (To'lovlar) Boshqaruvi</h1>
      
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentor</TableHead>
              <TableHead>Karta Raqami</TableHead>
              <TableHead>Summa (UZS)</TableHead>
              <TableHead>Holati</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payouts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">Kutayotgan to'lovlar yo'q.</TableCell>
              </TableRow>
            ) : (
              payouts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.mentor.fullName}</TableCell>
                  <TableCell className="font-mono">{p.cardInfo}</TableCell>
                  <TableCell className="font-bold">{p.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      {p.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" onClick={() => handleApprove(p.id)} className="bg-green-600 hover:bg-green-700">Tasdiqlash & To'lash</Button>
                    <Button size="sm" onClick={() => handleReject(p.id)} variant="destructive">Rad etish</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

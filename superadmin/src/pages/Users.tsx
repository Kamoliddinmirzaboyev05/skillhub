import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function Users() {
  const [users, setUsers] = useState([
    { id: '1', email: 'student@test.com', fullName: 'Ali Valiyev', role: 'STUDENT', isBanned: false },
    { id: '2', email: 'mentor@test.com', fullName: 'Mardon', role: 'MENTOR', isBanned: true },
  ]);

  const toggleBan = (id: string) => {
    // API call to /admin/users/:id/toggle-ban
    setUsers(prev => prev.map(u => u.id === id ? { ...u, isBanned: !u.isBanned } : u));
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Foydalanuvchilarni Boshqarish</h1>
      
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>F.I.SH</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Holat</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.fullName}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>
                  {u.isBanned ? (
                    <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">BANNED</span>
                  ) : (
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">ACTIVE</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    size="sm" 
                    onClick={() => toggleBan(u.id)} 
                    variant={u.isBanned ? "outline" : "destructive"}
                  >
                    {u.isBanned ? 'Bandan yechish' : 'Ban qilish'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

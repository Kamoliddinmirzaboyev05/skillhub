import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../store/useAuthStore';

export default function Categories() {
  const token = useAuthStore(state => state.token);
  const [categories, setCategories] = useState<{id: string, name: string, slug: string}[]>([]);
  const [newCat, setNewCat] = useState({ name: '', slug: '' });

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then(r => r.json())
      .then(data => setCategories(data));
  }, []);

  const handleAdd = async () => {
    if (!newCat.name || !newCat.slug) return;
    try {
      const res = await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(newCat)
      });
      if (res.ok) {
        const added = await res.json();
        setCategories([...categories, added]);
        setNewCat({ name: '', slug: '' });
      }
    } catch {
      alert("Xato");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setCategories(categories.filter(c => c.id !== id));
      }
    } catch {
      alert("Xato");
    }
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Kategoriyalar Boshqaruvi</h1>
      
      <div className="flex gap-4">
        <input 
          placeholder="Nomi" 
          className="border p-2 rounded flex-1" 
          value={newCat.name} 
          onChange={e => setNewCat({...newCat, name: e.target.value})} 
        />
        <input 
          placeholder="Slug (url uchun)" 
          className="border p-2 rounded flex-1" 
          value={newCat.slug} 
          onChange={e => setNewCat({...newCat, slug: e.target.value})} 
        />
        <Button onClick={handleAdd}>Qo'shish</Button>
      </div>

      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nomi</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map(c => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.name}</TableCell>
                <TableCell>{c.slug}</TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(c.id)}>O'chirish</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

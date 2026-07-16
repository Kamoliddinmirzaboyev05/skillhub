import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../store/useAuthStore';

export default function Settings() {
  const token = useAuthStore(state => state.token);
  const [settings, setSettings] = useState({
    commissionRate: 30,
    heroTitle: '',
    heroSubtitle: '',
    faqJson: ''
  });

  useEffect(() => {
    fetch('http://localhost:3000/settings')
      .then(r => r.json())
      .then(data => setSettings({
        commissionRate: data.commissionRate || 30,
        heroTitle: data.heroTitle || '',
        heroSubtitle: data.heroSubtitle || '',
        faqJson: data.faqJson || ''
      }));
  }, []);

  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:3000/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(settings)
      });
      if (res.ok) alert("Sozlamalar saqlandi!");
    } catch {
      alert("Xato");
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Platforma Sozlamalari</h1>
      
      <Card>
        <CardHeader><CardTitle>Moliyaviy Sozlamalar</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Komissiya foizi (Platforma ulushi)</label>
            <input 
              type="number" 
              className="w-full border p-2 rounded" 
              value={settings.commissionRate}
              onChange={e => setSettings({...settings, commissionRate: Number(e.target.value)})}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Bosh sahifa (Hero Banner)</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Sarlavha (Title)</label>
            <input 
              type="text" 
              className="w-full border p-2 rounded" 
              value={settings.heroTitle}
              onChange={e => setSettings({...settings, heroTitle: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Taglavha (Subtitle)</label>
            <input 
              type="text" 
              className="w-full border p-2 rounded" 
              value={settings.heroSubtitle}
              onChange={e => setSettings({...settings, heroSubtitle: e.target.value})}
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">Saqlash</Button>
    </div>
  );
}

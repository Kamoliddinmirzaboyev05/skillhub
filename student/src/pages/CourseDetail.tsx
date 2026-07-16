import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  const [loading, setLoading] = useState(false);

  const handleEnroll = async () => {
    if (!token) {
      alert("Avval tizimga kiring!");
      return navigate('/login');
    }
    
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/courses/${id}/enroll`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        alert("To'lov muvaffaqiyatli amalga oshirildi!");
        navigate(`/learn/${id}`);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Xatolik yuz berdi");
      }
    } catch (err) {
      alert("Tarmoq xatosi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Course Info */}
        <div className="md:col-span-2 space-y-6">
          <h1 className="text-4xl font-bold">React JS Noldan Pro {id}</h1>
          <p className="text-lg text-gray-600">
            Ushbu kurs orqali siz React va zamonaviy web dasturlash texnologiyalarini chuqur o'rganasiz.
          </p>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Kurs dasturi (Syllabus)</h2>
            <Card>
              <CardContent className="p-4">
                <details className="group">
                  <summary className="font-medium cursor-pointer">1-Modul: Asoslar</summary>
                  <ul className="mt-2 ml-4 list-disc text-sm text-gray-600">
                    <li>React nima?</li>
                    <li>JSX sintaksisi</li>
                  </ul>
                </details>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar / Checkout */}
        <div className="md:col-span-1">
          <Card className="sticky top-8">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-t-xl flex items-center justify-center">
              <span className="text-gray-500">Video Treyler</span>
            </div>
            <CardContent className="p-6 space-y-4">
              <p className="text-3xl font-bold">500,000 UZS</p>
              <Button onClick={handleEnroll} disabled={loading} className="w-full text-lg h-12">
                {loading ? 'Kuting...' : 'Sotib olish (Payme)'}
              </Button>
              
              <div className="pt-4 border-t space-y-2 text-sm text-gray-600">
                <p>✅ Umrbod ruxsat (Lifetime)</p>
                <p>✅ DRM Himoya</p>
                <p>✅ Sertifikat</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}

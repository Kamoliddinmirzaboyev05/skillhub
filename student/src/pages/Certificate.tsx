import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '../store/useAuthStore';

export default function Certificate() {
  const { verifyId } = useParams();
  const user = useAuthStore(state => state.user);

  const downloadPdf = () => {
    // Call the backend API that returns the PDF buffer
    window.open(`http://localhost:3000/certificates/${verifyId}/pdf`, '_blank');
  };

  return (
    <div className="p-8 max-w-5xl mx-auto flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold mb-8">Sizning Sertifikatingiz</h1>
      
      <Card className="w-full aspect-[1.414/1] md:w-[800px] border-8 border-double border-gray-300 dark:border-zinc-700 bg-white p-12 flex flex-col items-center justify-center text-center shadow-2xl relative">
        <h2 className="text-gray-500 uppercase tracking-widest font-semibold">Certificate of Completion</h2>
        <div className="w-16 h-1 bg-blue-600 my-6"></div>
        <p className="text-lg text-gray-700 mb-2">This is proudly presented to</p>
        <h1 className="text-5xl font-serif text-blue-900 mb-8">{user?.fullName || 'Student Name'}</h1>
        <p className="text-lg text-gray-700 mb-2">For successfully completing the course</p>
        <h2 className="text-3xl font-bold text-orange-600 mb-12">React JS Noldan Pro</h2>
        
        <div className="absolute bottom-12 left-12 text-left text-gray-500 text-sm">
          <p>Issued: {new Date().toLocaleDateString()}</p>
          <p>Verify ID: {verifyId}</p>
        </div>
        
        {/* Placeholder for QR Code */}
        <div className="absolute bottom-12 right-12 w-24 h-24 bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-xs text-gray-500">
          QR Code
        </div>
      </Card>

      <div className="mt-8 flex gap-4">
        <Button onClick={downloadPdf} size="lg" className="bg-blue-600 hover:bg-blue-700">
          📥 PDF formatida yuklab olish
        </Button>
      </div>
    </div>
  );
}

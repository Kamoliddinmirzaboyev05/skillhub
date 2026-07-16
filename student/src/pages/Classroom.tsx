import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { api } from '../api/axios';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Classroom() {
  const { id } = useParams();
  const user = useAuthStore(state => state.user);
  const [videoUrl, setVideoUrl] = useState('');
  
  // Watermark positioning
  const [pos, setPos] = useState({ top: 10, left: 10 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch Signed URL from backend
    // For demo purposes, we call the media sign endpoint with a dummy videoId
    const fetchVideo = async () => {
      try {
        const dummyVideoId = 'dummymedia123';
        const res = await api.get(`/media/sign/${dummyVideoId}`);
        setVideoUrl(res.data.url);
      } catch (err) {
        console.error('Failed to load video', err);
      }
    };
    fetchVideo();
  }, []);

  // Moving watermark logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      const { clientWidth, clientHeight } = containerRef.current;
      setPos({
        top: Math.random() * (clientHeight - 50),
        left: Math.random() * (clientWidth - 200),
      });
    }, 5000); // moves every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-zinc-900">
      {/* Main Video Area */}
      <div className="flex-1 p-4 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">1-Dars: React nima?</h1>
          <Link to="/">
            <Button variant="outline">Katalogga qaytish</Button>
          </Link>
        </div>

        {/* Video Player Container */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
        >
          {videoUrl ? (
            <iframe
              src={videoUrl}
              loading="lazy"
              className="border-0 absolute top-0 left-0 w-full h-full"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-white">
              Video yuklanmoqda... (Signed URL kutilmoqda)
            </div>
          )}

          {/* Dynamic Watermark Overlay */}
          <div 
            className="absolute pointer-events-none text-white/30 font-mono text-sm sm:text-base md:text-lg transition-all duration-[5000ms] ease-linear z-50 select-none drop-shadow-md"
            style={{ top: `${pos.top}px`, left: `${pos.left}px` }}
          >
            {user?.email || 'user@example.com'}
            <br />
            {user?.fullName || 'User'}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Dars haqida</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Ushbu darsda biz React kutubxonasining qanday ishlashini va nima uchun u juda mashhurligini ko'rib chiqamiz.
          </p>
        </div>
      </div>

      {/* Sidebar: Playlist */}
      <div className="w-full md:w-80 bg-white dark:bg-zinc-800 border-l border-gray-200 dark:border-zinc-700 p-4 overflow-y-auto hidden md:block">
        <h3 className="text-lg font-bold mb-4">Modullar</h3>
        <Card className="p-3 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 mb-2 cursor-pointer">
          <p className="font-medium text-blue-700 dark:text-blue-300">1. React nima?</p>
          <p className="text-xs text-blue-600/70 mt-1">10:45</p>
        </Card>
        <Card className="p-3 hover:bg-gray-50 dark:hover:bg-zinc-700/50 cursor-pointer">
          <p className="font-medium">2. JSX sintaksisi</p>
          <p className="text-xs text-gray-500 mt-1">15:20</p>
        </Card>
      </div>
    </div>
  );
}

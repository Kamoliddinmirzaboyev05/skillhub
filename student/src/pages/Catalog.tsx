import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Catalog() {
  const [search, setSearch] = useState('');
  
  // Dummy data for Marketplace
  const courses = [
    { id: '1', title: 'React JS Noldan Pro', mentor: 'Kamoliddin', price: 500000, category: 'Frontend', rating: 4.8 },
    { id: '2', title: 'NestJS Backend Masterclass', mentor: 'Kamoliddin', price: 600000, category: 'Backend', rating: 4.9 },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Kurslar Katalogi</h1>
        <Input 
          className="max-w-xs" 
          placeholder="Kurs izlash..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-t-xl" />
            <CardHeader>
              <div className="flex justify-between items-start">
                <p className="text-sm text-blue-600 font-medium">{course.category}</p>
                <p className="text-sm font-semibold flex items-center">⭐ {course.rating}</p>
              </div>
              <CardTitle className="mt-2 line-clamp-2">{course.title}</CardTitle>
              <p className="text-sm text-gray-500">Mentor: {course.mentor}</p>
            </CardHeader>
            <CardContent>
              <p className="text-xl font-bold">{course.price.toLocaleString()} UZS</p>
            </CardContent>
            <CardFooter>
              <Link to={`/courses/${course.id}`} className="w-full">
                <Button className="w-full">Kursni ko'rish</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

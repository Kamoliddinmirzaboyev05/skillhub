import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

export default function Courses() {
  const [courses, setCourses] = useState([
    { id: '1', title: 'React Noldan Pro', mentor: 'Kamoliddin', price: 500000, status: 'REVIEW' },
    { id: '2', title: 'Vue.js Asoslari', mentor: 'Mardon', price: 300000, status: 'REVIEW' },
  ]);

  const handleApprove = (id: string) => {
    // API call to /admin/courses/:id/approve
    setCourses(prev => prev.filter(c => c.id !== id));
    alert('Kurs tasdiqlandi!');
  };

  const handleReject = (id: string) => {
    // API call to /admin/courses/:id/reject
    setCourses(prev => prev.filter(c => c.id !== id));
    alert('Kurs rad etildi!');
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Kurslarni Moderatsiya Qilish</h1>
      
      <div className="bg-white rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Kurs Nomi</TableHead>
              <TableHead>Mentor</TableHead>
              <TableHead>Narxi (UZS)</TableHead>
              <TableHead>Holati</TableHead>
              <TableHead className="text-right">Amallar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">Kutilayotgan kurslar yo'q.</TableCell>
              </TableRow>
            ) : (
              courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.mentor}</TableCell>
                  <TableCell>{course.price}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      {course.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" onClick={() => handleApprove(course.id)} className="bg-green-600 hover:bg-green-700">Tasdiqlash</Button>
                    <Button size="sm" onClick={() => handleReject(course.id)} variant="destructive">Rad etish</Button>
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

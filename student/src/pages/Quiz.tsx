import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function Quiz() {
  const { id } = useParams();
  
  // Dummy quiz data
  const quiz = {
    title: 'React Asoslari - Yakuniy Test',
    questions: [
      { id: 'q1', text: 'React qaysi kompaniya tomonidan yaratilgan?', options: [{id: 'o1', text: 'Google'}, {id: 'o2', text: 'Facebook'}, {id: 'o3', text: 'Microsoft'}] },
      { id: 'q2', text: 'JSX nima?', options: [{id: 'o4', text: 'JavaScript XML'}, {id: 'o5', text: 'Java Syntax Extension'}, {id: 'o6', text: 'JSON XML'}] },
    ]
  };

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{score: number, passed: boolean} | null>(null);

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    // In real app, make API call to /quizzes/:id/submit
    // const res = await api.post(`/quizzes/${id}/submit`, { answers: Object.entries(answers).map(([q, o]) => ({questionId: q, optionId: o})) });
    
    // Mock response
    setResult({ score: 100, passed: true });
  };

  if (result) {
    return (
      <div className="p-8 max-w-3xl mx-auto text-center mt-12">
        <h1 className="text-4xl font-bold mb-4">{result.passed ? 'Tabriklaymiz! 🎉' : 'Afsuski o\'ta olmadingiz 😔'}</h1>
        <p className="text-2xl mb-8">Natijangiz: {result.score}%</p>
        
        <div className="flex justify-center gap-4">
          <Button onClick={() => setResult(null)} variant="outline">Qayta ishlash</Button>
          {result.passed && (
            <Link to="/certificate/DUMMY-CERT-ID">
              <Button className="bg-green-600 hover:bg-green-700">Sertifikatni Olish</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{quiz.title}</h1>
      <div className="space-y-8">
        {quiz.questions.map((q, index) => (
          <Card key={q.id}>
            <CardHeader>
              <CardTitle className="text-xl">{index + 1}. {q.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {q.options.map(opt => (
                <label key={opt.id} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800">
                  <input 
                    type="radio" 
                    name={`question-${q.id}`}
                    value={opt.id}
                    checked={answers[q.id] === opt.id}
                    onChange={() => handleSelect(q.id, opt.id)}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span>{opt.text}</span>
                </label>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSubmit} size="lg" disabled={Object.keys(answers).length < quiz.questions.length}>
          Testni Yakunlash
        </Button>
      </div>
    </div>
  );
}

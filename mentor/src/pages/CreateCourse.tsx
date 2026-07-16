import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function CreateCourse() {
  const [step, setStep] = useState(1);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log('Course Data:', data);
    alert('Kurs muvaffaqiyatli saqlandi!');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Yangi Kurs Yaratish (Qadam {step}/3)</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Asosiy ma'lumotlar</h3>
                <div className="space-y-2">
                  <Label>Kurs nomi</Label>
                  <Input {...register('title')} placeholder="Masalan: ReactJS Noldan Pro gacha" />
                </div>
                <div className="space-y-2">
                  <Label>Tavsif</Label>
                  <Input {...register('description')} placeholder="Kurs haqida qisqacha..." />
                </div>
                <div className="space-y-2">
                  <Label>Kategoriya ID (Vaqtinchalik)</Label>
                  <Input {...register('categoryId')} placeholder="Category UUID" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Media va Narx</h3>
                <div className="space-y-2">
                  <Label>Narxi (UZS)</Label>
                  <Input type="number" {...register('price')} placeholder="500000" />
                </div>
                <div className="space-y-2">
                  <Label>Video Trailer URL (Bunny.net)</Label>
                  <Input {...register('promoVideo')} placeholder="https://..." />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Modullar va Darslar</h3>
                <p className="text-gray-500 text-sm">Bu bosqichda siz kursni saqlaganingizdan keyin ichiga modullar qo'shishingiz mumkin bo'ladi.</p>
              </div>
            )}

            <div className="flex justify-between mt-8">
              <Button type="button" variant="outline" onClick={() => setStep(s => Math.max(1, s - 1))} disabled={step === 1}>
                Ortga
              </Button>
              {step < 3 ? (
                <Button type="button" onClick={() => setStep(s => Math.min(3, s + 1))}>
                  Keyingisi
                </Button>
              ) : (
                <Button type="submit">
                  Saqlash va Yaratish
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { login } from '../api/auth';
import { useAuthStore } from '../store/useAuthStore';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setAuth(data.user, data.access_token);
      if (data.user.role === 'STUDENT') navigate('/');
      else navigate('/dashboard');
    },
    onError: (error: any) => {
      setErrorMsg(error.response?.data?.message || 'Login failed');
    }
  });

  const onSubmit = (data: any) => {
    setErrorMsg('');
    mutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Tizimga kirish</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{String(errors.email.message)}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Parol</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-red-500">{String(errors.password.message)}</p>}
            </div>
            {errorMsg && <p className="text-sm text-red-500 text-center">{errorMsg}</p>}
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Kutilmoqda...' : 'Kirish'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Hisobingiz yo'qmi? <Link to="/register" className="text-blue-600 hover:underline">Ro'yxatdan o'tish</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

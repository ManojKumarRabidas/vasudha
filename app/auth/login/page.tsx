'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, Mail, Lock, Phone } from 'lucide-react';
import { data } from '@/lib/data';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');

  const [role, setRole] = useState<'donor' | 'ngo' | 'volunteer' | 'admin' | null>(
    (roleParam as any) || null
  );
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulate authentication with mock data
      let user = null;

      if (role === 'admin') {
        if (email === 'admin@vasudha.org' && password === 'admin123') {
          user = data.users.admin;
        }
      } else if (role === 'donor') {
        user = data.users.donors.find(
          (d) => (loginMethod === 'email' ? d.email === email : d.phone === phone)
        );
      } else if (role === 'ngo') {
        user = data.users.ngos.find(
          (n) => (loginMethod === 'email' ? n.email === email : n.phone === phone)
        );
      } else if (role === 'volunteer') {
        user = data.users.volunteers.find(
          (v) => (loginMethod === 'email' ? v.email === email : v.phone === phone)
        );
      }

      if (user && password === 'password123') {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', role);

        if (role === 'donor') {
          router.push('/donor/dashboard');
        } else if (role === 'ngo') {
          router.push('/ngo/dashboard');
        } else if (role === 'volunteer') {
          router.push('/volunteer/dashboard');
        } else if (role === 'admin') {
          router.push('/admin/dashboard');
        }
      } else {
        setError('Invalid credentials. Try email: admin@vasudha.org, password: admin123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl">VASUDHA</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md border-border">
          <div className="p-6 sm:p-8">
            <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground mb-6">
              Sign in to your VASUDHA account
            </p>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Role Selection */}
            {!role ? (
              <div className="space-y-3 mb-6">
                <p className="text-sm font-medium">Select Your Role</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'donor', label: 'Donor' },
                    { value: 'ngo', label: 'NGO' },
                    { value: 'volunteer', label: 'Volunteer' },
                    { value: 'admin', label: 'Admin' },
                  ].map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setRole(r.value as any)}
                      className="p-3 border border-border rounded-lg hover:bg-muted transition-colors text-sm font-medium"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-6 p-3 bg-muted rounded-lg">
                  <span className="text-sm">Role: <span className="font-bold capitalize">{role}</span></span>
                  <button
                    onClick={() => setRole(null)}
                    className="ml-auto text-xs text-primary hover:underline"
                  >
                    Change
                  </button>
                </div>

                {/* Login Method Tabs */}
                <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as any)} className="mb-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">Email</TabsTrigger>
                    <TabsTrigger value="phone">Phone OTP</TabsTrigger>
                  </TabsList>

                  <TabsContent value="email" className="space-y-4 mt-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="phone" className="space-y-4 mt-4">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Phone Number</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="tel"
                            placeholder="+91-9876543210"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">OTP</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            type="text"
                            placeholder="123456"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-primary/90"
                      >
                        {isLoading ? 'Verifying...' : 'Verify OTP'}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>

                <div className="text-xs text-muted-foreground text-center mb-4">
                  Demo Credentials:
                  <br />
                  Email: {role === 'admin' ? 'admin@vasudha.org' : role === 'donor' ? 'rajesh@email.com' : 'contact@shiksha.org'}
                  <br />
                  Password: password123
                </div>
              </>
            )}

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                Sign up
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

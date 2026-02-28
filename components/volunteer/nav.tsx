'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Leaf, Bell, User, LogOut } from 'lucide-react';

export function VolunteerNav({ user }: { user: any }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    router.push('/');
  };

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/volunteer/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">VASUDHA</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/volunteer/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
          <Link href="/volunteer/ngos">
            <Button variant="ghost" size="sm">Browse NGOs</Button>
          </Link>
          <Link href="/volunteer/requests">
            <Button variant="ghost" size="sm">Help Requests</Button>
          </Link>

          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

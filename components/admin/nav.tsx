'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Leaf, Bell, User, LogOut, BarChart3 } from 'lucide-react';

export function AdminNav({ user }: { user: any }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    router.push('/');
  };

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg">VASUDHA</span>
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-destructive/10 text-destructive ml-2">
            ADMIN
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="sm">Dashboard</Button>
          </Link>
          <Link href="/admin/approvals">
            <Button variant="ghost" size="sm">Approvals</Button>
          </Link>
          <Link href="/admin/analytics">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </Button>
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

'use client';

import { Card } from '@/components/ui/card';
import { Heart, TrendingUp, Zap, Target } from 'lucide-react';

export function DonorStats({ user }: { user: any }) {
  const stats = [
    {
      label: 'Total Donated',
      value: `₹${user.totalDonated?.toLocaleString() || 0}`,
      icon: Heart,
      color: 'text-red-500',
      bgColor: 'bg-red-50 dark:bg-red-950',
    },
    {
      label: 'Active Plans',
      value: user.sdpActive || 0,
      icon: Zap,
      color: 'text-amber-500',
      bgColor: 'bg-amber-50 dark:bg-amber-950',
    },
    {
      label: 'NGOs Supported',
      value: user.followingNGOs?.length || 0,
      icon: Target,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Impact Score',
      value: '245',
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-950',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <Card key={i} className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-2 rounded-lg`}>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DonorNav } from '@/components/donor/nav';
import { DonorFeed } from '@/components/donor/feed';
import { DonorStats } from '@/components/donor/stats';
import { data, fetchUser, fetchDonorFeed } from '@/lib/data';
import { Heart, TrendingUp, Zap, AlertCircle } from 'lucide-react';

export default function DonorDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (!storedUser || storedRole !== 'donor') {
      router.push('/auth/login?role=donor');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <DonorNav user={user} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground">Your impact dashboard</p>
        </div>

        {/* Quick Stats */}
        <DonorStats user={user} />

        {/* Main Tabs */}
        <Tabs defaultValue="feed" className="mt-8">
          <TabsList>
            <TabsTrigger value="feed">Activity Feed</TabsTrigger>
            <TabsTrigger value="donate">Donate</TabsTrigger>
            <TabsTrigger value="sdp">Donation Plans</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="mt-6">
            <DonorFeed userId={user._id} />
          </TabsContent>

          <TabsContent value="donate" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* NGO Discovery */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold mb-4">Browse & Donate</h2>
                <div className="space-y-4">
                  {data.users.ngos.filter(n => n.isApproved).map((ngo) => (
                    <Link key={ngo._id} href={`/donor/donate/${ngo._id}`}>
                      <Card className="hover:shadow-lg transition-shadow cursor-pointer p-4 border-border">
                        <div className="flex items-start gap-4">
                          <img
                            src={ngo.avatar}
                            alt={ngo.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold">{ngo.name}</h3>
                              <div className="flex items-center gap-1 text-sm">
                                <span className="text-yellow-500">★</span>
                                <span>{ngo.rating}</span>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{ngo.description}</p>
                            <div className="flex gap-2 flex-wrap">
                              {ngo.cause.map((c) => (
                                <span key={c} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* General Donation */}
              <div>
                <h2 className="text-xl font-bold mb-4">General Donation</h2>
                <Card className="p-6 border-border">
                  <p className="text-sm text-muted-foreground mb-4">
                    Donate to multiple causes at once. We'll distribute based on your preferences.
                  </p>
                  <Link href="/donor/donate/general">
                    <Button className="w-full bg-secondary hover:bg-secondary/90">
                      <Zap className="w-4 h-4 mr-2" />
                      Donate for Causes
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sdp" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {user.sdps && user.sdps.length > 0 ? (
                user.sdps.map((sdp: any) => {
                  const ngo = data.users.ngos.find((n) => n._id === sdp.ngoId);
                  return (
                    <Card key={sdp._id} className="p-6 border-border">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{ngo?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            ₹{sdp.amount} {sdp.frequency}
                          </p>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          {sdp.status.toUpperCase()}
                        </span>
                      </div>
                      <div className="space-y-2 text-sm mb-4">
                        <p>Next Due: {new Date(sdp.nextDueDate).toLocaleDateString()}</p>
                        <p>Total Contributed: ₹{sdp.totalContributed}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Pause
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          Edit
                        </Button>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <Card className="p-6 border-border md:col-span-2">
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      You haven't set up any donation plans yet.
                    </p>
                    <Link href="/donor/donate">
                      <Button className="mt-4 bg-primary">Set Up Plan</Button>
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <Card className="border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border">
                    <tr className="text-left text-sm font-medium text-muted-foreground">
                      <th className="p-4">Date</th>
                      <th className="p-4">NGO</th>
                      <th className="p-4">Amount</th>
                      <th className="p-4">Type</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.donationHistory && user.donationHistory.map((donation: any) => {
                      const ngo = data.users.ngos.find((n) => n._id === donation.ngoId);
                      return (
                        <tr key={donation._id} className="border-b border-border hover:bg-muted/30">
                          <td className="p-4 text-sm">{new Date(donation.date).toLocaleDateString()}</td>
                          <td className="p-4 text-sm font-medium">{ngo?.name}</td>
                          <td className="p-4 text-sm font-bold">₹{donation.amount}</td>
                          <td className="p-4 text-sm capitalize">{donation.type}</td>
                          <td className="p-4">
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded capitalize">
                              {donation.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

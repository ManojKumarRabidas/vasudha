'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminNav } from '@/components/admin/nav';
import { data, fetchPendingNGOs, fetchAllDonors, fetchAllVolunteers, fetchAllNGOs } from '@/lib/data';
import { TrendingUp, Users, Building2, CheckCircle, XCircle, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [pendingNGOs, setPendingNGOs] = useState<any[]>([]);
  const [allNGOs, setAllNGOs] = useState<any[]>([]);
  const [donors, setDonors] = useState<any[]>([]);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (!storedUser || storedRole !== 'admin') {
      router.push('/auth/login?role=admin');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Fetch admin data
    setPendingNGOs(fetchPendingNGOs());
    setAllNGOs(fetchAllNGOs());
    setDonors(fetchAllDonors());
    setVolunteers(fetchAllVolunteers());

    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const platformStats = data.donations.platformStats;

  return (
    <div className="min-h-screen bg-background">
      <AdminNav user={user} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform management and oversight</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Funds</p>
                <p className="text-2xl font-bold">₹{(platformStats.totalDonated / 100000).toFixed(1)}L</p>
              </div>
              <DollarSign className="w-5 h-5 text-secondary" />
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Platform Fees</p>
                <p className="text-2xl font-bold">₹{(platformStats.totalPlatformFeeCollected / 1000).toFixed(0)}K</p>
              </div>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">NGOs</p>
                <p className="text-2xl font-bold">{allNGOs.length}</p>
              </div>
              <Building2 className="w-5 h-5 text-accent" />
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold">{platformStats.totalTransactions}</p>
              </div>
              <Users className="w-5 h-5 text-amber-500" />
            </div>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ngos">NGOs</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingNGOs.length})</TabsTrigger>
            <TabsTrigger value="donors">Donors</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="finances">Finances</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Key Metrics */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold mb-4">Platform Overview</h2>
                <Card className="p-6 border-border space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Registered Donors</p>
                      <p className="text-3xl font-bold text-primary">{donors.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active NGOs</p>
                      <p className="text-3xl font-bold text-secondary">
                        {allNGOs.filter((n) => n.isApproved).length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Volunteers</p>
                      <p className="text-3xl font-bold text-accent">{volunteers.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Approvals</p>
                      <p className="text-3xl font-bold text-destructive">{pendingNGOs.length}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-primary/10 text-primary hover:bg-primary/20">
                    Review NGOs ({pendingNGOs.length})
                  </Button>
                  <Button className="w-full justify-start bg-secondary/10 text-secondary hover:bg-secondary/20">
                    Distribute Funds
                  </Button>
                  <Button className="w-full justify-start bg-accent/10 text-accent hover:bg-accent/20">
                    View Analytics
                  </Button>
                  <Button className="w-full justify-start bg-muted hover:bg-muted/80">
                    Reports
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* NGOs Tab */}
          <TabsContent value="ngos" className="mt-6">
            <div className="space-y-4">
              {allNGOs.map((ngo) => (
                <Card key={ngo._id} className="p-4 border-border hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <img
                        src={ngo.avatar}
                        alt={ngo.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{ngo.name}</h3>
                          {ngo.isApproved && (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{ngo.registrationNumber}</p>
                        <p className="text-sm">{ngo.city}, {ngo.state}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Funds Received</p>
                      <p className="font-bold">₹{ngo.totalReceived?.toLocaleString() || 0}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Monitor
                    </Button>
                    {!ngo.isApproved && (
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        Flag
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Pending Approvals Tab */}
          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {pendingNGOs.length > 0 ? (
                pendingNGOs.map((ngo) => (
                  <Card key={ngo._id} className="p-6 border-border">
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{ngo.name}</h3>
                          <p className="text-sm text-muted-foreground">{ngo.registrationNumber}</p>
                        </div>
                        <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded font-bold">
                          PENDING
                        </span>
                      </div>
                      <p className="text-sm mb-3">{ngo.description}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Location</p>
                        <p className="font-medium">{ngo.city}, {ngo.state}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Phone</p>
                        <p className="font-medium">{ngo.phone}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Email</p>
                        <p className="font-medium text-xs">{ngo.email}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Documents Submitted:</p>
                      <div className="space-y-1">
                        {Object.entries(ngo.documents || {}).map(([key, value]: [string, any]) => (
                          <p key={key} className="text-xs text-muted-foreground">
                            • {key}: <a href={value} className="text-primary underline">View</a>
                          </p>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        onClick={() => alert('NGO approved (demo only)')}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-destructive hover:bg-destructive/10"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Request Info
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center border-border">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                  <p className="text-muted-foreground">All NGO applications approved!</p>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Donors Tab */}
          <TabsContent value="donors" className="mt-6">
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr className="text-left text-sm font-medium">
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">City</th>
                      <th className="p-4">Total Donated</th>
                      <th className="p-4">Donations</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donors.map((donor) => (
                      <tr key={donor._id} className="border-b border-border hover:bg-muted/30">
                        <td className="p-4 font-medium">{donor.name}</td>
                        <td className="p-4 text-sm">{donor.email}</td>
                        <td className="p-4 text-sm">{donor.city}</td>
                        <td className="p-4 font-bold">₹{donor.totalDonated?.toLocaleString() || 0}</td>
                        <td className="p-4 text-sm">{donor.donationHistory?.length || 0}</td>
                        <td className="p-4">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Volunteers Tab */}
          <TabsContent value="volunteers" className="mt-6">
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border bg-muted/50">
                    <tr className="text-left text-sm font-medium">
                      <th className="p-4">Name</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">City</th>
                      <th className="p-4">Skills</th>
                      <th className="p-4">Hours</th>
                      <th className="p-4">Rating</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volunteers.map((volunteer) => (
                      <tr key={volunteer._id} className="border-b border-border hover:bg-muted/30">
                        <td className="p-4 font-medium">{volunteer.name}</td>
                        <td className="p-4 text-sm">{volunteer.email}</td>
                        <td className="p-4 text-sm">{volunteer.city}</td>
                        <td className="p-4 text-xs">{volunteer.skills.join(', ')}</td>
                        <td className="p-4 text-sm">{volunteer.hoursContributed}</td>
                        <td className="p-4">
                          <span className="text-sm font-medium">★ {volunteer.rating}</span>
                        </td>
                        <td className="p-4">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Finances Tab */}
          <TabsContent value="finances" className="mt-6">
            <div className="space-y-6">
              <Card className="p-6 border-border">
                <h3 className="font-bold text-lg mb-4">Revenue Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Funds</p>
                    <p className="text-2xl font-bold">₹{(platformStats.totalDonated / 100000).toFixed(1)}L</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Platform Fee %</p>
                    <p className="text-2xl font-bold">{platformStats.platformFeePercentage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Fees Collected</p>
                    <p className="text-2xl font-bold">₹{(platformStats.totalPlatformFeeCollected / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Distributed</p>
                    <p className="text-2xl font-bold">₹{((platformStats.totalDonated - platformStats.totalPlatformFeeCollected) / 100000).toFixed(1)}L</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-border">
                <h3 className="font-bold text-lg mb-4">Recent Transactions</h3>
                <div className="space-y-3">
                  {data.transactions.slice(0, 5).map((txn) => (
                    <div key={txn._id} className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
                      <div>
                        <p className="text-sm font-medium">Transaction {txn.transactionId}</p>
                        <p className="text-xs text-muted-foreground">{new Date(txn.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold">₹{txn.amount}</p>
                        <p className="text-xs text-muted-foreground">Fee: ₹{txn.platformFee}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NGONav } from '@/components/ngo/nav';
import { data, fetchNGOStatistics, fetchNGOVolunteers, fetchDonationTransactions, fetchNotifications } from '@/lib/data';
import { Users, DollarSign, TrendingUp, AlertCircle, Upload } from 'lucide-react';

export default function NGODashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (!storedUser || storedRole !== 'ngo') {
      router.push('/auth/login?role=ngo');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Fetch data
    const ngoStats = fetchNGOStatistics(parsedUser._id);
    const ngoVolunteers = fetchNGOVolunteers(parsedUser._id);
    const ngoTransactions = fetchDonationTransactions(parsedUser._id);
    const ngoNotifications = fetchNotifications(parsedUser._id);

    setStats(ngoStats);
    setVolunteers(ngoVolunteers);
    setTransactions(ngoTransactions);
    setNotifications(ngoNotifications);
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const approvalStatus = user.isApproved ? 'Approved' : 'Pending Review';
  const approvalColor = user.isApproved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700';

  return (
    <div className="min-h-screen bg-background">
      <NGONav user={user} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Approval Status Alert */}
        {!user.isApproved && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold text-amber-900">Verification Pending</p>
              <p className="text-sm text-amber-800">
                Your NGO is under admin review. You can still create activities and requests, but donations won't be processed until approval.
              </p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
            <p className="text-muted-foreground">
              Approval Status: <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${approvalColor}`}>
                {approvalStatus}
              </span>
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Upload className="w-4 h-4 mr-2" />
            Post Activity
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Received</p>
                <p className="text-2xl font-bold">₹{stats?.totalReceived?.toLocaleString() || 0}</p>
              </div>
              <DollarSign className="w-5 h-5 text-secondary" />
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl font-bold">{stats?.totalTransactions || 0}</p>
              </div>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Volunteers</p>
                <p className="text-2xl font-bold">{stats?.activeVolunteers || 0}</p>
              </div>
              <Users className="w-5 h-5 text-accent" />
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold">{stats?.rating.toFixed(1) || '0.0'}</p>
              </div>
              <span className="text-lg">★</span>
            </div>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="volunteers">Volunteers</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Recent Donations */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold mb-4">Recent Donations</h2>
                <Card className="border-border overflow-hidden">
                  {transactions && transactions.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="border-b border-border bg-muted/50">
                          <tr className="text-left text-sm font-medium">
                            <th className="p-4">Date</th>
                            <th className="p-4">Donor</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((txn) => (
                            <tr key={txn._id} className="border-b border-border hover:bg-muted/30">
                              <td className="p-4 text-sm">{new Date(txn.date).toLocaleDateString()}</td>
                              <td className="p-4 text-sm font-medium">Donor #{txn.fromUserId.slice(-4)}</td>
                              <td className="p-4 text-sm font-bold">₹{txn.amount}</td>
                              <td className="p-4">
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                  {txn.status.toUpperCase()}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      No donations yet
                    </div>
                  )}
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-primary/10 text-primary hover:bg-primary/20">
                    <Upload className="w-4 h-4 mr-2" />
                    Post Activity
                  </Button>
                  <Button className="w-full justify-start bg-secondary/10 text-secondary hover:bg-secondary/20">
                    Request Help
                  </Button>
                  <Button className="w-full justify-start bg-accent/10 text-accent hover:bg-accent/20">
                    View Volunteers
                  </Button>
                  <Button className="w-full justify-start bg-muted hover:bg-muted/80">
                    Bank Details
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="volunteers" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {volunteers && volunteers.length > 0 ? (
                volunteers.map((volunteer) => (
                  <Card key={volunteer._id} className="p-4 border-border">
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={volunteer.avatar}
                        alt={volunteer.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-bold">{volunteer.name}</p>
                        <p className="text-xs text-muted-foreground">{volunteer.city}</p>
                      </div>
                    </div>
                    <div className="text-sm mb-3">
                      <p className="text-muted-foreground">Skills: {volunteer.skills.join(', ')}</p>
                      <p className="text-muted-foreground">Hours: {volunteer.hoursContributed}</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      Message
                    </Button>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center border-border col-span-full">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No volunteers joined yet</p>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="mt-6">
            <Card className="border-border">
              {transactions && transactions.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-border">
                      <tr className="text-left text-sm font-medium">
                        <th className="p-4">ID</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Amount</th>
                        <th className="p-4">Platform Fee</th>
                        <th className="p-4">Net</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((txn) => (
                        <tr key={txn._id} className="border-b border-border hover:bg-muted/30">
                          <td className="p-4 text-sm font-mono">{txn.transactionId}</td>
                          <td className="p-4 text-sm">{new Date(txn.date).toLocaleDateString()}</td>
                          <td className="p-4 text-sm font-bold">₹{txn.amount}</td>
                          <td className="p-4 text-sm text-muted-foreground">₹{txn.platformFee}</td>
                          <td className="p-4 text-sm font-bold">₹{txn.netAmount}</td>
                          <td className="p-4">
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded capitalize">
                              {txn.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  No transactions yet
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <div className="space-y-3">
              {notifications && notifications.length > 0 ? (
                notifications.map((notif) => (
                  <Card key={notif._id} className={`p-4 border-border ${!notif.read ? 'bg-primary/5' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs">⚡</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm">{notif.title}</p>
                        <p className="text-sm text-muted-foreground">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notif.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center border-border">
                  <p className="text-muted-foreground">No notifications</p>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-border">
                <h3 className="font-bold mb-4">Organization Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Registration Number</p>
                    <p className="font-medium">{user.registrationNumber}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Location</p>
                    <p className="font-medium">{user.city}, {user.state}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{user.phone}</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Edit Profile
                </Button>
              </Card>

              <Card className="p-6 border-border">
                <h3 className="font-bold mb-4">Bank Details</h3>
                {user.bankDetails ? (
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Account Holder</p>
                      <p className="font-medium">{user.bankDetails.accountHolder}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Account Number</p>
                      <p className="font-mono font-medium">****{user.bankDetails.accountNumber.slice(-4)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">IFSC Code</p>
                      <p className="font-medium">{user.bankDetails.ifsc}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">No bank details added</p>
                )}
                <Button className="w-full mt-4" variant="outline">
                  Update Bank Details
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

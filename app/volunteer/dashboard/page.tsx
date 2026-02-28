'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VolunteerNav } from '@/components/volunteer/nav';
import { data } from '@/lib/data';
import { Users, Clock, Zap, MapPin } from 'lucide-react';

export default function VolunteerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [myNGOs, setMyNGOs] = useState<any[]>([]);
  const [helpRequests, setHelpRequests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (!storedUser || storedRole !== 'volunteer') {
      router.push('/auth/login?role=volunteer');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    setUser(parsedUser);

    // Fetch associated NGOs
    const ngos = data.users.ngos.filter((ngo) =>
      parsedUser.joinedNGOs?.includes(ngo._id)
    );
    setMyNGOs(ngos);

    // Fetch help requests from joined NGOs
    const requests = data.requests.helpRequests.filter((req) =>
      ngos.some((ngo) => ngo._id === req.ngoId)
    );
    setHelpRequests(requests);

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
      <VolunteerNav user={user} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-muted-foreground">Your volunteering dashboard</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Hours Contributed</p>
                <p className="text-2xl font-bold">{user.hoursContributed}</p>
              </div>
              <Clock className="w-5 h-5 text-primary" />
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">NGOs Joined</p>
                <p className="text-2xl font-bold">{myNGOs.length}</p>
              </div>
              <Users className="w-5 h-5 text-secondary" />
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Rating</p>
                <p className="text-2xl font-bold">{user.rating.toFixed(1)}</p>
              </div>
              <span className="text-lg">★</span>
            </div>
          </Card>

          <Card className="p-4 border-border">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Skills</p>
                <p className="text-2xl font-bold">{user.skills.length}</p>
              </div>
              <Zap className="w-5 h-5 text-accent" />
            </div>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ngos">My NGOs</TabsTrigger>
            <TabsTrigger value="requests">Help Requests</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Recent Activity */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold mb-4">Your Contributions</h2>
                <Card className="p-6 border-border text-center">
                  <p className="text-muted-foreground mb-4">
                    You've contributed {user.hoursContributed} hours of volunteer work. Keep making a difference!
                  </p>
                  <Button className="bg-primary hover:bg-primary/90">
                    Log Hours
                  </Button>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button className="w-full justify-start bg-primary/10 text-primary hover:bg-primary/20">
                    <Users className="w-4 h-4 mr-2" />
                    Browse NGOs
                  </Button>
                  <Button className="w-full justify-start bg-secondary/10 text-secondary hover:bg-secondary/20">
                    <Zap className="w-4 h-4 mr-2" />
                    Active Requests
                  </Button>
                  <Button className="w-full justify-start bg-muted hover:bg-muted/80">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ngos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myNGOs && myNGOs.length > 0 ? (
                myNGOs.map((ngo) => (
                  <Card key={ngo._id} className="p-6 border-border hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={ngo.avatar}
                        alt={ngo.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{ngo.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {ngo.city}, {ngo.state}
                        </div>
                      </div>
                      <span className="text-lg">★ {ngo.rating}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{ngo.description}</p>

                    <div className="flex gap-2 mb-4">
                      {ngo.cause.map((c) => (
                        <span key={c} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {c}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Message
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Leave
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center border-border md:col-span-2">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground mb-4">You haven't joined any NGOs yet</p>
                  <Button className="bg-primary">Browse NGOs</Button>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="mt-6">
            <div className="space-y-4">
              {helpRequests && helpRequests.length > 0 ? (
                helpRequests.map((request) => {
                  const ngo = data.users.ngos.find((n) => n._id === request.ngoId);
                  return (
                    <Card key={request._id} className="p-4 border-border hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{request.title}</h3>
                          <p className="text-sm text-muted-foreground">{ngo?.name}</p>
                        </div>
                        <span className={`text-xs font-bold px-3 py-1 rounded ${
                          request.urgency === 'high'
                            ? 'bg-destructive/10 text-destructive'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {request.urgency.toUpperCase()} PRIORITY
                        </span>
                      </div>

                      <p className="text-sm mb-3">{request.description}</p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs mb-4">
                        <div>
                          <p className="text-muted-foreground">Location</p>
                          <p className="font-medium">{request.location}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Needed</p>
                          <p className="font-medium">{request.volunteersNeeded}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Assigned</p>
                          <p className="font-medium">{request.volunteersAssigned}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Date</p>
                          <p className="font-medium">{new Date(request.date).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="bg-primary hover:bg-primary/90">
                          Join
                        </Button>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <Card className="p-8 text-center border-border">
                  <p className="text-muted-foreground">No active help requests from your NGOs</p>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="mt-6">
            <Card className="p-6 border-border text-center">
              <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground mb-4">
                Join an NGO to see volunteering opportunities in your area
              </p>
              <Button className="bg-primary">Browse NGOs</Button>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-border">
                <h3 className="font-bold mb-4">Personal Info</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{user.name}</p>
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
                <h3 className="font-bold mb-4">Skills & Interests</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill: string) => (
                        <span key={skill} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {user.interests.map((interest: string) => (
                        <span key={interest} className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Update Skills
                </Button>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

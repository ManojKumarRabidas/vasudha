'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Users, Leaf, TrendingUp } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl">VASUDHA</span>
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Connect. Donate. Transform.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            VASUDHA bridges the gap between compassionate donors, dedicated NGOs, and passionate volunteers to create real, measurable social impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/login">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Get Started
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">For Everyone</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Donor Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-bold text-lg mb-2">Donors</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Make a difference by supporting causes you care about with transparent tracking
              </p>
              <Link href="/auth/login?role=donor">
                <Button variant="outline" size="sm" className="w-full">
                  Donate Now
                </Button>
              </Link>
            </div>

            {/* NGO Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2">NGOs</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Register your organization and access a community of donors and volunteers
              </p>
              <Link href="/auth/login?role=ngo">
                <Button variant="outline" size="sm" className="w-full">
                  Register NGO
                </Button>
              </Link>
            </div>

            {/* Volunteer Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-bold text-lg mb-2">Volunteers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Join NGOs in your area and contribute your skills to social causes
              </p>
              <Link href="/auth/login?role=volunteer">
                <Button variant="outline" size="sm" className="w-full">
                  Join Us
                </Button>
              </Link>
            </div>

            {/* Admin Card */}
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-destructive/20 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="font-bold text-lg mb-2">Admin</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage platform operations and ensure transparency and accountability
              </p>
              <Link href="/auth/login?role=admin">
                <Button variant="outline" size="sm" className="w-full">
                  Admin Access
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-primary mb-2">₹54.5L</p>
              <p className="text-muted-foreground">Total Funds Raised</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary mb-2">1,250+</p>
              <p className="text-muted-foreground">Transactions</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-accent mb-2">145</p>
              <p className="text-muted-foreground">Registered NGOs</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-secondary mb-2">8,500+</p>
              <p className="text-muted-foreground">Active Donors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why VASUDHA?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Transparent Giving',
                description: 'Track every donation and see exactly how your money is making a difference',
              },
              {
                title: 'Verified NGOs',
                description: 'All NGOs are vetted and verified to ensure authenticity and accountability',
              },
              {
                title: 'Systematic Giving',
                description: 'Set up recurring donation plans to support causes consistently',
              },
              {
                title: 'Volunteer Network',
                description: 'Connect with local volunteers and amplify your impact beyond donations',
              },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-6 h-6 bg-primary rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center bg-primary/10 rounded-lg p-8 border border-primary/20">
          <h2 className="text-2xl font-bold mb-4">Ready to Make an Impact?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of donors, NGOs, and volunteers working together for social change.
          </p>
          <Link href="/auth/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold mb-4">VASUDHA</h4>
              <p className="text-sm text-muted-foreground">
                Connecting hearts for social impact
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Donors</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Browse NGOs</a></li>
                <li><a href="#" className="hover:text-foreground">Donation Plans</a></li>
                <li><a href="#" className="hover:text-foreground">My Impact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For NGOs</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Register</a></li>
                <li><a href="#" className="hover:text-foreground">Dashboard</a></li>
                <li><a href="#" className="hover:text-foreground">Resources</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 VASUDHA. Empowering communities through transparent giving.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

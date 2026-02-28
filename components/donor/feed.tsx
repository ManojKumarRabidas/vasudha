'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchDonorFeed, data } from '@/lib/data';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

export function DonorFeed({ userId }: { userId: string }) {
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // Simulate infinite scroll - get activities from feed
    const feed = fetchDonorFeed(userId);
    setActivities(feed);
    setIsLoading(false);
  }, [userId]);

  const handleLoadMore = () => {
    setPage((p) => p + 1);
    // Simulate loading more
  };

  if (isLoading) {
    return <div>Loading feed...</div>;
  }

  if (activities.length === 0) {
    return (
      <Card className="p-8 text-center border-border">
        <p className="text-muted-foreground">
          Follow NGOs to see their activities and impact stories.
        </p>
        <Button className="mt-4 bg-primary">Browse NGOs</Button>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity._id} className="p-6 border-border hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4 mb-4">
            <img
              src="/placeholder-user.jpg"
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <p className="font-bold">{activity.ngoName}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(activity.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-2">{activity.title}</h3>
          <p className="text-muted-foreground mb-4">{activity.description}</p>

          {activity.image && (
            <img
              src={activity.image}
              alt=""
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}

          <div className="flex gap-4 pt-4 border-t border-border">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Like</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Comment</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
          </div>
        </Card>
      ))}

      <div className="text-center pt-4">
        <Button variant="outline" onClick={handleLoadMore}>
          Load More
        </Button>
      </div>
    </div>
  );
}

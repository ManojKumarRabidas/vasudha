import { useState, useRef, useCallback } from 'react'
import { Heart, MessageCircle, Share2 } from 'lucide-react'

export default function ActivityFeed({ ngos }) {
  const [feed, setFeed] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const observerTarget = useRef(null)

  // Generate infinite scroll mock data
  const loadMoreActivities = useCallback(() => {
    if (isLoading || !hasMore) return

    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      const newActivities = ngos.flatMap(ngo =>
        (ngo.activities || []).map(activity => ({
          id: `${ngo._id}-${activity.date}`,
          ngo: ngo,
          ...activity,
          likes: Math.floor(Math.random() * 500),
          comments: Math.floor(Math.random() * 50)
        }))
      ).slice(0, 3)

      if (newActivities.length === 0) {
        setHasMore(false)
      } else {
        setFeed(prev => [...prev, ...newActivities])
      }
      setIsLoading(false)
    }, 500)
  }, [ngos, isLoading, hasMore])

  // Infinite scroll observer
  useState(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreActivities()
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => observer.disconnect()
  }, [loadMoreActivities, hasMore, isLoading])

  // Load initial feed
  useState(() => {
    loadMoreActivities()
  }, [])

  return (
    <div className="space-y-6">
      {/* NGO Cards */}
      {ngos.map((ngo) => (
        <div key={ngo._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
          {/* NGO Header */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 flex-1">
                <img src={ngo.image} alt={ngo.name} className="w-12 h-12 rounded-lg object-cover" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{ngo.name}</h3>
                    {ngo.verified && <span className="text-blue-600">✓</span>}
                  </div>
                  <p className="text-xs text-gray-600">{ngo.category} · {ngo.location}</p>
                </div>
              </div>
              <button className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition text-sm font-medium">
                Follow
              </button>
            </div>
          </div>

          {/* Activities */}
          {(ngo.activities || []).map((activity, i) => (
            <div key={i} className="p-4 border-b border-gray-50 last:border-0">
              {activity.image && (
                <img src={activity.image} alt={activity.title} className="w-full h-48 rounded-lg object-cover mb-4" />
              )}
              <p className="font-medium text-gray-900 mb-2">{activity.title}</p>
              <p className="text-sm text-gray-600 mb-4">{activity.date}</p>

              {/* Engagement */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-gray-600">
                <button className="flex items-center gap-2 text-sm hover:text-red-600 transition">
                  <Heart className="w-4 h-4" />
                  <span>{Math.floor(Math.random() * 500)}</span>
                </button>
                <button className="flex items-center gap-2 text-sm hover:text-blue-600 transition">
                  <MessageCircle className="w-4 h-4" />
                  <span>{Math.floor(Math.random() * 50)}</span>
                </button>
                <button className="flex items-center gap-2 text-sm hover:text-green-600 transition">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          ))}

          {/* Donation Button */}
          <div className="p-4 bg-blue-50 border-t border-gray-100">
            <button className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium text-sm">
              Donate to {ngo.name}
            </button>
          </div>
        </div>
      ))}

      {/* Feed Activities */}
      {feed.map((activity) => (
        <div key={activity.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-4">
            <img src={activity.ngo.image} alt={activity.ngo.name} className="w-10 h-10 rounded-lg object-cover" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{activity.ngo.name}</p>
              <p className="text-xs text-gray-600">{activity.date}</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">{activity.title}</p>
          {activity.image && (
            <img src={activity.image} alt={activity.title} className="w-full h-64 rounded-lg object-cover mb-4" />
          )}
          <div className="flex items-center gap-6 pt-4 border-t border-gray-100 text-gray-600">
            <button className="flex items-center gap-2 hover:text-red-600 transition">
              <Heart className="w-4 h-4" />
              {activity.likes}
            </button>
            <button className="flex items-center gap-2 hover:text-blue-600 transition">
              <MessageCircle className="w-4 h-4" />
              {activity.comments}
            </button>
            <button className="flex items-center gap-2 hover:text-green-600 transition">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      ))}

      {/* Loading indicator */}
      <div ref={observerTarget} className="py-8 text-center">
        {isLoading && <p className="text-gray-600">Loading more activities...</p>}
        {!hasMore && feed.length > 0 && <p className="text-gray-600">No more activities</p>}
      </div>
    </div>
  )
}

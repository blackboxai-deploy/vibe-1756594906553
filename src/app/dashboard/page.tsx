'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import ArtCard from '@/components/ArtCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArtPiece } from '@/lib/types';
import Link from 'next/link';

// Sample user art data
const userArtPieces: ArtPiece[] = [
  {
    id: 'user-1',
    prompt: 'A serene mountain lake at sunset with reflections',
    imageUrl: 'https://placehold.co/400x400?text=Serene+mountain+lake+at+sunset+with+perfect+reflections+and+golden+light',
    style: { id: 'photorealistic', name: 'Photorealistic', description: 'Lifelike imagery', previewUrl: '', category: 'photorealistic' },
    createdAt: new Date('2024-01-20'),
    likes: 89,
    downloads: 32
  },
  {
    id: 'user-2',
    prompt: 'Abstract swirling galaxy in purple and gold',
    imageUrl: 'https://placehold.co/400x400?text=Abstract+swirling+galaxy+with+purple+and+gold+cosmic+patterns',
    style: { id: 'abstract', name: 'Abstract', description: 'Geometric shapes', previewUrl: '', category: 'abstract' },
    createdAt: new Date('2024-01-19'),
    likes: 156,
    downloads: 67
  },
  {
    id: 'user-3',
    prompt: 'Cyberpunk street scene with rain and neon',
    imageUrl: 'https://placehold.co/400x400?text=Cyberpunk+street+scene+with+rain+reflections+and+bright+neon+signs',
    style: { id: 'digital', name: 'Digital Art', description: 'Modern aesthetics', previewUrl: '', category: 'digital' },
    createdAt: new Date('2024-01-18'),
    likes: 203,
    downloads: 89
  }
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userStats] = useState({
    totalGenerations: 24,
    totalLikes: 448,
    totalDownloads: 188,
    favoriteArt: 12,
    following: 5,
    followers: 23
  });

  const handleArtView = (art: ArtPiece) => {
    console.log('Viewing art:', art.id);
  };

  return (
    <>
      <Navigation />
      <ParticleBackground />
      
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-24">
        <div className="container mx-auto px-6 py-12">
          
          {/* Header */}
          <div className="text-center mb-12 animate-reveal">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto mb-6 flex items-center justify-center animate-float">
              <span className="text-3xl font-bold text-white">JD</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome back, John!</h1>
            <p className="text-gray-300">Manage your AI art collection and track your creative journey.</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 bg-white/10 mb-12">
              <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
              <TabsTrigger value="gallery" className="text-sm">My Art</TabsTrigger>
              <TabsTrigger value="favorites" className="text-sm">Favorites</TabsTrigger>
              <TabsTrigger value="settings" className="text-sm">Settings</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {Object.entries(userStats).map(([key, value], index) => (
                  <Card 
                    key={key}
                    className="art-card-3d bg-white/5 backdrop-blur-sm border-white/10 hover:border-purple-500/50 animate-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="pb-3">
                      <CardDescription className="text-gray-400 text-sm capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent animate-pulse3d">
                        {value}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Activity */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 animate-reveal">
                <CardHeader>
                  <CardTitle className="text-white text-2xl flex items-center">
                    Recent Activity
                    <span className="ml-2 animate-float">📈</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: 'Generated new artwork', details: 'Cyberpunk street scene', time: '2 hours ago' },
                      { action: 'Received 15 likes', details: 'Abstract galaxy artwork', time: '5 hours ago' },
                      { action: 'Downloaded artwork', details: 'Mountain lake sunset', time: '1 day ago' },
                      { action: 'Added to favorites', details: 'Digital art piece by @artist', time: '2 days ago' }
                    ].map((activity, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors duration-200"
                      >
                        <div>
                          <p className="text-white font-medium">{activity.action}</p>
                          <p className="text-gray-400 text-sm">{activity.details}</p>
                        </div>
                        <span className="text-gray-500 text-sm">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 animate-reveal">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link href="/generate">
                      <Button className="w-full btn-3d bg-gradient-to-r from-purple-600 to-cyan-600 text-white h-16 rounded-xl">
                        <span className="mr-2">✨</span>
                        Generate Art
                      </Button>
                    </Link>
                    <Link href="/gallery">
                      <Button variant="outline" className="w-full btn-3d border-white/30 text-white h-16 rounded-xl">
                        <span className="mr-2">🖼️</span>
                        Browse Gallery
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full btn-3d border-white/30 text-white h-16 rounded-xl">
                      <span className="mr-2">📤</span>
                      Upload Art
                    </Button>
                    <Button variant="outline" className="w-full btn-3d border-white/30 text-white h-16 rounded-xl">
                      <span className="mr-2">⚙️</span>
                      Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* My Art Tab */}
            <TabsContent value="gallery" className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">My Artwork</h2>
                <Link href="/generate">
                  <Button className="btn-3d bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl">
                    Create New Art
                    <span className="ml-2">✨</span>
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userArtPieces.map((art, index) => (
                  <div 
                    key={art.id}
                    className="animate-reveal"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ArtCard art={art} onView={handleArtView} />
                  </div>
                ))}
              </div>

              {userArtPieces.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-32 h-32 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse3d">
                    <span className="text-4xl">🎨</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">No artwork yet</h3>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Start your creative journey by generating your first AI artwork. 
                    Let your imagination run wild!
                  </p>
                  <Link href="/generate">
                    <Button className="btn-3d bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-3 rounded-xl font-semibold">
                      Generate Your First Art
                      <span className="ml-2">✨</span>
                    </Button>
                  </Link>
                </div>
              )}
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="space-y-8">
              <h2 className="text-3xl font-bold text-white">Favorite Artwork</h2>
              
              <div className="text-center py-16">
                <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full mx-auto mb-6 flex items-center justify-center animate-pulse3d">
                  <span className="text-4xl">❤️</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No favorites yet</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Explore the gallery and heart the artwork you love to build your personal collection.
                </p>
                <Link href="/gallery">
                  <Button className="btn-3d bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold">
                    Explore Gallery
                    <span className="ml-2">🖼️</span>
                  </Button>
                </Link>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-8">
              <h2 className="text-3xl font-bold text-white mb-8">Account Settings</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Display Name</label>
                      <input 
                        type="text" 
                        value="John Doe" 
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                      <input 
                        type="email" 
                        value="john@example.com" 
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:border-purple-500/50 focus:outline-none"
                      />
                    </div>
                    <Button className="btn-3d bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl">
                      Update Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Preferences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Email Notifications</span>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Public Profile</span>
                      <input type="checkbox" className="toggle" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Show Download Count</span>
                      <input type="checkbox" className="toggle" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
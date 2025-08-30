'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import ParticleBackground from '@/components/ParticleBackground';
import ArtCard from '@/components/ArtCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArtPiece, GalleryFilter } from '@/lib/types';

// Sample art data for demo
const sampleArtPieces: ArtPiece[] = [
  {
    id: '1',
    prompt: 'A mystical forest with glowing mushrooms and ethereal lighting',
    imageUrl: 'https://placehold.co/400x400?text=Mystical+forest+with+glowing+blue+mushrooms+and+magical+ethereal+light+rays',
    style: { id: 'fantasy', name: 'Fantasy', description: 'Magical themes', previewUrl: '', category: 'fantasy' },
    createdAt: new Date('2024-01-15'),
    likes: 245,
    downloads: 89
  },
  {
    id: '2',
    prompt: 'Cyberpunk cityscape with neon lights and flying cars',
    imageUrl: 'https://placehold.co/400x400?text=Futuristic+cyberpunk+city+with+neon+lights+flying+cars+and+dark+atmosphere',
    style: { id: 'digital', name: 'Digital Art', description: 'Modern aesthetics', previewUrl: '', category: 'digital' },
    createdAt: new Date('2024-01-14'),
    likes: 312,
    downloads: 156
  },
  {
    id: '3',
    prompt: 'Abstract geometric patterns in vibrant rainbow colors',
    imageUrl: 'https://placehold.co/400x400?text=Abstract+geometric+patterns+with+vibrant+rainbow+colors+and+mathematical+precision',
    style: { id: 'abstract', name: 'Abstract', description: 'Geometric shapes', previewUrl: '', category: 'abstract' },
    createdAt: new Date('2024-01-13'),
    likes: 178,
    downloads: 67
  },
  {
    id: '4',
    prompt: 'Majestic mountain landscape during golden hour',
    imageUrl: 'https://placehold.co/400x400?text=Majestic+mountain+landscape+with+golden+hour+lighting+and+dramatic+clouds',
    style: { id: 'photorealistic', name: 'Photorealistic', description: 'Lifelike imagery', previewUrl: '', category: 'photorealistic' },
    createdAt: new Date('2024-01-12'),
    likes: 421,
    downloads: 203
  },
  {
    id: '5',
    prompt: 'Vintage oil painting of a bustling marketplace',
    imageUrl: 'https://placehold.co/400x400?text=Vintage+oil+painting+of+bustling+marketplace+with+textured+brushstrokes',
    style: { id: 'painting', name: 'Oil Painting', description: 'Traditional techniques', previewUrl: '', category: 'painting' },
    createdAt: new Date('2024-01-11'),
    likes: 294,
    downloads: 128
  },
  {
    id: '6',
    prompt: 'Detailed pencil sketch of an ancient tree',
    imageUrl: 'https://placehold.co/400x400?text=Detailed+pencil+sketch+of+ancient+tree+with+intricate+bark+texture+and+shading',
    style: { id: 'sketch', name: 'Sketch', description: 'Hand-drawn style', previewUrl: '', category: 'sketch' },
    createdAt: new Date('2024-01-10'),
    likes: 156,
    downloads: 45
  },
  {
    id: '7',
    prompt: 'Underwater coral reef with tropical fish',
    imageUrl: 'https://placehold.co/400x400?text=Underwater+coral+reef+with+colorful+tropical+fish+and+crystal+clear+water',
    style: { id: 'photorealistic', name: 'Photorealistic', description: 'Lifelike imagery', previewUrl: '', category: 'photorealistic' },
    createdAt: new Date('2024-01-09'),
    likes: 367,
    downloads: 184
  },
  {
    id: '8',
    prompt: 'Space nebula with stars and cosmic dust',
    imageUrl: 'https://placehold.co/400x400?text=Colorful+space+nebula+with+bright+stars+and+cosmic+dust+clouds+in+deep+space',
    style: { id: 'digital', name: 'Digital Art', description: 'Modern aesthetics', previewUrl: '', category: 'digital' },
    createdAt: new Date('2024-01-08'),
    likes: 445,
    downloads: 267
  },
  {
    id: '9',
    prompt: 'Minimalist geometric composition in monochrome',
    imageUrl: 'https://placehold.co/400x400?text=Minimalist+geometric+composition+with+clean+lines+in+black+and+white',
    style: { id: 'abstract', name: 'Abstract', description: 'Geometric shapes', previewUrl: '', category: 'abstract' },
    createdAt: new Date('2024-01-07'),
    likes: 223,
    downloads: 91
  }
];

export default function GalleryPage() {
  const [artPieces, setArtPieces] = useState<ArtPiece[]>(sampleArtPieces);
  const [filter, setFilter] = useState<GalleryFilter>({});
  const [selectedArt, setSelectedArt] = useState<ArtPiece | null>(null);

  const categories = ['all', 'abstract', 'photorealistic', 'fantasy', 'digital', 'painting', 'sketch'];
  const sortOptions = ['newest', 'popular', 'trending'];

  const handleFilterChange = (newFilter: Partial<GalleryFilter>) => {
    const updatedFilter = { ...filter, ...newFilter };
    setFilter(updatedFilter);
    
    let filtered = sampleArtPieces;
    
    if (updatedFilter.category && updatedFilter.category !== 'all') {
      filtered = filtered.filter(art => art.style.category === updatedFilter.category);
    }
    
    if (updatedFilter.sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (updatedFilter.sortBy) {
          case 'popular':
            return b.likes - a.likes;
          case 'trending':
            return b.downloads - a.downloads;
          case 'newest':
          default:
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
      });
    }
    
    setArtPieces(filtered);
  };

  const handleArtView = (art: ArtPiece) => {
    setSelectedArt(art);
  };

  return (
    <>
      <Navigation />
      <ParticleBackground />
      
      <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-24">
        <div className="container mx-auto px-6 py-12">
          
          {/* Header */}
          <div className="text-center mb-12 animate-reveal">
            <h1 className="text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Art Gallery
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore stunning AI-generated artwork from our community of creators.
              Discover new styles and find inspiration for your next creation.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-6 mb-12 max-w-4xl mx-auto">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
              <Select 
                value={filter.category || 'all'} 
                onValueChange={(value) => handleFilterChange({ category: value as any })}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
              <Select 
                value={filter.sortBy || 'newest'} 
                onValueChange={(value) => handleFilterChange({ sortBy: value as any })}
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artPieces.map((art, index) => (
              <div 
                key={art.id}
                className="animate-reveal"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ArtCard art={art} onView={handleArtView} />
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button className="btn-3d bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-3 rounded-full font-semibold">
              Load More Artwork
              <span className="ml-2">🎨</span>
            </Button>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {selectedArt && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="max-w-4xl w-full bg-white/5 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden animate-reveal">
            <div className="flex flex-col lg:flex-row">
              {/* Image */}
              <div className="flex-1 aspect-square lg:aspect-auto">
                <img
                  src={selectedArt.imageUrl}
                  alt={selectedArt.prompt}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Details */}
              <div className="lg:w-96 p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Artwork Details</h3>
                  <p className="text-gray-300">{selectedArt.prompt}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <span className="text-sm text-gray-400">Style:</span>
                    <p className="text-white">{selectedArt.style.name}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm text-gray-400">Created:</span>
                    <p className="text-white">{selectedArt.createdAt.toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div>
                      <span className="text-sm text-gray-400">Likes:</span>
                      <p className="text-white">{selectedArt.likes}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-400">Downloads:</span>
                      <p className="text-white">{selectedArt.downloads}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <Button className="flex-1 btn-3d bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl">
                    Download
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedArt(null)}
                    className="border-white/30 text-white hover:bg-white/10 rounded-xl"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
import React, { useState, useEffect } from 'react';
import { Globe, MapPin, Sun, Umbrella, Mountain as Mountains, Building, Waves, Search, Heart, Filter, Info } from 'lucide-react';

// Define types for our data
interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  climate: string;
  type: string;
  imageUrl: string;
  rating: number;
  budget: string;
}

function App() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClimate, setSelectedClimate] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedBudget, setSelectedBudget] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  // Load initial data
  useEffect(() => {
    // In a real app, this would be an API call
    const travelData: Destination[] = [
      {
        id: 1,
        name: 'Kyoto',
        country: 'Japan',
        description: 'Ancient temples, traditional gardens, and beautiful cherry blossoms make Kyoto a cultural treasure.',
        climate: 'Temperate',
        type: 'Cultural',
        imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
        rating: 4.8,
        budget: 'High'
      },
      {
        id: 2,
        name: 'Bali',
        country: 'Indonesia',
        description: 'Tropical paradise with stunning beaches, lush rice terraces, and spiritual retreats.',
        climate: 'Tropical',
        type: 'Beach',
        imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        rating: 4.7,
        budget: 'Medium'
      },
      {
        id: 3,
        name: 'Santorini',
        country: 'Greece',
        description: 'Iconic white buildings with blue domes overlooking the crystal-clear Aegean Sea.',
        climate: 'Mediterranean',
        type: 'Beach',
        imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
        rating: 4.9,
        budget: 'High'
      },
      {
        id: 4,
        name: 'Swiss Alps',
        country: 'Switzerland',
        description: 'Breathtaking mountain scenery with world-class skiing and hiking opportunities.',
        climate: 'Alpine',
        type: 'Mountain',
        imageUrl: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7',
        rating: 4.8,
        budget: 'High'
      },
      {
        id: 5,
        name: 'Barcelona',
        country: 'Spain',
        description: 'Vibrant city with stunning architecture, delicious cuisine, and beautiful beaches.',
        climate: 'Mediterranean',
        type: 'Urban',
        imageUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded',
        rating: 4.6,
        budget: 'Medium'
      },
      {
        id: 6,
        name: 'Marrakech',
        country: 'Morocco',
        description: 'Exotic markets, palaces, and gardens in this vibrant North African city.',
        climate: 'Desert',
        type: 'Cultural',
        imageUrl: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b',
        rating: 4.5,
        budget: 'Low'
      },
      {
        id: 7,
        name: 'Queenstown',
        country: 'New Zealand',
        description: 'Adventure capital with stunning landscapes made famous by Lord of the Rings.',
        climate: 'Temperate',
        type: 'Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3',
        rating: 4.7,
        budget: 'High'
      },
      {
        id: 8,
        name: 'Phuket',
        country: 'Thailand',
        description: 'Beautiful beaches, clear waters, and vibrant nightlife in this tropical paradise.',
        climate: 'Tropical',
        type: 'Beach',
        imageUrl: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5',
        rating: 4.4,
        budget: 'Low'
      },
      {
        id: 9,
        name: 'Prague',
        country: 'Czech Republic',
        description: 'Fairytale city with stunning architecture, rich history, and vibrant culture.',
        climate: 'Continental',
        type: 'Urban',
        imageUrl: 'https://images.unsplash.com/photo-1541849546-216549ae216d',
        rating: 4.6,
        budget: 'Medium'
      },
      {
        id: 10,
        name: 'Machu Picchu',
        country: 'Peru',
        description: 'Ancient Incan citadel set high in the Andes Mountains, a wonder of the world.',
        climate: 'Highland',
        type: 'Adventure',
        imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377',
        rating: 4.9,
        budget: 'Medium'
      },
      {
        id: 11,
        name: 'Maldives',
        country: 'Maldives',
        description: 'Luxury overwater bungalows and pristine beaches in this tropical paradise.',
        climate: 'Tropical',
        type: 'Beach',
        imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8',
        rating: 4.9,
        budget: 'High'
      },
      {
        id: 12,
        name: 'Cairo',
        country: 'Egypt',
        description: 'Ancient pyramids, sphinx, and rich history in this bustling metropolis.',
        climate: 'Desert',
        type: 'Cultural',
        imageUrl: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a',
        rating: 4.3,
        budget: 'Low'
      }
    ];
    
    setDestinations(travelData);
    setFilteredDestinations(travelData);
    
    // Load favorites from localStorage if available
    const savedFavorites = localStorage.getItem('travelFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('travelFavorites', JSON.stringify(favorites));
  }, [favorites]);

  // Filter destinations based on search and filters
  useEffect(() => {
    let results = destinations;
    
    // Apply search term filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      results = results.filter(
        dest => 
          dest.name.toLowerCase().includes(lowercasedSearch) || 
          dest.country.toLowerCase().includes(lowercasedSearch)
      );
    }
    
    // Apply climate filter
    if (selectedClimate) {
      results = results.filter(dest => dest.climate === selectedClimate);
    }
    
    // Apply type filter
    if (selectedType) {
      results = results.filter(dest => dest.type === selectedType);
    }
    
    // Apply budget filter
    if (selectedBudget) {
      results = results.filter(dest => dest.budget === selectedBudget);
    }
    
    setFilteredDestinations(results);
  }, [searchTerm, selectedClimate, selectedType, selectedBudget, destinations]);

  // Toggle favorite status
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedClimate('');
    setSelectedType('');
    setSelectedBudget('');
  };

  // Get climate icon
  const getClimateIcon = (climate: string) => {
    switch (climate) {
      case 'Tropical':
      case 'Mediterranean':
        return <Sun className="w-4 h-4" />;
      case 'Desert':
        return <Sun className="w-4 h-4" />;
      case 'Alpine':
      case 'Highland':
        return <Mountains className="w-4 h-4" />;
      default:
        return <Umbrella className="w-4 h-4" />;
    }
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Beach':
        return <Waves className="w-4 h-4" />;
      case 'Mountain':
      case 'Adventure':
        return <Mountains className="w-4 h-4" />;
      case 'Urban':
        return <Building className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Globe className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-800">TravelSuggest</h1>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg transition"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
          
          {/* Search bar */}
          <div className="mt-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search destinations or countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          {/* Filters */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white rounded-lg shadow-inner border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Climate</label>
                  <select
                    value={selectedClimate}
                    onChange={(e) => setSelectedClimate(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Any Climate</option>
                    <option value="Tropical">Tropical</option>
                    <option value="Mediterranean">Mediterranean</option>
                    <option value="Desert">Desert</option>
                    <option value="Alpine">Alpine</option>
                    <option value="Temperate">Temperate</option>
                    <option value="Continental">Continental</option>
                    <option value="Highland">Highland</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Any Type</option>
                    <option value="Beach">Beach</option>
                    <option value="Mountain">Mountain</option>
                    <option value="Urban">Urban</option>
                    <option value="Cultural">Cultural</option>
                    <option value="Adventure">Adventure</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
                  <select
                    value={selectedBudget}
                    onChange={(e) => setSelectedBudget(e.target.value)}
                    className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Any Budget</option>
                    <option value="Low">Budget-Friendly</option>
                    <option value="Medium">Moderate</option>
                    <option value="High">Luxury</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredDestinations.length === 0 
              ? 'No destinations found. Try adjusting your filters.' 
              : `Showing ${filteredDestinations.length} ${filteredDestinations.length === 1 ? 'destination' : 'destinations'}`
            }
          </p>
        </div>
        
        {/* Destination cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map(destination => (
            <div 
              key={destination.id} 
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={`${destination.imageUrl}?auto=format&fit=crop&w=600&q=80`} 
                  alt={destination.name} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => toggleFavorite(destination.id)}
                  className="absolute top-3 right-3 p-2 bg-white bg-opacity-70 rounded-full hover:bg-opacity-100 transition"
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(destination.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                  />
                </button>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{destination.name}</h2>
                    <div className="flex items-center mt-1">
                      <MapPin className="w-4 h-4 text-gray-500 mr-1" />
                      <p className="text-gray-600">{destination.country}</p>
                    </div>
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-lg text-sm font-medium">
                    {destination.rating.toFixed(1)}★
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {getClimateIcon(destination.climate)}
                    <span className="ml-1">{destination.climate}</span>
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {getTypeIcon(destination.type)}
                    <span className="ml-1">{destination.type}</span>
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <span>{destination.budget === 'Low' ? '$' : destination.budget === 'Medium' ? '$$' : '$$$'}</span>
                  </span>
                </div>
                
                <p className="mt-3 text-gray-600 line-clamp-2">{destination.description}</p>
                
                <button 
                  onClick={() => setSelectedDestination(destination)}
                  className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition flex items-center justify-center"
                >
                  <Info className="w-4 h-4 mr-1" />
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty state */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-12">
            <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-600">No destinations found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            <button
              onClick={resetFilters}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>
      
      {/* Destination detail modal */}
      {selectedDestination && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative h-64 sm:h-80">
              <img 
                src={`${selectedDestination.imageUrl}?auto=format&fit=crop&w=1200&q=80`} 
                alt={selectedDestination.name} 
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedDestination(null)}
                className="absolute top-4 right-4 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{selectedDestination.name}</h2>
                  <div className="flex items-center mt-1">
                    <MapPin className="w-5 h-5 text-gray-500 mr-1" />
                    <p className="text-gray-600 text-lg">{selectedDestination.country}</p>
                  </div>
                </div>
                <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-lg text-lg font-medium">
                  {selectedDestination.rating.toFixed(1)}★
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {getClimateIcon(selectedDestination.climate)}
                  <span className="ml-1">{selectedDestination.climate} Climate</span>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {getTypeIcon(selectedDestination.type)}
                  <span className="ml-1">{selectedDestination.type} Destination</span>
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                  <span>
                    {selectedDestination.budget === 'Low' 
                      ? 'Budget-Friendly' 
                      : selectedDestination.budget === 'Medium' 
                        ? 'Moderate Cost' 
                        : 'Luxury'
                    }
                  </span>
                </span>
              </div>
              
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">About this destination</h3>
                <p className="text-gray-600">{selectedDestination.description}</p>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button 
                  onClick={() => toggleFavorite(selectedDestination.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                    favorites.includes(selectedDestination.id)
                      ? 'bg-red-100 text-red-700 hover:bg-red-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(selectedDestination.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                  <span>{favorites.includes(selectedDestination.id) ? 'Saved to Favorites' : 'Save to Favorites'}</span>
                </button>
                
                <button 
                  onClick={() => setSelectedDestination(null)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Globe className="w-6 h-6 text-indigo-600" />
              <span className="text-lg font-semibold text-gray-800">TravelSuggest</span>
            </div>
            <p className="text-gray-600 text-sm">© 2025 TravelSuggest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
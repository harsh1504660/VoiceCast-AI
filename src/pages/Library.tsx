
import { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { Search, Filter, Play, Video,Mic, Calendar, Users, ArrowRight,BadgeCheck  } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedDate, setSelectedDate] = useState('all');
  const [episode, setEpisode] = useState<any | null>(null);
  const topics = ['all', 'technology', 'sports', 'science', 'education', 'entertainment','history','other'];
  const dateFilters = ['all', 'today', 'this-week', 'this-month'];
  
const [episodes, setEpisodes] = useState([]);

useEffect(() => {
  const fetchVideos = async () => {
    try {
      const res = await axios.get('https://voicecast-backend.onrender.com/videos'); // Adjust URL/port if different
      const data = res.data;
      console.log(data)
      // If your backend only returns URL and ID, enrich with placeholders
const enriched = data.map((vid) => ({
  id: vid.id,
  video_url: vid.video_url, // ✅ ADD THIS
  title: vid.title,
  publisher:vid.name,
  hosts: vid.hosts,
  duration:  vid.has_vid ? "video" : "audio only",
  date: new Date().toISOString().split('T')[0],
  topic: vid.topic,
  thumbnail: vid.img_url,
  description: "This is an AI-generated Podcast."
}));

      setEpisodes(enriched);
    } catch (error) {
      console.error("Failed to fetch videos", error);
    }
  };

  fetchVideos();
}, []);

  const filteredEpisodes = episodes.filter(episode => {
    const matchesSearch = episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.hosts.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         episode.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesToopic = selectedTopic === 'all' || episode.topic === selectedTopic;
    
    return matchesSearch && matchesToopic;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
if (episodes.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-lg font-medium text-orange-600">Loading Podcasts...</p>
      <p className="text-sm text-orange-400">Bringing all the podcasts under one roof...</p>
    </div>
  );
}
  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-warm-50 to-coral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-sora text-charcoal-900 mb-4">
            Explore Podcasts 
          </h1>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            Discover amazing AI-generated podcasts from our creative community
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search episodes, hosts, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-3 text-lg border-2 border-warm-200 focus:border-coral-400 rounded-xl"
              />
            </div>

            {/* Topic Filter */}
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Button
                  key={topic}
                  variant={selectedTopic === topic ? "default" : "outline"}
                  onClick={() => setSelectedTopic(topic)}
                  className={`capitalize rounded-full px-4 py-2 ${
                    selectedTopic === topic
                      ? 'bg-coral-600 hover:bg-coral-700 text-white'
                      : 'border-coral-300 text-coral-700 hover:bg-coral-50'
                  }`}
                >
                  {topic === 'all' ? 'All Topics' : topic}
                </Button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mb-8"
        >
          <p className="text-charcoal-600 text-lg">
            Found {filteredEpisodes.length} episode{filteredEpisodes.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Episodes Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredEpisodes.map((episode) => (
          
            <motion.div
              key={episode.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
             <Link to={episode.duration === "video"
  ? `/episodev/${encodeURIComponent(episode.video_url)}`
  : `/episode/${encodeURIComponent(episode.video_url)}`
}>
             
                <div className="relative overflow-hidden">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Play className="w-4 h-4 text-coral-600" />
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge
                      variant="secondary"
                      className="bg-white/90 text-charcoal-700 backdrop-blur-sm capitalize"
                    >
                      {episode.topic}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold font-sora text-charcoal-900 mb-2 group-hover:text-coral-600 transition-colors line-clamp-2">
                    {episode.title}
                  </h3>
                  <p className="text-charcoal-600 mb-4 line-clamp-2">
                    {episode.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-charcoal-500">
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{episode.hosts}</span>
                    </div>
                                        <div className="flex items-center space-x-1">
                      <BadgeCheck className="w-4 h-4" />
                      <span>op: {episode.publisher}</span>
                    </div>
                  </div>
                  
                  

                  <div className="flex items-center justify-between text-sm text-charcoal-500 mt-2">
                    <div className="flex items-center space-x-1">
                      
  {episode.duration =='video' ? (
  <Video className="w-4 h-4" />
) : (
  <Mic className="w-4 h-4" />
)}
                      <span>{episode.duration}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(episode.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredEpisodes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-warm-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-warm-400" />
            </div>
            <h3 className="text-2xl font-semibold font-sora text-charcoal-900 mb-4">
              No episodes found
            </h3>
            <p className="text-charcoal-600 mb-8">
              Try adjusting your search terms or filters
            </p>
            <Button
              onClick={() => {
                setSearchTerm('');
                setSelectedTopic('all');
              }}
              className="bg-coral-600 hover:bg-coral-700 text-white rounded-full px-6 py-3"
            >
              Clear Filters
            </Button>
          </motion.div>
        )}

        {/* Load More */}
        {filteredEpisodes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-coral-300 hover:bg-coral-50 rounded-full px-8 py-6 text-lg font-semibold"
            >
              <span>Load More Episodes</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Library;

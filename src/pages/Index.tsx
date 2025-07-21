
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Users, Sparkles, ArrowRight, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const featuredEpisodes = [
    {
      id: 1,
      title: "AI in Healthcare: Revolutionary Changes",
      hosts: "Alex & Jamie",
      duration: "24 min",
      date: "2024-01-15",
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
      description: "Exploring how AI is transforming medical diagnostics and patient care."
    },
    {
      id: 2,
      title: "The Future of Sustainable Energy",
      hosts: "Morgan & Casey",
      duration: "31 min",
      date: "2024-01-12",
      thumbnail: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400&h=300&fit=crop",
      description: "Discussing renewable energy innovations and their global impact."
    },
    {
      id: 3,
      title: "Space Exploration: Mars Mission Updates",
      hosts: "Alex & Jamie",
      duration: "28 min",
      date: "2024-01-10",
      thumbnail: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?w=400&h=300&fit=crop",
      description: "Latest developments in Mars exploration and colonization plans."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-warm-50 via-coral-50 to-olive-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(239,88,68,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(141,160,92,0.1),transparent_50%)]" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <div className="text-center">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-coral-600" />
              <span className="text-sm font-medium text-charcoal-700">
                Powered by Advanced AI Technology
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-sora text-charcoal-900 mb-6"
            >
              Your Podcast,{' '}
              <span className="bg-gradient-to-r from-coral-500 to-warm-600 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-charcoal-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Create engaging podcasts with AI-powered voices and avatars. 
              Transform your ideas into captivating audio experiences in minutes.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8 py-6 text-lg font-semibold"
              >
                <Link to="/create" className="flex items-center space-x-2">
                  <span>Create New Episode</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-charcoal-300 hover:bg-charcoal-50 rounded-full px-8 py-6 text-lg font-semibold"
              >
                <Link to="/library" className="flex items-center space-x-2">
                  <Play className="w-5 h-5" />
                  <span>Browse Library</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sora text-charcoal-900 mb-4">
              Why Choose VoiceCast AI?
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Experience the future of podcast creation with our cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "AI-Powered Voices",
                description: "Natural-sounding AI voices that bring your content to life with human-like expression"
              },
              {
                icon: Users,
                title: "Animated Avatars",
                description: "Engaging visual avatars that sync perfectly with your audio content"
              },
              {
                icon: Play,
                title: "Instant Generation",
                description: "Create professional podcasts in minutes, not hours"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-warm-50 to-coral-50 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-coral-500 to-warm-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold font-sora text-charcoal-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-charcoal-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Episodes */}
      <section className="py-20 bg-gradient-to-br from-olive-50 to-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sora text-charcoal-900 mb-4">
              Featured Episodes
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Discover the latest AI-generated podcasts from our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredEpisodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Link to={`/episode/${episode.id}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <Play className="w-4 h-4 text-coral-600" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold font-sora text-charcoal-900 mb-2 group-hover:text-coral-600 transition-colors">
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
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{episode.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(episode.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-coral-300 hover:bg-coral-50 rounded-full px-8 py-6 text-lg font-semibold"
            >
              <Link to="/library" className="flex items-center space-x-2">
                <span>View All Episodes</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;

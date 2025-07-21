
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Users, Sparkles,Video,Mic, ArrowRight, Clock,BadgeCheck, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const featuredEpisodes = [
    {
      id: 1,
      title: "The rise of Cricket in India",
      topic:"Entertainment",
      hosts: "Leos & Ida",
      duration:"video",
      video_url:"https://files.catbox.moe/htfvws.mp4",
      publisher:"Sarthak Patil",
      date: "2025-07-18",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pollock_to_Hussey.jpg/1200px-Pollock_to_Hussey.jpg",
      description: "Exploring the rise of cricket in india along with it's impacts"
    },
    {
      id: 2,
      title: "The Invasion of Normandy: Inside D-Day",
      topic:"Education",
      video_url:"https://files.catbox.moe/7h6s6h.wav",
      publisher:"Atharva Mali",
      hosts: "Adam-Erik",
      duration:"audio only",
      date: "2024-07-22",
      thumbnail: "https://warfarehistorynetwork.com/wp-content/uploads/2020/02/W-Jun19-Les-Moulins-1-1-e1658258306161.jpg",
      description: "Discussing the invastion of normandy with thrilling incidents"
    },
    {
      id: 3,
      title: "Mysteries of Black Hole",
      duration:"video",
      publisher:"Harsh Joshi",
      topic:"Science",
      video_url:"https://files.catbox.moe/iyqdg0.mp4",
      hosts: "Amelia & Emanual",
      date: "2024-07-23",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/9/9c/Black_hole_representation.gif",
      description: "Exploring the secrets of black holes through captivating facts and thrilling discoveries."
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
             {featuredEpisodes.map((episode) => (
          
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

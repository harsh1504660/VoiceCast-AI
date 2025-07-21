
import { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, Share2, Copy, Volume2, Users, Clock, Calendar, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

const VideoEpisode = () => {
  const { id } = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);



const [videoUrl, setVideoUrl] = useState<string | null>(null);
const [loading, setLoading] = useState(true);

 const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const videoUrlParam = searchParams.get('url');



  useEffect(() => {
    if (videoUrlParam) {
      setVideoUrl(decodeURIComponent(videoUrlParam));
    }
  }, [videoUrlParam]);
  // Mock episode data
  const episode = {
    id: parseInt(id || '1'),
    title: "AI in Healthcare: Revolutionary Changes",
    hosts: "Alex & Jamie",
    duration: "24 min",
    date: "2024-01-15",
    topic: "technology",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=600&fit=crop",
    description: "Exploring how AI is transforming medical diagnostics and patient care with cutting-edge solutions that are revolutionizing the healthcare industry.",
    totalSeconds: 1440, // 24 minutes
    transcript: [
      { speaker: "Alex", time: "0:00", text: "Welcome to another episode of Tech Insights. I'm Alex, and today we're diving deep into how artificial intelligence is revolutionizing healthcare." },
      { speaker: "Jamie", time: "0:15", text: "That's right, Alex. The impact of AI on healthcare has been nothing short of extraordinary. From diagnostic imaging to drug discovery, we're seeing unprecedented advances." },
      { speaker: "Alex", time: "0:35", text: "Let's start with diagnostic imaging. AI algorithms can now detect certain conditions with accuracy rates that rival or even exceed human specialists." },
      { speaker: "Jamie", time: "0:50", text: "Absolutely. Take radiology, for example. AI systems can analyze X-rays, MRIs, and CT scans to identify tumors, fractures, and other abnormalities with remarkable precision." },
      { speaker: "Alex", time: "1:10", text: "And it's not just about accuracy – it's about speed. These AI systems can process thousands of images in the time it would take a human radiologist to review just a few." },
      { speaker: "Jamie", time: "1:25", text: "That's a game-changer for patient care. Early detection can significantly improve treatment outcomes, especially in cases like cancer where time is critical." },
      { speaker: "Alex", time: "1:40", text: "Another fascinating area is drug discovery. Traditionally, developing a new drug could take 10-15 years and cost billions of dollars." },
      { speaker: "Jamie", time: "1:55", text: "But with AI, we're seeing that timeline compressed dramatically. Machine learning algorithms can predict how different compounds will interact with biological targets." },
      { speaker: "Alex", time: "2:10", text: "And during the pandemic, we saw this in action. AI helped accelerate vaccine development and identify potential treatments for COVID-19." },
      { speaker: "Jamie", time: "2:25", text: "Let's not forget about personalized medicine. AI can analyze a patient's genetic makeup, medical history, and lifestyle factors to recommend tailored treatment plans." }
    ]
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "The episode link has been copied to your clipboard.",
    });
  };

  const shareOnTwitter = () => {
    const text = `Check out this AI-generated podcast: "${episode.title}" by ${episode.hosts}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-warm-50 to-coral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Episode Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
                <div className="relative">
                  <img
                    src={episode.thumbnail}
                    alt={episode.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge className="bg-white/90 text-charcoal-700 backdrop-blur-sm mb-2 capitalize">
                      {episode.topic}
                    </Badge>
                    <h1 className="text-3xl font-bold font-sora text-white mb-2">
                      {episode.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-white/90">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{episode.hosts}</span>
                      </div>
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
              </Card>
            </motion.div>

            {/* Description */}
{videoUrl ? (
      <div>
      <h2>Your Episode</h2>
      {videoUrl ? (
        <video width="640" height="360" controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
) : (
  <p className="text-gray-500 mt-6">Video is processing or unavailable.</p>
)}

            {/* Transcript */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="bg-white shadow-lg rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xl font-sora text-charcoal-900">
                    Transcript
                  </CardTitle>
                  <CardDescription>
                    Follow along with the conversation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {episode.transcript.map((item, index) => (
                        <div key={index} className="flex space-x-4">
                          <div className="flex-shrink-0 w-16 text-sm text-coral-600 font-medium">
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-charcoal-900">
                                {item.speaker}
                              </span>
                            </div>
                            <p className="text-charcoal-700 leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Avatar & Player */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white shadow-lg rounded-2xl sticky top-24">
                <CardContent className="p-6">
                  {/* Avatar Placeholder */}
                  <div className="bg-gradient-to-br from-warm-100 to-coral-100 rounded-2xl p-6 mb-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-coral-400 to-warm-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users className="w-12 h-12 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold font-sora text-charcoal-900 mb-1">
                      {episode.hosts}
                    </h3>
                    <p className="text-charcoal-600 text-sm">
                      AI Podcast Hosts
                    </p>
                  </div>

                  {/* Audio Player */}


                  {/* Share Buttons */}
                  <div className="space-y-3">
                    <h4 className="font-medium text-charcoal-900 mb-3">
                      Share Episode
                    </h4>
                    
                    <Button
                      onClick={shareOnTwitter}
                      variant="outline"
                      className="w-full justify-start space-x-2 border-2 border-warm-200 hover:bg-warm-50 rounded-xl"
                    >
                      <Twitter className="w-4 h-4 text-blue-500" />
                      <span>Share on Twitter</span>
                    </Button>
                    
                    <Button
                      onClick={shareOnLinkedIn}
                      variant="outline"
                      className="w-full justify-start space-x-2 border-2 border-warm-200 hover:bg-warm-50 rounded-xl"
                    >
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      <span>Share on LinkedIn</span>
                    </Button>
                    
                    <Button
                      onClick={copyLink}
                      variant="outline"
                      className="w-full justify-start space-x-2 border-2 border-warm-200 hover:bg-warm-50 rounded-xl"
                    >
                      <Copy className="w-4 h-4 text-charcoal-600" />
                      <span>Copy Link</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoEpisode;

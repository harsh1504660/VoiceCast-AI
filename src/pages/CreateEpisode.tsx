
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Clock, Play, Pause, Volume2, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar } from '@radix-ui/react-avatar';
import { toast } from '@/hooks/use-toast';
import { GeneratingSection } from '@/components/GeneratingSection';
const CreateEpisode = () => {
const [formData, setFormData] = useState({
  username: '',
  title: '',
  topic: '',
  duration: '5',
  avatarPair: '',
  outputType: '',
  description: ''
});
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGenerated, setIsGenerated] = useState(false);
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const audioAvatarPairs  = [
    { id: 'Vidhi-lily', name: 'Vidhi & Lily', description: 'Tech enthusiasts with complementary perspectives' },
    { id: 'emads-marisaa', name: 'Emads & Marisaa', description: 'Creative storytellers with engaging dynamics' },
    { id: 'clara-mark', name: 'Clara & Mark', description: 'Business experts with analytical insights' },
    { id: 'adam-erik', name: 'Adam & Erik', description: 'Health and wellness advocates' }
  ];
  const videoAvatarPairs = [
  { id: 'amelia-emanual', name: 'Amelia & Emanual', description: 'Expressive AI video hosts' },
  { id: 'brandon-gala', name: 'Brandon & Gala', description: 'Dynamic duo for engaging video episodes' },
  { id: 'leos-ida', name: 'Leos & Ida', description: 'Conversational and visually expressive' },
  { id: 'leszek-noah', name: 'Leszek & Noah', description: 'Professional and charismatic AI video hosts' },
  { id: 'masha-martina', name: 'Masha & Martina', description: 'Energetic and friendly presence on screen' }
];
  const durations = [
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '20', label: '20 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '45', label: '45 minutes' },
    { value: '60', label: '60 minutes' }
  ];
const currentAvatarPairs = formData.outputType === 'video' ? videoAvatarPairs : audioAvatarPairs;
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsGenerating(true);

  try {
    const isVideo = formData.outputType === 'video';
    const endpoint = isVideo ? 'https://voicecast-backend.onrender.com/script' : 'https://voicecast-backend.onrender.com/audio_podcast';

    const payload = isVideo
      ? {
          topic: formData.title,
          name: formData.username,
          avatar: formData.avatarPair,
          hasvid: true,
          topicCat: formData.topic,
          description:formData.description
        }
      : {
          topic: formData.title,
          name: formData.username,
          hosts: formData.avatarPair,
          hasvid: false,
          topicCat: formData.topic,
          description:formData.description
        };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Failed to generate ${isVideo ? 'video' : 'audio'} episode`);
    }

    const data = await response.json();
    console.log("🎧/🎥 API Response:", data);

    if (isVideo && data.video_url) {
      const encodedUrl = encodeURIComponent(data.video_url);
      navigate(`/episodev/${encodedUrl}`);
    } else if (!isVideo && data.audio_url) {
      const encodedUrl = encodeURIComponent(data.audio_url);
      navigate(`/episode/${encodedUrl}`);
    } else {
      toast({
      title: "Something went wrong",
      description: "Looks like all the hosts are busy, Please try after sometime.",
      variant: "destructive",
    });
    }
  } catch (error) {
    console.error('❌ Error:', error);
      toast({
      title: "Oops!! Something went wrong",
      description: "Till then you can checkout other Podcasts",
      variant: "destructive",
    });
  }

  setIsGenerating(false);
};


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    
    <div className="min-h-screen pt-16 bg-gradient-to-br from-warm-50 to-coral-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold font-sora text-charcoal-900 mb-4">
            Create New Episode
          </h1>
          <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
            Transform your ideas into engaging podcasts with AI-powered voices and avatars
          </p>
        </motion.div>

        {isGenerating ? (
  <GeneratingSection />
) : !isGenerated ? (
          /* Creation Form */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-coral-500 to-warm-600 text-white">
                <CardTitle className="text-2xl font-sora flex items-center space-x-2">
                  <Sparkles className="w-6 h-6" />
                  <span>Episode Details</span>
                </CardTitle>
                <CardDescription className="text-coral-50">
                  Fill in the details below to generate your AI-powered podcast
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
  {/* User Name */}
  <div className="space-y-2">
    <Label htmlFor="username" className="text-lg font-medium text-charcoal-900">
      Your Name
    </Label>
    <Input
      id="username"
      type="text"
      placeholder="Enter your name..."
      value={formData.username}
      onChange={(e) => handleInputChange('username', e.target.value)}
      className="text-lg py-3 border-2 border-warm-200 focus:border-coral-400 rounded-xl"
      required
    />
  </div>

  {/* Title */}
  <div className="space-y-2">
    <Label htmlFor="title" className="text-lg font-medium text-charcoal-900">
      Episode Title
    </Label>
    <Input
      id="title"
      type="text"
      placeholder="Enter your episode title..."
      value={formData.title}
      onChange={(e) => handleInputChange('title', e.target.value)}
      className="text-lg py-3 border-2 border-warm-200 focus:border-coral-400 rounded-xl"
      required
    />
  </div>

  {/* Topic */}
  <div className="space-y-2">
  <Label htmlFor="topic" className="text-lg font-medium text-charcoal-900">
    Topic
  </Label>
  <Select
  value={formData.topic}
  onValueChange={(value) => handleInputChange("topic", value)}
>
  <SelectTrigger className="text-s py-3 border-2 border-warm-200 focus:border-coral-400 rounded-xl text-gray-500 ">
    <SelectValue placeholder="Select a topic" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="technology">Technology</SelectItem>
    <SelectItem value="health">Health</SelectItem>
    <SelectItem value="business">Business</SelectItem>
    <SelectItem value="entertainment">Entertainment</SelectItem>
    <SelectItem value="education">Education</SelectItem>
    <SelectItem value="science">Science</SelectItem>
    <SelectItem value="other">Other</SelectItem>
  </SelectContent>
</Select>
</div>

  {/* Description */}
 <div className="space-y-2">
  <Label htmlFor="topic" className="text-lg font-medium text-charcoal-900">
    Additional info
  </Label>
  <Select
  value={formData.description}
  onValueChange={(value) => handleInputChange("description", value)}
>
  <SelectTrigger className="text-s py-3 border-2 border-warm-200 focus:border-coral-400 rounded-xl text-gray-500 ">
    <SelectValue placeholder="Select a topic" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="humorous podcast">Humorous</SelectItem>
    <SelectItem value="informative and educational style">Educational</SelectItem>
    <SelectItem value="deep and serious conversation">Serious</SelectItem>
    <SelectItem value="give intresting facts">With intresting facts</SelectItem>
    <SelectItem value="in the story format">Story</SelectItem>
    <SelectItem value="normal flow">Default</SelectItem>
  </SelectContent>
</Select>
</div>
  <div className="space-y-2">
    <Label className="text-lg font-medium text-charcoal-900">Output Type</Label>
    <Select value={formData.outputType} onValueChange={(value) => handleInputChange('outputType', value)}>
      <SelectTrigger className="text-s py-3 border-2 border-warm-200 focus:border-coral-400 rounded-xl text-gray-500 ">
        <SelectValue placeholder="Select output format" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="audio">Audio Only</SelectItem>
        <SelectItem value="video">Video + Audio</SelectItem>
      </SelectContent>
    </Select>
  </div>
  {/* Duration and Avatar Pair */}
  <div className="grid md:grid-cols-2 gap-6">
    <div className="space-y-2 relative group">
      <Label className="text-lg font-medium text-charcoal-900">Duration</Label>
      <Select disabled value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
        <SelectTrigger  className="text-s py-3 border-2 border-warm-200 rounded-xl text-gray-400 bg-gray-100 cursor-not-allowed">
          <SelectValue placeholder="Up to 5 minutes" />
        </SelectTrigger>
        <SelectContent>
          {durations.map((duration) => (
            <SelectItem key={duration.value} value={duration.value}>
              {duration.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
        <div className="absolute left-0 -bottom-7 text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-max">
    Currently supports only 5-minute episodes
  </div>
    </div>

    <div className="space-y-2">
      <Label className="text-lg font-medium text-charcoal-900">Avatar Pair</Label>
      <Select value={formData.avatarPair} onValueChange={(value) => handleInputChange('avatarPair', value)}>
        <SelectTrigger className="text-s py-3 border-2 border-warm-200 focus:border-coral-400 rounded-xl text-gray-500">
          <SelectValue placeholder="Choose hosts" />
        </SelectTrigger>
        <SelectContent>
          {currentAvatarPairs.map((pair) => (
            <SelectItem key={pair.id} value={pair.id}>
              {pair.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>

  {/* Avatar Preview */}
  {formData.avatarPair && (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-warm-50 rounded-xl p-4"
    >
      <div className="flex items-center space-x-3">
        <Users className="w-5 h-5 text-coral-600" />
        <div>
          <p className="font-medium text-charcoal-900">
           {currentAvatarPairs.find(pair => pair.id === formData.avatarPair)?.name}
          </p>
          <p className="text-sm text-charcoal-600">
            {currentAvatarPairs.find(pair => pair.id === formData.avatarPair)?.description}
          </p>
        </div>
      </div>
    </motion.div>
  )}

  {/* Output Type */}


  {/* Submit Button */}
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="pt-6"
  >
    <Button
      type="submit"
      disabled={
        isGenerating ||
        !formData.username ||
        !formData.title ||
        !formData.topic ||
        !formData.duration ||
        !formData.avatarPair ||
        !formData.outputType
      }
      className="w-full bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white text-lg font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Generating Your Podcast...
        </>
      ) : (
        <>
          <Sparkles className="w-5 h-5 mr-2" />
          Generate Episode
        </>
      )}
    </Button>
  </motion.div>
</form>

              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Generated Episode Preview */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Success Message */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-olive-500 to-olive-600 text-white rounded-2xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold font-sora mb-2">
                Episode Generated Successfully!
              </h2>
              <p className="text-olive-100">
                Your AI-powered podcast is ready to listen
              </p>
            </motion.div>

            {/* Episode Preview */}
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-warm-100 to-coral-100">
                <CardTitle className="text-2xl font-sora text-charcoal-900">
                  {formData.title}
                </CardTitle>
                <CardDescription className="text-lg text-charcoal-600">
                  {formData.topic}
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8">
                {/* Avatar Canvas Placeholder */}
                <div className="bg-gradient-to-br from-warm-100 to-coral-100 rounded-2xl p-8 mb-6 text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-coral-400 to-warm-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold font-sora text-charcoal-900 mb-2">
                    {currentAvatarPairs.find(pair => pair.id === formData.avatarPair)?.name}
                  </h3>
                  <p className="text-charcoal-600">
                    AI Avatars Ready to Present
                  </p>
                </div>

                {/* Audio Player */}
                <div className="bg-charcoal-900 rounded-2xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={togglePlayback}
                        className="w-12 h-12 bg-coral-600 hover:bg-coral-700 rounded-full flex items-center justify-center"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-white" />
                        ) : (
                          <Play className="w-6 h-6 text-white ml-1" />
                        )}
                      </Button>
                      <div>
                        <p className="text-white font-medium">
                          {formData.title}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {formData.duration} minutes
                        </p>
                      </div>
                    </div>
                    <Volume2 className="w-6 h-6 text-gray-400" />
                  </div>
                  
                  {/* Waveform Placeholder */}
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: isPlaying ? '100%' : '0%' }}
                      transition={{ duration: parseInt(formData.duration) * 60, ease: "linear" }}
                      className="h-full bg-gradient-to-r from-coral-500 to-warm-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => setIsGenerated(false)}
                    variant="outline"
                    className="flex-1 border-2 border-coral-300 text-coral-700 hover:bg-coral-50 rounded-xl py-6 text-lg font-semibold"
                  >
                    Create Another Episode
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white rounded-xl py-6 text-lg font-semibold"
                  >
                    Save & Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CreateEpisode;

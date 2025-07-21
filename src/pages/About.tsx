
import { motion } from 'framer-motion';
import { CheckCircle, Sparkles, Users, Zap } from 'lucide-react';

const About = () => {
  const steps = [
    {
      number: "01",
      title: "Add Topic",
      description: "Choose your podcast topic and let our AI understand your vision",
      icon: Sparkles
    },
    {
      number: "02",
      title: "Get Script",
      description: "Our AI generates engaging scripts tailored to your audience",
      icon: Zap
    },
    {
      number: "03",
      title: "Watch Animated Avatars",
      description: "Experience your podcast come to life with realistic AI avatars",
      icon: Users
    }
  ];

  const features = [
    "Natural-sounding AI voices",
    "Realistic animated avatars",
    "Professional script generation",
    "Multi-language support",
    "Custom voice training",
    "Real-time editing"
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-warm-50 via-coral-50 to-olive-50 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(239,88,68,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(141,160,92,0.1),transparent_50%)]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-8"
          >
            <CheckCircle className="w-4 h-4 text-coral-600" />
            <span className="text-sm font-medium text-charcoal-700">
              Trusted by 10,000+ Creators
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-sora text-charcoal-900 mb-6">
            Empowering Creators With{' '}
            <span className="bg-gradient-to-r from-coral-500 to-warm-600 bg-clip-text text-transparent">
              AI Voices & Avatars
            </span>
          </h1>

          <p className="text-xl text-charcoal-600 leading-relaxed max-w-3xl mx-auto">
            VoiceCast AI is revolutionizing podcast creation by combining cutting-edge 
            artificial intelligence with intuitive design. Our platform empowers creators 
            to produce professional-quality podcasts without the technical complexity.
          </p>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sora text-charcoal-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Create professional podcasts in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-warm-50 to-coral-50 rounded-2xl p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-coral-500 to-warm-600 rounded-xl flex items-center justify-center">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold font-sora text-coral-200 group-hover:text-coral-300 transition-colors">
                      {step.number}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold font-sora text-charcoal-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-charcoal-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-coral-300 to-warm-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-br from-olive-50 to-warm-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sora text-charcoal-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-charcoal-600 max-w-2xl mx-auto">
              Everything you need to create engaging podcasts
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-coral-600 flex-shrink-0" />
                  <span className="text-charcoal-900 font-medium">{feature}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sora text-charcoal-900 mb-8">
              Our Mission
            </h2>
            <div className="bg-gradient-to-br from-warm-50 to-coral-50 rounded-2xl p-8 md:p-12">
              <p className="text-lg text-charcoal-700 leading-relaxed mb-6">
                We believe that everyone has a story worth telling. VoiceCast AI democratizes 
                podcast creation by removing technical barriers and making professional-quality 
                content accessible to creators worldwide.
              </p>
              <p className="text-lg text-charcoal-700 leading-relaxed">
                Our AI-powered platform is designed to amplify human creativity, not replace it. 
                We're here to help you focus on what matters most: sharing your unique voice 
                and connecting with your audience.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;

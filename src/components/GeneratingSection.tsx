import { motion } from 'framer-motion';
import { Sparkles, Users, Loader2 } from 'lucide-react';

const steps = [
  'Analyzing your topic...',
  'Generating the script...',
  'Selecting the perfect avatars...',
  'Mixing voices & music...',
  'Rendering your episode...'
];

export const GeneratingSection = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
        className="mb-8"
      >
        <div className="w-28 h-28 bg-gradient-to-tr from-coral-500 to-warm-400 rounded-full flex items-center justify-center shadow-xl">
          <Users className="w-12 h-12 text-white" />
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl md:text-3xl font-bold font-sora text-charcoal-800 mb-4"
      >
        Your AI Podcast is Coming to Life 🎙️
      </motion.h2>

      <motion.p
        className="text-lg text-charcoal-600 mb-10 max-w-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
      >
        Sit back and relax while we generate your personalized episode with avatars, voice synthesis, and story crafting.
      </motion.p>

      {/* Loop through steps */}
      <div className="flex flex-col gap-3 mb-10">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 2, duration: 1 }}
            className="flex items-center gap-2"
          >
            <Loader2 className="w-5 h-5 animate-spin text-coral-500" />
            <p className="text-charcoal-700 font-medium">{step}</p>
          </motion.div>
        ))}
      </div>

      {/* Animated waveform */}
      <div className="flex gap-1">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-coral-500"
            animate={{
              height: ['0.5rem', '2rem', '0.5rem'],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div>
    </div>
  );
};
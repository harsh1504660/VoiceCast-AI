
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-50 via-coral-50 to-olive-50">
      <div className="text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Animated AI Face */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="text-8xl mb-8"
          >
            🤖
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold font-sora text-charcoal-900 mb-4"
          >
            404
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-sora text-charcoal-900 mb-4">
              Oops! Even AI got lost.
            </h2>
            <p className="text-xl text-charcoal-600 max-w-md mx-auto leading-relaxed">
              The page you're looking for doesn't exist. Our AI hosts are as confused as you are!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full px-8 py-6 text-lg font-semibold"
            >
              <Link to="/" className="flex items-center space-x-2">
                <Home className="w-5 h-5" />
                <span>Go Home</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-charcoal-300 hover:bg-charcoal-50 rounded-full px-8 py-6 text-lg font-semibold"
            >
              <Link to="/library" className="flex items-center space-x-2">
                <ArrowLeft className="w-5 h-5" />
                <span>Browse Episodes</span>
              </Link>
            </Button>
          </motion.div>

          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-20 left-20 w-4 h-4 bg-coral-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute top-40 right-32 w-6 h-6 bg-warm-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
              className="absolute bottom-40 left-40 w-5 h-5 bg-olive-400 rounded-full opacity-60"
            />
            <motion.div
              animate={{
                y: [0, 25, 0],
                rotate: [0, -8, 8, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute bottom-20 right-20 w-3 h-3 bg-coral-500 rounded-full opacity-60"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;

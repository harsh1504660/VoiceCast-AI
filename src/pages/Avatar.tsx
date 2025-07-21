import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Video,Mic } from 'lucide-react';
const Avatar = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 to-coral-50 p-8">
      {/* Header */}
      <div className="flex justify-center items-center mb-8 py-10">

      </div>

      {/* Video Avatar Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-charcoal-800 flex items-center gap-2">
  <Video className="w-7 h-7 text-charcoal-900"/>
  Video Hosts
</h2>
        <div className="bg-gradient-to-br from-warm-50 to-coral grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {[
            ['amelia.webp', 'emanual.webp','Ameila','Emanual'],
            ['gala.webp', 'brandon.webp','Gala','Brandon'],
            ['leos.webp', 'ida.webp','Leos','Ida'],
            ['leszek.webp', 'noah.webp','Leszek','Noah'],
          ].map(([img1, img2,name1,name2], idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-warm-100 to-coral-100 rounded-2xl shadow-md p-6 flex items-center space-x-6"
            >
              <img src={img1} alt="Host 1" className="rounded-full w-28 h-28 object-cover border-2" />
              <img src={img2} alt="Host 2" className="rounded-full w-28 h-28 object-cover border-2" />
              <div className="ml-4">
                <h3 className="text-2xl font-semibold text-charcoal-700">{name1} & {name2}</h3>
                <p className="text-base text-gray-600">Interactive AI video hosts</p>
              </div>
            </motion.div>
          ))}

          {/* Centered Pair */}
          <div className="col-span-full flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-warm-100 to-coral-100 rounded-2xl shadow-md p-6 flex items-center space-x-6"
            >
              <img src="masha.webp" alt="Host 1" className="rounded-full w-28 h-28 object-cover border-2" />
              <img src="martina.webp" alt="Host 2" className="rounded-full w-28 h-28 object-cover border-2" />
              <div className="ml-6">
                <h3 className="text-2xl font-semibold text-charcoal-700">Martina & Masha</h3>
                <p className="text-base text-gray-600">Interactive AI video hosts</p>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Audio Avatar Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-charcoal-800 flex items-center gap-2">
 
    <Mic className="bg-gradient-to-br from-warm-50 w-7 h-7 text-charcoal-900" />
  
  Audio Hosts
</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {[
            ['Clara', 'clara.mp3', 'Mark', 'mark.mp3'],
            ['Emads', 'emads.mp3', 'Marisaa', 'marisaa.mp3'],
            ['vidhi', 'vidhi.mp3', 'Lily', 'Lily.mp3'],
            ['Erik', 'Erik.mp3', 'Adam', 'adam.mp3'],
          ].map(([name1, audio1, name2, audio2], idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-warm-50 to-coral-50 rounded-2xl shadow-md p-4"
            >
              <h3 className="text-lg font-medium text-charcoal-700 mb-2">Host pair</h3>
              <div className="space-y-2">
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-600">{name1}</span>
                  <audio controls className="w-full " >
                    <source src={audio1} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-gray-600">{name2}</span>
                  <audio controls className="w-full">
                    <source src={audio2} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </div>
            </motion.div>
          ))}

        </div>
      </section>
    </div>
  );
};

export default Avatar;

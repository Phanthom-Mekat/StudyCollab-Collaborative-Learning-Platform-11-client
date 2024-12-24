import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, Calendar, Award, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import WordRotate from '../ui/word-rotate';
import NumberTicker from '../ui/number-ticker';

const Banner = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    "./banner.jpg",
    "./banner2.avif",
    "./banner3.webp"
  ];

  const stats = [
    { number: "10K+", label: "Active Students" },
    { number: "95%", label: "Success Rate" },
    { number: "500+", label: "Daily Sessions" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative  overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${images[currentImage]})`,
                filter: 'brightness(0.3)'
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Award Badge */}
      <motion.div
        className="absolute top-8 right-8 flex items-center bg-primary/60 text-black px-4 py-2 rounded-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <Star className="w-5 h-5 mr-2" />
        <span className="font-bold">Best Learning Platform 2024</span>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-block bg-primary/60 text-black px-4 py-2 rounded-full mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-semibold">Join <NumberTicker value={10000}/> + Students</span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Your&nbsp;
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                <WordRotate className='' words={["Learning", "Future", "Journey", "Success"]} inline />
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience the future of collaborative learning with our award-winning platform.
              Connect, share, and excel together in a vibrant community of learners.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link to={"/auth/login"}>
                <motion.button
                  className="bg-gradient-to-r from-primary to-purple-500 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-lg font-bold text-lg border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 gap-6"
          >
            {[
              { icon: <BookOpen />, title: "Smart Learning" },
              { icon: <Users />, title: "Group Studies" },
              { icon: <Calendar />, title: "Flexible Schedule" },
              { icon: <Award />, title: "Certified Courses" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-white font-bold mb-2">{feature.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default Banner;
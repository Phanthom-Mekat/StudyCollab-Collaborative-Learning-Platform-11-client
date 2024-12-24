/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Grid, Layout, List, Users, Trophy, BookOpen } from 'lucide-react';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [viewMode, setViewMode] = useState('carousel');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [isAnimating, setIsAnimating] = useState(false);
    const touchStartX = useRef(null);
    const touchEndX = useRef(null);

    const categories = [
        { id: 'all', label: 'All Stories', icon: Users },
        { id: 'improvement', label: 'Academic Growth', icon: Trophy },
        { id: 'collaboration', label: 'Collaboration', icon: BookOpen },
    ];

    const testimonials = [
        {
            id: 1,
            name: "Sarah Chen",
            role: "Computer Science Student",
            image: "https://i.pravatar.cc/100?img=5",
            rating: 5,
            text: "This platform revolutionized how I study! Being able to create assignments and grade others' work has deeply enhanced my understanding of complex topics. The peer review system is incredibly effective.",
            highlight: "95% improvement in grades",
            category: "improvement",
            stats: {
                assignmentsCompleted: 45,
                peersHelped: 23,
                hoursStudied: 120
            }
        },
        {
            id: 2,
            name: "James Rodriguez",
            role: "Mathematics Major",
            image: "https://i.pravatar.cc/100?img=6",
            rating: 5,
            text: "The collaborative environment here is unmatched. I've learned so much from reviewing other students' approaches to problems. It's like having a study group available 24/7!",
            highlight: "Connected with 50+ study partners",
            category: "collaboration",
            stats: {
                assignmentsCompleted: 38,
                peersHelped: 31,
                hoursStudied: 95
            }
        },
        {
            id: 3,
            name: "Aisha Patel",
            role: "Engineering Student",
            image: "https://i.pravatar.cc/100?img=1",
            rating: 5,
            text: "What sets this platform apart is the quality of peer feedback. Creating assignments for others has helped me understand topics from different angles. It's truly transformative!",
            highlight: "Mastered 12 difficult topics",
            category: "improvement",
            stats: {
                assignmentsCompleted: 52,
                peersHelped: 28,
                hoursStudied: 150
            }
        },
        {
            id: 4,
            name: "David Kim",
            role: "Physics Student",
            image: "https://i.pravatar.cc/100?img=3",
            rating: 5,
            text: "The variety of assignments and difficulty levels keeps me challenged and engaged. The peer grading system has taught me as much as creating the assignments themselves!",
            highlight: "Completed 30+ group projects",
            category: "collaboration",
            stats: {
                assignmentsCompleted: 41,
                peersHelped: 19,
                hoursStudied: 110
            }
        }
    ];

    const filteredTestimonials = selectedCategory === 'all'
        ? testimonials
        : testimonials.filter(t => t.category === selectedCategory);

    useEffect(() => {
        if (viewMode === 'carousel') {
            const timer = setInterval(() => {
                if (!isAnimating) {
                    setActiveIndex((current) =>
                        current === filteredTestimonials.length - 1 ? 0 : current + 1
                    );
                }
            }, 5000);
            return () => clearInterval(timer);
        }
    }, [filteredTestimonials.length, viewMode, isAnimating]);

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) { // minimum swipe distance
            if (diff > 0) {
                nextTestimonial();
            } else {
                prevTestimonial();
            }
        }

        touchStartX.current = null;
        touchEndX.current = null;
    };

    const nextTestimonial = () => {
        setIsAnimating(true);
        setActiveIndex((current) =>
            current === filteredTestimonials.length - 1 ? 0 : current + 1
        );
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevTestimonial = () => {
        setIsAnimating(true);
        setActiveIndex((current) =>
            current === 0 ? filteredTestimonials.length - 1 : current - 1
        );
        setTimeout(() => setIsAnimating(false), 500);
    };

    const TestimonialCard = ({ testimonial, isFullWidth = false }) => (
        <div
            className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg transform transition-all duration-300 hover:scale-102 hover:shadow-xl ${isFullWidth ? 'w-full' : 'w-full '
                }`} data-aos="fade-up"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className="relative group">
                        <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-16 h-16 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <Quote className="absolute -bottom-2 -right-2 w-6 h-6 text-indigo-500 bg-white dark:bg-gray-800 rounded-full" />
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {testimonial.name}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {testimonial.role}
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                        />
                    ))}
                </div>
            </div>

            <blockquote className="text-gray-700 dark:text-gray-200 mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
            </blockquote>
            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-4 mb-4">
                <p className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    ✨ {testimonial.highlight}
                </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="font-bold text-indigo-600 dark:text-indigo-400">
                        {testimonial.stats.assignmentsCompleted}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        Assignments
                    </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="font-bold text-indigo-600 dark:text-indigo-400">
                        {testimonial.stats.peersHelped}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        Peers Helped
                    </div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="font-bold text-indigo-600 dark:text-indigo-400">
                        {testimonial.stats.hoursStudied}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                        Hours Studied
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 py-16  dark:bg-gray-900" data-aos="fade-up">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    Student Success Stories
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    See how our platform is transforming the way students learn together
                </p>

                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${selectedCategory === category.id
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {category.label}
                            </button>
                        );
                    })}
                </div>

                <div className="flex justify-center gap-4 mb-8">
                    <button
                        onClick={() => setViewMode('carousel')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'carousel'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        <Layout className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'grid'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        <Grid className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list'
                                ? 'bg-indigo-600 text-white'
                                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        <List className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {viewMode === 'carousel' && (
                <div className="relative">
                    <div
                        className="overflow-hidden"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
                        >
                            {filteredTestimonials.map((testimonial) => (
                                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                                    <TestimonialCard testimonial={testimonial} isFullWidth />
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={prevTestimonial}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    <button
                        onClick={nextTestimonial}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    </button>

                    <div className="flex justify-center mt-8 space-x-2">
                        {filteredTestimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveIndex(index)}
                                className={`w-2.5 h-2.5 rounded-full transition-colors ${index === activeIndex
                                        ? 'bg-indigo-600 dark:bg-indigo-400'
                                        : 'bg-gray-300 dark:bg-gray-600'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTestimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
            )}


            {viewMode === 'list' && (
                <div className="space-y-6">
                    {filteredTestimonials.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} testimonial={testimonial} isFullWidth />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Testimonials;
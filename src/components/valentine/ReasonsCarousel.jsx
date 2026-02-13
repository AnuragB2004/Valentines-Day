import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

export default function ReasonsCarousel() {
    const reasons = [
        { emoji: '😍', reason: "Your beautiful smile lights up my world" },
        { emoji: '🌍', reason: "Distance means nothing when you mean everything" },
        { emoji: '📱', reason: "Your texts make my whole day better" },
        { emoji: '🌙', reason: "We share the same moon every night" },
        { emoji: '💪', reason: "Our love is stronger than any distance" },
        { emoji: '✈️', reason: "Can't wait to run into your arms again" },
        { emoji: '💭', reason: "You're always on my mind" },
        { emoji: '🎯', reason: "You understand me like no one else" },
        { emoji: '⏰', reason: "Every second apart makes reunion sweeter" },
        { emoji: '💎', reason: "You're worth every mile between us" },
        { emoji: '🔥', reason: "You still give me butterflies" },
        { emoji: '🌅', reason: "You're my first and last thought every day" },
    ];

    const [current, setCurrent] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => {
            setCurrent(prev => (prev + 1) % reasons.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, reasons.length]);

    const next = () => {
        setIsAutoPlaying(false);
        setCurrent(prev => (prev + 1) % reasons.length);
    };

    const prev = () => {
        setIsAutoPlaying(false);
        setCurrent(prev => (prev - 1 + reasons.length) % reasons.length);
    };

    return (
        <div className="px-2 max-w-lg mx-auto">
            <motion.h2
                className="text-center text-white text-lg font-semibold mb-3 flex items-center justify-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
                <span className="text-pink-100">Reasons I Love You</span>
                <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            </motion.h2>

            <div className="relative flex items-center">
                <motion.button
                    onClick={prev}
                    className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-full p-1.5 text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft className="w-5 h-5" />
                </motion.button>

                <div className="overflow-hidden mx-2 flex-1">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-lg rounded-2xl p-4 border border-pink-300/30 shadow-xl"
                        >
                            <div className="text-center">
                                <motion.span
                                    className="text-4xl block mb-2"
                                    animate={{ scale: [1, 1.15, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    {reasons[current].emoji}
                                </motion.span>
                                <p className="text-white text-base font-medium leading-snug">
                                    {reasons[current].reason}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.button
                    onClick={next}
                    className="flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-full p-1.5 text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight className="w-5 h-5" />
                </motion.button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-1.5 mt-3">
                {reasons.map((_, i) => (
                    <motion.div
                        key={i}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'bg-pink-400 w-4' : 'bg-white/40'
                            }`}
                        whileHover={{ scale: 1.3 }}
                        onClick={() => {
                            setIsAutoPlaying(false);
                            setCurrent(i);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
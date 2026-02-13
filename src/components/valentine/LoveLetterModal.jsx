import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

export default function LoveLetterModal({ isOpen, onClose }) {
    const [isOpened, setIsOpened] = useState(false);

    const handleOpen = () => {
        setIsOpened(true);
    };

    const handleClose = () => {
        setIsOpened(false);
        setTimeout(onClose, 300);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ scale: 0.5, rotateX: -30 }}
                        animate={{ scale: 1, rotateX: 0 }}
                        exit={{ scale: 0.5, rotateX: 30 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="relative max-w-lg w-full"
                        onClick={e => e.stopPropagation()}
                    >
                        {!isOpened ? (
                            // Envelope
                            <motion.div
                                className="relative cursor-pointer"
                                onClick={handleOpen}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg shadow-2xl p-8 aspect-[4/3] flex items-center justify-center relative overflow-hidden">
                                    {/* Envelope flap */}
                                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-br from-pink-200 to-pink-300"
                                        style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
                                    />

                                    {/* Heart seal */}
                                    <motion.div
                                        className="absolute z-10 bg-red-500 rounded-full p-4 shadow-lg"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            boxShadow: ['0 0 20px rgba(255,0,100,0.5)', '0 0 40px rgba(255,0,100,0.8)', '0 0 20px rgba(255,0,100,0.5)']
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Heart className="w-8 h-8 text-white fill-white" />
                                    </motion.div>

                                    <motion.p
                                        className="absolute bottom-6 text-pink-600 font-medium"
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        ✨ Tap to open ✨
                                    </motion.p>
                                </div>
                            </motion.div>
                        ) : (
                            // Letter content
                            <motion.div
                                initial={{ rotateX: -90, originY: 0 }}
                                animate={{ rotateX: 0 }}
                                transition={{ duration: 0.6, type: 'spring' }}
                                className="relative"
                            >
                                <button
                                    onClick={handleClose}
                                    className="absolute -top-4 -right-4 z-20 bg-white rounded-full p-2 shadow-lg hover:bg-pink-50 transition-colors"
                                >
                                    <X className="w-5 h-5 text-pink-500" />
                                </button>

                                <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-2xl shadow-2xl p-8 border-4 border-pink-200 relative overflow-hidden">
                                    {/* Decorative corners */}
                                    <div className="absolute top-2 left-2 text-2xl">💝</div>
                                    <div className="absolute top-2 right-2 text-2xl">💝</div>
                                    <div className="absolute bottom-2 left-2 text-2xl">🌹</div>
                                    <div className="absolute bottom-2 right-2 text-2xl">🌹</div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-center space-y-4"
                                    >
                                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-pink-500">
                                            My Dearest Love 💕
                                        </h2>

                                        <div className="space-y-4 text-gray-700 font-serif text-lg leading-relaxed">
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                            >
                                                From the moment you came into my life, everything changed for the better. You are my sunshine on cloudy days, my peace in chaos, and my home wherever we go. ☀️
                                            </motion.p>

                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                Every day with you feels like a beautiful dream I never want to wake up from. Your love makes me the luckiest person in the world. 🌟
                                            </motion.p>

                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.9 }}
                                            >
                                                Thank you for being YOU - for your kindness, your patience, your beautiful heart. I fall more in love with you every single day. 💖
                                            </motion.p>

                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 1.1 }}
                                                className="text-xl font-bold text-pink-600"
                                            >
                                                I love you to the moon and back, forever and always! 🌙✨
                                            </motion.p>
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 1.3, type: 'spring' }}
                                            className="pt-4"
                                        >
                                            <p className="text-2xl font-dancing text-pink-500">
                                                Forever Yours 💕
                                            </p>
                                            <div className="flex justify-center gap-2 mt-3 text-2xl">
                                                {['💗', '💓', '💕', '💖', '💝'].map((emoji, i) => (
                                                    <motion.span
                                                        key={i}
                                                        animate={{
                                                            scale: [1, 1.3, 1],
                                                            rotate: [0, 10, -10, 0]
                                                        }}
                                                        transition={{
                                                            duration: 1,
                                                            repeat: Infinity,
                                                            delay: i * 0.2
                                                        }}
                                                    >
                                                        {emoji}
                                                    </motion.span>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
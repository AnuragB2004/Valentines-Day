import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, Send, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import FloatingEmojis from '@/components/valentine/FloatingEmojis';
import { Button } from '@/components/ui/button';

const hugTypes = [
    { id: 'warm', emoji: '🤗', name: 'Warm Hug', desc: 'A cozy, comforting embrace', color: 'from-orange-400 to-red-500', animation: 'pulse' },
    { id: 'tight', emoji: '💪', name: 'Tight Squeeze', desc: 'Never letting you go!', color: 'from-pink-500 to-rose-600', animation: 'squeeze' },
    { id: 'butterfly', emoji: '🦋', name: 'Butterfly Kiss', desc: 'Soft and gentle', color: 'from-purple-400 to-pink-500', animation: 'flutter' },
    { id: 'bear', emoji: '🐻', name: 'Bear Hug', desc: 'Big and cuddly!', color: 'from-amber-500 to-orange-600', animation: 'bear' },
    { id: 'kiss', emoji: '💋', name: 'Kiss Attack', desc: 'Mwah mwah mwah!', color: 'from-red-500 to-pink-500', animation: 'kiss' },
    { id: 'forehead', emoji: '😚', name: 'Forehead Kiss', desc: 'Sweet and protective', color: 'from-rose-400 to-pink-500', animation: 'gentle' },
];

export default function VirtualHugs() {
    const [selectedHug, setSelectedHug] = useState(null);
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [hugsSent, setHugsSent] = useState(() => {
        const saved = localStorage.getItem('hugsSent');
        return saved ? parseInt(saved) : 0;
    });

    const sendHug = (hug) => {
        setSelectedHug(hug);
        setSending(true);

        setTimeout(() => {
            setSending(false);
            setSent(true);
            const newCount = hugsSent + 1;
            setHugsSent(newCount);
            localStorage.setItem('hugsSent', newCount.toString());

            setTimeout(() => {
                setSent(false);
                setSelectedHug(null);
            }, 3000);
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-rose-900 via-pink-800 to-red-900 p-4 relative overflow-hidden">
            <FloatingEmojis />

            <div className="relative z-10">
                <Link to={createPageUrl('Home')}>
                    <motion.button
                        className="flex items-center gap-2 text-white/80 hover:text-white mb-4"
                        whileHover={{ x: -5 }}
                    >
                        <ArrowLeft className="w-5 h-5" /> Back
                    </motion.button>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        🤗 Virtual Hugs 🤗
                    </h1>
                    <p className="text-pink-200">Send me love across the miles!</p>
                </motion.div>

                <div className="max-w-md mx-auto">
                    <AnimatePresence mode="wait">
                        {!selectedHug ? (
                            <motion.div
                                key="selection"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-2 gap-3"
                            >
                                {hugTypes.map((hug, i) => (
                                    <motion.button
                                        key={hug.id}
                                        onClick={() => sendHug(hug)}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        whileHover={{ scale: 1.05, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`bg-gradient-to-br ${hug.color} p-5 rounded-2xl text-left shadow-xl border-2 border-white/20`}
                                    >
                                        <span className="text-4xl block mb-2">{hug.emoji}</span>
                                        <h3 className="text-white font-bold">{hug.name}</h3>
                                        <p className="text-white/70 text-sm">{hug.desc}</p>
                                    </motion.button>
                                ))}
                            </motion.div>
                        ) : sending ? (
                            <motion.div
                                key="sending"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="text-center py-16"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                    className="text-8xl mb-6"
                                >
                                    {selectedHug.emoji}
                                </motion.div>

                                {/* Flying hearts animation */}
                                <div className="relative h-20">
                                    {[...Array(10)].map((_, i) => (
                                        <motion.span
                                            key={i}
                                            className="absolute text-2xl"
                                            style={{ left: '50%' }}
                                            initial={{ y: 0, x: 0, opacity: 1 }}
                                            animate={{
                                                y: -100,
                                                x: (Math.random() - 0.5) * 200,
                                                opacity: 0,
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                delay: i * 0.1,
                                                repeat: Infinity,
                                            }}
                                        >
                                            💕
                                        </motion.span>
                                    ))}
                                </div>

                                <motion.p
                                    className="text-white text-xl font-bold"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 0.5, repeat: Infinity }}
                                >
                                    Sending {selectedHug.name}... 💌
                                </motion.p>
                            </motion.div>
                        ) : sent ? (
                            <motion.div
                                key="sent"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                className="text-center py-16"
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: [0, 1.2, 1] }}
                                    transition={{ duration: 0.5 }}
                                    className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center"
                                >
                                    <span className="text-5xl">✓</span>
                                </motion.div>

                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Hug Sent! 💕
                                </h2>

                                <p className="text-pink-200 mb-4">
                                    Your {selectedHug.name.toLowerCase()} is on its way across the miles!
                                </p>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 inline-block"
                                >
                                    <p className="text-white text-sm">
                                        🌍 Traveling at the speed of love... 💨
                                    </p>
                                </motion.div>

                                {/* Celebration particles */}
                                {[...Array(20)].map((_, i) => (
                                    <motion.span
                                        key={i}
                                        className="absolute text-xl"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                    >
                                        {['✨', '💕', '💖', '🌟', '💗'][i % 5]}
                                    </motion.span>
                                ))}
                            </motion.div>
                        ) : null}
                    </AnimatePresence>

                    {/* Hugs counter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8"
                    >
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                                <span className="text-white font-bold text-lg">Hug Counter</span>
                                <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
                            </div>

                            <motion.div
                                key={hugsSent}
                                initial={{ scale: 1.5 }}
                                animate={{ scale: 1 }}
                                className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400 mb-2"
                            >
                                {hugsSent}
                            </motion.div>

                            <p className="text-white/70">hugs sent to my love! 💕</p>

                            {hugsSent >= 100 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-3"
                                >
                                    <span className="text-white font-bold flex items-center justify-center gap-2">
                                        <Sparkles className="w-4 h-4" /> Hug Master! <Sparkles className="w-4 h-4" />
                                    </span>
                                </motion.div>
                            )}
                        </div>

                        {/* Fun facts */}
                        <div className="mt-4 bg-white/5 rounded-2xl p-4 text-center">
                            <p className="text-pink-200 text-sm">
                                💡 Fun fact: Virtual hugs release the same happy hormones as real ones!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Sparkles, Heart, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import FloatingEmojis from '@/components/valentine/FloatingEmojis';
import { Button } from '@/components/ui/button';

const loveNotes = [
    { message: "I wish I could teleport to you right now! 🚀", emoji: "✨" },
    { message: "You're the first person I think of when I wake up 🌅", emoji: "💭" },
    { message: "Counting down the days until I can hold you again 🤗", emoji: "📅" },
    { message: "Your voice is my favorite sound in the world 🎵", emoji: "💕" },
    { message: "Distance makes my love for you grow stronger 💪", emoji: "🌍" },
    { message: "I fall in love with you more every single day 📈", emoji: "💖" },
    { message: "You make the miles between us feel like nothing 🦋", emoji: "✈️" },
    { message: "I'm so lucky to have you, even from far away 🍀", emoji: "🥰" },
    { message: "Every night I look at the same moon you see 🌙", emoji: "🌟" },
    { message: "One day, there will be no more goodbyes 💍", emoji: "💞" },
    { message: "You're worth every second of waiting ⏰", emoji: "💝" },
    { message: "My heart is always with you, wherever you are 💗", emoji: "🗺️" },
    { message: "I'd cross oceans just to see your smile 🌊", emoji: "😊" },
    { message: "You're my home, even when we're apart 🏠", emoji: "💕" },
    { message: "Talking to you is the best part of my day 📱", emoji: "☀️" },
    { message: "I love you more than all the WiFi in the world 📶", emoji: "😂" },
    { message: "You're my favorite notification 🔔", emoji: "💌" },
    { message: "Can't wait for the day I wake up next to you 🛏️", emoji: "💑" },
    { message: "You make long distance feel like a short wait 🕐", emoji: "💫" },
    { message: "My love for you has no boundaries 🌈", emoji: "♾️" },
];

export default function MessageJar() {
    const [currentNote, setCurrentNote] = useState(null);
    const [isShaking, setIsShaking] = useState(false);
    const [notesOpened, setNotesOpened] = useState(0);
    const [showJar, setShowJar] = useState(true);

    const pickRandomNote = () => {
        setIsShaking(true);
        setShowJar(true);
        setCurrentNote(null);

        setTimeout(() => {
            setIsShaking(false);
            const randomNote = loveNotes[Math.floor(Math.random() * loveNotes.length)];
            setCurrentNote(randomNote);
            setNotesOpened(n => n + 1);
            setShowJar(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-rose-900 p-4 relative overflow-hidden">
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
                        💌 Message Jar 💌
                    </h1>
                    <p className="text-pink-200">Pull out a love note whenever you miss me!</p>
                </motion.div>

                <div className="max-w-md mx-auto">
                    <AnimatePresence mode="wait">
                        {showJar ? (
                            <motion.div
                                key="jar"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-center"
                            >
                                {/* Jar */}
                                <motion.div
                                    className="relative cursor-pointer"
                                    onClick={pickRandomNote}
                                    animate={isShaking ? {
                                        rotate: [0, -10, 10, -10, 10, 0],
                                        y: [0, -5, 5, -5, 5, 0],
                                    } : {}}
                                    transition={{ duration: 0.5, repeat: isShaking ? 2 : 0 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="w-48 h-64 relative">
                                        {/* Jar body */}
                                        <div className="absolute bottom-0 w-full h-56 bg-gradient-to-b from-white/30 to-white/10 rounded-b-3xl border-4 border-white/40 backdrop-blur-sm overflow-hidden">
                                            {/* Notes inside */}
                                            {[...Array(12)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute w-8 h-4 bg-gradient-to-r from-pink-300 to-rose-300 rounded"
                                                    style={{
                                                        left: `${10 + Math.random() * 60}%`,
                                                        bottom: `${5 + Math.random() * 40}%`,
                                                        transform: `rotate(${Math.random() * 60 - 30}deg)`,
                                                    }}
                                                    animate={isShaking ? {
                                                        x: [0, Math.random() * 10 - 5, 0],
                                                        y: [0, Math.random() * 10 - 5, 0],
                                                    } : {}}
                                                />
                                            ))}

                                            {/* Hearts floating inside */}
                                            {[...Array(6)].map((_, i) => (
                                                <motion.div
                                                    key={`heart-${i}`}
                                                    className="absolute text-pink-400 text-xl"
                                                    style={{
                                                        left: `${20 + Math.random() * 50}%`,
                                                        bottom: `${10 + Math.random() * 50}%`,
                                                    }}
                                                    animate={{
                                                        y: [0, -10, 0],
                                                        opacity: [0.5, 1, 0.5],
                                                    }}
                                                    transition={{
                                                        duration: 2 + Math.random(),
                                                        repeat: Infinity,
                                                        delay: i * 0.3,
                                                    }}
                                                >
                                                    💕
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Jar lid */}
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-10 bg-gradient-to-b from-pink-400 to-pink-600 rounded-t-lg border-4 border-pink-300" />

                                        {/* Jar neck */}
                                        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-white/20 border-l-4 border-r-4 border-white/40" />
                                    </div>
                                </motion.div>

                                <motion.p
                                    className="text-white/80 mt-6 text-center"
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    {isShaking ? "✨ Picking a note... ✨" : "🫙 Tap the jar to pick a note! 🫙"}
                                </motion.p>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="note"
                                initial={{ opacity: 0, y: 50, rotateX: -30 }}
                                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                className="relative"
                            >
                                {/* Unfolded note */}
                                <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl p-8 shadow-2xl border-4 border-pink-200 relative overflow-hidden">
                                    {/* Paper texture */}
                                    <div className="absolute inset-0 opacity-10">
                                        {[...Array(20)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-px bg-pink-400"
                                                style={{ marginTop: `${12 + i * 12}px` }}
                                            />
                                        ))}
                                    </div>

                                    {/* Decorative corners */}
                                    <div className="absolute top-2 left-2 text-2xl">💝</div>
                                    <div className="absolute top-2 right-2 text-2xl">💝</div>
                                    <div className="absolute bottom-2 left-2 text-2xl">✨</div>
                                    <div className="absolute bottom-2 right-2 text-2xl">✨</div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-center relative z-10"
                                    >
                                        <span className="text-5xl block mb-4">{currentNote?.emoji}</span>
                                        <p className="text-xl md:text-2xl font-medium text-pink-800 leading-relaxed">
                                            {currentNote?.message}
                                        </p>
                                        <div className="mt-6 flex justify-center gap-2">
                                            {['💕', '💖', '💗', '💓', '💝'].map((heart, i) => (
                                                <motion.span
                                                    key={i}
                                                    animate={{ scale: [1, 1.2, 1] }}
                                                    transition={{ duration: 0.5, delay: i * 0.1, repeat: Infinity }}
                                                >
                                                    {heart}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="text-center mt-6"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <Button
                                        onClick={pickRandomNote}
                                        className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-3 rounded-full"
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Pick Another Note
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-8 text-center"
                    >
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 inline-block">
                            <p className="text-white/80">
                                <Heart className="w-4 h-4 inline mr-1 text-pink-400" />
                                Notes opened today: <span className="font-bold text-pink-300">{notesOpened}</span>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
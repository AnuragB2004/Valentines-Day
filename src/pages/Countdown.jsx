import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Heart, MapPin, Plane, Edit3, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import FloatingEmojis from '@/components/valentine/FloatingEmojis';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Countdown() {
    const [targetDate, setTargetDate] = useState(() => {
        const saved = localStorage.getItem('meetingDate');
        return saved || '';
    });
    const [eventName, setEventName] = useState(() => {
        return localStorage.getItem('eventName') || 'We Meet Again! 💕';
    });
    const [isEditing, setIsEditing] = useState(!targetDate);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        if (!targetDate) return;

        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60),
                });
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [targetDate]);

    const saveDate = () => {
        localStorage.setItem('meetingDate', targetDate);
        localStorage.setItem('eventName', eventName);
        setIsEditing(false);
    };

    const totalDays = targetDate ? Math.ceil((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24)) : 0;
    const passedDays = Math.max(0, 100 - totalDays); // Assuming 100 days journey
    const progress = Math.min(100, Math.max(0, (passedDays / 100) * 100));

    const milestones = [
        { emoji: '✈️', text: 'Booked flights!' },
        { emoji: '💕', text: 'Halfway there!' },
        { emoji: '🎉', text: 'Almost time!' },
        { emoji: '🤗', text: 'FINALLY!' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-900 p-4 relative overflow-hidden">
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
                        ⏰ Countdown Timer ⏰
                    </h1>
                    <p className="text-purple-200">Until we're together again!</p>
                </motion.div>

                <div className="max-w-md mx-auto">
                    {isEditing ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6"
                        >
                            <h3 className="text-white font-bold text-xl mb-4 flex items-center gap-2">
                                <Calendar className="w-5 h-5" /> Set Your Meeting Date
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-white/80 text-sm block mb-1">Event Name</label>
                                    <Input
                                        value={eventName}
                                        onChange={(e) => setEventName(e.target.value)}
                                        placeholder="e.g., Our Reunion! 💕"
                                        className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                                    />
                                </div>

                                <div>
                                    <label className="text-white/80 text-sm block mb-1">Date</label>
                                    <Input
                                        type="date"
                                        value={targetDate}
                                        onChange={(e) => setTargetDate(e.target.value)}
                                        className="bg-white/20 border-white/30 text-white"
                                    />
                                </div>

                                <Button onClick={saveDate} className="w-full bg-pink-500 hover:bg-pink-600">
                                    <Check className="w-4 h-4 mr-2" /> Save Date
                                </Button>
                            </div>
                        </motion.div>
                    ) : (
                        <>
                            {/* Event name */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center mb-6"
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <h2 className="text-2xl font-bold text-white">{eventName}</h2>
                                    <button onClick={() => setIsEditing(true)} className="text-white/60 hover:text-white">
                                        <Edit3 className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="text-purple-200 text-sm">
                                    {new Date(targetDate).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </motion.div>

                            {/* Countdown boxes */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="grid grid-cols-4 gap-3 mb-8"
                            >
                                {[
                                    { value: timeLeft.days, label: 'Days' },
                                    { value: timeLeft.hours, label: 'Hours' },
                                    { value: timeLeft.minutes, label: 'Mins' },
                                    { value: timeLeft.seconds, label: 'Secs' },
                                ].map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 text-center border border-white/20"
                                    >
                                        <motion.span
                                            key={item.value}
                                            initial={{ scale: 1.2 }}
                                            animate={{ scale: 1 }}
                                            className="text-3xl md:text-4xl font-bold text-white block"
                                        >
                                            {item.value.toString().padStart(2, '0')}
                                        </motion.span>
                                        <span className="text-white/60 text-xs">{item.label}</span>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Journey progress */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6"
                            >
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Plane className="w-5 h-5" /> Our Journey
                                </h3>

                                {/* Progress bar */}
                                <div className="relative h-4 bg-white/20 rounded-full overflow-hidden mb-4">
                                    <motion.div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                    <motion.div
                                        className="absolute top-1/2 -translate-y-1/2"
                                        style={{ left: `${Math.min(95, progress)}%` }}
                                        animate={{ x: [0, 5, 0] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                    >
                                        ✈️
                                    </motion.div>
                                </div>

                                {/* Milestones */}
                                <div className="flex justify-between text-xs">
                                    {milestones.map((m, i) => (
                                        <div key={i} className="text-center">
                                            <span className="block text-lg">{m.emoji}</span>
                                            <span className="text-white/60">{m.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Love messages based on time */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 backdrop-blur-lg rounded-2xl p-6 text-center"
                            >
                                {timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 ? (
                                    <>
                                        <span className="text-5xl block mb-2">🎉</span>
                                        <p className="text-white text-xl font-bold">IT'S TODAY!</p>
                                        <p className="text-pink-200">Finally we're together! 💕</p>
                                    </>
                                ) : timeLeft.days === 0 ? (
                                    <>
                                        <span className="text-5xl block mb-2">🤗</span>
                                        <p className="text-white text-xl font-bold">Just hours away!</p>
                                        <p className="text-pink-200">I can almost feel your hug! 💕</p>
                                    </>
                                ) : timeLeft.days <= 7 ? (
                                    <>
                                        <span className="text-5xl block mb-2">😍</span>
                                        <p className="text-white text-xl font-bold">Less than a week!</p>
                                        <p className="text-pink-200">I'm counting every second! 💓</p>
                                    </>
                                ) : timeLeft.days <= 30 ? (
                                    <>
                                        <span className="text-5xl block mb-2">🥰</span>
                                        <p className="text-white text-xl font-bold">Getting closer!</p>
                                        <p className="text-pink-200">Every day brings us together 💗</p>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-5xl block mb-2">💕</span>
                                        <p className="text-white text-xl font-bold">Worth the wait!</p>
                                        <p className="text-pink-200">Distance is just a number for us 🌍</p>
                                    </>
                                )}
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
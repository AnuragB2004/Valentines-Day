import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Heart, RotateCcw, Trophy, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import FloatingEmojis from '@/components/valentine/FloatingEmojis';
import { Button } from '@/components/ui/button';

const loveEmojis = ['💕', '💖', '💗', '💓', '💞', '💝', '🌹', '😍', '🥰', '💋', '🦋', '✨'];

function MemoryGame() {
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameWon, setGameWon] = useState(false);

    const initializeGame = () => {
        const selectedEmojis = loveEmojis.slice(0, 6);
        const gameCards = [...selectedEmojis, ...selectedEmojis]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji, isFlipped: false }));
        setCards(gameCards);
        setFlipped([]);
        setMatched([]);
        setMoves(0);
        setGameWon(false);
    };

    useEffect(() => {
        initializeGame();
    }, []);

    const handleCardClick = (id) => {
        if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setMoves(m => m + 1);
            const [first, second] = newFlipped;
            if (cards[first].emoji === cards[second].emoji) {
                setMatched(m => [...m, first, second]);
                setFlipped([]);
                if (matched.length + 2 === cards.length) {
                    setGameWon(true);
                }
            } else {
                setTimeout(() => setFlipped([]), 1000);
            }
        }
    };

    return (
        <div className="max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div className="text-white/80 text-sm">Moves: {moves}</div>
                <Button onClick={initializeGame} size="sm" variant="outline" className="bg-white/10 border-white/20 text-white">
                    <RotateCcw className="w-4 h-4 mr-1" /> Reset
                </Button>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {cards.map((card) => (
                    <motion.div
                        key={card.id}
                        onClick={() => handleCardClick(card.id)}
                        className={`aspect-square rounded-xl cursor-pointer flex items-center justify-center text-3xl
              ${matched.includes(card.id)
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500'
                                : flipped.includes(card.id)
                                    ? 'bg-gradient-to-br from-pink-400 to-rose-500'
                                    : 'bg-gradient-to-br from-pink-600 to-rose-700'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{ rotateY: flipped.includes(card.id) || matched.includes(card.id) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {(flipped.includes(card.id) || matched.includes(card.id)) ? (
                            <motion.span style={{ transform: 'rotateY(180deg)' }}>{card.emoji}</motion.span>
                        ) : (
                            <Heart className="w-6 h-6 text-white/50" />
                        )}
                    </motion.div>
                ))}
            </div>

            <AnimatePresence>
                {gameWon && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 text-center bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6"
                    >
                        <Trophy className="w-12 h-12 mx-auto text-white mb-2" />
                        <p className="text-white font-bold text-xl">You Won! 🎉</p>
                        <p className="text-white/80">In just {moves} moves!</p>
                        <p className="text-white mt-2">Just like how you won my heart 💕</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function LoveMeter() {
    const [taps, setTaps] = useState(0);
    const [level, setLevel] = useState(0);
    const maxTaps = 50;

    const loveLevels = [
        { min: 0, label: "Tap to fill my heart! 💗", color: "from-gray-400 to-gray-500" },
        { min: 10, label: "Warming up! 🌡️", color: "from-pink-300 to-pink-400" },
        { min: 20, label: "Getting hotter! 🔥", color: "from-pink-400 to-rose-500" },
        { min: 30, label: "My heart is racing! 💓", color: "from-rose-500 to-red-500" },
        { min: 40, label: "So much love! 💕", color: "from-red-500 to-pink-500" },
        { min: 50, label: "INFINITE LOVE! 💖✨", color: "from-pink-500 via-red-500 to-yellow-500" },
    ];

    useEffect(() => {
        const currentLevel = loveLevels.filter(l => taps >= l.min).pop();
        setLevel(loveLevels.indexOf(currentLevel));
    }, [taps]);

    const handleTap = () => {
        if (taps < maxTaps) setTaps(t => t + 1);
    };

    const percentage = (taps / maxTaps) * 100;

    return (
        <div className="max-w-sm mx-auto text-center">
            <motion.div
                className="relative w-48 h-48 mx-auto mb-6 cursor-pointer"
                onClick={handleTap}
                whileTap={{ scale: 0.9 }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <defs>
                        <linearGradient id="heartGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#ff1493" />
                            <stop offset={`${percentage}%`} stopColor="#ff1493" />
                            <stop offset={`${percentage}%`} stopColor="#4a4a4a" />
                            <stop offset="100%" stopColor="#4a4a4a" />
                        </linearGradient>
                    </defs>
                    <path
                        d="M50 88 C20 60 5 40 5 25 C5 10 20 0 35 0 C45 0 50 10 50 10 C50 10 55 0 65 0 C80 0 95 10 95 25 C95 40 80 60 50 88"
                        fill="url(#heartGrad)"
                        stroke="#ff69b4"
                        strokeWidth="2"
                    />
                </svg>
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.5, repeat: taps >= maxTaps ? Infinity : 0 }}
                >
                    <span className="text-4xl">{taps >= maxTaps ? '💖' : '💗'}</span>
                </motion.div>
            </motion.div>

            <motion.p
                className="text-white text-xl font-bold mb-2"
                key={level}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                {loveLevels[level]?.label}
            </motion.p>

            <p className="text-white/70 text-sm">{taps}/{maxTaps} taps</p>

            {taps >= maxTaps && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-2"
                >
                    <p className="text-pink-200">My love for you is overflowing! 🌊💕</p>
                    <Button onClick={() => setTaps(0)} variant="outline" className="bg-white/10 border-white/20 text-white">
                        <RotateCcw className="w-4 h-4 mr-1" /> Fill Again
                    </Button>
                </motion.div>
            )}
        </div>
    );
}

function QuizGame() {
    const questions = [
        { q: "What makes our relationship special?", a: ["The distance", "Our love 💕", "Nothing"], correct: 1 },
        { q: "How much do I love you?", a: ["A little", "A lot", "To infinity and beyond! 🚀"], correct: 2 },
        { q: "What happens when we're apart?", a: ["I forget you", "I miss you every second 💔", "Nothing"], correct: 1 },
        { q: "What's the best part of my day?", a: ["Sleeping", "Talking to you 📱💕", "Eating"], correct: 1 },
        { q: "How long will I love you?", a: ["Forever and ever 💍", "Maybe a while", "I don't know"], correct: 0 },
    ];

    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [answered, setAnswered] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (index) => {
        if (answered) return;
        setSelectedAnswer(index);
        setAnswered(true);
        if (index === questions[current].correct) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        if (current + 1 < questions.length) {
            setCurrent(c => c + 1);
            setAnswered(false);
            setSelectedAnswer(null);
        } else {
            setFinished(true);
        }
    };

    const restart = () => {
        setCurrent(0);
        setScore(0);
        setAnswered(false);
        setSelectedAnswer(null);
        setFinished(false);
    };

    if (finished) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-sm mx-auto"
            >
                <div className="text-6xl mb-4">{score === questions.length ? '🏆' : score >= 3 ? '⭐' : '💕'}</div>
                <h3 className="text-2xl font-bold text-white mb-2">
                    {score === questions.length ? "Perfect Score!" : `${score}/${questions.length}`}
                </h3>
                <p className="text-pink-200 mb-4">
                    {score === questions.length
                        ? "You know our love perfectly! 💖"
                        : "No matter what, I still love you! 💕"}
                </p>
                <Button onClick={restart} className="bg-pink-500 hover:bg-pink-600">
                    Play Again
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="max-w-sm mx-auto">
            <div className="text-center mb-4">
                <div className="flex justify-center gap-1 mb-2">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={`w-3 h-3 rounded-full ${i === current ? 'bg-pink-400' : i < current ? 'bg-green-400' : 'bg-white/30'}`}
                        />
                    ))}
                </div>
                <p className="text-white/70 text-sm">Question {current + 1} of {questions.length}</p>
            </div>

            <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-4"
            >
                <h3 className="text-xl font-bold text-white mb-4">{questions[current].q}</h3>
                <div className="space-y-2">
                    {questions[current].a.map((answer, i) => (
                        <motion.button
                            key={i}
                            onClick={() => handleAnswer(i)}
                            disabled={answered}
                            whileHover={!answered ? { scale: 1.02 } : {}}
                            whileTap={!answered ? { scale: 0.98 } : {}}
                            className={`w-full p-3 rounded-xl text-left transition-all ${answered
                                    ? i === questions[current].correct
                                        ? 'bg-green-500 text-white'
                                        : i === selectedAnswer
                                            ? 'bg-red-500 text-white'
                                            : 'bg-white/10 text-white/50'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                                }`}
                        >
                            {answer}
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {answered && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <p className="text-white mb-3">
                        {selectedAnswer === questions[current].correct
                            ? "Correct! You know me so well! 💖"
                            : "Oops! But I still love you! 💕"}
                    </p>
                    <Button onClick={nextQuestion} className="bg-pink-500 hover:bg-pink-600">
                        {current + 1 < questions.length ? "Next Question" : "See Results"}
                    </Button>
                </motion.div>
            )}
        </div>
    );
}

export default function LoveGames() {
    const [activeGame, setActiveGame] = useState(null);

    const games = [
        { id: 'memory', name: 'Love Memory', emoji: '🃏', desc: 'Match the love pairs!' },
        { id: 'meter', name: 'Love Meter', emoji: '💓', desc: 'Fill my heart with taps!' },
        { id: 'quiz', name: 'Love Quiz', emoji: '💕', desc: 'How well do you know us?' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-900 via-rose-800 to-red-900 p-4 relative overflow-hidden">
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

                <motion.h1
                    className="text-3xl md:text-4xl font-bold text-center text-white mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    🎮 Love Games 🎮
                </motion.h1>

                {!activeGame ? (
                    <div className="grid gap-4 max-w-md mx-auto">
                        {games.map((game, i) => (
                            <motion.button
                                key={game.id}
                                onClick={() => setActiveGame(game.id)}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 text-left border border-white/20"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 1.02, x: 10 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl">{game.emoji}</span>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{game.name}</h3>
                                        <p className="text-white/70">{game.desc}</p>
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                ) : (
                    <div>
                        <Button
                            onClick={() => setActiveGame(null)}
                            variant="outline"
                            className="mb-6 bg-white/10 border-white/20 text-white mx-auto block"
                        >
                            ← Back to Games
                        </Button>

                        {activeGame === 'memory' && <MemoryGame />}
                        {activeGame === 'meter' && <LoveMeter />}
                        {activeGame === 'quiz' && <QuizGame />}
                    </div>
                )}
            </div>
        </div>
    );
}
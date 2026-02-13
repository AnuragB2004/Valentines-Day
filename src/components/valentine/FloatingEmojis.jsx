import React from 'react';
import { motion } from 'framer-motion';

export default function FloatingEmojis() {
    const emojis = ['💕', '💖', '💗', '💓', '💞', '💝', '🌹', '✨', '💫', '🦋', '🌸', '😍', '🥰', '💋'];

    const floatingEmojis = Array.from({ length: 15 }, (_, i) => ({
        emoji: emojis[i % emojis.length],
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 12 + Math.random() * 8,
        size: 0.8 + Math.random() * 0.8,
    }));

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            {floatingEmojis.map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: `${item.left}%`,
                        fontSize: `${item.size}rem`,
                    }}
                    initial={{ y: '110vh', opacity: 0, rotate: 0 }}
                    animate={{
                        y: '-10vh',
                        opacity: [0, 1, 1, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: item.duration,
                        delay: item.delay,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    {item.emoji}
                </motion.div>
            ))}
        </div>
    );
}
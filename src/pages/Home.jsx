import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import LoveLetterModal from '@/components/valentine/LoveLetterModal';
import ReasonsCarousel from '@/components/valentine/ReasonsCarousel';
import FloatingEmojis from '@/components/valentine/FloatingEmojis';
import { Heart, Gamepad2, MessageCircleHeart, Timer, Sparkles, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

function ThreeScene({ onHeartClick }) {
    const containerRef = useRef(null);
    const sceneRef = useRef(null);
    const rendererRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(60, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xff69b4, 1, 100);
        pointLight1.position.set(10, 10, 10);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xff1493, 0.5, 100);
        pointLight2.position.set(-10, -10, -10);
        scene.add(pointLight2);

        const createHeartGeometry = () => {
            const heartShape = new THREE.Shape();
            const x = 0, y = 0;
            heartShape.moveTo(x + 0.25, y + 0.25);
            heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
            heartShape.bezierCurveTo(x - 0.35, y, x - 0.35, y + 0.35, x - 0.35, y + 0.35);
            heartShape.bezierCurveTo(x - 0.35, y + 0.55, x - 0.25, y + 0.77, x + 0.25, y + 0.95);
            heartShape.bezierCurveTo(x + 0.75, y + 0.77, x + 0.85, y + 0.55, x + 0.85, y + 0.35);
            heartShape.bezierCurveTo(x + 0.85, y + 0.35, x + 0.85, y, x + 0.5, y);
            heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

            const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelSegments: 5, steps: 2, bevelSize: 0.05, bevelThickness: 0.05 };
            return new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
        };

        const heartsData = [
            { position: [0, 0, 0], scale: 1.5, color: 0xff6b9d, speed: 1 },
            { position: [-3, 1, -2], scale: 0.8, color: 0xff1493, speed: 1.5 },
            { position: [3, -1, -1], scale: 0.6, color: 0xff69b4, speed: 1.2 },
            { position: [-2, -2, 1], scale: 0.5, color: 0xff85a2, speed: 0.8 },
            { position: [2.5, 2, -3], scale: 0.7, color: 0xff4081, speed: 1.3 },
        ];

        const heartGeometry = createHeartGeometry();
        const hearts = [];

        heartsData.forEach(data => {
            const material = new THREE.MeshStandardMaterial({
                color: data.color,
                metalness: 0.6,
                roughness: 0.2,
                emissive: data.color,
                emissiveIntensity: 0.2,
            });
            const heart = new THREE.Mesh(heartGeometry, material);
            heart.position.set(...data.position);
            heart.scale.setScalar(data.scale);
            heart.userData = { baseY: data.position[1], speed: data.speed, baseColor: data.color };
            scene.add(heart);
            hearts.push(heart);
        });

        const starsGeometry = new THREE.BufferGeometry();
        const starCount = 2000;
        const positions = new Float32Array(starCount * 3);
        for (let i = 0; i < starCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 100;
            positions[i + 1] = (Math.random() - 0.5) * 100;
            positions[i + 2] = (Math.random() - 0.5) * 100 - 20;
        }
        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2, transparent: true, opacity: 0.8 });
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        scene.add(stars);

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const handleClick = (event) => {
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(hearts);

            if (intersects.length > 0) {
                onHeartClick();
                const heart = intersects[0].object;
                heart.material.emissiveIntensity = 1;
                setTimeout(() => { heart.material.emissiveIntensity = 0.2; }, 300);
            }
        };

        renderer.domElement.addEventListener('click', handleClick);

        let time = 0;
        let rotationY = 0;

        const animate = () => {
            animationRef.current = requestAnimationFrame(animate);
            time += 0.01;
            rotationY += 0.002;

            camera.position.x = Math.sin(rotationY) * 8;
            camera.position.z = Math.cos(rotationY) * 8;
            camera.lookAt(0, 0, 0);

            hearts.forEach(heart => {
                heart.rotation.y += 0.01 * heart.userData.speed;
                heart.position.y = heart.userData.baseY + Math.sin(time * heart.userData.speed) * 0.3;
            });

            stars.rotation.y += 0.0005;

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (!containerRef.current) return;
            camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.domElement.removeEventListener('click', handleClick);
            cancelAnimationFrame(animationRef.current);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, [onHeartClick]);

    return <div ref={containerRef} className="absolute inset-0" />;
}

export default function Home() {
    const [showLetter, setShowLetter] = useState(false);
    const [clickCount, setClickCount] = useState(0);
    const [showMessage, setShowMessage] = useState(false);
    const [currentMessage, setCurrentMessage] = useState('');

    const loveMessages = [
        "You make my heart skip a beat 💓",
        "Every moment with you is magic ✨",
        "You're my favorite person 🥰",
        "I love you more than words can say 💕",
        "You're the reason I smile 😊",
        "Forever isn't long enough with you 💞",
        "You light up my world 🌟",
        "My heart belongs to you 💖",
        "Distance means nothing when you mean everything 🌍💕",
        "Can't wait to hold you again 🤗",
    ];

    const handleHeartClick = () => {
        setCurrentMessage(loveMessages[clickCount % loveMessages.length]);
        setShowMessage(true);
        setClickCount(prev => prev + 1);
        setTimeout(() => setShowMessage(false), 2500);
    };

    const menuItems = [
        { icon: Gamepad2, label: "Love Games", path: "LoveGames", color: "from-pink-500 to-rose-500", emoji: "🎮" },
        { icon: MessageCircleHeart, label: "Message Jar", path: "MessageJar", color: "from-purple-500 to-pink-500", emoji: "💌" },
        { icon: Timer, label: "Countdown", path: "Countdown", color: "from-red-500 to-pink-500", emoji: "⏰" },
        { icon: Gift, label: "Virtual Hugs", path: "VirtualHugs", color: "from-rose-500 to-red-500", emoji: "🤗" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-950 via-rose-900 to-red-950 overflow-x-hidden relative">
            {/* Dreamy background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-500/30 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-500/20 via-transparent to-transparent" />

            <FloatingEmojis />

            {/* 3D Scene - now behind content */}
            <div className="absolute inset-0 opacity-60">
                <ThreeScene onHeartClick={handleHeartClick} />
            </div>

            {/* Love message popup */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -20 }}
                        className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-4"
                    >
                        <div className="bg-white/95 backdrop-blur-xl px-6 py-3 rounded-2xl shadow-2xl border-2 border-pink-300">
                            <p className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 text-center">
                                {currentMessage}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Scrollable content wrapper */}
            <div className="relative z-10 min-h-screen flex flex-col">

                {/* Header */}
                <div className="pt-6 pb-4 text-center pointer-events-none px-4">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="inline-block bg-white/10 backdrop-blur-md rounded-3xl px-6 py-4 border border-white/20 shadow-2xl">
                            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-1">
                                <span className="inline-block animate-bounce">💕</span>
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-200 via-white to-pink-200">
                                    {" "}Happy Valentine's{" "}
                                </span>
                                <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>💕</span>
                            </h1>
                            <motion.p
                                className="text-base md:text-lg text-pink-200 font-light"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                To My One and Only ✨ Across the Miles 🌍
                            </motion.p>
                        </div>
                    </motion.div>
                </div>

                {/* Tap hint */}
                <motion.p
                    className="text-white/50 text-sm text-center mb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                >
                    💗 Tap the 3D hearts for surprises! 💗
                </motion.p>

                {/* Interactive Menu */}
                <motion.div
                    className="px-4 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                        {menuItems.map((item, i) => (
                            <Link to={createPageUrl(item.path)} key={i}>
                                <motion.div
                                    className={`bg-gradient-to-br ${item.color} p-4 rounded-2xl shadow-xl cursor-pointer border-2 border-white/30 backdrop-blur-md`}
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                >
                                    <div className="flex flex-col items-center gap-1 text-white">
                                        <span className="text-3xl drop-shadow-lg">{item.emoji}</span>
                                        <span className="font-semibold text-sm drop-shadow">{item.label}</span>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </motion.div>

                {/* Spacer to push bottom content down */}
                <div className="flex-grow" />

                {/* Bottom content */}
                <div className="pb-6 px-4">
                    {/* Reasons carousel with background */}
                    <div className="bg-black/20 backdrop-blur-sm rounded-3xl py-4 mb-4 mx-auto max-w-lg">
                        <ReasonsCarousel />
                    </div>

                    {/* Love letter button */}
                    <motion.div
                        className="text-center mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                    >
                        <motion.button
                            onClick={() => setShowLetter(true)}
                            className="px-6 py-3 bg-gradient-to-r from-pink-500 via-red-500 to-pink-500 rounded-full text-white font-bold text-base shadow-2xl border-2 border-white/30"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255,105,180,0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            💌 Open My Love Letter 💌
                        </motion.button>
                    </motion.div>

                    {/* Footer emojis */}
                    <div className="flex justify-center gap-3 text-2xl">
                        {['🌹', '💝', '😘', '💕', '🥰', '💖', '✨'].map((emoji, i) => (
                            <motion.span
                                key={i}
                                animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.15 }}
                                className="drop-shadow-lg"
                            >
                                {emoji}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </div>

            <LoveLetterModal isOpen={showLetter} onClose={() => setShowLetter(false)} />
        </div>
    );
}
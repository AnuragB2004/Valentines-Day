# 💕 Valentine's Day Web App

A beautiful, interactive Valentine's Day web application built with React, Three.js, and Framer Motion. This standalone app runs entirely in the browser with no backend required.

## ✨ Features

- **🏠 3D Interactive Home** - Stunning 3D heart animations using Three.js
- **⏰ Countdown Timer** - Track the days until your special meeting
- **🎮 Love Games** - Three fun interactive games:
  - Memory Match - Match love emoji pairs
  - Love Meter - Fill the heart with taps
  - Love Quiz - Test your relationship knowledge
- **💌 Message Jar** - Store and read sweet messages
- **🤗 Virtual Hugs** - Send animated virtual hugs

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd valentines-day

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## 🛠️ Tech Stack

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Three.js** - 3D graphics
- **Framer Motion** - Animations
- **TailwindCSS** - Styling
- **Radix UI** - UI components

## 📁 Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ui/          # Base UI components
│   └── valentine/   # Valentine-specific components
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Countdown.jsx
│   ├── LoveGames.jsx
│   ├── MessageJar.jsx
│   └── VirtualHugs.jsx
├── lib/             # Utilities and context
└── utils/           # Helper functions
```

## 🎨 Features in Detail

### 3D Heart Animation
Interactive 3D hearts that respond to mouse movement, built with Three.js for smooth, beautiful animations.

### Countdown Timer
Set a custom date and event name to count down to your special moment together.

### Love Games
- **Memory Game**: Match pairs of love emojis
- **Love Meter**: Interactive heart-filling game
- **Quiz**: Personalized relationship questions

### Message Jar
Store unlimited sweet messages with timestamps. Messages persist in browser localStorage.

### Virtual Hugs
Send animated hugs with customizable messages and emoji reactions.

## 🌟 Customization

All messages, colors, and content can be easily customized by editing the respective page components in the `src/pages/` directory.

## 📝 License

MIT License - feel free to use this project for your own Valentine's Day celebrations!

## 💖 Made with Love

Created as a standalone web application for celebrating love and connection.

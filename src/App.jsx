import React, { useCallback, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

const App = () => {
  const [length, setLength] = useState(8);
  const [numIncluded, setNumIncluded] = useState(false);
  const [charIncluded, setCharIncluded] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, window.innerHeight], [15, -15]);
  const rotateY = useTransform(x, [0, window.innerWidth], [-15, 15]);

  const handleMouseMove = (e) => {
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const PasswordGenerator = useCallback(() => {
    let pass = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numIncluded) string += '0123456789';
    if (charIncluded) string += '!@#$%^&*()_+[]{}|;:,.<>?';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * string.length);
      pass += string.charAt(char);
    }

    setPassword(pass);
  }, [length, numIncluded, charIncluded]);

  useEffect(() => {
    PasswordGenerator();
  }, [PasswordGenerator]);

  const copyToClipboard = () => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
      toast.success('Password copied to clipboard!');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <Toaster />

      {/* 🎯 Cursor Reactive Background Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ rotateX, rotateY }}
      >
        <motion.div
          className="absolute w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{ top: '-10%', left: '-10%' }}
          animate={{ x: [0, 30, -30, 0], y: [0, -20, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
          style={{ bottom: '-10%', right: '-10%' }}
          animate={{ x: [0, -30, 30, 0], y: [0, 20, -20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* 🔐 Generator UI */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-6 text-orange-400 bg-gray-800"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h1 className="text-2xl text-white font-bold my-3 text-center">
          Password Generator
        </h1>

        <div className="flex shadow rounded overflow-hidden mb-4">
          <AnimatePresence mode="wait">
            <motion.input
              key={password}
              type="text"
              value={password}
              ref={passwordRef}
              className="outline-none w-full py-2 px-3 bg-white text-black"
              placeholder="Generated Password"
              readOnly
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          <motion.button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4"
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            Copy
          </motion.button>
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex items-center justify-between">
            <input
              min={6}
              max={100}
              type="range"
              value={length}
              className="cursor-pointer w-full"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="ml-3 text-white">Length: {length}</label>
          </div>
          <div className="flex items-center justify-between">
            <label className="text-white">Include Numbers</label>
            <input
              type="checkbox"
              checked={numIncluded}
              onChange={() => setNumIncluded((prev) => !prev)}
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="text-white">Include Special Characters</label>
            <input
              type="checkbox"
              checked={charIncluded}
              onChange={() => setCharIncluded((prev) => !prev)}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default App;

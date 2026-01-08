'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen flex flex-col font-sans selection:bg-[#FFFF00] selection:text-black">
      
      {/* Header */}
      <header className="px-6 py-8 md:px-12 flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter">DEUT<span className="text-[#FFFF00]">.</span></div>
        <div className="hidden md:block text-[10px] font-mono text-gray-500 uppercase tracking-widest">
          System Status: <span className="text-[#FFFF00]">Calibration</span>
        </div>
      </header>

      {/* Hero Section */}
      <div className="flex-grow flex flex-col justify-center px-6 md:px-12 max-w-5xl mx-auto w-full py-12 md:py-24">
        
        <div className="space-y-8 md:space-y-12 mb-16 md:mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] text-white"
          >
            Don't type. <br />
            <span className="text-[#FFFF00]">Snap it in.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-2xl border-l-2 border-[#FFFF00] pl-6 md:pl-8 space-y-4"
          >
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">
              From your rich visual language to precise <span className="text-white font-medium">Prompt-English</span>.
            </p>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-light">
              You provide the plot. <br className="hidden md:block"/>
              We do the dirty routine work.
            </p>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 mb-20 border-t border-gray-900 pt-12">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-4 text-[#FFFF00]">01 / The Problem</h3>
            <p className="text-gray-400 text-sm leading-7">
              Machines don't understand "atmosphere". They calculate vectors. Bridging this gap requires tedious syntax engineering and trial-and-error guessing.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-white font-mono text-xs uppercase tracking-widest mb-4 text-[#FFFF00]">02 / The Solution</h3>
            <p className="text-gray-400 text-sm leading-7">
              Instead of wrestling with tokens, you construct the visual frame using expert modules. We wrap your idea in a rigid technical structure. <span className="text-white">We don't guess. We enforce.</span>
            </p>
          </motion.div>
        </div>

        {/* CTA Section */}
        <div className="max-w-md">
          <h2 className="text-white font-bold text-xl mb-2">Superuser Roster. Inbound.</h2>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            We are currently calibrating the translation modules. 
            Join the priority queue for professionals ready to define the "Snap-in" mechanics.
          </p>

          <form onSubmit={handleSubmit} className="relative group">
            <div className="flex bg-[#111] border border-gray-800 focus-within:border-[#FFFF00] transition-colors">
              <input 
                type="email" 
                required
                placeholder="work@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'success' || status === 'loading'}
                className="bg-transparent text-white px-4 py-3 w-full focus:outline-none placeholder:text-gray-700 text-sm font-mono disabled:opacity-50"
              />
              <button 
                type="submit"
                disabled={status === 'success' || status === 'loading'}
                className="bg-[#FFFF00] text-black px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-[#E6E600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? '...' : status === 'success' ? 'Joined' : 'Request Access'}
              </button>
            </div>
            {status === 'success' && (
              <p className="absolute -bottom-8 left-0 text-[10px] text-[#FFFF00] font-mono uppercase animate-pulse">
                :: Protocol Initiated. Stand by.
              </p>
            )}
            {status === 'error' && (
              <p className="absolute -bottom-8 left-0 text-[10px] text-red-500 font-mono uppercase">
                :: Error. Try again.
              </p>
            )}
          </form>
        </div>

      </div>

      {/* Footer */}
      <footer className="px-6 py-6 md:px-12 border-t border-gray-900 flex justify-between items-center text-[10px] font-mono uppercase text-gray-600">
        <div>&copy; 2026 DEUT AG. Fribourg.</div>
        <div>Swiss Data Privacy Standards Compliant</div>
      </footer>
    </main>
  );
}
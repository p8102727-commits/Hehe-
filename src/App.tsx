import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import WordCounter from './components/WordCounter';
import SecretAuth from './components/SecretAuth';
import Portfolio from './components/Portfolio';

export default function App() {
  const [experience, setExperience] = useState<'public' | 'auth' | 'command_center'>(() => {
    const saved = localStorage.getItem('shourya_hq_experience');
    if (saved === 'command_center') {
      return 'command_center';
    }
    return 'public';
  });

  // Sync experience to localStorage to preserve private login state
  useEffect(() => {
    if (experience === 'command_center') {
      localStorage.setItem('shourya_hq_experience', 'command_center');
    } else {
      localStorage.removeItem('shourya_hq_experience');
    }
  }, [experience]);

  return (
    <div className="relative overflow-x-hidden min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {experience === 'public' && (
          <motion.div
            key="public"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <WordCounter onSecretTrigger={() => setExperience('auth')} />
          </motion.div>
        )}

        {experience === 'auth' && (
          <motion.div
            key="auth"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full h-full"
          >
            <SecretAuth 
              onSuccess={() => setExperience('command_center')} 
              onCancel={() => setExperience('public')} 
            />
          </motion.div>
        )}

        {experience === 'command_center' && (
          <motion.div
            key="command_center"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <Portfolio onLock={() => setExperience('public')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ShieldCheck, Terminal, X, Lock, KeyRound } from 'lucide-react';

interface SecretAuthProps {
  onSuccess: () => void;
  onCancel: () => void;
}

interface AuthStage {
  stage: number;
  title: string;
  question: string;
  hint: string;
  answer: string;
}

const AUTH_STAGES: AuthStage[] = [
  {
    stage: 1,
    title: "STAGE I: SYSTEM ENTRANCE",
    question: "Identify the primary core title of the Creator.",
    hint: "The academic rank. A Class 9 learner passionate about technology.",
    answer: "student"
  },
  {
    stage: 2,
    title: "STAGE II: CREDENTIAL ROUTING",
    question: "Provide the primary family name (surname) of the architect.",
    hint: "Matches the visual display of the Digital Headquarters.",
    answer: "shree"
  },
  {
    stage: 3,
    title: "STAGE III: SEED ENGINE",
    question: "What business simulation game allows players to build a virtual internet empire?",
    hint: "An upcoming simulation from Shourya's featured project cards.",
    answer: "internet os"
  },
  {
    stage: 4,
    title: "STAGE IV: INTELLECT MATRIX",
    question: "Identify the modern educational interactive chemistry periodic table platform.",
    hint: "A project in development aimed at transforming chemistry into a story.",
    answer: "atomic atlas"
  },
  {
    stage: 5,
    title: "STAGE V: COGNITIVE OVERRIDE",
    question: "Complete the core architectural manifesto: '__________ beats complexity.'",
    hint: "The supreme rule of premium product styling.",
    answer: "simplicity"
  }
];

export default function SecretAuth({ onSuccess, onCancel }: SecretAuthProps) {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [failures, setFailures] = useState<number>(0);
  const [lockoutTime, setLockoutTime] = useState<number>(0);
  const [shakeTrigger, setShakeTrigger] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isCinematicTransition, setIsCinematicTransition] = useState<boolean>(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([]);
  
  const currentStage = AUTH_STAGES[currentStageIndex];
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input automatically
  useEffect(() => {
    if (lockoutTime === 0 && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentStageIndex, lockoutTime]);

  // Handle lockout countdown
  useEffect(() => {
    if (lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutTime]);

  // Push elegant system log lines
  const pushLog = (line: string) => {
    setSystemLogs(prev => [...prev.slice(-6), `[SYS] ${line}`]);
  };

  useEffect(() => {
    pushLog("Terminal connection established.");
    pushLog("Initializing secure handshake protocols...");
    pushLog("Awaiting Level-1 decryption validation.");
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime > 0) return;

    const normalizedInput = inputValue.trim().toLowerCase().replace(/\s+/g, ' ');
    const normalizedAnswer = currentStage.answer.toLowerCase();

    if (normalizedInput === normalizedAnswer) {
      // Success on current stage
      pushLog(`Validation successful for stage ${currentStage.stage}.`);
      setErrorMessage('');
      setInputValue('');
      setFailures(0);

      if (currentStageIndex < AUTH_STAGES.length - 1) {
        setCurrentStageIndex(prev => prev + 1);
        pushLog(`Booting Stage ${currentStage.stage + 1} decryption validation...`);
      } else {
        // All 5 stages validated! Run cinematic transition
        pushLog("ALL ACCESS LEVEL TOKENS VALIDATED.");
        pushLog("PREPARING COGNITIVE COMMAND CENTER LAUNCH...");
        setIsCinematicTransition(true);
        setTimeout(() => {
          onSuccess();
        }, 3200);
      }
    } else {
      // Wrong answer
      const remainingAttempts = 3 - (failures + 1);
      setShakeTrigger(true);
      setTimeout(() => setShakeTrigger(false), 500);
      
      if (remainingAttempts <= 0) {
        setLockoutTime(15);
        setFailures(0);
        setErrorMessage("RATE LIMIT EXCEEDED. COGNITIVE PROTECTION SHIELD ENGAGED.");
        pushLog("SECURITY THREAT DETECTED. SECTOR SUSPENDED FOR 15s.");
      } else {
        setFailures(prev => prev + 1);
        setErrorMessage(`ACCESS DENIED. INCORRECT SIGNATURE.`);
        pushLog(`Handshake mismatch on Stage ${currentStage.stage}. Attempts: ${failures + 1}/3.`);
      }
      setInputValue('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-zinc-100 font-mono z-50 flex flex-col justify-between overflow-hidden">
      
      {/* Cinematic grid or visual scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.02)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none" />

      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-zinc-900 z-10">
        <div className="flex items-center space-x-2">
          <Terminal size={14} className="text-zinc-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400">SHREE INTEL CORE v2.6</span>
        </div>
        <button 
          onClick={onCancel}
          className="p-1.5 rounded-lg border border-zinc-900 bg-zinc-950 hover:bg-zinc-900 text-zinc-500 hover:text-zinc-300 transition duration-300 flex items-center space-x-1.5"
          title="Abort Connection"
        >
          <X size={13} />
          <span className="text-[10px] font-bold tracking-wider">ABORT</span>
        </button>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12 max-w-lg w-full mx-auto z-10">
        
        <AnimatePresence mode="wait">
          {!isCinematicTransition ? (
            <motion.div
              key={currentStageIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col space-y-6"
            >
              {/* Header Info */}
              <div className="text-center space-y-2">
                <span className="text-[10px] tracking-[0.3em] font-semibold text-zinc-500 block uppercase">
                  {currentStage.title}
                </span>
                
                {/* Progress Indicators */}
                <div className="flex justify-center items-center space-x-1.5 py-3">
                  {AUTH_STAGES.map((s, idx) => (
                    <div 
                      key={s.stage} 
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        idx === currentStageIndex 
                          ? 'w-8 bg-white' 
                          : idx < currentStageIndex 
                            ? 'w-3 bg-zinc-400' 
                            : 'w-1.5 bg-zinc-800'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Central Auth Board */}
              <motion.div
                animate={shakeTrigger ? { x: [-10, 10, -10, 10, 0], borderLeftColor: "#dc2626", borderRightColor: "#dc2626" } : {}}
                className={`p-6 rounded-2xl bg-zinc-950 border border-zinc-900 shadow-2xl space-y-5 transition-colors ${
                  lockoutTime > 0 ? 'border-red-950 bg-red-950/5' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg border ${
                    lockoutTime > 0 
                      ? 'bg-red-950/20 border-red-900/40 text-red-400' 
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                  }`}>
                    {lockoutTime > 0 ? <Lock size={15} /> : <KeyRound size={15} />}
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold tracking-wide uppercase text-zinc-300">
                      Decryption Challenge
                    </p>
                    <p className="text-[11px] text-zinc-500 font-sans leading-relaxed">
                      {currentStage.hint}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 py-2">
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    {currentStage.question}
                  </p>
                </div>

                {lockoutTime > 0 ? (
                  <div className="text-center py-4 space-y-2">
                    <span className="text-[10px] tracking-widest text-red-400 font-bold block animate-pulse">
                      DECRYPTION RETRY LOCKED
                    </span>
                    <span className="text-2xl font-light text-zinc-400 font-mono">
                      {lockoutTime}s
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                      <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="INPUT COGNITIVE SIGNATURE..."
                        className="w-full bg-zinc-900 border border-zinc-850 rounded-xl px-4 py-3 text-xs tracking-widest focus:outline-none focus:border-zinc-500 focus:bg-zinc-900/80 transition uppercase placeholder:text-zinc-700 placeholder:tracking-normal"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck="false"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 bg-white text-black font-semibold text-[10px] tracking-[0.2em] rounded-xl hover:bg-zinc-200 active:scale-[0.98] transition-all"
                    >
                      SUBMIT VALIDATION
                    </button>
                  </form>
                )}

                {/* Subtly Elegant Error Message */}
                {errorMessage && (
                  <div className="flex items-center space-x-1.5 text-[10px] text-red-400 py-1 font-sans justify-center">
                    <ShieldAlert size={12} />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ) : (
            /* Cinematic Operating System Transition Overlay */
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full flex flex-col items-center justify-center space-y-8 py-10"
            >
              <div className="relative flex items-center justify-center">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-24 h-24 rounded-full border border-zinc-800 absolute"
                />
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [0.8, 1.4, 0.8], opacity: [0.2, 0.6, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-36 h-36 rounded-full border border-dashed border-zinc-900 absolute"
                />
                <div className="w-16 h-16 rounded-full bg-zinc-950 border border-zinc-700 flex items-center justify-center">
                  <ShieldCheck size={24} className="text-white animate-pulse" />
                </div>
              </div>

              <div className="text-center space-y-2">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-[10px] font-semibold tracking-[0.4em] uppercase text-zinc-400"
                >
                  DECRYPTION COMPLETE • COGNITIVE HQ BOOTING
                </motion.p>
                <div className="w-48 h-0.5 bg-zinc-900 mx-auto rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ left: '-100%', width: '40%' }}
                    animate={{ left: '100%' }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative h-full bg-white rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Terminal logs bottom bar */}
      <footer className="p-6 border-t border-zinc-950 bg-black/50 z-10">
        <div className="max-w-md mx-auto space-y-1 font-mono text-[9px] text-zinc-600">
          <div className="flex items-center space-x-1.5 mb-1 opacity-60">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-600 animate-ping" />
            <span>TERMINAL SUBSYSTEM LOGS</span>
          </div>
          {systemLogs.map((log, index) => (
            <div key={index} className="truncate select-none tracking-wide">
              {log}
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
}

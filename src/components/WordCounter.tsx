import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { jsPDF } from 'jspdf';
import { 
  FileText, 
  Copy, 
  Trash2, 
  Download, 
  FileDown, 
  Undo2, 
  Redo2, 
  Moon, 
  Sun, 
  Maximize2, 
  Minimize2, 
  HelpCircle,
  Sparkles,
  Command
} from 'lucide-react';

interface WordCounterProps {
  onSecretTrigger: () => void;
}

export default function WordCounter({ onSecretTrigger }: WordCounterProps) {
  // State
  const [text, setText] = useState<string>(() => {
    return localStorage.getItem('shourya_wordcounter_text') || '';
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('shourya_wordcounter_theme') === 'dark';
  });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showShortcuts, setShowShortcuts] = useState<boolean>(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  
  // Undo/Redo History
  const [history, setHistory] = useState<string[]>([text]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const isUndoRedoAction = useRef<boolean>(false);
  const footerClickCount = useRef<number>(0);
  const footerClickTimer = useRef<NodeJS.Timeout | null>(null);
  const keySequence = useRef<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-save and Stats Calculations
  useEffect(() => {
    localStorage.setItem('shourya_wordcounter_text', text);
    
    if (isUndoRedoAction.current) {
      isUndoRedoAction.current = false;
    } else {
      // Add to history with debounce-like behavior
      const newHistory = history.slice(0, historyIndex + 1);
      if (newHistory[newHistory.length - 1] !== text) {
        setHistory([...newHistory, text]);
        setHistoryIndex(newHistory.length);
      }
    }
  }, [text]);

  // Dark Mode Class Handler
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('shourya_wordcounter_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('shourya_wordcounter_theme', 'light');
    }
  }, [isDarkMode]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Stats
  const charCount = text.length;
  const charNoSpaces = text.replace(/\s/g, '').length;
  
  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  const sentenceCount = text
    .split(/[.!?]+/)
    .filter(sentence => sentence.trim().length > 0).length;

  const paragraphCount = text
    .split(/\n+/)
    .filter(para => para.trim().length > 0).length;

  // Average reading speed: 200 WPM
  const readingTimeMinutes = Math.ceil(wordCount / 200);
  // Average speaking speed: 130 WPM
  const speakingTimeMinutes = Math.ceil(wordCount / 130);

  // Actions
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClear = () => {
    if (text.length === 0) return;
    setText('');
    showToast('Text cleared', 'info');
  };

  const handleCopy = () => {
    if (text.length === 0) {
      showToast('Nothing to copy', 'info');
      return;
    }
    navigator.clipboard.writeText(text);
    showToast('Copied to clipboard', 'success');
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      isUndoRedoAction.current = true;
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setText(history[prevIndex]);
      showToast('Undo action', 'info');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isUndoRedoAction.current = true;
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setText(history[nextIndex]);
      showToast('Redo action', 'info');
    }
  };

  const handleDownloadTxt = () => {
    if (text.length === 0) {
      showToast('Nothing to download', 'info');
      return;
    }
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `writing-${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('TXT file downloaded');
  };

  const handleDownloadPdf = () => {
    if (text.length === 0) {
      showToast('Nothing to export', 'info');
      return;
    }
    try {
      const doc = new jsPDF();
      const splitText = doc.splitTextToSize(text, 180);
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(11);
      
      let y = 20;
      doc.text('Minimalist Word Counter - Export', 15, y);
      doc.setDrawColor(200, 200, 200);
      doc.line(15, y + 4, 195, y + 4);
      
      y += 15;
      splitText.forEach((line: string) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 15, y);
        y += 7;
      });

      doc.save(`writing-${new Date().toISOString().slice(0,10)}.pdf`);
      showToast('PDF file downloaded');
    } catch (err) {
      console.error(err);
      showToast('PDF generation failed', 'info');
    }
  };

  // Keyboard Shortcuts Listening
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle dark mode (Alt + D)
      if (e.altKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsDarkMode(prev => !prev);
      }
      // Copy (Alt + C)
      if (e.altKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleCopy();
      }
      // Clear (Alt + X)
      if (e.altKey && e.key.toLowerCase() === 'x') {
        e.preventDefault();
        handleClear();
      }
      // Download TXT (Alt + T)
      if (e.altKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        handleDownloadTxt();
      }
      // Download PDF (Alt + P)
      if (e.altKey && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        handleDownloadPdf();
      }
      // Undo (Ctrl + Z or Cmd + Z)
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
      }
      // Redo (Ctrl + Y or Cmd + Shift + Z)
      if (
        ((e.ctrlKey || e.metaKey) && e.key === 'y') ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z')
      ) {
        e.preventDefault();
        handleRedo();
      }

      // Secret Code Activation Sequence: Typing "shourya" when NOT focusing input/textarea
      if (document.activeElement?.tagName !== 'TEXTAREA' && document.activeElement?.tagName !== 'INPUT') {
        const key = e.key.toLowerCase();
        // Allow alpha keys only to build sequence
        if (key.length === 1 && /[a-z]/.test(key)) {
          keySequence.current.push(key);
          // Keep only the last 7 keys typed
          if (keySequence.current.length > 7) {
            keySequence.current.shift();
          }
          const word = keySequence.current.join('');
          if (word.includes('shourya')) {
            showToast('Initializing classified protocols...', 'success');
            setTimeout(() => {
              onSecretTrigger();
            }, 1000);
            keySequence.current = [];
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [text, historyIndex, history, isDarkMode]);

  // Secret activation through clicking the footer 5 times
  const handleFooterClick = () => {
    footerClickCount.current += 1;
    
    if (footerClickTimer.current) {
      clearTimeout(footerClickTimer.current);
    }

    if (footerClickCount.current >= 5) {
      footerClickCount.current = 0;
      showToast('Initiating visual override...', 'success');
      setTimeout(() => {
        onSecretTrigger();
      }, 1000);
    } else {
      // Reset clicks if user stops clicking for 1.5 seconds
      footerClickTimer.current = setTimeout(() => {
        footerClickCount.current = 0;
      }, 1500);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-neutral-50 text-neutral-900'}`}>
      
      {/* Toast Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2.5 rounded-full text-xs font-medium shadow-md border ${
              isDarkMode 
                ? 'bg-zinc-900 border-zinc-800 text-zinc-200' 
                : 'bg-white border-neutral-200 text-neutral-800'
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className={`border-b px-6 py-4 flex items-center justify-between transition-colors ${isDarkMode ? 'border-zinc-900' : 'border-neutral-200/60'}`}>
        <div className="flex items-center space-x-2.5">
          <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-zinc-400' : 'bg-neutral-800'}`} />
          <h1 className="text-sm font-semibold tracking-tight uppercase">Minimalist Word Counter</h1>
        </div>
        
        <div className="flex items-center space-x-1.5">
          {/* Shortcuts Info Toggle */}
          <button 
            onClick={() => setShowShortcuts(!showShortcuts)}
            className={`p-2 rounded-lg transition ${
              isDarkMode ? 'hover:bg-zinc-900 text-zinc-400' : 'hover:bg-neutral-200/50 text-neutral-500'
            }`}
            title="Keyboard Shortcuts"
            aria-label="Toggle shortcuts guide"
          >
            <HelpCircle size={16} />
          </button>

          {/* Dark Mode Toggle */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2 rounded-lg transition ${
              isDarkMode ? 'hover:bg-zinc-900 text-zinc-400' : 'hover:bg-neutral-200/50 text-neutral-500'
            }`}
            title="Toggle Dark Mode"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Fullscreen Toggle */}
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-2 rounded-lg transition ${
              isDarkMode ? 'hover:bg-zinc-900 text-zinc-400' : 'hover:bg-neutral-200/50 text-neutral-500'
            }`}
            title="Toggle Fullscreen"
            aria-label="Toggle fullscreen editor"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </header>

      {/* Keyboard Shortcuts Overlay */}
      <AnimatePresence>
        {showShortcuts && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowShortcuts(false)}
            className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-md w-full p-6 rounded-2xl shadow-xl border ${
                isDarkMode ? 'bg-zinc-900 border-zinc-800 text-zinc-100' : 'bg-white border-neutral-200 text-neutral-900'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Command size={16} className={isDarkMode ? 'text-zinc-400' : 'text-neutral-500'} />
                  <h3 className="font-semibold text-sm tracking-tight uppercase">Keyboard Shortcuts</h3>
                </div>
                <button 
                  onClick={() => setShowShortcuts(false)}
                  className={`text-xs px-2 py-1 rounded transition ${isDarkMode ? 'hover:bg-zinc-800 text-zinc-400' : 'hover:bg-neutral-100 text-neutral-500'}`}
                >
                  Close
                </button>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1.5 border-b border-neutral-200/40 dark:border-zinc-800/60">
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-neutral-500'}>Toggle Dark Mode</span>
                  <kbd className={`px-2 py-1 rounded border shadow-sm ${isDarkMode ? 'bg-zinc-850 border-zinc-700 text-zinc-350' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}>Alt + D</kbd>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-neutral-200/40 dark:border-zinc-800/60">
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-neutral-500'}>Copy All Text</span>
                  <kbd className={`px-2 py-1 rounded border shadow-sm ${isDarkMode ? 'bg-zinc-850 border-zinc-700 text-zinc-350' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}>Alt + C</kbd>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-neutral-200/40 dark:border-zinc-800/60">
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-neutral-500'}>Clear Text</span>
                  <kbd className={`px-2 py-1 rounded border shadow-sm ${isDarkMode ? 'bg-zinc-850 border-zinc-700 text-zinc-350' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}>Alt + X</kbd>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-neutral-200/40 dark:border-zinc-800/60">
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-neutral-500'}>Download TXT File</span>
                  <kbd className={`px-2 py-1 rounded border shadow-sm ${isDarkMode ? 'bg-zinc-850 border-zinc-700 text-zinc-350' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}>Alt + T</kbd>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-neutral-200/40 dark:border-zinc-800/60">
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-neutral-500'}>Download PDF File</span>
                  <kbd className={`px-2 py-1 rounded border shadow-sm ${isDarkMode ? 'bg-zinc-850 border-zinc-700 text-zinc-350' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}>Alt + P</kbd>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-neutral-200/40 dark:border-zinc-800/60">
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-neutral-500'}>Undo Change</span>
                  <kbd className={`px-2 py-1 rounded border shadow-sm ${isDarkMode ? 'bg-zinc-850 border-zinc-700 text-zinc-350' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}>Ctrl + Z</kbd>
                </div>
                <div className="flex justify-between items-center py-1.5">
                  <span className={isDarkMode ? 'text-zinc-400' : 'text-neutral-500'}>Redo Change</span>
                  <kbd className={`px-2 py-1 rounded border shadow-sm ${isDarkMode ? 'bg-zinc-850 border-zinc-700 text-zinc-350' : 'bg-neutral-50 border-neutral-200 text-neutral-600'}`}>Ctrl + Y</kbd>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Experience Layout */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Editor Area */}
        <div className="flex-1 flex flex-col space-y-4">
          
          {/* Quick Toolbar */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1">
              <button 
                onClick={handleUndo} 
                disabled={historyIndex <= 0}
                className={`p-1.5 rounded-md transition ${
                  historyIndex <= 0 
                    ? 'opacity-30 cursor-not-allowed' 
                    : isDarkMode ? 'hover:bg-zinc-900 text-zinc-300' : 'hover:bg-neutral-200/50 text-neutral-700'
                }`}
                title="Undo"
              >
                <Undo2 size={15} />
              </button>
              <button 
                onClick={handleRedo} 
                disabled={historyIndex >= history.length - 1}
                className={`p-1.5 rounded-md transition ${
                  historyIndex >= history.length - 1 
                    ? 'opacity-30 cursor-not-allowed' 
                    : isDarkMode ? 'hover:bg-zinc-900 text-zinc-300' : 'hover:bg-neutral-200/50 text-neutral-700'
                }`}
                title="Redo"
              >
                <Redo2 size={15} />
              </button>
              
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                isDarkMode ? 'bg-zinc-900 text-zinc-500' : 'bg-neutral-200/30 text-neutral-400'
              }`}>
                rev {historyIndex + 1}/{history.length}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleCopy}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isDarkMode 
                    ? 'bg-zinc-900 hover:bg-zinc-850 text-zinc-300' 
                    : 'bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200/80 shadow-sm'
                }`}
              >
                <Copy size={13} />
                <span>Copy</span>
              </button>

              <button
                onClick={handleClear}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isDarkMode 
                    ? 'bg-zinc-900 hover:bg-zinc-850 hover:text-red-400 text-zinc-300' 
                    : 'bg-white hover:bg-neutral-100 hover:text-red-600 text-neutral-800 border border-neutral-200/80 shadow-sm'
                }`}
              >
                <Trash2 size={13} />
                <span>Clear</span>
              </button>

              <div className={`h-4 w-px ${isDarkMode ? 'bg-zinc-800' : 'bg-neutral-300/60'}`} />

              <div className="relative group">
                <button
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    isDarkMode 
                      ? 'bg-zinc-900 hover:bg-zinc-850 text-zinc-300' 
                      : 'bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-200/80 shadow-sm'
                  }`}
                >
                  <Download size={13} />
                  <span>Download</span>
                </button>
                <div className={`absolute right-0 top-full mt-1.5 w-40 rounded-xl border p-1 shadow-lg pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 transition-all duration-150 z-10 ${
                  isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-neutral-200'
                }`}>
                  <button
                    onClick={handleDownloadTxt}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-left text-xs rounded-lg transition ${
                      isDarkMode ? 'hover:bg-zinc-850 text-zinc-200' : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <FileText size={13} />
                    <span>Plain Text (.txt)</span>
                  </button>
                  <button
                    onClick={handleDownloadPdf}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-left text-xs rounded-lg transition ${
                      isDarkMode ? 'hover:bg-zinc-850 text-zinc-200' : 'hover:bg-neutral-50 text-neutral-700'
                    }`}
                  >
                    <FileDown size={13} />
                    <span>PDF Document (.pdf)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Text Editor Card */}
          <div className={`relative flex-1 rounded-2xl border transition-all duration-300 ${
            isFullscreen ? 'fixed inset-0 z-40 p-6 rounded-none border-0' : 'p-4'
          } ${
            isDarkMode 
              ? 'bg-zinc-900/40 border-zinc-900 focus-within:border-zinc-800' 
              : 'bg-white border-neutral-200/70 focus-within:border-neutral-300 shadow-sm'
          }`}>
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleTextChange}
              placeholder="Start writing here... Your progress is saved automatically."
              className="w-full h-full min-h-[400px] lg:min-h-[500px] resize-none bg-transparent outline-none border-none text-sm md:text-base leading-relaxed tracking-wide"
              aria-label="Writing pad"
              style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
            />
            {isFullscreen && (
              <button 
                onClick={() => setIsFullscreen(false)}
                className={`absolute bottom-6 right-6 flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                  isDarkMode 
                    ? 'bg-zinc-900 hover:bg-zinc-850 border-zinc-800 text-zinc-300' 
                    : 'bg-white hover:bg-neutral-100 border-neutral-200 text-neutral-850'
                }`}
              >
                <Minimize2 size={13} />
                <span>Exit Fullscreen</span>
              </button>
            )}
          </div>
        </div>

        {/* Live Statistics Panel */}
        <div className="w-full lg:w-72 flex flex-col gap-6">
          
          {/* Main Counter Card */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode ? 'bg-zinc-900/20 border-zinc-900' : 'bg-white border-neutral-200/70 shadow-sm'
          }`}>
            <h3 className="text-xs font-semibold tracking-widest uppercase opacity-40 mb-5">Statistics</h3>
            
            <div className="space-y-5">
              {/* Word Count */}
              <div>
                <span className="text-xs font-medium opacity-50 block mb-0.5">Words</span>
                <div className="flex items-baseline space-x-1.5">
                  <motion.span 
                    key={wordCount}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-3xl font-light tracking-tight"
                  >
                    {wordCount}
                  </motion.span>
                </div>
              </div>

              {/* Characters With Spaces */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-neutral-200/50 dark:border-zinc-800/50">
                <div>
                  <span className="text-xs font-medium opacity-50 block mb-0.5">Characters</span>
                  <motion.span 
                    key={charCount}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg font-light"
                  >
                    {charCount}
                  </motion.span>
                </div>
                <div>
                  <span className="text-xs font-medium opacity-50 block mb-0.5">No Spaces</span>
                  <motion.span 
                    key={charNoSpaces}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg font-light"
                  >
                    {charNoSpaces}
                  </motion.span>
                </div>
              </div>

              {/* Sentences & Paragraphs */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-dashed border-neutral-200/50 dark:border-zinc-800/50">
                <div>
                  <span className="text-xs font-medium opacity-50 block mb-0.5">Sentences</span>
                  <motion.span 
                    key={sentenceCount}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg font-light"
                  >
                    {sentenceCount}
                  </motion.span>
                </div>
                <div>
                  <span className="text-xs font-medium opacity-50 block mb-0.5">Paragraphs</span>
                  <motion.span 
                    key={paragraphCount}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-lg font-light"
                  >
                    {paragraphCount}
                  </motion.span>
                </div>
              </div>
            </div>
          </div>

          {/* Time Analysis Card */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode ? 'bg-zinc-900/20 border-zinc-900' : 'bg-white border-neutral-200/70 shadow-sm'
          }`}>
            <h3 className="text-xs font-semibold tracking-widest uppercase opacity-40 mb-5">Speed Index</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="opacity-50">Reading Time</span>
                <span className="font-mono font-medium">
                  {readingTimeMinutes} {readingTimeMinutes === 1 ? 'min' : 'mins'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pt-3 border-t border-neutral-100 dark:border-zinc-800/40">
                <span className="opacity-50">Speaking Time</span>
                <span className="font-mono font-medium">
                  {speakingTimeMinutes} {speakingTimeMinutes === 1 ? 'min' : 'mins'}
                </span>
              </div>
            </div>
          </div>

          {/* Tips / Instructions */}
          <div className={`p-5 rounded-2xl border text-xs leading-relaxed ${
            isDarkMode ? 'bg-zinc-900/10 border-zinc-900 text-zinc-500' : 'bg-neutral-100/40 border-neutral-200 text-neutral-500'
          }`}>
            <div className="flex items-center space-x-1.5 mb-2">
              <Sparkles size={12} className={isDarkMode ? 'text-zinc-400' : 'text-neutral-700'} />
              <span className="font-semibold tracking-tight uppercase">Productivity Tip</span>
            </div>
            <p>
              Your text is fully encrypted and stored locally in your browser. Feel free to draft, refine, or paste confidential content—it never touches a remote server.
            </p>
          </div>
        </div>
      </main>

      {/* Footer (Invisible secret trigger is double-clicking or clicking 5 times) */}
      <footer className={`border-t px-6 py-6 text-center transition-colors ${
        isDarkMode ? 'border-zinc-900 bg-zinc-950/40' : 'border-neutral-200/60 bg-neutral-50/50'
      }`}>
        <p 
          onClick={handleFooterClick}
          className={`text-xs font-medium tracking-wider cursor-default select-none uppercase inline-block py-1.5 px-3 rounded-full transition-all active:scale-95 duration-200 ${
            isDarkMode 
              ? 'text-zinc-600 hover:text-zinc-500 hover:bg-zinc-900/50' 
              : 'text-neutral-400 hover:text-neutral-500 hover:bg-neutral-200/20'
          }`}
          title="Minimalist layout signature"
        >
          Designed & Developed by Shourya Shree
        </p>
      </footer>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Clock, Mail, ExternalLink, MessageCircle } from "lucide-react";

export default function PerspectiveArchive() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [time, setTime] = useState("");

  useEffect(() => {
    // Initialize Audio from public folder
    const track = new Audio("/music.mp3");
    track.loop = true;
    setAudio(track);

    // Nairobi Clock Logic
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { timeZone: 'Africa/Nairobi', hour12: false }));
    }, 1000);
    
    return () => { 
      clearInterval(timer); 
      track.pause(); 
    };
  }, []);

  const toggleMusic = () => {
    if (!audio) return;
    if (isPlaying) { audio.pause(); } 
    else { audio.play().catch(e => console.log("Audio play error:", e)); }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-[#00302e] text-white selection:bg-white selection:text-black min-h-screen font-sans">
      {/* Subtle Paper Texture Overlay */}
      <div className="grain fixed inset-0 opacity-[0.04] pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      {/* 1. FLOATING NAVIGATION */}
      <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-start z-50 mix-blend-difference">
        <div className="flex flex-col space-y-1">
          <span className="text-[9px] tracking-[0.5em] uppercase font-bold text-white/90">Abdirahman Omar</span>
          <div className="flex items-center space-x-2 opacity-30">
            <Clock size={8} />
            <span className="text-[7px] tracking-[0.2em]">{time} NBO</span>
          </div>
        </div>
        
        <button onClick={toggleMusic} className="flex items-center space-x-3 opacity-40 hover:opacity-100 transition-all group">
          <div className="flex items-end space-x-[2px] h-3">
             <div className={`w-[1px] bg-white transition-all ${isPlaying ? 'animate-bounce h-3' : 'h-1'}`}></div>
             <div className={`w-[1px] bg-white delay-75 transition-all ${isPlaying ? 'animate-bounce h-2' : 'h-1'}`}></div>
             <div className={`w-[1px] bg-white delay-150 transition-all ${isPlaying ? 'animate-bounce h-4' : 'h-1'}`}></div>
          </div>
          <span className="text-[8px] tracking-[0.3em] uppercase">{isPlaying ? "Atmosphere: On" : "Muted"}</span>
        </button>
      </nav>

      {/* 2. POEM SECTION: Small, Aesthetic, Centered */}
      <motion.main 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 2.5 }}
        className="min-h-screen px-10 flex flex-col items-center justify-center text-center"
      >
        <div className="max-w-lg space-y-12">
          <motion.header 
            initial={{ y: 15, opacity: 0 }} 
            whileInView={{ y: 0, opacity: 1 }} 
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <span className="text-[8px] tracking-[0.8em] uppercase opacity-30 block mb-6">Perspective 01</span>
            <h1 className="font-serif italic text-2xl md:text-3xl font-light leading-tight text-white/90 tracking-tight">
              afterall, success is a perspective
            </h1>
          </motion.header>

          <div className="font-serif text-sm md:text-base leading-[2] text-white/50 tracking-wide font-light space-y-10">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              we seek for wins all throughout our lives,<br/>
              just to realize it's not what we really wanted;<br/>
              even with all the recognition and accolades,<br/>
              we would still want something else.
            </motion.p>

            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              the life we envisioned a few years ago,<br/>
              might already been different to what we need now;<br/>
              as we age, and wage war for so long,<br/>
              it dawned to us, we filter what we allow.
            </motion.p>
            
            <motion.p 
              className="text-white font-normal italic pt-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 2 }}
            >
              you know what,<br/>
              sometimes we need is not success,<br/>
              but to know that,<br/>
              someone will be there if ever we fail.<br/>
              an assurance that even if the world be ending,<br/>
              someone will be there for us - more than willing.
            </motion.p>
          </div>
        </div>
      </motion.main>

      {/* 3. THE "PAGE-TURNER" READING ROOM */}
      <section id="library" className="bg-[#FAF9F6] text-black min-h-screen flex flex-col items-center">
        <div className="w-full max-w-5xl px-10 pt-24 pb-12 text-center md:text-left">
          <span className="text-[9px] tracking-[0.8em] uppercase opacity-30 font-bold block mb-4">READS</span>
          <h2 className="font-serif text-3xl md:text-5xl font-light italic leading-none">Taj al-Arus</h2>
        </div>

        {/* The Animated "Book" Container */}
        <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1.5 }}
           className="w-full max-w-5xl px-6 md:px-10 mb-20"
        >
          <div className="bg-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] aspect-[3/4] md:aspect-video relative overflow-hidden border border-black/[0.03] group">
            <iframe 
              src="/book.pdf#view=FitH&scrollbar=0&navpanes=0" 
              className="w-full h-full border-none opacity-90 group-hover:opacity-100 transition-opacity duration-1000"
              title="Manuscript Viewer"
            />
            {/* Aesthetic Book spine shadow */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/[0.03] to-transparent pointer-events-none"></div>
          </div>
          <div className="mt-8 flex justify-center items-center space-x-8 opacity-20 hover:opacity-100 transition-opacity duration-500">
             <span className="text-[8px] tracking-[0.4em] uppercase">Scroll to turn pages</span>
          </div>
        </motion.div>

        {/* 4. AESTHETIC ICON FOOTER (Based on your sketch) */}
        <footer className="w-full py-20 bg-[#00302e] text-white flex flex-col items-center justify-center space-y-12">
          <div className="h-px w-8 bg-white/10"></div>
          
          <div className="flex items-center space-x-12 md:space-x-20">
            <a href="https://wa.me/254797620060" target="_blank" className="opacity-30 hover:opacity-100 transition-all duration-500 hover:scale-110">
              <MessageCircle size={22} strokeWidth={1.5} />
            </a>
            <a href="https://substack.com/@abdvlrahman" target="_blank" className="opacity-30 hover:opacity-100 transition-all duration-500 hover:scale-110">
              <ExternalLink size={22} strokeWidth={1.5} />
            </a>
            <a href="mailto:abdirahmanvomar1@gmail.com" className="opacity-30 hover:opacity-100 transition-all duration-500 hover:scale-110">
              <Mail size={22} strokeWidth={1.5} />
            </a>
          </div>

          <p className="text-[7px] tracking-[0.8em] uppercase opacity-10">
            Abdirahman Omar &bull; 2025
          </p>
        </footer>
      </section>
    </div>
  );
}
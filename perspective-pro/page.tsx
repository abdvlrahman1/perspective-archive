"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Clock, Mail, ExternalLink, MessageCircle, Download, Send, CornerDownRight 
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; 

const POEMS = [
  {
    id: 1,
    title: "afterall, success is a perspective",
    perspective: "Perspective 01",
    content: (
      <>
        <p>we seek for wins all throughout our lives,<br/>just to realize it's not what we really wanted;<br/>even with all the recognition and accolades,<br/>we would still want something else.</p>
        <p>the life we envisioned a few years ago,<br/>might already been different to what we need now;<br/>as we age, and wage war for so long,<br/>it dawned to us, we filter what we allow.</p>
        <p className="text-white font-normal italic pt-6 text-sm md:text-base leading-relaxed">
          you know what,<br/>
          sometimes we need is not success,<br/>
          but to know that,<br/>
          someone will be there if ever we fail.<br/>
          an assurance that even if the world be ending,<br/>
          someone will be there for us - more than willing.
        </p>
      </>
    )
  },
  {
    id: 2,
    title: "words and silence",
    perspective: "Perspective 02",
    content: (
      <>
        <p>Hadal nin badiyey ma wada odhan,<br/>nin yareeyeyna kama wada tegin.</p>
        <p className="text-white font-normal italic pt-6 text-sm md:text-base leading-relaxed">
          He who talked much did not tell all he wanted,<br/>
          and he who talked a little told almost all he wanted.
        </p>
      </>
    )
  }
];

const BOOKS = [
  { title: "Taj al-Arus", author: "Ibn Ata'illah", image: "/taj-al-arus.png", link: "/riyad.pdf" },
  { title: "Riyad as Salihin", author: "Imam an-Nawawi", image: "/Riyad as salihin.png", link: "/riyad.pdf" },
];

export default function PerspectiveArchive() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [time, setTime] = useState("");
  const [poemIndex, setPoemIndex] = useState(0);
  const [reflections, setReflections] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-GB', { timeZone: 'Africa/Nairobi', hour12: false }));
    }, 1000);

    const track = new Audio("/music.mp3");
    track.loop = true;
    setAudio(track);

    const fetchReflections = async () => {
      const { data } = await supabase
        .from('reflections')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setReflections(data);
    };

    fetchReflections();

    return () => {
      clearInterval(timer);
      track.pause();
    };
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const { data } = await supabase
      .from('reflections')
      .insert([{ text: inputText, replies: [] }])
      .select();

    if (data) {
      setReflections([data[0], ...reflections]);
      setInputText("");
    }
  };

  return (
    <div className="bg-[#00302e] text-white min-h-screen font-sans overflow-x-hidden relative">
      <div className="grain fixed inset-0 opacity-[0.04] pointer-events-none z-50 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]"></div>

      <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-start z-50 mix-blend-difference">
        <div className="flex flex-col space-y-1">
          <span className="text-[9px] md:text-[10px] tracking-[0.5em] uppercase font-bold">Abdirahman Omar</span>
          <div className="flex items-center space-x-2 opacity-30">
            <Clock size={8} />
            <span className="text-[7px] tracking-[0.2em]">{time} NBO</span>
          </div>
        </div>
        <button 
          onClick={() => {
            if (!audio) return;
            isPlaying ? audio.pause() : audio.play().catch(() => {});
            setIsPlaying(!isPlaying);
          }} 
          className="flex items-center space-x-3 opacity-40 hover:opacity-100 transition-all"
        >
          <div className="flex items-end space-x-[2px] h-3">
             <div className={`w-[1px] bg-white ${isPlaying ? 'animate-bounce h-3' : 'h-1'}`}></div>
             <div className={`w-[1px] bg-white delay-75 ${isPlaying ? 'animate-bounce h-2' : 'h-1'}`}></div>
             <div className={`w-[1px] bg-white delay-150 ${isPlaying ? 'animate-bounce h-4' : 'h-1'}`}></div>
          </div>
          <span className="text-[8px] tracking-[0.3em] uppercase hidden md:inline">
            {isPlaying ? "Atmosphere: On" : "Muted"}
          </span>
        </button>
      </nav>

      <section className="min-h-screen px-6 md:px-10 flex flex-col items-center justify-center text-center">
        <div className="max-w-lg space-y-8 md:space-y-12">
          <AnimatePresence mode="wait">
            <motion.div key={poemIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.5 }}>
              <span className="text-[8px] tracking-[0.8em] uppercase opacity-30 block mb-6">{POEMS[poemIndex].perspective}</span>
              <h1 className="font-serif italic text-xl md:text-3xl font-light text-white/90 tracking-tight leading-relaxed">{POEMS[poemIndex].title}</h1>
              <div className="font-serif text-sm md:text-base leading-[2.2] text-white/50 space-y-8 mt-8 md:mt-12">{POEMS[poemIndex].content}</div>
            </motion.div>
          </AnimatePresence>
          <button onClick={() => setPoemIndex((prev) => (prev + 1) % POEMS.length)} className="group flex flex-col items-center space-y-4 pt-10 opacity-30 hover:opacity-100 transition-opacity">
            <span className="text-[9px] tracking-[0.5em] uppercase text-white/60">next</span>
            <div className="text-2xl md:text-3xl font-light transform rotate-[25deg] group-hover:rotate-[115deg] transition-transform duration-700">/</div>
          </button>
        </div>
      </section>

      <section className="bg-[#FAF9F6] text-black py-32 md:py-48 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-[9px] tracking-[0.8em] uppercase opacity-40 font-bold block mb-4">Archive</span>
          <h2 className="font-serif text-3xl md:text-5xl italic font-light mb-20 md:mb-32">The Library</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            {BOOKS.map((book, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="flex flex-col items-center space-y-6 group">
                <div className="relative w-40 h-60 md:w-48 md:h-72 shadow-[15px_15px_40px_-10px_rgba(0,0,0,0.15)] transition-all duration-700">
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="font-serif text-xl italic">{book.title}</h3>
                  <p className="text-[9px] uppercase tracking-widest opacity-40">{book.author}</p>
                  <a href={book.link} download className="inline-block pt-4 opacity-10 group-hover:opacity-100"><Download size={16} /></a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 md:py-48 px-6 bg-[#002e2c]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-24">
             <h2 className="font-serif text-3xl md:text-4xl italic font-light">Reflections</h2>
             <p className="text-[9px] tracking-[0.5em] uppercase opacity-20 mt-4">shared contemplation</p>
          </div>
          <div className="space-y-32 mb-32 relative">
            <AnimatePresence initial={false}>
              {reflections.map((c) => (
                <motion.div key={c.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative">
                  <div className="max-w-[80%]">
                    <p className="font-serif text-sm md:text-base text-white/50 leading-relaxed tracking-wide">{c.text}</p>
                  </div>
                  {c.replies?.map((r, idx) => (
                    <div key={idx} className="mt-8 ml-auto md:absolute md:top-full md:left-24 md:max-w-[70%]">
                       <div className="flex items-start space-x-3 opacity-90">
                          <CornerDownRight size={10} className="mt-1 opacity-20 flex-shrink-0" />
                          <div className="space-y-1">
                            <p className="font-serif italic text-xs md:text-sm text-white/90">{r.text}</p>
                            <span className="text-[7px] tracking-[0.3em] uppercase font-bold opacity-30">— Abdirahman</span>
                          </div>
                       </div>
                    </div>
                  ))}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <form onSubmit={handlePost} className="max-w-md mx-auto relative group border-t border-white/5 pt-12">
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Leave a reflection..." 
              className="w-full bg-transparent py-2 font-serif italic focus:outline-none placeholder:opacity-10 resize-none pr-12"
              rows={1}
            />
            <button type="submit" className="absolute right-0 bottom-3 opacity-20 group-hover:opacity-100 p-2"><Send size={14} /></button>
          </form>
        </div>
      </section>

      <footer className="w-full py-20 flex flex-col items-center space-y-12 bg-[#00302e]">
          <div className="flex items-center space-x-10 md:space-x-20">
            <a href="https://wa.me/254797620060" target="_blank" className="opacity-30 hover:opacity-100"><MessageCircle size={20} /></a>
            <a href="https://substack.com/@abdvlrahman" target="_blank" className="opacity-30 hover:opacity-100"><ExternalLink size={20} /></a>
            <a href="mailto:abdirahmanvomar1@gmail.com" className="opacity-30 hover:opacity-100"><Mail size={20} /></a>
          </div>
          <p className="text-[7px] tracking-[0.8em] uppercase opacity-10">Abdirahman Omar &bull; 2025</p>
      </footer>
    </div>
  );
}
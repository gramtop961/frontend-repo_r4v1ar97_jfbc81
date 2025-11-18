import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[80vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80 pointer-events-none" />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-white/5 border border-white/10 backdrop-blur-md text-xs text-white/80">
            <span className="inline-block w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
            New: Live Neon Wallpapers
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-fuchsia-400 via-sky-300 to-violet-400 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(168,85,247,0.35)]">
            Premium 4K Wallpapers for a Cosmic Aesthetic
          </h1>
          <p className="mt-4 text-base md:text-lg text-white/80">
            Explore anime, nature, and futuristic scenery. Free users get watermarked previews. Subscribers unlock full‑resolution downloads.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <a href="#pricing" className="px-5 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-sky-500 text-white font-semibold shadow-[0_10px_30px_rgba(99,102,241,0.35)] hover:opacity-90 transition">
              Get Premium Access
            </a>
            <a href="#gallery" className="px-5 py-3 rounded-xl bg-white/10 border border-white/10 text-white font-semibold backdrop-blur-md hover:bg-white/15 transition">
              Browse Gallery
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

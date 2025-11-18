import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

const categories = [
  { key: 'all', label: 'All' },
  { key: 'anime', label: 'Anime' },
  { key: 'nature', label: 'Nature' },
  { key: 'scenery', label: 'Scenery' },
  { key: 'live', label: 'Live' },
]

export default function Gallery() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState('all')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    fetchWallpapers('all')
  }, [])

  const fetchWallpapers = async (cat) => {
    const url = new URL(`${baseUrl}/wallpapers`)
    if (cat !== 'all') url.searchParams.set('category', cat)
    const token = localStorage.getItem('token')
    const res = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} })
    const data = await res.json()
    setItems(data.items || [])
    setSubscribed(!!data.subscribed)
    setActive(cat)
  }

  return (
    <section id="gallery" className="relative py-16 bg-gradient-to-b from-black to-slate-950">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl md:text-4xl font-bold text-white">4K Gallery</h2>
          <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
            {categories.map(c => (
              <button key={c.key} onClick={() => fetchWallpapers(c.key)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${active===c.key ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {!subscribed && (
          <div className="mt-4 text-sm text-fuchsia-300/90">
            You are viewing watermarked previews. Subscribe to download full‑resolution without watermark.
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((it) => (
            <motion.div key={it.id} initial={{opacity:0, y:10}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.4}} className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
              <img src={it.thumbnail_url} alt={it.title} className="w-full h-44 object-cover group-hover:scale-[1.03] transition-transform duration-300" />
              {!subscribed && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-lg bg-black/60 border border-white/10 text-[11px] text-white tracking-widest uppercase">Preview · Watermarked</span>
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                <div className="text-sm font-semibold truncate">{it.title}</div>
                <div className="text-xs text-white/70">{it.resolution}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'

const plans = [
  {
    name: 'Free',
    price: '$0',
    tagline: 'Watermarked previews',
    features: ['4K previews with watermark', 'Access to all categories', 'Community favorites'],
    cta: 'Start Free',
    gradient: 'from-slate-700 to-slate-800',
  },
  {
    name: 'Pro',
    price: '$5/mo',
    tagline: 'Full‑res downloads',
    popular: true,
    features: ['Full‑resolution 4K downloads', 'No watermark', 'Priority access'],
    cta: 'Go Pro',
    gradient: 'from-fuchsia-600 to-sky-600',
  },
  {
    name: 'Elite',
    price: '$12/mo',
    tagline: 'Ultimate collection',
    features: ['Exclusive packs', 'Live wallpaper vault', 'Commercial license'],
    cta: 'Become Elite',
    gradient: 'from-emerald-600 to-cyan-600',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-20 bg-gradient-to-b from-black via-slate-950 to-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.15),transparent_60%)]" />
      <div className="relative max-w-6xl mx-auto px-6">
        <motion.h2 initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="text-center text-3xl md:text-5xl font-bold text-white">
          Simple, transparent pricing
        </motion.h2>
        <p className="text-center text-white/70 mt-3">Upgrade any time. Cancel whenever.</p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <motion.div key={p.name} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.5}} className={`relative rounded-2xl p-6 backdrop-blur-xl border ${p.popular ? 'border-white/30' : 'border-white/10'} bg-gradient-to-br ${p.gradient} text-white shadow-[0_20px_80px_rgba(99,102,241,0.15)]`}>
              {p.popular && (
                <span className="absolute -top-3 right-4 text-xs px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-md">Popular</span>
              )}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold">{p.price}</span>
                <span className="text-white/70">{p.tagline}</span>
              </div>
              <ul className="mt-6 space-y-2 text-white/80">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-white/80" />
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#auth" className="mt-8 inline-block w-full text-center px-4 py-2 rounded-xl bg-white/10 border border-white/20 hover:bg-white/15 transition font-semibold">
                {p.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

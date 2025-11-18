import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Admin(){
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('scenery')
  const [imageUrl, setImageUrl] = useState('')
  const [thumbUrl, setThumbUrl] = useState('')
  const [msg, setMsg] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    setMsg('')
    try{
      const token = localStorage.getItem('token')
      if(!token) throw new Error('Login as admin first')
      const res = await fetch(`${baseUrl}/admin/wallpapers`, { method:'POST', headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}`}, body: JSON.stringify({ title, category, image_url: imageUrl, thumbnail_url: thumbUrl }) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Failed')
      setMsg('Created: ' + data.id)
      setTitle(''); setImageUrl(''); setThumbUrl('')
    }catch(e){
      setMsg(e.message)
    }
  }

  const seed = async ()=>{
    setMsg('Seeding...')
    const token = localStorage.getItem('token')
    const res = await fetch(`${baseUrl}/admin/seed`, { method:'POST', headers: { Authorization: `Bearer ${token}`}})
    const data = await res.json()
    setMsg(res.ok ? 'Seeded.' : (data.detail||'Failed'))
  }

  return (
    <section className="py-16 bg-gradient-to-b from-black to-slate-950">
      <div className="max-w-3xl mx-auto px-6 text-white">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-white/70 mt-1">Create new wallpapers and seed demo content.</p>

        <div className="mt-6 rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur-md">
          <button onClick={seed} className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/20">Seed Demo Wallpapers</button>
          <form onSubmit={submit} className="mt-4 grid md:grid-cols-2 gap-3">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="px-3 py-2 rounded-lg bg-black/40 border border-white/10" required />
            <select value={category} onChange={e=>setCategory(e.target.value)} className="px-3 py-2 rounded-lg bg-black/40 border border-white/10">
              <option value="anime">Anime</option>
              <option value="nature">Nature</option>
              <option value="scenery">Scenery</option>
              <option value="live">Live</option>
            </select>
            <input value={imageUrl} onChange={e=>setImageUrl(e.target.value)} placeholder="Full Image URL" className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 md:col-span-2" required />
            <input value={thumbUrl} onChange={e=>setThumbUrl(e.target.value)} placeholder="Thumbnail URL (optional)" className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 md:col-span-2" />
            <button type="submit" className="md:col-span-2 px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-sky-500 font-semibold">Create</button>
          </form>
          {msg && <div className="mt-3 text-sm text-fuchsia-200">{msg}</div>}
        </div>
      </div>
    </section>
  )
}

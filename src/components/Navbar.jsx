import { useEffect, useState } from 'react'
import { Menu, User } from 'lucide-react'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const [authed, setAuthed] = useState(false)

  useEffect(()=>{
    setAuthed(!!localStorage.getItem('token'))
  },[])

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="text-white font-semibold tracking-tight">NebulaWalls</a>
        <div className="hidden md:flex items-center gap-6 text-white/80">
          <a href="#gallery" className="hover:text-white">Gallery</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#auth" className="hover:text-white">Account</a>
          <a href="#" className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-fuchsia-500 to-sky-500 text-white font-semibold">Get Premium</a>
        </div>
        <button className="md:hidden text-white" onClick={()=>setOpen(!open)}><Menu size={22}/></button>
      </div>
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-3 text-white/90">
          <a href="#gallery">Gallery</a>
          <a href="#pricing">Pricing</a>
          <a href="#auth" className="flex items-center gap-2"><User size={16}/> {authed ? 'Account' : 'Login'}</a>
        </div>
      )}
    </nav>
  )
}

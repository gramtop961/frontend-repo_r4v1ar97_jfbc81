import { useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Subscribe(){
  const [plan, setPlan] = useState('pro')
  const [msg, setMsg] = useState('')

  const subscribe = async ()=>{
    try{
      const token = localStorage.getItem('token')
      if(!token) throw new Error('Please login first')
      const res = await fetch(`${baseUrl}/subscribe`, { method:'POST', headers: { 'Content-Type':'application/json', Authorization: `Bearer ${token}`}, body: JSON.stringify({ plan }) })
      const data = await res.json()
      if(!res.ok) throw new Error(data.detail || 'Failed')
      setMsg(`Subscribed to ${data.plan}.`)
    }catch(e){
      setMsg(e.message)
    }
  }

  return (
    <section className="py-10 bg-black">
      <div className="max-w-xl mx-auto px-6 text-white">
        <div className="rounded-2xl p-6 bg-white/5 border border-white/10">
          <h3 className="text-lg font-semibold">Activate Subscription</h3>
          <div className="mt-3 flex items-center gap-3">
            <select value={plan} onChange={e=>setPlan(e.target.value)} className="px-3 py-2 rounded-lg bg-black/40 border border-white/10">
              <option value="pro">Pro - $5/mo</option>
              <option value="elite">Elite - $12/mo</option>
              <option value="free">Free</option>
            </select>
            <button onClick={subscribe} className="px-4 py-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-sky-500 font-semibold">Update</button>
          </div>
          {msg && <div className="mt-3 text-sm text-fuchsia-200">{msg}</div>}
        </div>
      </div>
    </section>
  )
}

import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Pricing from './components/Pricing'
import Gallery from './components/Gallery'
import Auth from './components/Auth'
import Subscribe from './components/Subscribe'
import Admin from './components/Admin'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Gallery />
      <Pricing />
      <Auth />
      <Subscribe />
      <Admin />
      <footer className="py-10 text-center text-white/60 bg-black border-t border-white/10">
        Built with a futuristic neon aesthetic. © {new Date().getFullYear()} NebulaWalls
      </footer>
    </div>
  )
}

export default App

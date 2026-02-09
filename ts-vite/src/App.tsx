import { useState, useEffect } from 'react'

function App() {
  const [response, setResponse] = useState<'pending' | 'yes' | 'no'>('pending')
  const [hearts, setHearts] = useState<string[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleYes = (e: React.MouseEvent) => {
    setResponse('yes')
    // Trigger heart burst animation
    const newHearts = Array.from({ length: 20 }, (_, i) => `heart-${i}`)
    setHearts(newHearts)
    setTimeout(() => setHearts([]), 1000)
    // Add ripple effect
    const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY }
    setRipples(prev => [...prev, newRipple])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 600)
  }

  const handleNo = (e: React.MouseEvent) => {
    setResponse('no')
    // Add ripple effect
    const newRipple = { id: Date.now(), x: e.clientX, y: e.clientY }
    setRipples(prev => [...prev, newRipple])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== newRipple.id)), 600)
  }

  if (response === 'yes') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600 flex flex-col items-center justify-center relative overflow-hidden animate-color-shift">
        {/* Mouse-following particles */}
        <div
          className="absolute w-4 h-4 bg-pink-300 rounded-full opacity-70 animate-particle-float pointer-events-none"
          style={{ left: mousePos.x - 8, top: mousePos.y - 8 }}
        />
        <div
          className="absolute w-3 h-3 bg-fuchsia-300 rounded-full opacity-60 animate-particle-float pointer-events-none"
          style={{ left: mousePos.x + 20, top: mousePos.y + 20, animationDelay: '1s' }}
        />
        {/* Floating hearts */}
        {hearts.map((heart, index) => (
          <div
            key={heart}
            className="absolute text-5xl animate-heart-explosion"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.05}s`,
            }}
          >
            💥❤️
          </div>
        ))}
        {/* Confetti */}
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`confetti-${i}`}
            className="absolute text-2xl animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            🎉
          </div>
        ))}
        <div className="bg-white/10 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl max-w-sm sm:max-w-md md:max-w-lg w-full mx-4 text-center z-10 animate-morph transform hover:scale-105 transition-transform duration-500">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-600 animate-neon-pulse mb-4 sm:mb-6 animate-floating-text">
            Eternal Love Initiated! 💫
          </h1>
          <p className="text-lg sm:text-xl text-white mb-6 sm:mb-8 animate-floating-text px-2" style={{ animationDelay: '1s' }}>
            "My love for you is like a river, peaceful and deep. Your soul can always find its way to mine. Forever and always, my Valentine!" 💕🌹
          </p>
          <div className="flex justify-center space-x-4 sm:space-x-6 mb-6 sm:mb-8">
            <span className="text-3xl sm:text-4xl animate-sparkle">🌹</span>
            <span className="text-3xl sm:text-4xl animate-sparkle" style={{ animationDelay: '0.5s' }}>🍫</span>
            <span className="text-3xl sm:text-4xl animate-sparkle" style={{ animationDelay: '1s' }}>💎</span>
            <span className="text-3xl sm:text-4xl animate-sparkle" style={{ animationDelay: '1.5s' }}>✨</span>
          </div>
          <img
            src="/happy.webp"
            alt="Happy celebration"
            className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-2xl mb-4 sm:mb-6 filter brightness-110 animate-color-shift"
          />
          <button
            onClick={() => setResponse('pending')}
            className="bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:from-pink-600 hover:to-fuchsia-600 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-2xl animate-glow text-lg sm:text-xl"
          >
            Try Again? 💕
          </button>
        </div>
      </div>
    )
  }

  if (response === 'no') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-300 via-pink-200 to-red-200 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Mouse-following heart particles */}
        <div
          className="absolute text-2xl opacity-60 animate-particle-float pointer-events-none"
          style={{ left: mousePos.x - 16, top: mousePos.y - 16 }}
        >
          💔
        </div>
        {/* Falling petals */}
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`petal-${i}`}
            className="absolute text-4xl animate-petal-fall"
            style={{
              left: `${8 + i * 6}%`,
              animationDelay: `${i * 0.25}s`,
            }}
          >
            🌸💔
          </div>
        ))}
        <div className="bg-white/20 backdrop-blur-3xl border border-white/60 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl max-w-sm sm:max-w-lg md:max-w-2xl w-full mx-4 text-center z-10 animate-morph transform hover:scale-105 transition-all duration-700 hover:rotate-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 animate-neon-pulse mb-6 sm:mb-8 animate-floating-text filter drop-shadow-2xl">
            A Heart That Waits 💔
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 sm:mb-10 animate-floating-text leading-relaxed font-light px-2" style={{ animationDelay: '1s' }}>
            "Though our paths may not cross today, my heart remains open. Love is patient, love is kind. Perhaps in another moment, our souls will find their way." 🌹💭
          </p>
          <img
            src="/no.webp"
            alt="No response illustration"
            className="w-full h-40 sm:h-48 md:h-56 object-cover rounded-2xl mb-4 sm:mb-6 filter brightness-110 animate-color-shift"
          />
          <div className="text-6xl sm:text-7xl md:text-8xl mb-8 sm:mb-10 animate-floating-text" style={{ animationDelay: '2s' }}>😔💕</div>
          <button
            onClick={() => setResponse('pending')}
            className="bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 hover:from-red-500 hover:via-pink-500 hover:to-rose-500 text-white font-black py-3 sm:py-4 px-8 sm:px-10 rounded-full transition-all duration-500 transform hover:scale-110 sm:hover:scale-125 hover:rotate-2 shadow-2xl hover:shadow-pink-500/50 animate-glow relative overflow-hidden group text-lg sm:text-xl"
          >
            <span className="relative z-10">Love's Door Remains Open 💖</span>
            <div className="absolute inset-0 bg-white/30 rounded-full animate-holographic-shimmer group-hover:animate-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-pink-600 to-rose-700 flex items-center justify-center relative overflow-hidden">
      {/* Mouse-following heart particles */}
      <div
        className="absolute text-4xl opacity-50 animate-particle-float pointer-events-none"
        style={{ left: mousePos.x - 16, top: mousePos.y - 16 }}
      >
        ❤️
      </div>
      <div
        className="absolute text-3xl opacity-40 animate-particle-float pointer-events-none"
        style={{ left: mousePos.x + 35, top: mousePos.y + 35, animationDelay: '1s' }}
      >
        💖
      </div>
      <div
        className="absolute text-3xl opacity-45 animate-particle-float pointer-events-none"
        style={{ left: mousePos.x - 45, top: mousePos.y + 25, animationDelay: '2s' }}
      >
        💕
      </div>
      {/* Floating romantic emojis background */}
      {Array.from({ length: 60 }, (_, i) => {
        const emojis = ['❤️', '💖', '🌸', '🍫', '💋', '🌹', '💕', '🌺', '💐', '🌷', '🌻', '🌼', '💑', '👩‍❤️‍👨', '💍', '🎀', '💝', '💘', '💗', '💓']
        return (
          <div
            key={`bg-emoji-${i}`}
            className="absolute text-4xl opacity-25 animate-float filter drop-shadow-lg"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            {emojis[i % emojis.length]}
          </div>
        )
      })}
      <div className="bg-white/15 backdrop-blur-3xl border border-white/60 rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl max-w-sm sm:max-w-2xl md:max-w-3xl w-full mx-4 text-center z-10 animate-morph transform hover:scale-105 transition-all duration-700 hover:rotate-1">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 animate-neon-pulse mb-6 sm:mb-8 md:mb-10 animate-floating-text filter drop-shadow-2xl">
          Will You Be My Valentine? 💕
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white mb-8 sm:mb-10 md:mb-14 animate-floating-text leading-relaxed font-light px-2" style={{ animationDelay: '1s' }}>
          "My dearest love, in your eyes I see the stars, in your smile I find my peace. Will you let our hearts dance together in this beautiful symphony of love?" 💫🌹
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-6 sm:space-y-0 sm:space-x-6 md:space-x-10 mb-8 sm:mb-10 md:mb-14">
          <button
            onClick={handleYes}
            className="bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 hover:from-red-500 hover:via-pink-500 hover:to-rose-500 text-white font-black py-4 sm:py-5 md:py-6 px-8 sm:px-10 md:px-14 rounded-full transition-all duration-500 transform hover:scale-110 sm:hover:scale-120 md:hover:scale-130 hover:-rotate-3 shadow-2xl hover:shadow-pink-500/50 animate-glow relative overflow-hidden group text-lg sm:text-xl md:text-2xl"
          >
            <span className="relative z-10">Yes! My Heart is Yours 💖</span>
            <div className="absolute inset-0 bg-white/30 rounded-full animate-holographic-shimmer group-hover:animate-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
          <button
            onClick={handleNo}
            className="bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 hover:from-pink-500 hover:via-rose-500 hover:to-red-500 text-white font-black py-4 sm:py-5 md:py-6 px-8 sm:px-10 md:px-14 rounded-full transition-all duration-500 transform hover:scale-110 sm:hover:scale-120 md:hover:scale-130 hover:rotate-3 shadow-2xl hover:shadow-rose-500/50 animate-glow relative overflow-hidden group text-lg sm:text-xl md:text-2xl"
          >
            <span className="relative z-10">No 💔</span>
            <div className="absolute inset-0 bg-white/30 rounded-full animate-holographic-shimmer group-hover:animate-none"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
        {/* Ripple effects */}
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute w-4 h-4 sm:w-6 sm:h-6 bg-white/90 rounded-full animate-ripple pointer-events-none filter drop-shadow-lg"
            style={{ left: ripple.x - 8, top: ripple.y - 8 }}
          />
        ))}
        <div className="mt-6 sm:mt-8 md:mt-10 text-sm sm:text-base md:text-lg text-white/80 animate-floating-text font-medium px-2" style={{ animationDelay: '3s' }}>
          "Love is not about finding the perfect person, but about seeing an imperfect person perfectly." 💕
        </div>
      </div>
    </div>
  )
}

export default App

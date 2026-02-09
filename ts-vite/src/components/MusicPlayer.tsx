import React, { useRef, useState, useEffect } from 'react'

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [volume, setVolume] = useState(0.3)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
      audioRef.current.loop = true
      // Auto-play on load
      audioRef.current.play().catch(() => {
        // Handle autoplay policy restrictions
        setIsPlaying(false)
      })
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (newVolume > 0 && isMuted) {
      setIsMuted(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-gradient-to-br from-pink-100/90 via-rose-100/90 to-red-100/90 backdrop-blur-3xl border-2 border-pink-300/60 rounded-3xl p-4 sm:p-5 shadow-2xl z-50 animate-float transform hover:scale-105 transition-all duration-300 hover:shadow-pink-500/30">
      <audio ref={audioRef} src="/isthislove.mp3" />
      <div className="flex flex-col items-center space-y-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlay}
            className="text-4xl sm:text-5xl hover:scale-110 transition-transform duration-200 animate-sparkle filter drop-shadow-lg"
            title={isPlaying ? 'Pause Romantic Music' : 'Play Romantic Music'}
          >
            {isPlaying ? '💔' : '❤️'}
          </button>
          <button
            onClick={toggleMute}
            className="text-2xl sm:text-3xl hover:scale-110 transition-transform duration-200 animate-sparkle filter drop-shadow-lg"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
        <div className="flex items-center space-x-3 bg-white/20 rounded-full px-4 py-2 backdrop-blur-sm">
          <span className="text-lg text-pink-700 font-bold animate-pulse">♪</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 sm:w-24 h-3 bg-gradient-to-r from-pink-300 to-rose-300 rounded-full appearance-none cursor-pointer slider hover:from-pink-400 hover:to-rose-400 transition-colors duration-200"
            title="Volume Control"
          />
          <span className="text-lg text-pink-700 font-bold animate-pulse">💖</span>
        </div>
        <div className="text-xs text-pink-600 font-medium animate-floating-text">
          Romantic Background Music
        </div>
      </div>
    </div>
  )
}

export default MusicPlayer

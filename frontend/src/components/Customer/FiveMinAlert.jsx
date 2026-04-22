import { useState, useEffect } from 'react';

export default function FiveMinAlert({ token }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    // Play sound effect (optional)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }, []);

  if (!token) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Pulsing Background */}
      <div className="absolute inset-0 opacity-20">
        <div className={`absolute inset-0 bg-yellow-300 animate-pulse`}></div>
      </div>

      <div
        className={`relative z-10 text-center w-full max-w-md transition-all duration-500 ${
          animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Alert Icon */}
        <div className="text-8xl mb-6 animate-bounce">🔔</div>

        {/* Title */}
        <h1 className="text-5xl font-black text-white mb-4 drop-shadow-lg">
          YOUR TURN
          <br />
          IN 5 MINUTES!
        </h1>

        {/* Token Info */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-2xl border-4 border-yellow-300">
          <p className="text-lg font-bold text-gray-800 mb-2">🎫 Token</p>
          <p className="text-6xl font-black text-orange-600">{token.token_no}</p>
          <p className="text-lg font-bold text-gray-700 mt-4">
            {token.shop_name}
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-white bg-opacity-20 rounded-2xl p-6 mb-8 border-4 border-white backdrop-blur">
          <p className="text-white font-bold text-xl">
            ⏱️ Please get ready
          </p>
          <p className="text-white text-lg font-semibold mt-2">
            Your table will be ready soon
          </p>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            className="w-full bg-white hover:bg-gray-100 text-orange-600 font-black py-5 rounded-2xl transition transform hover:scale-105 text-xl shadow-xl"
            onClick={() => alert('✓ Confirmed! We\'ll notify you when table is ready.')}
          >
            ✓ I\'M READY
          </button>

          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition transform hover:scale-105 text-lg shadow-xl"
            onClick={() => alert('✓ Reminder set! We\'ll notify you in 3 minutes.')}
          >
            ⏰ REMIND ME LATER
          </button>
        </div>

        {/* Warning */}
        <p className="text-white font-bold text-sm mt-6 drop-shadow-lg">
          ⚠️ Don't miss your turn!
        </p>
      </div>
    </div>
  );
}
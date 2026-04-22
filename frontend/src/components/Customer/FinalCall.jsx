import { useState, useEffect } from 'react';

export default function FinalCall({ token }) {
  const [animate, setAnimate] = useState(false);
  const [flashCount, setFlashCount] = useState(0);

  useEffect(() => {
    setAnimate(true);

    // Flash effect
    const flashInterval = setInterval(() => {
      setFlashCount((prev) => (prev + 1) % 2);
    }, 500);

    // Play alert sound
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 1000;
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.8
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
    } catch (err) {
      console.log('Audio not available');
    }

    return () => clearInterval(flashInterval);
  }, []);

  if (!token) return null;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-500 ${
        flashCount === 0
          ? 'bg-gradient-to-br from-red-500 to-red-700'
          : 'bg-gradient-to-br from-red-600 to-red-800'
      }`}
    >
      {/* Pulsing Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 animate-pulse bg-red-400"></div>
      </div>

      <div
        className={`relative z-10 text-center w-full max-w-md transition-all duration-500 ${
          animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Alert Icon - Flashing */}
        <div className={`text-9xl mb-6 ${flashCount === 0 ? 'animate-bounce' : 'scale-110'}`}>
          🚨
        </div>

        {/* Title */}
        <h1 className="text-5xl font-black text-white mb-4 drop-shadow-xl animate-pulse">
          YOUR TABLE
          <br />
          IS READY!
        </h1>

        {/* Token Info */}
        <div className="bg-white rounded-3xl p-8 mb-8 shadow-2xl border-4 border-red-300 transform hover:scale-105 transition">
          <p className="text-lg font-bold text-gray-800 mb-2">🎫 Token</p>
          <p className="text-6xl font-black text-red-600">{token.token_no}</p>
          <p className="text-lg font-bold text-gray-700 mt-4">
            {token.shop_name}
          </p>
          <p className="text-sm text-gray-600 font-semibold mt-3">
            👥 {token.group_size} People
          </p>
        </div>

        {/* Big Call Message */}
        <div className="bg-white bg-opacity-20 rounded-3xl p-8 mb-8 border-4 border-white backdrop-blur transform hover:scale-105 transition">
          <p className="text-white font-black text-4xl drop-shadow-lg">
            ⏩ COME NOW!
          </p>
          <p className="text-white text-xl font-bold mt-3">
            Don't keep your table waiting
          </p>
        </div>

        {/* Instructions */}
        <div className="bg-yellow-300 rounded-2xl p-4 mb-8 border-4 border-yellow-400">
          <p className="text-yellow-900 font-black text-lg">📍 Head to Reception</p>
          <p className="text-yellow-800 font-semibold mt-2">
            Show your token or say your name
          </p>
        </div>

        {/* Action Button */}
        <button
          className="w-full bg-white hover:bg-gray-100 text-red-600 font-black py-6 rounded-3xl transition transform hover:scale-110 text-2xl shadow-xl border-4 border-white mb-4 animate-pulse"
          onClick={() => {
            alert('✓ You\'re all set! Enjoy your meal! 🍛');
          }}
        >
          ✓ COMING NOW
        </button>

        {/* Secondary Option */}
        <button
          className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition text-lg shadow-xl"
          onClick={() => alert('⏰ 5 min extension granted. Enjoy!')}
        >
          ⏰ GIVE ME 5 MORE MINS
        </button>

        {/* Important Message */}
        <p className="text-white font-black text-lg mt-6 drop-shadow-lg">
          ⚠️ Please come immediately!
        </p>
      </div>
    </div>
  );
}
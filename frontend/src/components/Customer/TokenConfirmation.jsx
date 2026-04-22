import { useState, useEffect } from 'react';

export default function TokenConfirmation({
  token,
  onViewStatus,
  onDismiss,
}) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  if (!token) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <p className="text-red-600 font-bold">Error loading token</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">
          🎉
        </div>
        <div className="absolute top-20 right-20 text-6xl animate-bounce" style={{ animationDelay: '0.2s' }}>
          🎊
        </div>
        <div className="absolute bottom-20 left-20 text-6xl animate-bounce" style={{ animationDelay: '0.4s' }}>
          ✨
        </div>
      </div>

      <div
        className={`relative z-10 w-full max-w-md transition-all duration-500 transform ${
          animateIn ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-bounce">✅</div>
          <h1 className="text-4xl font-black text-green-600 mb-2">
            TOKEN CONFIRMED!
          </h1>
          <p className="text-xl text-green-500 font-bold">
            You're in the queue at {token.shop_name} 🍛
          </p>
        </div>

        {/* Token Details Card */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 mb-6 text-white border-4 border-blue-300 shadow-2xl">
          {/* Token Number - Large & Bold */}
          <div className="text-center mb-6 pb-6 border-b-4 border-white">
            <p className="text-lg font-bold opacity-90 mb-2">🎫 TOKEN NUMBER</p>
            <p className="text-7xl font-black">{token.token_no}</p>
          </div>

          {/* Details Grid */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>🍛 Shop:</span>
              <span>{token.shop_name}</span>
            </div>
            <div className="flex justify-between items-center text-xl font-bold">
              <span>👥 Group:</span>
              <span>{token.group_size} people</span>
            </div>
          </div>

          {/* Wait Time - Highlighted */}
          <div className="bg-white bg-opacity-20 rounded-2xl p-4 mb-6 text-center border-2 border-white">
            <p className="text-sm font-bold opacity-90 mb-2">⏱️ ESTIMATED WAIT</p>
            <p className="text-5xl font-black">{token.estimated_wait}</p>
            <p className="text-lg font-bold">MINUTES</p>
          </div>

          {/* Queue Info */}
          <div className="bg-white bg-opacity-10 rounded-2xl p-4 space-y-2 text-sm font-bold">
            <div className="flex justify-between">
              <span>📊 Current Token:</span>
              <span>#32</span>
            </div>
            <div className="flex justify-between">
              <span>📈 Groups Ahead:</span>
              <span>13</span>
            </div>
            
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={onViewStatus}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-black py-4 rounded-2xl transition transform hover:scale-105 text-lg shadow-lg border-2 border-blue-300"
          >
            👀 VIEW LIVE STATUS
          </button>

          <button
            onClick={onDismiss}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-4 rounded-2xl transition transform hover:scale-105 text-lg shadow-lg"
          >
            🔔 DISMISS
          </button>
        </div>

        {/* Info Text */}
        <p className="text-center text-gray-600 text-sm font-bold mt-6">
          💡 You'll get SMS & app alerts when your table is ready
        </p>
      </div>
    </div>
  );
}
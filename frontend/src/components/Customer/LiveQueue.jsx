import { useState, useEffect } from 'react';

export default function LiveQueue({ token, onBack }) {
  const [refreshCount, setRefreshCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(12);
  const [currentServing, setCurrentServing] = useState(40);

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount((prev) => prev + 1);
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
      setCurrentServing((prev) => prev + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setRefreshCount((prev) => prev + 1);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center">
        <p className="text-red-600 font-bold">Error loading token</p>
      </div>
    );
  }

  const queueData = [
    { token: 41, status: 'NEXT', wait: 2, color: 'bg-yellow-500' },
    { token: 42, status: 'WAITING', wait: 5, color: 'bg-orange-500' },
    { token: 43, status: 'WAITING', wait: 8, color: 'bg-orange-400' },
    {
      token: token.token_no,
      status: 'YOU',
      wait: timeRemaining,
      color: 'bg-green-500',
      highlight: true,
    },
    { token: 46, status: 'WAITING', wait: 15, color: 'bg-blue-400' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 pb-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 sticky top-0 z-10 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-black">📊 LIVE QUEUE</h1>
            <p className="text-blue-100 font-semibold text-sm">Real-time updates</p>
          </div>
          <button
            onClick={handleManualRefresh}
            className="bg-white text-blue-600 font-black p-3 rounded-full text-2xl hover:scale-110 transition"
          >
            🔄
          </button>
        </div>

        <p className="text-xs text-blue-100">
          🔄 Auto-refresh: {refreshCount > 0 ? `${refreshCount} updates` : 'Ready'}
        </p>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-4">

        {/* Your Status */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-6 text-white border-4 border-green-300 shadow-2xl">
          <div className="space-y-4">

            <div className="flex justify-between text-2xl font-black">
              <span>🎫 YOUR TOKEN:</span>
              <span>{token.token_no}</span>
            </div>

            <div className="flex justify-between text-xl font-bold">
              <span>🔴 CURRENT SERVING:</span>
              <span>{currentServing}</span>
            </div>

            <div className="border-t-2 border-white my-4"></div>

            <div className="text-center bg-white bg-opacity-20 rounded-2xl p-4">
              <p className="text-sm font-bold">⏱️ TIME REMAINING</p>
              <p className="text-5xl font-black">{timeRemaining}</p>
              <p className="text-lg font-bold">MINUTES</p>
            </div>

            <div className="flex justify-between text-lg font-bold">
              <span>📈 GROUPS AHEAD:</span>
              <span>{Math.max(0, token.token_no - currentServing)}</span>
            </div>

          </div>
        </div>

        {/* Queue List */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border-4 border-blue-300">
          <div className="bg-blue-500 text-white p-4 font-black text-xl">
            📋 NEXT IN QUEUE
          </div>

          <div className="space-y-2 p-4">
            {queueData.map((item, index) => (
              <div
                key={index}
                className={`${item.color} rounded-2xl p-4 text-white font-bold flex justify-between items-center ${
                  item.highlight ? 'ring-4 ring-yellow-300 scale-105' : ''
                }`}
              >
                <div className="flex gap-3 items-center">
                  <span className="text-xl">🎫 {item.token}</span>
                  {item.highlight && <span>✨</span>}
                </div>
                <span>{item.status}</span>
                <span>⏱️ {item.wait} min</span>
              </div>
            ))}
          </div>
        </div>

        {/* Auto Refresh Info */}
        <div className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-4 text-center">
          <p className="font-bold text-yellow-900">
            🔄 Auto-refresh: Every 30 seconds
          </p>
          <p className="text-sm text-yellow-700 font-semibold mt-1">
            Last updated: Just now ✓
          </p>
        </div>

        {/* Back */}
        <button
          onClick={onBack}
          className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-xl"
        >
          ← BACK TO HOME
        </button>

      </div>
    </div>
  );
}
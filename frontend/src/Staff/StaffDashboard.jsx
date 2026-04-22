import { useState, useEffect } from 'react';

export default function StaffDashboard({ staffData, onLogout }) {
  const [queue4Data, setQueue4Data] = useState({
    nowServing: { token: 12, group: 2, time: 0 },
    freeCount: 2,
    occupiedCount: 2,
    totalTables: 4,
    stats: { served: 25, waiting: 10, skipped: 3 },
    nextTokens: [
      { token: 13, group: 3 },
      { token: 14, group: 1 },
    ],
  });

  const [queue8Data, setQueue8Data] = useState({
    nowServing: { token: 7, group: 6, time: 0 },
    freeCount: 1,
    occupiedCount: 2,
    totalTables: 3,
    stats: { served: 18, waiting: 6, skipped: 2 },
    nextTokens: [
      { token: 8, group: 5 },
      { token: 9, group: 7 },
    ],
  });

  const [selectedTable, setSelectedTable] = useState(null);

  // Timer for serving time
  useEffect(() => {
    const interval = setInterval(() => {
      setQueue4Data((prev) => ({
        ...prev,
        nowServing: { ...prev.nowServing, time: prev.nowServing.time + 1 },
      }));

      setQueue8Data((prev) => ({
        ...prev,
        nowServing: { ...prev.nowServing, time: prev.nowServing.time + 1 },
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCallNext = (queueType) => {
    if (queueType === 4) {
      setQueue4Data((prev) => ({
        ...prev,
        nowServing: { token: prev.nextTokens[0].token, group: prev.nextTokens[0].group, time: 0 },
        nextTokens: [...prev.nextTokens.slice(1), { token: prev.nextTokens[0].token + 10, group: 2 }],
        stats: { ...prev.stats, waiting: prev.stats.waiting - 1 },
      }));
    } else {
      setQueue8Data((prev) => ({
        ...prev,
        nowServing: { token: prev.nextTokens[0].token, group: prev.nextTokens[0].group, time: 0 },
        nextTokens: [...prev.nextTokens.slice(1), { token: prev.nextTokens[0].token + 10, group: 5 }],
        stats: { ...prev.stats, waiting: prev.stats.waiting - 1 },
      }));
    }
  };

  const handleOccupied = (queueType) => {
    if (queueType === 4) {
      setQueue4Data((prev) => ({
        ...prev,
        freeCount: Math.max(0, prev.freeCount - 1),
        occupiedCount: prev.occupiedCount + 1,
      }));
    } else {
      setQueue8Data((prev) => ({
        ...prev,
        freeCount: Math.max(0, prev.freeCount - 1),
        occupiedCount: prev.occupiedCount + 1,
      }));
    }
  };

  const handleComplete = (queueType) => {
    if (queueType === 4) {
      setQueue4Data((prev) => ({
        ...prev,
        freeCount: prev.freeCount + 1,
        occupiedCount: Math.max(0, prev.occupiedCount - 1),
        stats: { ...prev.stats, served: prev.stats.served + 1 },
        nowServing: { token: 0, group: 0, time: 0 },
      }));
    } else {
      setQueue8Data((prev) => ({
        ...prev,
        freeCount: prev.freeCount + 1,
        occupiedCount: Math.max(0, prev.occupiedCount - 1),
        stats: { ...prev.stats, served: prev.stats.served + 1 },
        nowServing: { token: 0, group: 0, time: 0 },
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 sticky top-0 z-10 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">🍽️ Queue Manager</h1>
            <p className="text-blue-100 font-semibold">
              {staffData.name} • {staffData.shopName}
            </p>
          </div>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white font-black px-4 py-2 rounded-lg transition"
          >
            🚪 LOGOUT
          </button>
        </div>
      </div>

      {/* Queues Container */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* TABLE 4-SEATER SECTION */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-orange-300">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-6">
            <h2 className="text-2xl font-black">🪑 TABLE 4-SEATER</h2>
          </div>

          <div className="p-6 space-y-4">
            {/* Now Serving */}
            <div className="bg-orange-50 rounded-2xl p-4 border-2 border-orange-300">
              <p className="text-sm font-bold text-orange-700 mb-2">NOW SERVING</p>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-black text-orange-600">
                  {queue4Data.nowServing.token || 'Waiting'}
                </p>
                <p className="text-lg font-bold text-gray-700">
                  Group: {queue4Data.nowServing.group} | Time: {queue4Data.nowServing.time}s
                </p>
              </div>
            </div>

            {/* Table Count */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-100 rounded-xl p-3 text-center border-2 border-green-300">
                <p className="text-2xl font-black text-green-600">
                  {queue4Data.freeCount}
                </p>
                <p className="text-xs font-bold text-green-700">Free</p>
              </div>
              <div className="bg-red-100 rounded-xl p-3 text-center border-2 border-red-300">
                <p className="text-2xl font-black text-red-600">
                  {queue4Data.occupiedCount}
                </p>
                <p className="text-xs font-bold text-red-700">Occupied</p>
              </div>
              <div className="bg-blue-100 rounded-xl p-3 text-center border-2 border-blue-300">
                <p className="text-2xl font-black text-blue-600">
                  {queue4Data.totalTables}
                </p>
                <p className="text-xs font-bold text-blue-700">Total</p>
              </div>
            </div>

            {/* Queue Stats */}
            <div className="bg-gray-100 rounded-xl p-3 border-2 border-gray-300 grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-xs font-bold text-gray-700">SERVED</p>
                <p className="text-xl font-black text-gray-800">
                  {queue4Data.stats.served}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-700">WAITING</p>
                <p className="text-xl font-black text-gray-800">
                  {queue4Data.stats.waiting}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-700">SKIPPED</p>
                <p className="text-xl font-black text-gray-800">
                  {queue4Data.stats.skipped}
                </p>
              </div>
            </div>

            {/* Next Tokens */}
            <div className="bg-blue-50 rounded-xl p-3 border-2 border-blue-300">
              <p className="text-xs font-bold text-blue-700 mb-2">NEXT</p>
              <div className="flex gap-2">
                {queue4Data.nextTokens.map((item, idx) => (
                  <div key={idx} className="bg-blue-200 rounded-lg px-3 py-2 text-center flex-1">
                    <p className="text-lg font-black text-blue-800">{item.token}</p>
                    <p className="text-xs font-bold text-blue-700">{item.group} ppl</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleCallNext(4)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-black py-3 rounded-xl transition transform hover:scale-105"
              >
                🔔 CALL NEXT
              </button>
              <button
                onClick={() => handleOccupied(4)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black py-3 rounded-xl transition transform hover:scale-105"
              >
                ➕ OCCUPIED
              </button>
              <button
                onClick={() => handleComplete(4)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-black py-3 rounded-xl transition transform hover:scale-105"
              >
                ➖ COMPLETE
              </button>
            </div>
          </div>
        </div>

        {/* TABLE 8-SEATER SECTION */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-purple-300">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6">
            <h2 className="text-2xl font-black">🪑 TABLE 8-SEATER</h2>
          </div>

          <div className="p-6 space-y-4">
            {/* Now Serving */}
            <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-300">
              <p className="text-sm font-bold text-purple-700 mb-2">NOW SERVING</p>
              <div className="flex justify-between items-center">
                <p className="text-3xl font-black text-purple-600">
                  {queue8Data.nowServing.token || 'Waiting'}
                </p>
                <p className="text-lg font-bold text-gray-700">
                  Group: {queue8Data.nowServing.group} | Time: {queue8Data.nowServing.time}s
                </p>
              </div>
            </div>

            {/* Table Count */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-100 rounded-xl p-3 text-center border-2 border-green-300">
                <p className="text-2xl font-black text-green-600">
                  {queue8Data.freeCount}
                </p>
                <p className="text-xs font-bold text-green-700">Free</p>
              </div>
              <div className="bg-red-100 rounded-xl p-3 text-center border-2 border-red-300">
                <p className="text-2xl font-black text-red-600">
                  {queue8Data.occupiedCount}
                </p>
                <p className="text-xs font-bold text-red-700">Occupied</p>
              </div>
              <div className="bg-blue-100 rounded-xl p-3 text-center border-2 border-blue-300">
                <p className="text-2xl font-black text-blue-600">
                  {queue8Data.totalTables}
                </p>
                <p className="text-xs font-bold text-blue-700">Total</p>
              </div>
            </div>

            {/* Queue Stats */}
            <div className="bg-gray-100 rounded-xl p-3 border-2 border-gray-300 grid grid-cols-3 gap-3">
              <div className="text-center">
                <p className="text-xs font-bold text-gray-700">SERVED</p>
                <p className="text-xl font-black text-gray-800">
                  {queue8Data.stats.served}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-700">WAITING</p>
                <p className="text-xl font-black text-gray-800">
                  {queue8Data.stats.waiting}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold text-gray-700">SKIPPED</p>
                <p className="text-xl font-black text-gray-800">
                  {queue8Data.stats.skipped}
                </p>
              </div>
            </div>

            {/* Next Tokens */}
            <div className="bg-purple-50 rounded-xl p-3 border-2 border-purple-300">
              <p className="text-xs font-bold text-purple-700 mb-2">NEXT</p>
              <div className="flex gap-2">
                {queue8Data.nextTokens.map((item, idx) => (
                  <div key={idx} className="bg-purple-200 rounded-lg px-3 py-2 text-center flex-1">
                    <p className="text-lg font-black text-purple-800">{item.token}</p>
                    <p className="text-xs font-bold text-purple-700">{item.group} ppl</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleCallNext(8)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-black py-3 rounded-xl transition transform hover:scale-105"
              >
                🔔 CALL NEXT
              </button>
              <button
                onClick={() => handleOccupied(8)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-black py-3 rounded-xl transition transform hover:scale-105"
              >
                ➕ OCCUPIED
              </button>
              <button
                onClick={() => handleComplete(8)}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-black py-3 rounded-xl transition transform hover:scale-105"
              >
                ➖ COMPLETE
              </button>
            </div>
          </div>
        </div>

        {/* Day End Button */}
        <button
          className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-black py-4 rounded-xl transition text-lg shadow-lg"
        >
          🌙 END DAY
        </button>
      </div>
    </div>
  );
}
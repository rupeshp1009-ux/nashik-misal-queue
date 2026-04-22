import { useState } from 'react';

export default function AdminDashboard({ adminData, onLogout }) {
  const [shops] = useState([
    {
      id: 1,
      name: 'Sadhana Chulivarchi Misal',
      emoji: '🏪',
      customers: 156,
      queue: 12,
      avgWait: 22,
      status: 'OPEN',
    },
    {
      id: 2,
      name: 'Tushar Misal',
      emoji: '🍛',
      customers: 189,
      queue: 8,
      avgWait: 18,
      status: 'OPEN',
      featured: true,
    },
    {
      id: 3,
      name: 'Hotel Vihar',
      emoji: '🏨',
      customers: 142,
      queue: 15,
      avgWait: 32,
      status: 'OPEN',
    },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-6 sticky top-0 z-10 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">🎛️ Admin Control Panel</h1>
            <p className="text-red-100 font-semibold">
              Platform Management
            </p>
          </div>
          <button
            onClick={onLogout}
            className="bg-white text-red-600 font-black px-4 py-2 rounded-lg transition hover:bg-gray-100"
          >
            🚪 LOGOUT
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* PLATFORM OVERVIEW */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl shadow-xl p-6 text-white border-4 border-red-400">
          <h2 className="text-2xl font-black mb-4">📊 Platform Overview</h2>
          <div className="grid grid-cols-4 gap-4">
            {/* Total Shops */}
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center border-2 border-white">
              <p className="text-sm font-bold opacity-90 mb-2">TOTAL SHOPS</p>
              <p className="text-5xl font-black">3</p>
            </div>

            {/* Total Customers */}
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center border-2 border-white">
              <p className="text-sm font-bold opacity-90 mb-2">CUSTOMERS TODAY</p>
              <p className="text-5xl font-black">487</p>
            </div>

            {/* System Status */}
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center border-2 border-white">
              <p className="text-sm font-bold opacity-90 mb-2">SYSTEM STATUS</p>
              <p className="text-2xl font-black">✅ ONLINE</p>
            </div>

            {/* Uptime */}
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center border-2 border-white">
              <p className="text-sm font-bold opacity-90 mb-2">UPTIME</p>
              <p className="text-3xl font-black">99.99%</p>
            </div>
          </div>
        </div>

        {/* SHOP STATUS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white mb-4">🏪 Shop Status</h2>

          {shops.map((shop) => (
            <div
              key={shop.id}
              className={`rounded-3xl shadow-xl p-6 border-4 ${
                shop.featured
                  ? 'bg-yellow-900 border-yellow-400'
                  : 'bg-gray-800 border-gray-600'
              }`}
            >
              {shop.featured && (
                <div className="bg-yellow-400 text-yellow-900 font-black text-center py-2 mb-4 rounded-lg">
                  ⚡ FASTEST QUEUE
                </div>
              )}

              <div className="flex items-center justify-between mb-4">
                {/* Shop Info */}
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{shop.emoji}</div>
                  <div>
                    <h3 className="text-xl font-black text-white">
                      {shop.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {shop.status === 'OPEN'
                        ? '🟢 OPEN'
                        : '🔴 CLOSED'}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 mb-1">
                      CUSTOMERS
                    </p>
                    <p className="text-2xl font-black text-white">
                      {shop.customers}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 mb-1">
                      QUEUE
                    </p>
                    <p className="text-2xl font-black text-white">
                      {shop.queue}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 mb-1">
                      AVG WAIT
                    </p>
                    <p className="text-2xl font-black text-white">
                      {shop.avgWait}m
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-black px-4 py-2 rounded-lg transition">
                    👁️ VIEW
                  </button>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-black px-4 py-2 rounded-lg transition">
                    🔔 ALERT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white mb-4">⚡ Quick Actions</h2>
          <div className="grid grid-cols-4 gap-4">
            {/* Add Shop */}
            <button className="bg-gradient-to-br from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-2xl shadow-xl p-6 text-white font-black text-center transition transform hover:scale-105 border-2 border-green-400">
              <p className="text-3xl mb-2">➕</p>
              <p>ADD NEW SHOP</p>
            </button>

            {/* View QR */}
            <button className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-2xl shadow-xl p-6 text-white font-black text-center transition transform hover:scale-105 border-2 border-purple-400">
              <p className="text-3xl mb-2">🎟️</p>
              <p>VIEW QR CODES</p>
            </button>

            {/* Support */}
            <button className="bg-gradient-to-br from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-2xl shadow-xl p-6 text-white font-black text-center transition transform hover:scale-105 border-2 border-blue-400">
              <p className="text-3xl mb-2">📋</p>
              <p>SUPPORT TICKETS</p>
            </button>

            {/* Settings */}
            <button className="bg-gradient-to-br from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-2xl shadow-xl p-6 text-white font-black text-center transition transform hover:scale-105 border-2 border-gray-500">
              <p className="text-3xl mb-2">⚙️</p>
              <p>SETTINGS</p>
            </button>
          </div>
        </div>

        {/* SYSTEM HEALTH */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl shadow-xl p-6 border-4 border-gray-600">
          <h2 className="text-2xl font-black text-white mb-4">🏥 System Health</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Server */}
            <div className="bg-green-500 bg-opacity-20 rounded-2xl p-4 border-2 border-green-400">
              <p className="text-sm font-bold text-green-300 mb-2">SERVER</p>
              <p className="text-2xl font-black text-white">✅ Running</p>
              <p className="text-xs text-green-300 mt-2">Response: 45ms</p>
            </div>

            {/* Database */}
            <div className="bg-green-500 bg-opacity-20 rounded-2xl p-4 border-2 border-green-400">
              <p className="text-sm font-bold text-green-300 mb-2">DATABASE</p>
              <p className="text-2xl font-black text-white">✅ Connected</p>
              <p className="text-xs text-green-300 mt-2">Queries: 1.2s</p>
            </div>

            {/* Connections */}
            <div className="bg-green-500 bg-opacity-20 rounded-2xl p-4 border-2 border-green-400">
              <p className="text-sm font-bold text-green-300 mb-2">ACTIVE CONNECTIONS</p>
              <p className="text-2xl font-black text-white">156</p>
              <p className="text-xs text-green-300 mt-2">Real-time users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
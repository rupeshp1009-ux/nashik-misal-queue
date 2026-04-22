import { useState } from 'react';

export default function OwnerDashboard({ ownerData, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 sticky top-0 z-10 rounded-b-3xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-black">🏪 Dashboard</h1>
            <p className="text-purple-100 font-semibold">
              {ownerData.shopName}
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Status & Control Section */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-purple-200">
          {/* Shop Status */}
          <div className="mb-6 pb-6 border-b-2 border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black text-gray-800 mb-2">
                  Shop Status
                </h2>
                <div className="flex gap-2">
                  <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm">
                    🟢 OPEN
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-black px-4 py-2 rounded-lg transition">
                  🔴 CLOSE
                </button>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-black px-4 py-2 rounded-lg transition">
                  ⏸️ PAUSE
                </button>
              </div>
            </div>
          </div>

          {/* Live Queue Section */}
          <h3 className="text-xl font-black text-gray-800 mb-4">🔴 Live Queue</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* Queue 4 */}
            <div className="bg-orange-50 rounded-2xl p-4 border-2 border-orange-300">
              <p className="text-sm font-bold text-orange-700 mb-2">QUEUE 4 (1-4 PPL)</p>
              <div className="space-y-1">
                <p className="text-lg font-black text-gray-800">Serving: <span className="text-orange-600">2</span></p>
                <p className="text-lg font-black text-gray-800">Waiting: <span className="text-orange-600">8</span></p>
                <p className="text-lg font-black text-gray-800">Total: <span className="text-orange-600">10</span></p>
              </div>
            </div>

            {/* Queue 8 */}
            <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-300">
              <p className="text-sm font-bold text-purple-700 mb-2">QUEUE 8 (5+ PPL)</p>
              <div className="space-y-1">
                <p className="text-lg font-black text-gray-800">Serving: <span className="text-purple-600">2</span></p>
                <p className="text-lg font-black text-gray-800">Waiting: <span className="text-purple-600">4</span></p>
                <p className="text-lg font-black text-gray-800">Total: <span className="text-purple-600">6</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Metrics */}
        <div className="bg-white rounded-3xl shadow-xl p-6 border-4 border-blue-200">
          <h2 className="text-2xl font-black text-gray-800 mb-4">📊 Today's Metrics</h2>
          <div className="grid grid-cols-3 gap-4">
            {/* Total Customers */}
            <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-300 text-center">
              <p className="text-xs font-bold text-blue-700 mb-2">TOTAL CUSTOMERS</p>
              <p className="text-4xl font-black text-blue-600">156</p>
            </div>

            {/* Avg Wait Time */}
            <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-300 text-center">
              <p className="text-xs font-bold text-green-700 mb-2">AVG WAIT TIME</p>
              <p className="text-4xl font-black text-green-600">18</p>
              <p className="text-xs font-bold text-green-700">mins</p>
            </div>

            {/* Utilization */}
            <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-300 text-center">
              <p className="text-xs font-bold text-purple-700 mb-2">UTILIZATION</p>
              <p className="text-4xl font-black text-purple-600">78%</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-black py-4 rounded-xl transition text-lg shadow-lg">
            📈 View Analytics
          </button>
          <button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-black py-4 rounded-xl transition text-lg shadow-lg">
            👨‍💼 Manage Staff
          </button>
        </div>

        {/* Day End */}
        <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-black py-4 rounded-xl transition text-lg shadow-lg">
          🌙 END DAY
        </button>
      </div>
    </div>
  );
}
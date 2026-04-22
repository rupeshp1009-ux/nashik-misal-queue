import { useState } from 'react';

export default function StaffLogin({ onLogin }) {
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!staffId.trim()) {
      setError('Staff ID required');
      return;
    }

    if (!password.trim()) {
      setError('Password required');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      // Demo credentials
      if (staffId === 'vik_001' && password === 'pass123') {
        const staffData = {
          staffId: 'vik_001',
          name: 'Vikram',
          shopId: 101,
          shopName: 'Tushar Misal',
          role: 'Manager',
          loginTime: new Date().toISOString(),
        };

        localStorage.setItem('staff_auth', JSON.stringify(staffData));
        onLogin(staffData);
      } else if (staffId === 'neha_001' && password === 'pass123') {
        const staffData = {
          staffId: 'neha_001',
          name: 'Neha',
          shopId: 101,
          shopName: 'Tushar Misal',
          role: 'Server',
          loginTime: new Date().toISOString(),
        };

        localStorage.setItem('staff_auth', JSON.stringify(staffData));
        onLogin(staffData);
      } else {
        setError('Invalid Staff ID or Password');
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-blue-500">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">👨‍🍳</div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">
            Staff Login
          </h1>
          <p className="text-gray-600 text-sm">
            Queue Management System
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-6">
          <p className="text-xs font-bold text-blue-700 mb-2">
            📝 Demo Credentials:
          </p>
          <p className="text-xs text-gray-700">
            ID: <span className="font-bold">vik_001</span>
          </p>
          <p className="text-xs text-gray-700">
            Password: <span className="font-bold">pass123</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Staff ID */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              👤 Staff ID
            </label>
            <input
              type="text"
              placeholder="e.g., vik_001"
              value={staffId}
              onChange={(e) => {
                setStaffId(e.target.value);
                setError('');
              }}
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-lg disabled:bg-gray-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              🔐 Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-lg disabled:bg-gray-100"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
              <p className="text-sm text-red-700 font-bold">
                ✗ {error}
              </p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition transform hover:scale-105 text-lg shadow-lg"
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block mr-2">⟳</span>
                Logging in...
              </>
            ) : (
              '🚪 LOGIN'
            )}
          </button>
        </form>

        {/* Info */}
        <p className="text-center text-xs text-gray-600 font-semibold mt-6">
          🔒 Login secure. Session saved locally.
        </p>
      </div>
    </div>
  );
}
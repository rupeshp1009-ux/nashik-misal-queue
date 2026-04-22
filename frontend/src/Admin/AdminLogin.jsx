import { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!adminId.trim()) {
      setError('Admin ID required');
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
      if (adminId === 'admin_001' && password === 'admin123') {
        const adminData = {
          adminId: 'admin_001',
          name: 'Admin',
          email: 'admin@nashikmisal.com',
          role: 'Super Admin',
          loginTime: new Date().toISOString(),
        };

        localStorage.setItem('admin_auth', JSON.stringify(adminData));
        onLogin(adminData);
      } else {
        setError('Invalid Admin ID or Password');
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-orange-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-red-500">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🎛️</div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">
            Admin Login
          </h1>
          <p className="text-gray-600 text-sm">
            Control Panel
          </p>
        </div>

        {/* Demo Credentials Info */}
        <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4 mb-6">
          <p className="text-xs font-bold text-red-700 mb-2">
            📝 Demo Credentials:
          </p>
          <p className="text-xs text-gray-700">
            ID: <span className="font-bold">admin_001</span>
          </p>
          <p className="text-xs text-gray-700">
            Password: <span className="font-bold">admin123</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Admin ID */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              🔐 Admin ID
            </label>
            <input
              type="text"
              placeholder="e.g., admin_001"
              value={adminId}
              onChange={(e) => {
                setAdminId(e.target.value);
                setError('');
              }}
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition text-lg disabled:bg-gray-100"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              🔑 Password
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
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition text-lg disabled:bg-gray-100"
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
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition transform hover:scale-105 text-lg shadow-lg"
          >
            {loading ? (
              <>
                <span className="animate-spin inline-block mr-2">⟳</span>
                Logging in...
              </>
            ) : (
              '🎛️ LOGIN'
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
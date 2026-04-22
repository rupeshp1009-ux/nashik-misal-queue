import { useState } from 'react';

export default function OwnerLogin({ onLogin }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
      setError('Mobile must be 10 digits');
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
      if (mobile === '9876543210' && password === 'owner123') {
        const ownerData = {
          mobile: '9876543210',
          name: 'Vikram Patel',
          shopId: 101,
          shopName: 'Tushar Misal',
          loginTime: new Date().toISOString(),
        };

        localStorage.setItem('owner_auth', JSON.stringify(ownerData));
        onLogin(ownerData);
      } else {
        setError('Invalid Mobile or Password');
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-purple-500">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🏪</div>
          <h1 className="text-3xl font-black text-gray-800 mb-2">
            Owner Dashboard
          </h1>
          <p className="text-gray-600 text-sm">
            Manage Your Shop
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-purple-50 border-2 border-purple-300 rounded-xl p-4 mb-6">
          <p className="text-xs font-bold text-purple-700 mb-2">
            📝 Demo Credentials:
          </p>
          <p className="text-xs text-gray-700">
            Mobile: <span className="font-bold">9876543210</span>
          </p>
          <p className="text-xs text-gray-700">
            Password: <span className="font-bold">owner123</span>
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Mobile */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              📱 Mobile Number
            </label>
            <div className="flex gap-2">
              <div className="bg-purple-500 text-white px-4 py-3 rounded-xl flex items-center font-bold">
                +91
              </div>
              <input
                type="tel"
                placeholder="10 digits"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value.replace(/\D/g, '').slice(0, 10));
                  setError('');
                }}
                disabled={loading}
                maxLength="10"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition text-lg disabled:bg-gray-100"
              />
            </div>
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
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition text-lg disabled:bg-gray-100"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-2 border-red-300 rounded-xl p-4">
              <p className="text-sm text-red-700 font-bold">✗ {error}</p>
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition transform hover:scale-105 text-lg shadow-lg"
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
import { useState } from 'react';

export default function FindToken({ onFound, onBack }) {
  const [mobile, setMobile] = useState('');
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(value);
    setError('');
  };

  const handleCheckStatus = async () => {
    if (mobile.length !== 10) {
      setError('Please enter exactly 10 digits');
      return;
    }

    setSearching(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      const savedToken = localStorage.getItem('active_token');

      if (savedToken) {
        try {
          const tokenData = JSON.parse(savedToken);
          onFound(tokenData);
        } catch (err) {
          setError('Error retrieving token');
        }
      } else {
        setError('No active token found. Please scan QR at shop to create one.');
      }

      setSearching(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-blue-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">🔍</div>
          <h1 className="text-3xl font-black text-blue-600 mb-2">
            Find Your Token
          </h1>
          <p className="text-gray-600 text-sm">
            Enter your mobile number to check your queue status
          </p>
        </div>

        {/* Mobile Input */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-800 mb-2">
            📱 Mobile Number
          </label>
          <div className="flex gap-2">
            <div className="bg-blue-500 text-white px-4 py-3 rounded-xl flex items-center font-bold min-w-fit">
              +91
            </div>
            <input
              type="tel"
              placeholder="10 digits"
              value={mobile}
              onChange={handleMobileChange}
              disabled={searching}
              maxLength="10"
              className="flex-1 px-4 py-3 border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition text-lg font-semibold disabled:bg-gray-100"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 font-semibold mt-2">
              ✗ {error}
            </p>
          )}
          {mobile.length > 0 && mobile.length < 10 && !error && (
            <p className="text-sm text-blue-600 font-semibold mt-2">
              {mobile.length}/10 digits
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleCheckStatus}
            disabled={mobile.length !== 10 || searching}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-black py-3 rounded-xl transition transform hover:scale-105 text-lg"
          >
            {searching ? (
              <>
                <span className="animate-spin inline-block mr-2">⟳</span>
                Searching...
              </>
            ) : (
              '🔍 CHECK STATUS'
            )}
          </button>

          <button
            onClick={onBack}
            disabled={searching}
            className="w-full bg-gray-400 hover:bg-gray-500 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl transition text-lg"
          >
            ← BACK
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-xs text-blue-700 font-semibold">
            💡 If you have an active token, it will be found automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
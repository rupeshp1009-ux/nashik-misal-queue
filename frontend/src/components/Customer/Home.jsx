import { useState } from 'react';

export default function Home({ onContinue, onCheckToken }) {
  const [mobile, setMobile] = useState('');
  const [name, setName] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [nameError, setNameError] = useState('');

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(value);
    if (value.length > 0 && value.length < 10) {
      setMobileError(`${value.length}/10 digits`);
    } else {
      setMobileError('');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.length > 0) {
      setNameError('');
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();

    // Validation
    if (mobile.length !== 10) {
      setMobileError('Please enter exactly 10 digits');
      return;
    }

    if (!name.trim()) {
      setNameError('Please enter your name');
      return;
    }

    // Save to localStorage
    localStorage.setItem('mobile', mobile);
    localStorage.setItem('name', name);

    // Proceed
    onContinue({ mobile, name });
  };

  const handleCheckToken = () => {
    onCheckToken();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-red-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-orange-200">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3 animate-bounce">🍛</div>
          <h1 className="text-4xl font-black text-orange-600 mb-2">
            Nashik Misal Queue
          </h1>
          <p className="text-lg font-semibold text-orange-500 mb-1">
            No More Waiting Confusion
          </p>
          <p className="text-sm text-gray-600">
            Know exactly when your table will be ready
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleContinue} className="space-y-5">
          {/* Mobile Input */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              📱 Your Mobile Number
            </label>
            <div className="flex gap-2">
              <div className="bg-orange-500 text-white px-4 py-3 rounded-xl flex items-center font-bold min-w-fit">
                +91
              </div>
              <input
                type="tel"
                placeholder="10 digits"
                value={mobile}
                onChange={handleMobileChange}
                maxLength="10"
                className="flex-1 px-4 py-3 border-2 border-orange-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition text-lg font-semibold"
              />
            </div>
            {mobileError && (
              <p className="text-sm text-orange-600 font-semibold mt-1">
                {mobileError.includes('/') ? '✓ ' : '✗ '}
                {mobileError}
              </p>
            )}
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-2">
              👤 Your Name
            </label>
            <input
              type="text"
              placeholder="e.g., Ramesh"
              value={name}
              onChange={handleNameChange}
              className="w-full px-4 py-3 border-2 border-orange-300 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition text-lg"
            />
            {nameError && (
              <p className="text-sm text-red-600 font-semibold mt-1">
                ✗ {nameError}
              </p>
            )}
          </div>

          {/* Continue Button */}
          <button
            type="submit"
            disabled={mobile.length !== 10 || !name.trim()}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition transform hover:scale-105 text-lg shadow-lg"
          >
            🎯 CONTINUE
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs font-bold text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Check Token Button */}
        <button
          onClick={handleCheckToken}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition transform hover:scale-105 text-lg"
        >
          🔍 Check My Token
        </button>

        {/* Info Section */}
        <div className="mt-8 space-y-2 text-center">
          <p className="text-xs font-semibold text-gray-600">
            ✓ No OTP needed - just your number
          </p>
          <p className="text-xs font-semibold text-green-600">
            ✓ Get live wait time updates
          </p>
          <p className="text-xs font-semibold text-blue-600">
            ✓ SMS alerts when your table is ready
          </p>
        </div>
      </div>
    </div>
  );
}
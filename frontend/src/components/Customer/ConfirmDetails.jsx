import { useState } from 'react';

export default function ConfirmDetails({ onSubmit, onBack }) {
  const [groupSize, setGroupSize] = useState('');
  const [error, setError] = useState('');

  // Get data from previous screens
  const mobile = localStorage.getItem('mobile') || '9876543210';
  const name = localStorage.getItem('name') || 'User';
  const shop = JSON.parse(localStorage.getItem('selected_shop')) || {
    name: 'Tushar Misal',
    shop_id: 101,
  };

  const groupOptions = [
    { label: '1-2', value: '1-2', icon: '👥' },
    { label: '3-4', value: '3-4', icon: '👥👥' },
    { label: '5-6', value: '5-6', icon: '👥👥👥' },
    { label: '7+', value: '7+', icon: '👥👥👥👥' },
  ];

  const handleGroupSelect = (value) => {
    setGroupSize(value);
    if (error) {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!groupSize) {
      setError('Please select group size');
      return;
    }

    onSubmit({
      mobile,
      name,
      groupSize,
      shop,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-orange-200">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">✅</div>
          <h1 className="text-3xl font-black text-orange-600 mb-2">
            Confirm Details
          </h1>
          <p className="text-gray-600 text-sm">
            Select your group size to get a token
          </p>
        </div>

        {/* Display Info - Read Only */}
        <div className="space-y-4 mb-6 p-4 bg-gray-50 rounded-2xl border-2 border-gray-200">
          {/* Shop Name */}
          <div>
            <p className="text-xs text-gray-600 font-semibold">🏪 SHOP</p>
            <p className="text-lg font-black text-orange-600">{shop.name}</p>
          </div>

          {/* Mobile */}
          <div>
            <p className="text-xs text-gray-600 font-semibold">📱 MOBILE</p>
            <p className="text-lg font-bold text-gray-800">+91 {mobile}</p>
          </div>

          {/* Name */}
          <div>
            <p className="text-xs text-gray-600 font-semibold">👤 NAME</p>
            <p className="text-lg font-bold text-gray-800">{name}</p>
          </div>
        </div>

        {/* Group Size Selection */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-800 mb-3">
              👥 Select Group Size
            </label>
            {error && (
              <p className="text-sm text-red-600 font-semibold mb-2">
                ✗ {error}
              </p>
            )}
            <div className="grid grid-cols-4 gap-2">
              {groupOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleGroupSelect(option.value)}
                  className={`p-3 rounded-xl font-bold transition transform hover:scale-105 ${
                    groupSize === option.value
                      ? 'bg-gradient-to-br from-orange-500 to-red-500 text-white ring-2 ring-orange-600'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{option.icon}</div>
                  <div className="text-sm">{option.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-700 font-semibold">
              💡 Your details are saved locally and secure.
            </p>
          </div>

          {/* Buttons */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-black py-4 rounded-xl transition transform hover:scale-105 text-lg shadow-lg"
          >
            🎯 GET TOKEN
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-xl transition text-lg"
          >
            ← BACK TO SHOPS
          </button>
        </form>
      </div>
    </div>
  );
}
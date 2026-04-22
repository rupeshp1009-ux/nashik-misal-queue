import { useState } from 'react';

export default function QRScanner({ onScanSuccess, onBack }) {
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleScanQR = () => {
    setScanning(true);
    setScanProgress(0);

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          completeScan();
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  const completeScan = () => {
    setTimeout(() => {
      const scannedShopId = 101;
      alert(`✅ QR Scanned Successfully!\nShop ID: ${scannedShopId}`);

      localStorage.setItem('shop_id', scannedShopId);

      onScanSuccess({
        shop_id: scannedShopId,
        shop_name: 'Tushar Misal',
      });

      setScanning(false);
      setScanProgress(0);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute w-96 h-96 bg-orange-500 rounded-full blur-3xl top-0 left-0"></div>
        <div className="absolute w-96 h-96 bg-red-500 rounded-full blur-3xl bottom-0 right-0"></div>
      </div>

      <div className="relative z-10 text-center w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <div className="text-7xl mb-4 animate-bounce">📷</div>
          <h1 className="text-4xl font-black text-white mb-3">
            Scan QR Code
          </h1>
          <p className="text-lg text-gray-300 font-semibold">
            Point your camera at the QR code at the shop entrance
          </p>
        </div>

        {/* Camera Frame */}
        <div className="relative mb-8">
          {/* Outer Frame */}
          <div className="bg-black border-4 border-orange-500 rounded-3xl aspect-square flex items-center justify-center relative overflow-hidden shadow-2xl">
            {/* Camera Placeholder */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-black">
              <div className="text-6xl opacity-40">📱</div>
            </div>

            {/* Animated Scan Line */}
            {scanning && (
              <div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent"
                style={{
                  top: `${scanProgress}%`,
                  transition: 'top 0.4s ease',
                }}
              ></div>
            )}

            {/* Corner Brackets */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-4 border-l-4 border-green-400"></div>
            <div className="absolute top-8 right-8 w-12 h-12 border-t-4 border-r-4 border-green-400"></div>
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-4 border-l-4 border-green-400"></div>
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-4 border-r-4 border-green-400"></div>

            {/* Center Square */}
            <div className="border-2 border-dashed border-orange-400 w-56 h-56 rounded-xl animate-pulse"></div>
          </div>

          {/* Scan Status Text */}
          {scanning && (
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <p className="text-green-400 font-bold animate-pulse">
                ✓ Scanning... {scanProgress}%
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mb-8 mt-12">
          <p className="text-sm text-gray-400 font-semibold mb-3">
            Align the QR code within the frame above
          </p>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 space-y-1">
            <p className="text-xs text-gray-300">✓ Ensure good lighting</p>
            <p className="text-xs text-gray-300">✓ QR code is fully visible</p>
            <p className="text-xs text-gray-300">✓ Steady your phone</p>
          </div>
        </div>

        {/* Scan Button */}
        <button
          onClick={handleScanQR}
          disabled={scanning}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-black py-5 px-8 rounded-2xl text-xl transition transform hover:scale-105 shadow-xl mb-4 border-2 border-orange-400"
        >
          {scanning ? (
            <>
              <span className="animate-spin inline-block mr-2">⟳</span>
              Scanning...
            </>
          ) : (
            <>
              🔔 SCAN QR CODE
            </>
          )}
        </button>

        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={scanning}
          className="w-full bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 text-white font-bold py-3 rounded-xl transition text-lg"
        >
          ← BACK
        </button>

        {/* Safety Info */}
        <p className="text-xs text-gray-500 font-semibold mt-6">
          🔒 Your data is encrypted and secure
        </p>
      </div>
    </div>
  );
}
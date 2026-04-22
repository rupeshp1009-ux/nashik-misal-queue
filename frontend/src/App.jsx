import { useState, useEffect } from 'react';
import Home from './components/Customer/Home';
import FindToken from './components/Customer/FindToken';
import ShopsList from './components/Customer/ShopsList';
import QRScanner from './components/Customer/QRScanner';
import ConfirmDetails from './components/Customer/ConfirmDetails';
import TokenConfirmation from './components/Customer/TokenConfirmation';
import LiveQueue from './components/Customer/LiveQueue';
import FiveMinAlert from './components/Customer/FiveMinAlert';
import FinalCall from './components/Customer/FinalCall';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [userData, setUserData] = useState({
    mobile: localStorage.getItem('mobile') || '',
    name: localStorage.getItem('name') || '',
    shop: null,
    groupSize: null,
    token: null,
  });

  // Auto-resume logic on app load
  useEffect(() => {
    const savedMobile = localStorage.getItem('mobile');
    const savedToken = localStorage.getItem('active_token');

    if (savedMobile && savedToken) {
      // User has active token, show queue status
      try {
        const token = JSON.parse(savedToken);
        setUserData((prev) => ({ ...prev, token }));
        setCurrentScreen('liveQueue');
      } catch (err) {
        console.error('Error parsing token:', err);
      }
    }
  }, []);

  // Screen Navigation Handlers
  const handleHomeSubmit = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setCurrentScreen('shopsList');
  };

  const handleCheckToken = () => {
    setCurrentScreen('findToken');
  };

  const handleTokenFound = (token) => {
    setUserData((prev) => ({ ...prev, token }));
    setCurrentScreen('liveQueue');
  };

  const handleShopSelect = (shop) => {
    if (shop.qrScan) {
      setCurrentScreen('qrScanner');
    } else {
      setUserData((prev) => ({ ...prev, shop }));
      setCurrentScreen('confirmDetails');
    }
  };

  const handleQRScanSuccess = (scannedData) => {
    setUserData((prev) => ({ ...prev, shop: scannedData }));
    setCurrentScreen('confirmDetails');
  };

  const handleConfirmDetails = (data) => {
    setUserData((prev) => ({ ...prev, ...data }));
    
    // Save token to localStorage
    const token = {
      token_no: Math.floor(Math.random() * 100) + 1,
      shop_id: data.shop.shop_id,
      shop_name: data.shop.shop_name || data.shop.name,
      group_size: data.groupSize,
      mobile: userData.mobile,
      name: userData.name,
      estimated_wait: `${Math.floor(Math.random() * 10) + 15}-${Math.floor(Math.random() * 10) + 25}`,
      created_at: new Date().toISOString(),
    };
    
    localStorage.setItem('active_token', JSON.stringify(token));
    setUserData((prev) => ({ ...prev, token }));
    setCurrentScreen('tokenConfirmation');
  };

  const handleViewStatus = () => {
    setCurrentScreen('liveQueue');
  };

  const handleDismiss = () => {
    setCurrentScreen('home');
  };

  const handleBack = () => {
    if (currentScreen === 'shopsList') {
      setCurrentScreen('home');
    } else if (currentScreen === 'qrScanner') {
      setCurrentScreen('shopsList');
    } else if (currentScreen === 'confirmDetails') {
      setCurrentScreen('shopsList');
    } else if (currentScreen === 'liveQueue') {
      setCurrentScreen('home');
    } else if (currentScreen === 'findToken') {
      setCurrentScreen('home');
    }
  };

  // Screen Indicator
  const screenNames = {
    home: 'Home',
    findToken: 'Find Token',
    shopsList: 'Select Shop',
    qrScanner: 'Scan QR',
    confirmDetails: 'Confirm Details',
    tokenConfirmation: 'Token',
    liveQueue: 'Live Queue',
    fiveMinAlert: '5-Min Alert',
    finalCall: 'Ready!',
  };

  return (
    <div className="w-full">
      {/* Screen Indicator */}
      {currentScreen !== 'home' && (
        <div className="bg-gradient-to-r from-orange-400 to-red-400 text-white px-4 py-3 flex justify-between items-center">
          <span className="font-bold text-sm">
            {screenNames[currentScreen]}
          </span>
          {currentScreen !== 'home' && (
            <button
              onClick={handleBack}
              className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-1 rounded-lg transition text-sm font-bold"
            >
              ← Back
            </button>
          )}
        </div>
      )}

      {/* Screen Rendering */}
      {currentScreen === 'home' && (
        <Home onContinue={handleHomeSubmit} onCheckToken={handleCheckToken} />
      )}

      {currentScreen === 'findToken' && (
        <FindToken onFound={handleTokenFound} onBack={handleBack} />
      )}

      {currentScreen === 'shopsList' && (
        <ShopsList onSelectShop={handleShopSelect} onBack={handleBack} />
      )}

      {currentScreen === 'qrScanner' && (
        <QRScanner onScanSuccess={handleQRScanSuccess} onBack={handleBack} />
      )}

      {currentScreen === 'confirmDetails' && (
        <ConfirmDetails onSubmit={handleConfirmDetails} onBack={handleBack} />
      )}

      {currentScreen === 'tokenConfirmation' && (
        <TokenConfirmation
          token={userData.token}
          onViewStatus={handleViewStatus}
          onDismiss={handleDismiss}
        />
      )}

      {currentScreen === 'liveQueue' && (
        <LiveQueue token={userData.token} onBack={handleBack} />
      )}

      {currentScreen === 'fiveMinAlert' && (
        <FiveMinAlert token={userData.token} />
      )}

      {currentScreen === 'finalCall' && (
        <FinalCall token={userData.token} />
      )}
    </div>
  );
}
import { useState, useEffect } from 'react';
import OwnerLogin from './OwnerLogin';
import OwnerDashboard from './OwnerDashboard';

export default function OwnerApp() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [ownerData, setOwnerData] = useState(null);

  useEffect(() => {
    const savedAuth = localStorage.getItem('owner_auth');
    if (savedAuth) {
      try {
        const owner = JSON.parse(savedAuth);
        setOwnerData(owner);
        setCurrentScreen('dashboard');
      } catch (err) {
        console.error('Error parsing owner auth:', err);
      }
    }
  }, []);

  const handleLogin = (owner) => {
    setOwnerData(owner);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('owner_auth');
    setOwnerData(null);
    setCurrentScreen('login');
  };

  return (
    <div className="w-full">
      {currentScreen === 'login' && <OwnerLogin onLogin={handleLogin} />}

      {currentScreen === 'dashboard' && ownerData && (
        <OwnerDashboard ownerData={ownerData} onLogout={handleLogout} />
      )}
    </div>
  );
}
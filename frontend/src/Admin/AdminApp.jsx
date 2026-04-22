import { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminApp() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [adminData, setAdminData] = useState(null);

  // Auto-resume on app load
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      try {
        const admin = JSON.parse(savedAuth);
        setAdminData(admin);
        setCurrentScreen('dashboard');
      } catch (err) {
        console.error('Error parsing admin auth:', err);
      }
    }
  }, []);

  const handleLogin = (admin) => {
    setAdminData(admin);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setAdminData(null);
    setCurrentScreen('login');
  };

  return (
    <div className="w-full">
      {currentScreen === 'login' && <AdminLogin onLogin={handleLogin} />}

      {currentScreen === 'dashboard' && adminData && (
        <AdminDashboard adminData={adminData} onLogout={handleLogout} />
      )}
    </div>
  );
}
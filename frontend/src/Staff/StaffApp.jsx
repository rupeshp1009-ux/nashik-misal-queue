import { useState, useEffect } from 'react';
import StaffLogin from './StaffLogin';
import StaffDashboard from './StaffDashboard';

export default function StaffApp() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [staffData, setStaffData] = useState(null);

  // Auto-resume on app load
  useEffect(() => {
    const savedAuth = localStorage.getItem('staff_auth');
    if (savedAuth) {
      try {
        const staff = JSON.parse(savedAuth);
        setStaffData(staff);
        setCurrentScreen('dashboard');
      } catch (err) {
        console.error('Error parsing staff auth:', err);
      }
    }
  }, []);

  const handleLogin = (staff) => {
    setStaffData(staff);
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('staff_auth');
    setStaffData(null);
    setCurrentScreen('login');
  };

  return (
    <div className="w-full">
      {currentScreen === 'login' && <StaffLogin onLogin={handleLogin} />}

      {currentScreen === 'dashboard' && staffData && (
        <StaffDashboard staffData={staffData} onLogout={handleLogout} />
      )}
    </div>
  );
}
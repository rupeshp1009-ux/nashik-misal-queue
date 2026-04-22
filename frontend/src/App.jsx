import { useState } from 'react';
import Home from './components/Customer/Home';
import StaffApp from './Staff/StaffApp';
import OwnerApp from './Owner/OwnerApp';
import AdminApp from './Admin/AdminApp';

export default function App() {
  const [activeApp, setActiveApp] = useState('customer');

  return (
    <div className="w-full">
      {/* RENDER ACTIVE APP */}
      {activeApp === 'customer' && <Home />}
      {activeApp === 'staff' && <StaffApp />}
      {activeApp === 'owner' && <OwnerApp />}
      {activeApp === 'admin' && <AdminApp />}

      {/* APP SWITCHER BUTTONS - BOTTOM RIGHT */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {/* CUSTOMER BUTTON */}
        <button
          onClick={() => setActiveApp('customer')}
          className={`px-3 py-2 rounded font-bold text-sm transition transform hover:scale-110 ${
            activeApp === 'customer'
              ? 'bg-orange-600 text-white shadow-lg ring-2 ring-orange-400'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
          title="Switch to Customer App"
        >
          🍛 Customer
        </button>

        {/* STAFF BUTTON */}
        <button
          onClick={() => setActiveApp('staff')}
          className={`px-3 py-2 rounded font-bold text-sm transition transform hover:scale-110 ${
            activeApp === 'staff'
              ? 'bg-blue-600 text-white shadow-lg ring-2 ring-blue-400'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
          title="Switch to Staff Panel"
        >
          👨‍🍳 Staff
        </button>

        {/* OWNER BUTTON */}
        <button
          onClick={() => setActiveApp('owner')}
          className={`px-3 py-2 rounded font-bold text-sm transition transform hover:scale-110 ${
            activeApp === 'owner'
              ? 'bg-purple-600 text-white shadow-lg ring-2 ring-purple-400'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
          title="Switch to Owner Dashboard"
        >
          🏪 Owner
        </button>

        {/* ADMIN BUTTON */}
        <button
          onClick={() => setActiveApp('admin')}
          className={`px-3 py-2 rounded font-bold text-sm transition transform hover:scale-110 ${
            activeApp === 'admin'
              ? 'bg-red-600 text-white shadow-lg ring-2 ring-red-400'
              : 'bg-gray-600 text-white hover:bg-gray-700'
          }`}
          title="Switch to Admin Panel"
        >
          🎛️ Admin
        </button>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { 
  User, 
  LayoutDashboard, 
  Users, 
  ChevronDown,
  UserCog
} from 'lucide-react';

import logo from "../assets/logo.svg";

import DashboardContent from './Dashboard/DashboardContent';
import UsersContent from './Users/UsersContent';
import PushNotificationContent from './PushNotificationContent';
import MyProfileContent from './MyProfileContent';

import VerificationContent from './VerificationContent';
import ActivationRequestContent from './ActivationRequestContent';

import AdminContent from './Admin/AdminContent';

export default function Dashboard() {
  const [activePage, setActivePage] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const sidebarNavItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', name: 'User', icon: Users },
    { id: 'admin-management', name: 'Admin', icon: UserCog },
    // { id: 'verification', name: 'Verification', icon: ShieldCheck }, 
    // { id: 'activation-request', name: 'Activication Request', icon: Clock }, 
    // { id: 'push-notification', name: 'Push Notif', icon: Bell },
  ];

  const renderContent = () => {
    switch(activePage) {
      case 'dashboard': return <DashboardContent />;
      case 'users': return <UsersContent />;
      case 'verification': return <VerificationContent />;
      case 'activation-request': return <ActivationRequestContent />;
      case 'push-notification': return <PushNotificationContent />;
      case 'admin-management': return <AdminContent />;
      case 'my-profile': return <MyProfileContent />;
      default: return <DashboardContent />;
    }
  };

  const SidebarButton = ({ id, name, Icon }) => (
    <button
      onClick={() => setActivePage(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
        activePage === id 
          ? 'bg-white/10 text-white'
          : 'hover:bg-white/5 text-white/80'
      }`}
    >
      <Icon size={20} />
      <span>{name}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-[#b31f5e] to-[#d3543c] text-white flex flex-col">
        <div className="p-6 border-b border-white/10 flex gap-3">
          <img src={logo} alt="" className="w-10 h-10"/>
          <h1 className="text-2xl font-bold tracking-wide">SIAP NIKAH</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {sidebarNavItems.map(item => (
            <SidebarButton 
              key={item.id}
              id={item.id}
              name={item.name}
              Icon={item.icon}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 text-white/60 text-sm">
          © 2025 Siap Nikah
        </div>
      </aside>

      {/* TOP NAV */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-end px-6 py-4">

            {/* Account Menu */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#b31f5e] to-[#d3543c] flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <span className="font-medium text-gray-700">Account</span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2 z-50">

                  <button
                    onClick={() => {
                      setActivePage('my-profile');
                      setShowProfileMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </button>

                  <div className="border-t my-2"></div>

                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

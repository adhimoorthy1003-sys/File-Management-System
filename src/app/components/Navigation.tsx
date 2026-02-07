import { LayoutDashboard, FileText, Users, Bell, BarChart3, Eye, LogOut, Building2, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  userRole: 'admin' | 'officer' | 'citizen' | null;
}

export default function Navigation({ currentScreen, onNavigate, onLogout, userRole }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = userRole === 'admin' ? [
    { id: 'admin', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'files', label: 'Files', icon: FileText },
    { id: 'officers', label: 'Officers', icon: Users },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ] : userRole === 'officer' ? [
    { id: 'files', label: 'My Files', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: Bell },
  ] : [
    { id: 'citizen', label: 'Track File', icon: Eye },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-indigo-700 text-white rounded-lg p-2">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-800">Gov File System</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Tamil Nadu</p>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-700 text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 ml-4 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 min-w-[44px] min-h-[44px] rounded-lg text-slate-600 hover:bg-slate-100 touch-manipulation flex items-center justify-center"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-700 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
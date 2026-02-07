import { useState } from 'react';
import LoginScreen from '@/app/components/LoginScreen';
import AdminDashboard from '@/app/components/AdminDashboard';
import FileWorkflowScreen from '@/app/components/FileWorkflowScreen';
import OfficerWorkloadScreen from '@/app/components/OfficerWorkloadScreen';
import CitizenPortalScreen from '@/app/components/CitizenPortalScreen';
import AlertsScreen from '@/app/components/AlertsScreen';
import ReportsScreen from '@/app/components/ReportsScreen';

type Screen = 'login' | 'admin' | 'files' | 'officers' | 'citizen' | 'alerts' | 'reports';
type UserRole = 'officer' | 'admin' | 'citizen' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    if (role === 'admin') {
      setCurrentScreen('admin');
    } else if (role === 'officer') {
      setCurrentScreen('files');
    } else if (role === 'citizen') {
      setCurrentScreen('citizen');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'admin':
        return <AdminDashboard onNavigate={setCurrentScreen} onLogout={handleLogout} />;
      case 'files':
        return <FileWorkflowScreen onNavigate={setCurrentScreen} onLogout={handleLogout} userRole={userRole} />;
      case 'officers':
        return <OfficerWorkloadScreen onNavigate={setCurrentScreen} onLogout={handleLogout} />;
      case 'citizen':
        return <CitizenPortalScreen onNavigate={setCurrentScreen} onLogout={handleLogout} />;
      case 'alerts':
        return <AlertsScreen onNavigate={setCurrentScreen} onLogout={handleLogout} />;
      case 'reports':
        return <ReportsScreen onNavigate={setCurrentScreen} onLogout={handleLogout} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-slate-50 overflow-x-hidden">
      {renderScreen()}
    </div>
  );
}

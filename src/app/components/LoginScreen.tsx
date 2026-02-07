import { Building2, Shield, Users } from 'lucide-react';
import { Card } from '@/app/components/ui/card';

interface LoginScreenProps {
  onLogin: (role: 'officer' | 'admin' | 'citizen') => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-4 py-8">
      {/* Government Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <div className="bg-indigo-700 text-white rounded-full p-4 sm:p-6 shadow-lg">
            <Building2 className="w-12 h-12 sm:w-16 sm:h-16" />
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2 px-4">
          Government File Management System
        </h1>
        <p className="text-base sm:text-lg text-slate-600 px-4">
          Digital Transformation for Efficient Governance
        </p>
        <div className="mt-4">
          <div className="bg-white px-4 sm:px-6 py-2 rounded-full shadow-sm border border-slate-200 inline-block">
            <p className="text-xs sm:text-sm text-slate-600">
              <span className="font-semibold text-indigo-700">Tamil Nadu</span> • Taluk Office System
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-5xl w-full">
        {/* Admin Login */}
        <Card
          onClick={() => onLogin('admin')}
          className="p-6 sm:p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-slate-200 hover:border-indigo-400 bg-white"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 text-indigo-700 rounded-full p-4 sm:p-5 mb-4">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Admin Login</h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-4">
              Dashboard, Analytics & Department Management
            </p>
            <div className="mt-auto pt-4 w-full">
              <button className="w-full bg-indigo-700 hover:bg-indigo-800 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Access Dashboard
              </button>
            </div>
          </div>
        </Card>

        {/* Officer Login */}
        <Card
          onClick={() => onLogin('officer')}
          className="p-6 sm:p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-slate-200 hover:border-emerald-400 bg-white"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-emerald-100 text-emerald-700 rounded-full p-4 sm:p-5 mb-4">
              <Users className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Officer Login</h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-4">
              File Processing & Workflow Management
            </p>
            <div className="mt-auto pt-4 w-full">
              <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base">
                View Files
              </button>
            </div>
          </div>
        </Card>

        {/* Citizen Portal */}
        <Card
          onClick={() => onLogin('citizen')}
          className="p-6 sm:p-8 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-2 border-slate-200 hover:border-blue-400 bg-white"
        >
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-700 rounded-full p-4 sm:p-5 mb-4">
              <Building2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Citizen Portal</h3>
            <p className="text-slate-600 text-xs sm:text-sm mb-4">
              Track Your Application Status Transparently
            </p>
            <div className="mt-auto pt-4 w-full">
              <button className="w-full bg-blue-700 hover:bg-blue-800 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Track File
              </button>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <div className="mt-8 sm:mt-12 text-center">
        <p className="text-xs sm:text-sm text-slate-500 px-4">
          Secured by Government of Tamil Nadu • Digital India Initiative
        </p>
      </div>
    </div>
  );
}
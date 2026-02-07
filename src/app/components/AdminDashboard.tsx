import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FileText, Clock, AlertTriangle, TrendingUp, Award, FileCheck, Users, Activity } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import Navigation from '@/app/components/Navigation';

interface AdminDashboardProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const monthlyData = [
  { month: 'Jan', files: 245 },
  { month: 'Feb', files: 298 },
  { month: 'Mar', files: 334 },
  { month: 'Apr', files: 389 },
  { month: 'May', files: 412 },
  { month: 'Jun', files: 467 },
];

const departmentData = [
  { dept: 'Revenue', files: 156, color: '#4f46e5' },
  { dept: 'Planning', files: 134, color: '#0891b2' },
  { dept: 'Welfare', files: 98, color: '#059669' },
  { dept: 'Legal', files: 87, color: '#7c3aed' },
  { dept: 'Admin', files: 76, color: '#db2777' },
];

export default function AdminDashboard({ onNavigate, onLogout }: AdminDashboardProps) {
  const transparencyScore = 94;
  const avgDisposalTime = 3.2;
  const improvementRate = 28;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentScreen="admin" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        userRole="admin"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Department Dashboard</h1>
          <p className="text-sm sm:text-base text-slate-600">Real-time performance monitoring and analytics</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Files */}
          <Card className="p-5 sm:p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-indigo-100 text-indigo-700 rounded-lg p-3">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded">
                +12%
              </span>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Total Files</p>
              <p className="text-3xl font-bold text-slate-800">1,247</p>
              <p className="text-xs text-slate-500 mt-2">This month</p>
            </div>
          </Card>

          {/* Files Pending */}
          <Card className="p-5 sm:p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-amber-100 text-amber-700 rounded-lg p-3">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-amber-600 text-sm font-medium bg-amber-50 px-2 py-1 rounded">
                Active
              </span>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Files Pending</p>
              <p className="text-3xl font-bold text-slate-800">187</p>
              <p className="text-xs text-slate-500 mt-2">Across all departments</p>
            </div>
          </Card>

          {/* Files Delayed */}
          <Card className="p-5 sm:p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-red-100 text-red-700 rounded-lg p-3">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="text-red-600 text-sm font-medium bg-red-50 px-2 py-1 rounded">
                Critical
              </span>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Files Delayed</p>
              <p className="text-3xl font-bold text-slate-800">23</p>
              <p className="text-xs text-slate-500 mt-2">SLA breach risk</p>
            </div>
          </Card>

          {/* Avg Disposal Time */}
          <Card className="p-5 sm:p-6 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-emerald-100 text-emerald-700 rounded-lg p-3">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded">
                -{improvementRate}%
              </span>
            </div>
            <div>
              <p className="text-slate-600 text-sm mb-1">Avg Disposal Time</p>
              <p className="text-2xl sm:text-3xl font-bold text-slate-800">{avgDisposalTime} <span className="text-base sm:text-lg">days</span></p>
              <p className="text-xs text-slate-500 mt-2">Down from 4.5 days</p>
            </div>
          </Card>
        </div>

        {/* Performance Score and Transparency */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Transparency Score */}
          <Card className="p-5 sm:p-6 bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-0 shadow-lg">
            <div className="flex items-center mb-4">
              <Award className="w-6 sm:w-8 h-6 sm:h-8 mr-3" />
              <h3 className="text-lg sm:text-xl font-bold">Transparency Score</h3>
            </div>
            <div className="text-center py-4">
              <div className="text-5xl sm:text-6xl font-bold mb-2">{transparencyScore}</div>
              <p className="text-indigo-200 text-sm">out of 100</p>
              <div className="mt-4 bg-white/20 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-500"
                  style={{ width: `${transparencyScore}%` }}
                />
              </div>
            </div>
            <p className="text-indigo-100 text-sm mt-4">
              ⭐ Excellent - Meeting all transparency benchmarks
            </p>
          </Card>

          {/* Performance Badge */}
          <Card className="p-5 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center mb-4">
              <FileCheck className="w-6 h-6 text-emerald-600 mr-2" />
              <h3 className="text-lg font-bold text-slate-800">Performance Rating</h3>
            </div>
            <div className="space-y-4 mt-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">File Efficiency</span>
                  <span className="text-sm font-semibold text-emerald-600">Excellent</span>
                </div>
                <div className="bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Officer Accountability</span>
                  <span className="text-sm font-semibold text-emerald-600">Excellent</span>
                </div>
                <div className="bg-slate-100 rounded-full h-2">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-600">Citizen Satisfaction</span>
                  <span className="text-sm font-semibold text-blue-600">Good</span>
                </div>
                <div className="bg-slate-100 rounded-full h-2">
                  <div className="bg-blue-500 h-full rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
            </div>
          </Card>

          {/* Before vs After */}
          <Card className="p-5 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-indigo-600 mr-2" />
              <h3 className="text-lg font-bold text-slate-800">Efficiency Impact</h3>
            </div>
            <div className="space-y-6 mt-6">
              <div>
                <p className="text-xs text-slate-500 mb-2">BEFORE DIGITALIZATION</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-red-600 mr-2">4.5</span>
                  <span className="text-sm text-slate-600">days avg</span>
                </div>
              </div>
              <div className="border-t border-slate-200 pt-4">
                <p className="text-xs text-slate-500 mb-2">AFTER DIGITALIZATION</p>
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-emerald-600 mr-2">3.2</span>
                  <span className="text-sm text-slate-600">days avg</span>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <p className="text-sm font-semibold text-emerald-800">
                  28% Faster Processing
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Monthly File Disposal Trend */}
          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">Monthly File Disposal Trend</h3>
              <p className="text-xs sm:text-sm text-slate-600">Files processed per month</p>
            </div>
            <div className="h-64 sm:h-auto">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="files" 
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    dot={{ fill: '#4f46e5', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Department-wise Performance */}
          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">Department-wise Performance</h3>
              <p className="text-xs sm:text-sm text-slate-600">Files processed this month</p>
            </div>
            <div className="h-64 sm:h-auto">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={departmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="dept" 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="files" radius={[8, 8, 0, 0]}>
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Quick Insights */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 bg-blue-50 border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-2">🏆 Best Performing Department</h4>
            <p className="text-blue-800 text-sm">
              <strong>Revenue Department</strong> - 156 files processed with avg 2.8 days disposal time
            </p>
          </Card>
          <Card className="p-4 sm:p-6 bg-amber-50 border border-amber-200">
            <h4 className="font-semibold text-amber-900 mb-2">⚠️ Bottleneck Alert</h4>
            <p className="text-amber-800 text-sm">
              <strong>Legal Department</strong> - 12 files pending for more than 5 days. Requires attention.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
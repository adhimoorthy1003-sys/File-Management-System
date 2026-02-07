import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, FileText, TrendingUp, Calendar, Award, AlertCircle } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import Navigation from '@/app/components/Navigation';

interface ReportsScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

const performanceData = [
  { month: 'Jul', target: 400, actual: 389 },
  { month: 'Aug', target: 400, actual: 412 },
  { month: 'Sep', target: 400, actual: 445 },
  { month: 'Oct', target: 400, actual: 478 },
  { month: 'Nov', target: 400, actual: 502 },
  { month: 'Dec', target: 400, actual: 534 },
  { month: 'Jan', target: 400, actual: 467 },
];

const departmentEfficiency = [
  { dept: 'Admin', efficiency: 97 },
  { dept: 'Revenue', efficiency: 92 },
  { dept: 'Planning', efficiency: 88 },
  { dept: 'Welfare', efficiency: 82 },
  { dept: 'Legal', efficiency: 70 },
];

const fileDistribution = [
  { name: 'Completed', value: 1060, color: '#059669' },
  { name: 'In Progress', value: 187, color: '#3b82f6' },
  { name: 'Delayed', value: 23, color: '#f59e0b' },
];

const bottleneckData = [
  { stage: 'Reception', avgDays: 0.5 },
  { stage: 'Verification', avgDays: 1.2 },
  { stage: 'Processing', avgDays: 2.8 },
  { stage: 'Review', avgDays: 1.5 },
  { stage: 'Approval', avgDays: 1.1 },
];

export default function ReportsScreen({ onNavigate, onLogout }: ReportsScreenProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentScreen="reports" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        userRole="admin"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Reports & Analytics</h1>
            <p className="text-sm sm:text-base text-slate-600">Comprehensive performance insights and data analysis</p>
          </div>
          <button className="flex items-center justify-center sm:justify-start space-x-2 bg-indigo-700 hover:bg-indigo-800 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors shadow-md">
            <Download className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Download Report</span>
          </button>
        </div>

        {/* Report Period */}
        <Card className="p-4 sm:p-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white mb-6 sm:mb-8 border-0 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Calendar className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
              <div>
                <p className="text-indigo-100 text-xs sm:text-sm">Reporting Period</p>
                <p className="text-xl sm:text-2xl font-bold">January 2026</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-indigo-100 text-xs sm:text-sm">Report Generated</p>
              <p className="text-sm sm:text-base font-semibold">January 22, 2026 • 10:30 AM</p>
            </div>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-emerald-100 text-emerald-700 rounded-lg p-2 sm:p-3">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mb-1">Total Files Processed</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">1,247</p>
            <p className="text-xs text-emerald-600 mt-2">↑ 12% from last month</p>
          </Card>

          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-100 text-blue-700 rounded-lg p-2 sm:p-3">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mb-1">Avg Efficiency Score</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">86%</p>
            <p className="text-xs text-blue-600 mt-2">↑ 5% improvement</p>
          </Card>

          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-indigo-100 text-indigo-700 rounded-lg p-2 sm:p-3">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mb-1">Completion Rate</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">85%</p>
            <p className="text-xs text-indigo-600 mt-2">Within SLA</p>
          </Card>

          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-amber-100 text-amber-700 rounded-lg p-2 sm:p-3">
                <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mb-1">Delay Rate</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">1.8%</p>
            <p className="text-xs text-emerald-600 mt-2">↓ 0.5% reduction</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Performance Trend */}
          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">Monthly Performance Trend</h3>
              <p className="text-xs sm:text-sm text-slate-600">Target vs Actual file processing</p>
            </div>
            <div className="h-64 sm:h-auto">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceData}>
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
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#94a3b8" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Target"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#4f46e5" 
                    strokeWidth={3}
                    dot={{ fill: '#4f46e5', r: 5 }}
                    name="Actual"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Department Efficiency */}
          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">Department Efficiency Scores</h3>
              <p className="text-xs sm:text-sm text-slate-600">Performance comparison across departments</p>
            </div>
            <div className="h-64 sm:h-auto">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentEfficiency} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    type="number"
                    domain={[0, 100]}
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                  />
                  <YAxis 
                    type="category"
                    dataKey="dept"
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
                  <Bar dataKey="efficiency" radius={[0, 8, 8, 0]}>
                    {departmentEfficiency.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.efficiency >= 90 ? '#059669' : entry.efficiency >= 80 ? '#3b82f6' : '#f59e0b'} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* File Distribution */}
          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">File Status Distribution</h3>
              <p className="text-xs sm:text-sm text-slate-600">Current state of all files</p>
            </div>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={fileDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {fileDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
              {fileDistribution.map((item) => (
                <div key={item.name} className="text-center">
                  <div className="flex items-center justify-center space-x-1 sm:space-x-2 mb-1">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-slate-600 truncate">{item.name}</span>
                  </div>
                  <p className="text-sm sm:text-base font-bold text-slate-800">{item.value}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Processing Bottlenecks */}
          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">Processing Stage Analysis</h3>
              <p className="text-xs sm:text-sm text-slate-600">Average time spent at each stage</p>
            </div>
            <div className="h-64 sm:h-auto">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={bottleneckData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis 
                    dataKey="stage" 
                    tick={{ fill: '#64748b', fontSize: 11 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    angle={-15}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis 
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    axisLine={{ stroke: '#cbd5e1' }}
                    label={{ value: 'Days', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                  />
                  <Bar dataKey="avgDays" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Insights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6 bg-emerald-50 border border-emerald-200">
            <div className="flex items-start space-x-3 mb-3">
              <Award className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-700 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-emerald-900">Best Performing Department</h3>
            </div>
            <p className="text-xs sm:text-sm text-emerald-800 mb-2">
              <strong>Admin Department</strong> leads with 97% efficiency score
            </p>
            <ul className="text-xs text-emerald-700 space-y-1">
              <li>• Avg processing time: 2.3 days</li>
              <li>• 45 files completed this month</li>
              <li>• Zero SLA breaches</li>
            </ul>
          </Card>

          <Card className="p-4 sm:p-6 bg-amber-50 border border-amber-200">
            <div className="flex items-start space-x-3 mb-3">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-amber-900">Bottleneck Identified</h3>
            </div>
            <p className="text-xs sm:text-sm text-amber-800 mb-2">
              <strong>Processing Stage</strong> takes 2.8 days on average
            </p>
            <ul className="text-xs text-amber-700 space-y-1">
              <li>• 40% of total processing time</li>
              <li>• Recommend workflow optimization</li>
              <li>• Consider additional resources</li>
            </ul>
          </Card>

          <Card className="p-4 sm:p-6 bg-blue-50 border border-blue-200">
            <div className="flex items-start space-x-3 mb-3">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-blue-700 shrink-0" />
              <h3 className="text-sm sm:text-base font-bold text-blue-900">Improvement Highlights</h3>
            </div>
            <p className="text-xs sm:text-sm text-blue-800 mb-2">
              <strong>28% faster</strong> than pre-digitalization
            </p>
            <ul className="text-xs text-blue-700 space-y-1">
              <li>• Transparency score: 94/100</li>
              <li>• Citizen satisfaction up 35%</li>
              <li>• Officer accountability improved</li>
            </ul>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4">Actionable Recommendations</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 pb-4 border-b border-slate-200">
              <div className="bg-indigo-100 rounded-full p-1 mt-1 shrink-0">
                <div className="w-2 h-2 bg-indigo-600 rounded-full" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-slate-800 mb-1">1. Redistribute Legal Department Workload</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Legal dept has 70% efficiency. Transfer 5-7 files to other departments to balance workload.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 pb-4 border-b border-slate-200">
              <div className="bg-indigo-100 rounded-full p-1 mt-1 shrink-0">
                <div className="w-2 h-2 bg-indigo-600 rounded-full" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-slate-800 mb-1">2. Optimize Processing Stage</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Processing stage takes 2.8 days. Implement automation or add resources to reduce by 30%.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-indigo-100 rounded-full p-1 mt-1 shrink-0">
                <div className="w-2 h-2 bg-indigo-600 rounded-full" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-semibold text-slate-800 mb-1">3. Recognize Top Performers</h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Officers V. Rajan and P. Meena have 96%+ efficiency. Consider them for excellence awards.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
import { Users, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import Navigation from '@/app/components/Navigation';

interface OfficerWorkloadScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

interface OfficerData {
  id: string;
  name: string;
  department: string;
  activeFiles: number;
  avgHandlingTime: number;
  workload: 'Low' | 'Medium' | 'High';
  completedThisMonth: number;
  efficiency: number;
}

const officersData: OfficerData[] = [
  { id: 'OFF-001', name: 'S. Kumar', department: 'Revenue', activeFiles: 8, avgHandlingTime: 2.8, workload: 'Medium', completedThisMonth: 42, efficiency: 95 },
  { id: 'OFF-002', name: 'M. Priya', department: 'Planning', activeFiles: 6, avgHandlingTime: 3.1, workload: 'Medium', completedThisMonth: 38, efficiency: 91 },
  { id: 'OFF-003', name: 'R. Selvam', department: 'Welfare', activeFiles: 12, avgHandlingTime: 4.5, workload: 'High', completedThisMonth: 28, efficiency: 76 },
  { id: 'OFF-004', name: 'A. Lakshmi', department: 'Legal', activeFiles: 15, avgHandlingTime: 5.2, workload: 'High', completedThisMonth: 22, efficiency: 68 },
  { id: 'OFF-005', name: 'V. Rajan', department: 'Admin', activeFiles: 5, avgHandlingTime: 2.3, workload: 'Low', completedThisMonth: 45, efficiency: 97 },
  { id: 'OFF-006', name: 'K. Anand', department: 'Welfare', activeFiles: 7, avgHandlingTime: 3.4, workload: 'Medium', completedThisMonth: 35, efficiency: 88 },
  { id: 'OFF-007', name: 'P. Meena', department: 'Revenue', activeFiles: 4, avgHandlingTime: 2.6, workload: 'Low', completedThisMonth: 48, efficiency: 96 },
  { id: 'OFF-008', name: 'V. Ganesh', department: 'Legal', activeFiles: 9, avgHandlingTime: 4.8, workload: 'High', completedThisMonth: 25, efficiency: 72 },
];

export default function OfficerWorkloadScreen({ onNavigate, onLogout }: OfficerWorkloadScreenProps) {
  const getWorkloadColor = (workload: string) => {
    switch (workload) {
      case 'Low':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Medium':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'High':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 90) return 'text-emerald-600';
    if (efficiency >= 75) return 'text-blue-600';
    return 'text-amber-600';
  };

  const avgWorkload = (officersData.reduce((sum, o) => sum + o.activeFiles, 0) / officersData.length).toFixed(1);
  const totalActive = officersData.reduce((sum, o) => sum + o.activeFiles, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentScreen="officers" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        userRole="admin"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Officer Workload Management</h1>
          <p className="text-sm sm:text-base text-slate-600">Monitor workload distribution and officer performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-indigo-100 text-indigo-700 rounded-lg p-2 sm:p-3">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mb-1">Total Officers</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">{officersData.length}</p>
          </Card>

          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-blue-100 text-blue-700 rounded-lg p-2 sm:p-3">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mb-1">Avg Active Files</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">{avgWorkload}</p>
          </Card>

          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-emerald-100 text-emerald-700 rounded-lg p-2 sm:p-3">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mb-1">Total Active Files</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">{totalActive}</p>
          </Card>

          <Card className="p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="bg-red-100 text-red-700 rounded-lg p-2 sm:p-3">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mb-1">Overloaded Officers</p>
            <p className="text-2xl sm:text-3xl font-bold text-slate-800">
              {officersData.filter(o => o.workload === 'High').length}
            </p>
          </Card>
        </div>

        {/* Workload Distribution Alert */}
        <Card className="p-4 sm:p-5 bg-amber-50 border border-amber-200 mb-6 sm:mb-8">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-amber-900 mb-1">Workload Imbalance Detected</h3>
              <p className="text-xs sm:text-sm text-amber-800">
                3 officers have high workload (≥12 files). Consider redistribution to improve efficiency and reduce delays.
              </p>
            </div>
          </div>
        </Card>

        {/* Officers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {officersData.map((officer) => (
            <Card 
              key={officer.id}
              className="bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1 truncate">{officer.name}</h3>
                    <p className="text-xs sm:text-sm text-slate-600">{officer.department}</p>
                    <p className="text-xs text-slate-500 mt-1 font-mono">{officer.id}</p>
                  </div>
                  <Badge className={`${getWorkloadColor(officer.workload)} border text-xs shrink-0 ml-2`}>
                    {officer.workload}
                  </Badge>
                </div>

                {/* Stats Grid */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Active Files */}
                  <div className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600 font-medium">ACTIVE FILES</span>
                      <span className="text-xl sm:text-2xl font-bold text-slate-800">{officer.activeFiles}</span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          officer.workload === 'High' ? 'bg-red-500' :
                          officer.workload === 'Medium' ? 'bg-blue-500' :
                          'bg-emerald-500'
                        }`}
                        style={{ width: `${Math.min((officer.activeFiles / 15) * 100, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-blue-600 font-medium mb-1">AVG HANDLING</p>
                      <p className="text-base sm:text-lg font-bold text-blue-900">
                        {officer.avgHandlingTime} <span className="text-xs">days</span>
                      </p>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2 sm:p-3">
                      <p className="text-xs text-emerald-600 font-medium mb-1">COMPLETED</p>
                      <p className="text-base sm:text-lg font-bold text-emerald-900">
                        {officer.completedThisMonth}
                      </p>
                    </div>
                  </div>

                  {/* Efficiency Score */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-slate-600 font-medium">EFFICIENCY SCORE</span>
                      <span className={`text-base sm:text-lg font-bold ${getEfficiencyColor(officer.efficiency)}`}>
                        {officer.efficiency}%
                      </span>
                    </div>
                    <div className="bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          officer.efficiency >= 90 ? 'bg-emerald-500' :
                          officer.efficiency >= 75 ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`}
                        style={{ width: `${officer.efficiency}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Action needed for high workload */}
                {officer.workload === 'High' && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-xs text-red-700 font-medium">
                      ⚠️ Consider redistributing files to reduce workload
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Insights */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <Card className="p-4 sm:p-6 bg-emerald-50 border border-emerald-200">
            <h4 className="text-sm sm:text-base font-semibold text-emerald-900 mb-2">🏆 Top Performer</h4>
            <p className="text-emerald-800 text-xs sm:text-sm">
              <strong>V. Rajan (Admin)</strong> - 97% efficiency with 2.3 days avg handling time. Excellent performance!
            </p>
          </Card>
          <Card className="p-4 sm:p-6 bg-blue-50 border border-blue-200">
            <h4 className="text-sm sm:text-base font-semibold text-blue-900 mb-2">💡 Recommendation</h4>
            <p className="text-blue-800 text-xs sm:text-sm">
              Redistribute 4-5 files from Legal Dept to other departments to achieve balanced workload distribution.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
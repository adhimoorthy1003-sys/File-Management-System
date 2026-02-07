import { AlertTriangle, Clock, TrendingUp, XCircle, Bell } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import Navigation from '@/app/components/Navigation';

interface AlertsScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'escalation' | 'sla-breach';
  fileId: string;
  subject: string;
  department: string;
  officer: string;
  daysPending: number;
  priority: 'High' | 'Medium' | 'Low';
  message: string;
  timestamp: string;
}

const alertsData: Alert[] = [
  {
    id: 'ALT-001',
    type: 'critical',
    fileId: 'FN-2024-004',
    subject: 'Legal Opinion Request',
    department: 'Legal',
    officer: 'A. Lakshmi',
    daysPending: 8,
    priority: 'High',
    message: 'File pending for 8 days. Critical delay affecting citizen services.',
    timestamp: '2 hours ago',
  },
  {
    id: 'ALT-002',
    type: 'sla-breach',
    fileId: 'FN-2024-003',
    subject: 'Pension Disbursement',
    department: 'Welfare',
    officer: 'R. Selvam',
    daysPending: 6,
    priority: 'High',
    message: 'SLA breach imminent. Standard processing time is 5 days.',
    timestamp: '4 hours ago',
  },
  {
    id: 'ALT-003',
    type: 'warning',
    fileId: 'FN-2024-007',
    subject: 'Road Development Clearance',
    department: 'Planning',
    officer: 'M. Priya',
    daysPending: 5,
    priority: 'High',
    message: 'Approaching SLA deadline. Requires immediate attention.',
    timestamp: '6 hours ago',
  },
  {
    id: 'ALT-004',
    type: 'escalation',
    fileId: 'FN-2024-012',
    subject: 'Property Tax Dispute',
    department: 'Revenue',
    officer: 'S. Kumar',
    daysPending: 7,
    priority: 'Medium',
    message: 'Auto-escalated to department head for review.',
    timestamp: '1 day ago',
  },
  {
    id: 'ALT-005',
    type: 'warning',
    fileId: 'FN-2024-015',
    subject: 'Building Permit Extension',
    department: 'Planning',
    officer: 'V. Ganesh',
    daysPending: 4,
    priority: 'Medium',
    message: 'File pending for 4 days. Monitor closely.',
    timestamp: '1 day ago',
  },
];

export default function AlertsScreen({ onNavigate, onLogout }: AlertsScreenProps) {
  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-50 border-red-300';
      case 'sla-breach':
        return 'bg-orange-50 border-orange-300';
      case 'warning':
        return 'bg-amber-50 border-amber-300';
      case 'escalation':
        return 'bg-blue-50 border-blue-300';
      default:
        return 'bg-slate-50 border-slate-300';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'sla-breach':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'escalation':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  const getAlertBadgeColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-600 text-white';
      case 'sla-breach':
        return 'bg-orange-600 text-white';
      case 'warning':
        return 'bg-amber-600 text-white';
      case 'escalation':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-slate-600 text-white';
    }
  };

  const criticalCount = alertsData.filter(a => a.type === 'critical').length;
  const slaBreachCount = alertsData.filter(a => a.type === 'sla-breach').length;
  const warningCount = alertsData.filter(a => a.type === 'warning').length;
  const escalationCount = alertsData.filter(a => a.type === 'escalation').length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentScreen="alerts" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        userRole="admin"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">Alerts & Accountability</h1>
          <p className="text-sm sm:text-base text-slate-600">Monitor delayed files and SLA breaches in real-time</p>
        </div>

        {/* Alert Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="p-4 sm:p-6 bg-white border-l-4 border-l-red-500 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-red-100 text-red-700 rounded-lg p-2 sm:p-3">
                <XCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-red-600">{criticalCount}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 font-semibold">Critical Delays</p>
            <p className="text-xs text-slate-500 mt-1">Requires immediate action</p>
          </Card>

          <Card className="p-4 sm:p-6 bg-white border-l-4 border-l-orange-500 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-orange-100 text-orange-700 rounded-lg p-2 sm:p-3">
                <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-orange-600">{slaBreachCount}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 font-semibold">SLA Breaches</p>
            <p className="text-xs text-slate-500 mt-1">Service level at risk</p>
          </Card>

          <Card className="p-4 sm:p-6 bg-white border-l-4 border-l-amber-500 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-amber-100 text-amber-700 rounded-lg p-2 sm:p-3">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-amber-600">{warningCount}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 font-semibold">Warnings</p>
            <p className="text-xs text-slate-500 mt-1">Approaching deadline</p>
          </Card>

          <Card className="p-4 sm:p-6 bg-white border-l-4 border-l-blue-500 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="bg-blue-100 text-blue-700 rounded-lg p-2 sm:p-3">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-blue-600">{escalationCount}</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 font-semibold">Escalations</p>
            <p className="text-xs text-slate-500 mt-1">Auto-escalated to seniors</p>
          </Card>
        </div>

        {/* Alert Actions Info */}
        <Card className="p-4 sm:p-5 bg-indigo-50 border border-indigo-200 mb-6 sm:mb-8">
          <div className="flex items-start space-x-3">
            <Bell className="w-5 h-5 text-indigo-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-indigo-900 mb-1">Automated Alert System</h3>
              <p className="text-xs sm:text-sm text-indigo-800">
                All officers are notified via email and SMS for delays. Files exceeding 7 days are auto-escalated to department heads.
                This ensures accountability and timely processing.
              </p>
            </div>
          </div>
        </Card>

        {/* Alerts List */}
        <div className="space-y-4">
          {alertsData.map((alert) => (
            <Card 
              key={alert.id}
              className={`p-4 sm:p-6 border-2 ${getAlertColor(alert.type)} shadow-sm hover:shadow-md transition-all`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                  {/* Alert Icon */}
                  <div className="mt-1 shrink-0">
                    {getAlertIcon(alert.type)}
                  </div>

                  {/* Alert Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 gap-2">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className={`${getAlertBadgeColor(alert.type)} uppercase text-xs px-2 py-1`}>
                            {alert.type.replace('-', ' ')}
                          </Badge>
                          <span className="font-mono text-xs sm:text-sm font-semibold text-indigo-700">
                            {alert.fileId}
                          </span>
                          <Badge className="bg-slate-100 text-slate-700 border border-slate-300 text-xs">
                            {alert.priority} Priority
                          </Badge>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-1">{alert.subject}</h3>
                        <p className="text-xs sm:text-sm text-slate-700 mb-3">{alert.message}</p>
                      </div>
                      <span className="text-xs text-slate-500 whitespace-nowrap">
                        {alert.timestamp}
                      </span>
                    </div>

                    {/* File Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 bg-white/60 rounded-lg p-3 sm:p-4 border border-slate-200">
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">DEPARTMENT</p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800">{alert.department}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">CURRENT OFFICER</p>
                        <p className="text-xs sm:text-sm font-semibold text-slate-800">{alert.officer}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium mb-1">DAYS PENDING</p>
                        <p className="text-xs sm:text-sm font-bold text-red-700">{alert.daysPending} days</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-4">
                      <button className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                        View File Details
                      </button>
                      <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                        Send Reminder
                      </button>
                      {alert.type !== 'escalation' && (
                        <button className="bg-white hover:bg-slate-50 text-red-700 border border-red-300 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors">
                          Escalate Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* SLA Guidelines */}
        <Card className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white border border-slate-200 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-4">SLA Guidelines & Escalation Policy</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-slate-700 mb-3">Standard Processing Times</h4>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-600">Revenue Department</span>
                  <span className="font-semibold text-slate-800">5 days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-600">Planning Department</span>
                  <span className="font-semibold text-slate-800">7 days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-600">Welfare Department</span>
                  <span className="font-semibold text-slate-800">5 days</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-200">
                  <span className="text-slate-600">Legal Department</span>
                  <span className="font-semibold text-slate-800">10 days</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-slate-700 mb-3">Auto-Escalation Rules</h4>
              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start space-x-2">
                  <div className="bg-amber-500 rounded-full w-2 h-2 mt-1.5 shrink-0" />
                  <p><strong>4 days:</strong> Warning notification to officer</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-orange-500 rounded-full w-2 h-2 mt-1.5 shrink-0" />
                  <p><strong>6 days:</strong> Email to officer and supervisor</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-red-500 rounded-full w-2 h-2 mt-1.5 shrink-0" />
                  <p><strong>7+ days:</strong> Auto-escalate to department head</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-purple-500 rounded-full w-2 h-2 mt-1.5 shrink-0" />
                  <p><strong>10+ days:</strong> Executive review required</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
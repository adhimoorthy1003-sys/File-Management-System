import { useState } from 'react';
import { Clock, AlertCircle, CheckCircle2, Eye, Filter } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import Navigation from '@/app/components/Navigation';
import FileTimeline from '@/app/components/FileTimeline';

interface FileWorkflowScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  userRole: 'admin' | 'officer' | 'citizen' | null;
}

interface FileData {
  id: string;
  department: string;
  currentOfficer: string;
  daysPending: number;
  status: 'On Time' | 'Delayed' | 'Critical';
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
}

const filesData: FileData[] = [
  { id: 'FN-2024-001', department: 'Revenue', currentOfficer: 'S. Kumar', daysPending: 2, status: 'On Time', subject: 'Land Registration Application', priority: 'High' },
  { id: 'FN-2024-002', department: 'Planning', currentOfficer: 'M. Priya', daysPending: 1, status: 'On Time', subject: 'Building Plan Approval', priority: 'Medium' },
  { id: 'FN-2024-003', department: 'Welfare', currentOfficer: 'R. Selvam', daysPending: 6, status: 'Delayed', subject: 'Pension Disbursement', priority: 'High' },
  { id: 'FN-2024-004', department: 'Legal', currentOfficer: 'A. Lakshmi', daysPending: 8, status: 'Critical', subject: 'Legal Opinion Request', priority: 'High' },
  { id: 'FN-2024-005', department: 'Admin', currentOfficer: 'V. Rajan', daysPending: 3, status: 'On Time', subject: 'Transfer Order Processing', priority: 'Low' },
  { id: 'FN-2024-006', department: 'Revenue', currentOfficer: 'S. Kumar', daysPending: 1, status: 'On Time', subject: 'Tax Assessment Review', priority: 'Medium' },
  { id: 'FN-2024-007', department: 'Planning', currentOfficer: 'M. Priya', daysPending: 5, status: 'Delayed', subject: 'Road Development Clearance', priority: 'High' },
  { id: 'FN-2024-008', department: 'Welfare', currentOfficer: 'K. Anand', daysPending: 2, status: 'On Time', subject: 'Scholarship Application', priority: 'Medium' },
];

export default function FileWorkflowScreen({ onNavigate, onLogout, userRole }: FileWorkflowScreenProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredFiles = filterStatus === 'all' 
    ? filesData 
    : filesData.filter(f => f.status.toLowerCase() === filterStatus.toLowerCase());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'On Time':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Delayed':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Critical':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Medium':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Low':
        return 'bg-slate-50 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'On Time':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'Delayed':
        return <Clock className="w-4 h-4" />;
      case 'Critical':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation 
        currentScreen="files" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        userRole={userRole}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">File Workflow Management</h1>
          <p className="text-sm sm:text-base text-slate-600">Monitor and manage all active files</p>
        </div>

        {/* Filter Bar */}
        <Card className="p-4 bg-white border border-slate-200 shadow-sm mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-slate-600" />
                <span className="font-medium text-slate-700">Filter:</span>
              </div>
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    filterStatus === 'all'
                      ? 'bg-indigo-700 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  All Files ({filesData.length})
                </button>
                <button
                  onClick={() => setFilterStatus('on time')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    filterStatus === 'on time'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  On Time
                </button>
                <button
                  onClick={() => setFilterStatus('delayed')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    filterStatus === 'delayed'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  Delayed
                </button>
                <button
                  onClick={() => setFilterStatus('critical')}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    filterStatus === 'critical'
                      ? 'bg-red-600 text-white'
                      : 'bg-red-50 text-red-700 hover:bg-red-100'
                  }`}
                >
                  Critical
                </button>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-800">{filteredFiles.length}</span> files
            </div>
          </div>
        </Card>

        {/* Files Table - Desktop */}
        <Card className="hidden md:block bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    File ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Current Officer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Days Pending
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredFiles.map((file) => (
                  <tr 
                    key={file.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="font-mono text-sm font-medium text-indigo-700">
                        {file.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-slate-800 font-medium">
                        {file.subject}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-700">{file.department}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-slate-700">{file.currentOfficer}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-slate-400 mr-2" />
                        <span className="text-sm font-medium text-slate-800">{file.daysPending} days</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${getPriorityColor(file.priority)} border`}>
                        {file.priority}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge className={`${getStatusColor(file.status)} border flex items-center space-x-1 w-fit`}>
                        {getStatusIcon(file.status)}
                        <span>{file.status}</span>
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => setSelectedFile(selectedFile === file.id ? null : file.id)}
                        className="flex items-center space-x-1 text-indigo-700 hover:text-indigo-900 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Timeline</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Files List - Mobile */}
        <div className="md:hidden space-y-4">
          {filteredFiles.map((file) => (
            <Card key={file.id} className="p-4 bg-white border border-slate-200 shadow-sm">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <span className="font-mono text-xs font-medium text-indigo-700 block mb-1">
                      {file.id}
                    </span>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">
                      {file.subject}
                    </h3>
                  </div>
                  <Badge className={`${getStatusColor(file.status)} border flex items-center space-x-1 shrink-0 ml-2`}>
                    {getStatusIcon(file.status)}
                    <span className="text-xs">{file.status}</span>
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block">Department</span>
                    <span className="text-slate-800 font-medium">{file.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Officer</span>
                    <span className="text-slate-800 font-medium">{file.currentOfficer}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Days Pending</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 text-slate-400 mr-1" />
                      <span className="text-slate-800 font-medium">{file.daysPending} days</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Priority</span>
                    <Badge className={`${getPriorityColor(file.priority)} border text-xs mt-1`}>
                      {file.priority}
                    </Badge>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedFile(selectedFile === file.id ? null : file.id)}
                  className="w-full flex items-center justify-center space-x-2 text-indigo-700 hover:text-indigo-900 text-sm font-medium bg-indigo-50 hover:bg-indigo-100 rounded-lg py-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Timeline</span>
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Timeline Modal */}
        {selectedFile && (
          <FileTimeline 
            fileId={selectedFile} 
            onClose={() => setSelectedFile(null)} 
          />
        )}
      </div>
    </div>
  );
}
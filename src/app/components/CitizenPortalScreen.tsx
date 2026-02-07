import { useState } from 'react';
import { Search, CheckCircle, Clock, FileText, Calendar, Building2, User } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import Navigation from '@/app/components/Navigation';

interface CitizenPortalScreenProps {
  onNavigate: (screen: string) => void;
  onLogout: () => void;
}

interface FileStatus {
  fileId: string;
  subject: string;
  currentStatus: string;
  department: string;
  currentOfficer: string;
  submittedDate: string;
  expectedCompletion: string;
  progress: number;
  stages: {
    name: string;
    status: 'completed' | 'current' | 'pending';
    date?: string;
  }[];
}

const mockFileData: Record<string, FileStatus> = {
  'FN-2024-001': {
    fileId: 'FN-2024-001',
    subject: 'Land Registration Application',
    currentStatus: 'Under Review',
    department: 'Revenue Department',
    currentOfficer: 'S. Kumar',
    submittedDate: 'January 18, 2026',
    expectedCompletion: 'January 25, 2026',
    progress: 60,
    stages: [
      { name: 'Application Received', status: 'completed', date: 'Jan 18' },
      { name: 'Document Verification', status: 'completed', date: 'Jan 18' },
      { name: 'Officer Review', status: 'current', date: 'Jan 20' },
      { name: 'Department Approval', status: 'pending' },
      { name: 'Completed', status: 'pending' },
    ],
  },
  'FN-2024-005': {
    fileId: 'FN-2024-005',
    subject: 'Transfer Order Processing',
    currentStatus: 'In Progress',
    department: 'Admin Department',
    currentOfficer: 'V. Rajan',
    submittedDate: 'January 19, 2026',
    expectedCompletion: 'January 24, 2026',
    progress: 40,
    stages: [
      { name: 'Application Received', status: 'completed', date: 'Jan 19' },
      { name: 'Initial Processing', status: 'current', date: 'Jan 20' },
      { name: 'Verification', status: 'pending' },
      { name: 'Final Approval', status: 'pending' },
      { name: 'Completed', status: 'pending' },
    ],
  },
  'FN-2024-008': {
    fileId: 'FN-2024-008',
    subject: 'Scholarship Application',
    currentStatus: 'Under Processing',
    department: 'Welfare Department',
    currentOfficer: 'K. Anand',
    submittedDate: 'January 20, 2026',
    expectedCompletion: 'January 27, 2026',
    progress: 40,
    stages: [
      { name: 'Application Received', status: 'completed', date: 'Jan 20' },
      { name: 'Document Check', status: 'current', date: 'Jan 20' },
      { name: 'Eligibility Verification', status: 'pending' },
      { name: 'Approval', status: 'pending' },
      { name: 'Completed', status: 'pending' },
    ],
  },
};

export default function CitizenPortalScreen({ onNavigate, onLogout }: CitizenPortalScreenProps) {
  const [searchId, setSearchId] = useState('');
  const [fileStatus, setFileStatus] = useState<FileStatus | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = () => {
    const upperSearchId = searchId.toUpperCase();
    if (mockFileData[upperSearchId]) {
      setFileStatus(mockFileData[upperSearchId]);
      setNotFound(false);
    } else {
      setFileStatus(null);
      setNotFound(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Navigation 
        currentScreen="citizen" 
        onNavigate={onNavigate} 
        onLogout={onLogout}
        userRole="citizen"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block bg-blue-100 text-blue-700 rounded-full p-3 sm:p-4 mb-4">
            <FileText className="w-10 h-10 sm:w-12 sm:h-12" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 px-4">Citizen File Tracking Portal</h1>
          <p className="text-base sm:text-lg text-slate-600 px-4">Track your application status transparently and in real-time</p>
        </div>

        {/* Search Box */}
        <Card className="p-5 sm:p-8 bg-white border-2 border-slate-200 shadow-lg mb-6 sm:mb-8">
          <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-3">
            Enter Your File ID
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="e.g., FN-2024-001"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1 text-base sm:text-lg px-4 py-3 border-2 border-slate-300 focus:border-indigo-500 rounded-lg"
            />
            <button
              onClick={handleSearch}
              className="bg-indigo-700 hover:bg-indigo-800 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors shadow-md"
            >
              <Search className="w-5 h-5" />
              <span>Track File</span>
            </button>
          </div>
          
          {/* Sample IDs hint */}
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-blue-800">
              <strong>Try these sample IDs:</strong> FN-2024-001, FN-2024-005, FN-2024-008
            </p>
          </div>
        </Card>

        {/* Not Found Message */}
        {notFound && (
          <Card className="p-5 sm:p-6 bg-red-50 border-2 border-red-200 text-center">
            <p className="text-sm sm:text-base text-red-800 font-medium">
              File ID "{searchId}" not found. Please check your ID and try again.
            </p>
          </Card>
        )}

        {/* File Status Display */}
        {fileStatus && (
          <div className="space-y-4 sm:space-y-6">
            {/* Status Header Card */}
            <Card className="p-5 sm:p-8 bg-white border border-slate-200 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6 gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs sm:text-sm text-slate-600">File ID:</span>
                    <span className="font-mono text-base sm:text-lg font-bold text-indigo-700">{fileStatus.fileId}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">{fileStatus.subject}</h2>
                  <div className="inline-block bg-blue-100 text-blue-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold">
                    {fileStatus.currentStatus}
                  </div>
                </div>
                <div className="text-center sm:text-right">
                  <div className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">{fileStatus.progress}%</div>
                  <p className="text-xs sm:text-sm text-slate-600">Complete</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="bg-slate-200 rounded-full h-2 sm:h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${fileStatus.progress}%` }}
                  />
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="flex items-start space-x-3">
                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-medium mb-1">DEPARTMENT</p>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold">{fileStatus.department}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-medium mb-1">CURRENT OFFICER</p>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold">{fileStatus.currentOfficer}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-medium mb-1">SUBMITTED DATE</p>
                    <p className="text-sm sm:text-base text-slate-800 font-semibold">{fileStatus.submittedDate}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-500 font-medium mb-1">EXPECTED COMPLETION</p>
                    <p className="text-sm sm:text-base text-emerald-700 font-semibold">{fileStatus.expectedCompletion}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Timeline Progress */}
            <Card className="p-5 sm:p-8 bg-white border border-slate-200 shadow-lg">
              <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 sm:mb-6">Processing Timeline</h3>
              
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-slate-200" />
                
                {fileStatus.stages.map((stage, index) => (
                  <div key={index} className="relative pl-10 sm:pl-12 pb-6 sm:pb-8 last:pb-0">
                    {/* Timeline dot */}
                    <div className="absolute left-0 top-0">
                      {stage.status === 'completed' && (
                        <div className="bg-emerald-500 rounded-full p-0.5 sm:p-1">
                          <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      )}
                      {stage.status === 'current' && (
                        <div className="bg-blue-500 rounded-full p-0.5 sm:p-1 animate-pulse">
                          <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                      )}
                      {stage.status === 'pending' && (
                        <div className="bg-slate-300 rounded-full p-0.5 sm:p-1">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 sm:border-4 border-white" />
                        </div>
                      )}
                    </div>

                    {/* Stage content */}
                    <div className={`${
                      stage.status === 'current' ? 'bg-blue-50 border-2 border-blue-300' : 'bg-slate-50 border border-slate-200'
                    } rounded-lg p-3 sm:p-4`}>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className={`text-sm sm:text-base font-semibold ${
                          stage.status === 'completed' ? 'text-slate-800' :
                          stage.status === 'current' ? 'text-blue-900' :
                          'text-slate-500'
                        }`}>
                          {stage.name}
                        </h4>
                        {stage.date && (
                          <span className="text-xs sm:text-sm text-slate-600 shrink-0">{stage.date}</span>
                        )}
                      </div>
                      {stage.status === 'current' && (
                        <p className="text-xs sm:text-sm text-blue-700 mt-2">
                          ⚡ Currently being processed
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Help Section */}
            <Card className="p-4 sm:p-6 bg-indigo-50 border border-indigo-200">
              <h4 className="text-sm sm:text-base font-semibold text-indigo-900 mb-2">Need Help?</h4>
              <p className="text-xs sm:text-sm text-indigo-800 mb-3">
                If you have any questions about your application status, please contact your department office.
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                <div>
                  <span className="text-indigo-700 font-medium">Email:</span>
                  <span className="text-indigo-900 ml-2">support@tn.gov.in</span>
                </div>
                <div>
                  <span className="text-indigo-700 font-medium">Phone:</span>
                  <span className="text-indigo-900 ml-2">1800-XXX-XXXX</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Info Section (shown when no search made) */}
        {!fileStatus && !notFound && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <Card className="p-5 sm:p-6 bg-white border border-slate-200 text-center">
              <div className="bg-indigo-100 text-indigo-700 rounded-full p-3 sm:p-4 inline-block mb-4">
                <Search className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2">Real-Time Tracking</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Get instant updates on your file's current status and location
              </p>
            </Card>
            <Card className="p-5 sm:p-6 bg-white border border-slate-200 text-center">
              <div className="bg-emerald-100 text-emerald-700 rounded-full p-3 sm:p-4 inline-block mb-4">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2">Full Transparency</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                See every stage of processing with officer names and dates
              </p>
            </Card>
            <Card className="p-5 sm:p-6 bg-white border border-slate-200 text-center">
              <div className="bg-blue-100 text-blue-700 rounded-full p-3 sm:p-4 inline-block mb-4">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-800 mb-2">Expected Timeline</h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Know when to expect completion of your application
              </p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
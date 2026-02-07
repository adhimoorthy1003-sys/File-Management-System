import { X, CheckCircle, Circle, Clock } from 'lucide-react';
import { Card } from '@/app/components/ui/card';

interface FileTimelineProps {
  fileId: string;
  onClose: () => void;
}

interface TimelineEvent {
  officer: string;
  department: string;
  action: string;
  date: string;
  duration: number;
  status: 'completed' | 'current' | 'pending';
}

const timelineData: Record<string, TimelineEvent[]> = {
  'FN-2024-001': [
    { officer: 'R. Venkat', department: 'Reception', action: 'File Received', date: 'Jan 18, 2026', duration: 0.5, status: 'completed' },
    { officer: 'P. Meena', department: 'Revenue', action: 'Initial Verification', date: 'Jan 18, 2026', duration: 1, status: 'completed' },
    { officer: 'S. Kumar', department: 'Revenue', action: 'Review & Processing', date: 'Jan 20, 2026', duration: 2, status: 'current' },
    { officer: 'Dept Head', department: 'Revenue', action: 'Final Approval', date: 'Pending', duration: 0, status: 'pending' },
  ],
  'FN-2024-003': [
    { officer: 'R. Venkat', department: 'Reception', action: 'File Received', date: 'Jan 15, 2026', duration: 0.5, status: 'completed' },
    { officer: 'K. Anand', department: 'Welfare', action: 'Document Check', date: 'Jan 15, 2026', duration: 2, status: 'completed' },
    { officer: 'R. Selvam', department: 'Welfare', action: 'Processing - DELAYED', date: 'Jan 17, 2026', duration: 6, status: 'current' },
  ],
  'FN-2024-004': [
    { officer: 'R. Venkat', department: 'Reception', action: 'File Received', date: 'Jan 12, 2026', duration: 0.5, status: 'completed' },
    { officer: 'V. Ganesh', department: 'Legal', action: 'Case Review', date: 'Jan 12, 2026', duration: 3, status: 'completed' },
    { officer: 'A. Lakshmi', department: 'Legal', action: 'Opinion Draft - CRITICAL', date: 'Jan 15, 2026', duration: 8, status: 'current' },
  ],
};

export default function FileTimeline({ fileId, onClose }: FileTimelineProps) {
  const timeline = timelineData[fileId] || [];
  const totalDuration = timeline.reduce((sum, event) => sum + event.duration, 0);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-2 sm:p-4 overscroll-contain">
      <Card className="bg-white max-w-3xl w-full max-h-[90dvh] overflow-y-auto shadow-2xl border-0 rounded-xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-start sm:items-center justify-between gap-3 z-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-lg sm:text-2xl font-bold text-slate-800">File Movement Timeline</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              File ID: <span className="font-mono font-semibold text-indigo-700">{fileId}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 min-w-[44px] min-h-[44px] hover:bg-slate-100 rounded-lg transition-colors touch-manipulation shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Timeline */}
        <div className="p-4 sm:p-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-6 sm:mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
              <p className="text-[10px] sm:text-xs text-blue-600 font-medium mb-1">TOTAL STAGES</p>
              <p className="text-lg sm:text-2xl font-bold text-blue-900">{timeline.length}</p>
            </div>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 sm:p-4">
              <p className="text-[10px] sm:text-xs text-emerald-600 font-medium mb-1">COMPLETED</p>
              <p className="text-lg sm:text-2xl font-bold text-emerald-900">
                {timeline.filter(e => e.status === 'completed').length}
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
              <p className="text-[10px] sm:text-xs text-amber-600 font-medium mb-1">TOTAL DAYS</p>
              <p className="text-lg sm:text-2xl font-bold text-amber-900">{totalDuration}</p>
            </div>
          </div>

          {/* Timeline Events */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200" />

            {timeline.map((event, index) => (
              <div key={index} className="relative pl-12 sm:pl-16 pb-6 sm:pb-8 last:pb-0">
                {/* Timeline Dot */}
                <div className="absolute left-0 top-1">
                  {event.status === 'completed' && (
                    <div className="bg-emerald-500 rounded-full p-1.5">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {event.status === 'current' && (
                    <div className="bg-amber-500 rounded-full p-1.5 animate-pulse">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                  )}
                  {event.status === 'pending' && (
                    <div className="bg-slate-300 rounded-full p-1.5">
                      <Circle className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>

                {/* Event Card */}
                <div 
                  className={`rounded-lg p-4 border-2 ${
                    event.status === 'completed' 
                      ? 'bg-white border-emerald-200' 
                      : event.status === 'current'
                      ? 'bg-amber-50 border-amber-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-slate-800">{event.action}</h4>
                      <p className="text-sm text-slate-600 mt-1">{event.department}</p>
                    </div>
                    {event.duration > 0 && (
                      <div className={`text-right ${
                        event.status === 'current' && event.duration > 5
                          ? 'text-red-700'
                          : 'text-slate-700'
                      }`}>
                        <p className="text-sm font-semibold">{event.duration} days</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-slate-600">
                      <span className="font-medium">Officer:</span> {event.officer}
                    </p>
                    <p className="text-slate-500">{event.date}</p>
                  </div>
                  
                  {event.status === 'current' && event.duration > 5 && (
                    <div className="mt-3 bg-red-50 border border-red-200 rounded px-3 py-2">
                      <p className="text-xs text-red-700 font-medium">
                        ⚠️ Exceeding expected timeline - requires escalation
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="mt-6 pt-6 border-t border-slate-200">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <p className="text-sm text-indigo-900">
                <strong>Officer Accountability:</strong> Each stage is tracked with officer name, duration, and action taken.
                All movements are logged for transparency and performance evaluation.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

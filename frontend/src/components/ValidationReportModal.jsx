import React from 'react';
import Modal from './ui/Modal';
import Badge from './ui/Badge';
import {
    ShieldCheck,
    BarChart3,
    Terminal,
    CheckCircle2,
    AlertCircle,
    Activity,
    Lock
} from 'lucide-react';

const ValidationReportModal = ({ isOpen, onClose, reportData }) => {
    if (!isOpen || !reportData) return null;

    const {
        final_score = 0,
        status = 'unknown',
        username = 'user',
        report = {}
    } = reportData;

    const score = Number(final_score) || 0;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Technical Veracity Audit"
            size="lg"
        >
            <div className="space-y-8 py-2">
                {/* Score Overview */}
                <div className="p-8 bg-indigo-50 rounded-[24px] border border-indigo-100 flex items-center justify-between">
                    <div>
                        <div className="flex items-center space-x-2 text-indigo-600 font-bold mb-1 uppercase tracking-widest text-[10px]">
                            <Lock className="w-3 h-3" />
                            <span>Integrity Trace</span>
                        </div>

                        <h3 className="text-xl font-bold text-neutral-900 tracking-tight">System Identity: @{username}</h3>
                        <p className="text-sm text-neutral-500 font-medium">Neural verification complete.</p>
                    </div>
                    <div className="text-right">
                        <div className="flex items-center justify-end space-x-1 mb-1">
                            <span className="text-4xl font-bold text-neutral-900 tracking-tightest">{score.toFixed(1)}%</span>
                        </div>
                        <Badge variant={status.toLowerCase() === 'passed' || status === 'PASS' ? 'success' : 'danger'} className="px-4 py-1 rounded-lg font-black text-[10px] tracking-widest">
                            {status.toUpperCase()}
                        </Badge>
                    </div>
                </div>

                {/* Modules Grid */}
                <div className="space-y-4">
                    <div className="flex items-center space-x-2 px-2">
                        <Activity className="w-4 h-4 text-indigo-600" />
                        <h4 className="font-bold text-[11px] uppercase tracking-widest text-neutral-400">Analysis Pipeline Results</h4>
                    </div>

                    <div className="grid gap-4">
                        {report?.all_reports && Object.entries(report.all_reports).map(([key, data]) => {
                            const moduleScore = (Number(data.score) || (data[key.replace('_report', '_score')] * 100) || 0);
                            return (
                                <div key={key} className="p-6 rounded-2xl border border-neutral-100 bg-white hover:border-indigo-500/20 transition-all duration-300 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-indigo-600 rounded-full" />

                                            <span className="font-bold text-[13px] text-neutral-900 tracking-tight uppercase">
                                                {key.replace(/_/g, ' ').replace('REPORT', '').trim()}
                                            </span>
                                        </div>
                                        <span className={`text-[13px] font-black ${moduleScore >= 80 ? 'text-emerald-600' : 'text-indigo-600'}`}>
                                            {moduleScore.toFixed(0)}%
                                        </span>

                                    </div>
                                    <div className="flex items-start space-x-3">
                                        <p className="text-[13px] text-neutral-500 font-medium leading-relaxed italic">
                                            "{typeof data.summary === 'string' ? data.summary :
                                                typeof data.reason === 'string' ? data.reason :
                                                    "Autonomous inspection complete with no anomalies detected."}"
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Raw Trace Toggle */}
                <div className="pt-4 border-t border-neutral-100">
                    <details className="group">
                        <summary className="flex items-center text-[10px] font-black text-neutral-400 cursor-pointer uppercase tracking-widest hover:text-indigo-600 transition-colors list-none">

                            <Terminal className="w-3.5 h-3.5 mr-2" />
                            <span>System Cryptographic Logs (RAW)</span>
                        </summary>
                        <div className="mt-4 p-6 bg-neutral-900 rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden">
                            <pre className="text-emerald-400/90 text-[11px] font-mono leading-relaxed overflow-x-auto custom-scrollbar max-h-64 whitespace-pre-wrap">
                                {JSON.stringify(reportData, null, 2)}
                            </pre>
                        </div>
                    </details>
                </div>
            </div>
        </Modal>
    );
};

export default ValidationReportModal;

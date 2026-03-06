import React, { useState } from 'react';
import Modal from './ui/Modal';
import Badge from './ui/Badge';

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
            title="Data Quality Report"
            size="lg"
        >
            <div className="space-y-6 text-white">
                <div className="p-6 bg-blue-600/10 dark:bg-blue-900/10 rounded-2xl border border-blue-500/20 dark:border-blue-900/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-bold text-white">Trust Score</h3>
                            <p className="text-sm text-blue-100/70">Verified for @{username}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-black text-white">{score.toFixed(1)}%</span>
                            <div className="mt-1">
                                <Badge variant={status.toLowerCase() === 'passed' || status === 'PASS' ? 'success' : 'danger'}>
                                    {status.toUpperCase()}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-blue-200/50">Analysis Modules</h4>
                    {report?.all_reports && Object.entries(report.all_reports).map(([key, data]) => (
                        <div key={key} className="p-4 rounded-xl border border-white/10 dark:border-surface-700 bg-white/5 dark:bg-surface-800">
                            <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-sm text-white">{key.replace(/_/g, ' ').toUpperCase()}</span>
                                <span className="text-xs font-bold text-blue-300">{(Number(data.score) || (data[key.replace('_report', '_score')] * 100) || 0).toFixed(0)}%</span>
                            </div>
                            <p className="text-xs text-white/70">
                                {typeof data.summary === 'string' ? data.summary :
                                    typeof data.reason === 'string' ? data.reason :
                                        "Check completed successfully."}
                            </p>
                        </div>
                    ))}
                </div>

                <details className="mt-4">
                    <summary className="text-xs font-bold text-white/50 cursor-pointer uppercase tracking-tight hover:text-white transition-colors">Technical Data (JSON)</summary>
                    <pre className="mt-2 p-4 bg-black/40 text-green-400 text-[10px] rounded-lg border border-white/5 overflow-auto max-h-40">
                        {JSON.stringify(reportData, null, 2)}
                    </pre>
                </details>
            </div>
        </Modal>
    );
};

export default ValidationReportModal;

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CheckCircle2,
    XCircle,
    ShieldCheck,
    FileSearch,
    Clock,
    TrendingUp,
    History,
    Search,
    Download,
    ExternalLink,
    ChevronRight,
    Activity,
    Lock
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import Button from '../components/ui/Button';
import ValidationReportModal from '../components/ValidationReportModal';
import marketplaceService from '../services/marketplace';

const ValidationHistory = () => {
    const { user } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        setIsLoading(true);
        try {
            const res = await api.get('/history/');
            setHistory(res.data);
        } catch (err) {
            toast.error('Network Protocol: Failed to synchronize validation trace history.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewReport = async (reportId) => {
        const loadingToast = toast.loading('Retrieving cryptographic veracity trace...');
        try {
            const res = await marketplaceService.getValidationReportById(reportId);
            setSelectedReport(res.data);
            setIsReportModalOpen(true);
            toast.dismiss(loadingToast);
        } catch (err) {
            toast.error(err.response?.data?.detail || "Veracity trace not found in node storage.", { id: loadingToast });
        }
    };

    const stats = [
        { label: "Aggregate Traces", value: history.length, icon: History, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Verified Nodes", value: history.filter(h => h.status === 'passed').length, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Logic Failures", value: history.filter(h => h.status !== 'passed').length, icon: Activity, color: "text-red-600", bg: "bg-red-50" },
        { label: "Mean Integrity Score", value: history.length ? (history.reduce((a, b) => a + b.final_score, 0) / history.length).toFixed(1) + "%" : "0%", icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-8 px-2">
                <div>
                    <div className="flex items-center space-x-3 text-indigo-600 font-bold mb-3 tracking-widest uppercase text-[11px]">
                        <Lock className="w-4 h-4" />
                        <span>Security Audit</span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tightest">Validation Logs</h1>
                    <p className="text-lg text-neutral-500 mt-3 font-medium">Deep-packet inspection records and high-fidelity veracity metrics.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="secondary" className="h-12 px-6 rounded-xl border-neutral-100 font-bold" onClick={fetchHistory}>
                        Synchronize Audit Trail
                    </Button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="p-8 group hover:border-indigo-500/20 transition-all duration-500 shadow-sm">
                        <div className="flex items-start justify-between mb-8">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:rotate-6`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} strokeWidth={2.5} />
                            </div>
                            <span className="text-[11px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md tracking-tighter">SECURED</span>
                        </div>
                        <p className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-neutral-900 tracking-tight">{stat.value}</p>
                    </Card>
                ))}
            </div>

            {/* List Console */}
            <div className="space-y-8">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center space-x-4">
                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Technical Activity Trace</h2>
                    </div>
                    <div className="flex items-center space-x-2 bg-neutral-50 px-4 py-2 rounded-xl text-[13px] font-bold text-neutral-500">
                        <Search className="w-4 h-4 mr-2" /> Filter Logs
                    </div>
                </div>

                {isLoading ? (
                    <div className="space-y-6">
                        <LoadingSkeleton count={4} type="card" className="h-28 rounded-[28px]" />
                    </div>
                ) : history.length === 0 ? (
                    <Card className="flex items-center justify-center py-32 rounded-[32px] border-dashed border-2 border-neutral-100 bg-transparent">
                        <EmptyState
                            icon={ShieldCheck}
                            title="No activity detected"
                            description="Historical veracity records will populate here once the neural engine completes a data analysis protocol."
                        />
                    </Card>
                ) : (
                    <div className="space-y-6">
                        {history.map((record) => (
                            <motion.div
                                key={record.id}
                                layout
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group"
                            >
                                <Card className="p-0 overflow-hidden border-neutral-100 hover:border-indigo-500/30 transition-all duration-500 rounded-[32px] shadow-[0_16px_32px_-12px_rgba(0,0,0,0.03)] bg-white">
                                    <div className="flex flex-col md:flex-row">
                                        <div className={`p-8 md:w-56 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-100 ${record.status === 'passed' ? 'bg-emerald-50/20' : 'bg-red-50/20'
                                            }`}>
                                            <span className={`text-3xl font-bold tracking-tightest ${record.status === 'passed' ? 'text-emerald-600' : 'text-red-600'}`}>
                                                {record.final_score?.toFixed(1)}%
                                            </span>
                                            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">Integrity Index</p>
                                        </div>

                                        <div className="flex-1 p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                                            <div className="flex items-center space-x-6">
                                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${record.status === 'passed' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                                    }`}>
                                                    {record.status === 'passed' ? <CheckCircle2 className="w-7 h-7" /> : <XCircle className="w-7 h-7" />}
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center space-x-3">
                                                        <h4 className="text-xl font-bold text-neutral-900 tracking-tight">Trace TRC-{record.id}</h4>
                                                        <Badge variant={record.status === 'passed' ? 'success' : 'danger'} className="text-[10px] font-black px-3 py-1 rounded-lg tracking-widest uppercase">
                                                            {record.status?.toUpperCase()}
                                                        </Badge>
                                                    </div>
                                                    <div className="flex items-center space-x-6 text-[13px] font-bold text-neutral-400">
                                                        <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {new Date(record.created_at).toLocaleString()}</span>
                                                        <span className="flex items-center text-indigo-600/70"><ShieldCheck className="w-4 h-4 mr-2" /> Secure Node Certificate</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4 lg:border-l lg:border-neutral-100 lg:pl-10">
                                                <Button
                                                    variant="secondary"
                                                    className="rounded-xl h-12 px-6 text-[13px] font-black border-neutral-100 hover:bg-neutral-50"
                                                    onClick={() => handleViewReport(record.id)}
                                                >
                                                    TECHNICAL AUDIT <ExternalLink className="w-4 h-4 ml-2.5 opacity-50" />
                                                </Button>
                                                <Button variant="ghost" className="w-12 h-12 p-0 rounded-xl border border-neutral-100 hover:bg-neutral-50">
                                                    <Download className="w-4 h-4 text-neutral-400" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <ValidationReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                reportData={selectedReport}
            />
        </div>
    );
};

export default ValidationHistory;

import React, { useState, useEffect, useContext } from 'react';
import marketplaceService from '../services/marketplace';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard,
    Truck,
    CheckCircle2,
    Download,
    AlertTriangle,
    FileText,
    Clock,
    IndianRupee,
    User,
    UploadCloud,
    ExternalLink,
    ShieldAlert,
    BarChart3,
    ShieldCheck,
    ArrowUpRight,
    Search,
    ChevronRight,
    Boxes
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';
import ValidationReportModal from '../components/ValidationReportModal';

const DealsPage = () => {
    const { user } = useContext(AuthContext);
    const [deals, setDeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedReport, setSelectedReport] = useState(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    useEffect(() => {
        fetchDeals();
    }, []);

    const fetchDeals = async () => {
        setIsLoading(true);
        try {
            const res = await marketplaceService.getMyDeals();
            setDeals(res.data);
        } catch (err) {
            toast.error("Exchange Protocol: Failed to synchronize transaction history.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewReport = async (dealId) => {
        const loadingToast = toast.loading('Retrieving cryptographic quality audit...');
        try {
            const res = await marketplaceService.getValidationReportByDeal(dealId);
            setSelectedReport(res.data);
            setIsReportModalOpen(true);
            toast.dismiss(loadingToast);
        } catch (err) {
            toast.error(err.response?.data?.detail || "Audit trace not found for this transaction.", { id: loadingToast });
        }
    };

    const handlePay = async (dealId) => {
        const loadingToast = toast.loading('Executing autonomous escrow routing...');
        try {
            await marketplaceService.payEscrow(dealId);
            toast.success('Routing Successful: Funds secured in network escrow.', { id: loadingToast });
            fetchDeals();
        } catch (err) {
            toast.error('Routing Failure: Escrow protocol interrupted.', { id: loadingToast });
        }
    };

    const handleDeliver = async (dealId) => {
        const fileInput = document.getElementById(`file-${dealId}`);
        const file = fileInput?.files[0];

        if (!file) {
            toast.error("Protocol Error: Valid .csv manifest required for transmission.");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const loadingToast = toast.loading('Initializing neural data verification... Analyzing veracity.', { duration: 5000 });
        try {
            const res = await marketplaceService.markDelivered(dealId, formData);
            toast.success(`Verification Successful: Quality Index ${res.data.score}%`, { id: loadingToast });
            fetchDeals();
        } catch (err) {
            const msg = err.response?.data?.detail || 'Transmission Failure: Dataset verification failed.';
            toast.error(msg, { id: loadingToast });
        }
    };

    const handleDownload = async (dealId) => {
        const loadingToast = toast.loading('Decrypting secure asset for download...');
        try {
            const response = await marketplaceService.downloadDataset(dealId);
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `datatrustx_asset_${dealId}.csv`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            toast.success('Decryption Successful: Download protocol initiated.', { id: loadingToast });
        } catch (err) {
            toast.error('Decryption Failure: Secure asset link has expired.', { id: loadingToast });
        }
    };

    const handleDispute = async (dealId) => {
        const reason = prompt("Describe the protocol violation (e.g., 'Inconsistent logic', 'Delivery failure'):");
        if (!reason) return;

        const loadingToast = toast.loading('Initiating conflict resolution protocol...');
        try {
            await marketplaceService.raiseDispute(dealId, reason);
            toast.success('Protocol Initialized: Conflict queued for administrative review.', { id: loadingToast });
            fetchDeals();
        } catch (err) {
            toast.error(err.response?.data?.detail || 'Protocol Failure: Conflict initialization failed.', { id: loadingToast });
        }
    };

    const handleConfirm = async (dealId) => {
        if (!window.confirm('Authorize Final Settlement? This protocol will release locked escrow funds to the counterparty. This execution is permanent.')) return;

        const loadingToast = toast.loading('Executing final settlement routing...');
        try {
            await marketplaceService.confirmDelivery(dealId);
            toast.success('Settlement Complete: Funds disbursed to counterparty.', { id: loadingToast });
            fetchDeals();
        } catch (err) {
            toast.error(err.response?.data?.detail || 'Settlement Failure: Routing protocol interrupted.', { id: loadingToast });
        }
    };

    const filteredDeals = user?.role === 'buyer'
        ? deals.filter(deal => deal.buyer_username === user.username)
        : deals.filter(deal => deal.seller_username === user.username);

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Header Area */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-8 px-2">
                <div>
                    <div className="flex items-center space-x-3 text-indigo-600 font-bold mb-3 tracking-widest uppercase text-[11px]">
                        <Boxes className="w-4 h-4" />
                        <span>Logistics Pipeline</span>
                    </div>

                    <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tightest">Transaction Hub</h1>
                    <p className="text-lg text-neutral-500 mt-3 font-medium">Monitor active settlements and secure asset deliveries.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="flex -space-x-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-neutral-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-neutral-400" />
                            </div>
                        ))}
                    </div>
                    <Badge variant="primary" className="px-4 py-2 rounded-xl text-[11px] font-black tracking-widest uppercase">
                        {filteredDeals.length} Active Pipelines
                    </Badge>

                </div>
            </div>

            {isLoading ? (
                <div className="space-y-6">
                    <LoadingSkeleton count={3} type="card" className="h-48 rounded-[32px]" />
                </div>
            ) : filteredDeals.length === 0 ? (
                <Card className="flex items-center justify-center py-32 rounded-[32px] border-dashed border-2 border-neutral-100 bg-transparent">
                    <EmptyState
                        icon={Truck}
                        title="No active pipelines"
                        description="Your transaction hub is empty. Once a proposal is accepted, the settlement pipeline will initiate here."
                    />
                </Card>
            ) : (
                <div className="space-y-8">
                    {filteredDeals.map((deal) => (
                        <motion.div
                            key={deal.id}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="group"
                        >
                            <Card className="overflow-hidden border-neutral-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:border-indigo-500/20 transition-all duration-500 rounded-[32px] bg-white">
                                <div className="flex flex-col lg:flex-row">
                                    {/* Sidebar Info */}
                                    <div className={`p-10 lg:w-72 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-neutral-100 ${deal.delivery_status === 'delivered' ? 'bg-emerald-50/30' : 'bg-indigo-50/50'
                                        }`}>

                                        <div className="space-y-1">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Pipeline ID</span>
                                            <h3 className="text-2xl font-bold text-neutral-900 tracking-tight">#{deal.id}</h3>
                                        </div>

                                        <div className="space-y-5 mt-10">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">Escrow</span>
                                                <Badge variant={deal.payment_status === 'escrowed' ? 'success' : 'warning'} className="font-black text-[9px]">
                                                    {deal.payment_status?.toUpperCase()}
                                                </Badge>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wide">Delivery</span>
                                                <Badge variant={deal.delivery_status === 'delivered' ? 'success' : 'primary'} className="font-black text-[9px]">
                                                    {deal.delivery_status?.toUpperCase()}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex-1 p-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
                                        <div className="space-y-8 flex-1">
                                            <div className="grid sm:grid-cols-2 gap-10">
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Requirement Link</span>
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-12 h-12 rounded-2xl bg-neutral-50 flex items-center justify-center">
                                                            <FileText className="w-6 h-6 text-neutral-400" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold text-neutral-900">Request #{deal.request_id}</h4>
                                                            <p className="text-[13px] text-neutral-500 font-medium italic">Active Context</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Final Settlement</span>
                                                    <div className="flex items-center space-x-1">
                                                        <IndianRupee className="w-5 h-5 text-neutral-900" strokeWidth={3} />
                                                        <span className="text-3xl font-bold text-neutral-900 tracking-tightest">{deal.price.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-10 pt-4 border-t border-neutral-50">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-black">
                                                        {user?.role === 'buyer' ? deal.seller_username[0]?.toUpperCase() : deal.buyer_username[0]?.toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <span className="text-[11px] font-black text-neutral-400 uppercase block leading-none mb-1">Peer</span>
                                                        <span className="text-[14px] font-bold text-neutral-700">@{user?.role === 'buyer' ? deal.seller_username : deal.buyer_username}</span>
                                                    </div>
                                                </div>
                                                {deal.quality_score !== null && (
                                                    <div className="flex-1 min-w-[180px]">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="text-[11px] font-black text-neutral-400 uppercase tracking-widest">Neural Veracity Score</span>
                                                            <span className={`text-[13px] font-black ${deal.quality_score >= 80 ? 'text-emerald-600' : 'text-indigo-600'}`}>
                                                                {deal.quality_score?.toFixed(1)}%
                                                            </span>

                                                        </div>
                                                        <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                                                            <motion.div
                                                                initial={{ width: 0 }}
                                                                animate={{ width: `${deal.quality_score}%` }}
                                                                className={`h-full ${deal.quality_score >= 80 ? 'bg-emerald-500' : 'bg-indigo-500'}`}

                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Dynamic Action Console */}
                                        <div className="flex flex-col gap-4 min-w-[240px] md:border-l md:border-neutral-100 md:pl-12">
                                            {user?.role === 'buyer' && (
                                                <>
                                                    {deal.payment_status === 'pending' && (
                                                        <Button onClick={() => handlePay(deal.id)} variant="glow" className="w-full h-14 rounded-2xl font-bold text-[15px] hover:scale-[1.02] transition-transform">
                                                            Fund Escrow <ArrowUpRight className="ml-2 w-4 h-4" strokeWidth={3} />
                                                        </Button>
                                                    )}

                                                    {deal.delivery_status === 'delivered' && (
                                                        <>
                                                            <Button onClick={() => handleDownload(deal.id)} className="w-full h-14 rounded-2xl font-bold text-[15px] bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/10">
                                                                <Download className="mr-2.5 w-4 h-4" strokeWidth={3} /> Download Asset
                                                            </Button>
                                                            <Button variant="secondary" onClick={() => handleViewReport(deal.id)} className="w-full h-14 rounded-2xl font-bold text-[15px] border-neutral-100">
                                                                <BarChart3 className="mr-2.5 w-4 h-4 text-indigo-600" /> Veracity Report
                                                            </Button>

                                                            {deal.payment_status === 'escrowed' && (
                                                                <Button variant="outline" onClick={() => handleConfirm(deal.id)} className="w-full h-14 rounded-2xl font-bold text-[15px] border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                                                                    <CheckCircle2 className="mr-2.5 w-4 h-4" strokeWidth={3} /> Authorize Payout
                                                                </Button>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}

                                            {user?.role === 'seller' && (
                                                <>
                                                    {deal.payment_status === 'escrowed' && deal.delivery_status === 'pending' ? (
                                                        <div className="space-y-6">
                                                            <div className="relative group/upload overflow-hidden rounded-2xl">
                                                                <input
                                                                    type="file"
                                                                    id={`file-${deal.id}`}
                                                                    accept=".csv"
                                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                                />
                                                                <div className="border-2 border-dashed border-neutral-200 rounded-2xl p-8 text-center group-hover/upload:border-indigo-500 group-hover/upload:bg-indigo-50/10 transition-all duration-300">
                                                                    <UploadCloud className="w-8 h-8 text-neutral-300 mx-auto mb-3 group-hover/upload:text-indigo-600 transition-colors" />
                                                                    <p className="text-[11px] font-black text-neutral-400 uppercase tracking-tighter">Attach .CSV Asset</p>
                                                                </div>
                                                            </div>
                                                            <Button onClick={() => handleDeliver(deal.id)} variant="glow" className="w-full h-14 rounded-2xl font-bold text-[15px]">
                                                                Execute Transmission
                                                            </Button>

                                                        </div>
                                                    ) : deal.delivery_status === 'delivered' ? (
                                                        <div className="space-y-4">
                                                            <div className="text-center p-8 bg-emerald-50 rounded-2xl border border-emerald-100">
                                                                <ShieldCheck className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                                                                <p className="text-[12px] font-black text-emerald-700 uppercase tracking-widest">Pipeline Verified</p>
                                                            </div>
                                                            <Button variant="secondary" onClick={() => handleViewReport(deal.id)} className="w-full h-14 rounded-2xl font-bold text-[15px] border-neutral-100">
                                                                <ShieldCheck className="mr-2.5 w-4 h-4 text-indigo-600" /> Audit Log
                                                            </Button>

                                                        </div>
                                                    ) : (
                                                        <div className="text-center p-12 bg-neutral-50 rounded-[32px] border border-neutral-100 border-dashed">
                                                            <Clock className="w-10 h-10 text-neutral-300 mx-auto mb-4 animate-pulse" />
                                                            <p className="text-[11px] font-black text-neutral-500 uppercase tracking-widest leading-relaxed">Waiting for<br />Buyer Routing</p>
                                                        </div>
                                                    )}
                                                </>
                                            )}

                                            {/* Resolution Protocol Link */}
                                            {deal.payment_status === 'escrowed' && deal.dispute_status !== 'opened' && (
                                                <button
                                                    onClick={() => handleDispute(deal.id)}
                                                    className="inline-flex items-center justify-center text-[11px] font-black uppercase tracking-widest text-red-400 hover:text-red-600 transition-colors mt-2"
                                                >
                                                    <ShieldAlert className="w-4 h-4 mr-2" /> Initial Resolution Protocol
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Active Conflict Banner */}
                                {deal.dispute_status === 'opened' && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: 'auto' }}
                                        className="bg-red-600 text-white px-10 py-5 flex items-center justify-between"
                                    >
                                        <div className="flex items-center">
                                            <AlertTriangle className="w-5 h-5 mr-4" />
                                            <span className="text-[13px] font-bold uppercase tracking-[0.1em]">Protocol Violation Detected: Conflict Active - Escrow Locked</span>
                                        </div>
                                        <Badge variant="secondary" className="bg-white/20 text-white border-transparent">REVIEW PENDING</Badge>
                                    </motion.div>
                                )}
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}

            <ValidationReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                reportData={selectedReport}
            />
        </div>
    );
};

export default DealsPage;

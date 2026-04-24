import React, { useState, useEffect } from 'react';
import marketplaceService from '../services/marketplace';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe,
    Rocket,
    ArrowUpRight,
    IndianRupee,
    Users,
    TrendingUp,
    Search,
    Filter,
    Briefcase,
    Calendar,
    ChevronRight,
    Send,
    Database,
    Tag,
    X,
    ShieldCheck,
    Cpu,
    ArrowRight
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';

const SellerDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [offer, setOffer] = useState({ price: '', message: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sellerStats, setSellerStats] = useState(null);

    useEffect(() => {
        fetchMarketplace();
        fetchSellerStats();
    }, []);

    const fetchSellerStats = async () => {
        try {
            const res = await marketplaceService.getSellerStats();
            setSellerStats(res.data);
        } catch (err) {
            console.error('Failed to fetch seller stats', err);
        }
    };

    const fetchMarketplace = async () => {
        setIsLoading(true);
        try {
            const res = await marketplaceService.getAllRequests();
            setRequests(res.data);
        } catch (err) {
            toast.error("Marketplace: Failed to synchronize network opportunities.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleMakeOffer = async (e) => {
        e.preventDefault();
        if (!selectedRequest) return;
        setIsSubmitting(true);
        const loadingToast = toast.loading('Transmitting proposal to peer...');

        try {
            await marketplaceService.createOffer({
                request_id: selectedRequest.id,
                price: parseFloat(offer.price),
                message: offer.message
            });
            toast.success(`Protocol Success: Proposal sent for "${selectedRequest.title}"`, { id: loadingToast });
            setOffer({ price: '', message: '' });
            setSelectedRequest(null);
            fetchMarketplace();
        } catch (err) {
            toast.error('Protocol Failure: Failed to transmit proposal.', { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredRequests = requests.filter(req =>
        req.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatRevenue = (amount) => {
        if (amount === null || amount === undefined) return '—';
        return `₹${Number(amount).toLocaleString('en-IN')}`;
    };

    const stats = [
        { label: "Aggregate Revenue", value: sellerStats ? formatRevenue(sellerStats.aggregate_revenue) : '—', icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Active Proposals", value: sellerStats ? sellerStats.active_proposals : '—', icon: Send, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Acceptance Rate", value: sellerStats ? `${sellerStats.acceptance_rate}%` : '—', icon: TrendingUp, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Completed Deliveries", value: sellerStats ? sellerStats.completed_deliveries : '—', icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Minimal Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-8 px-2">
                <div>
                    <div className="flex items-center space-x-3 text-indigo-600 font-bold mb-3 tracking-widest uppercase text-[11px]">
                        <Cpu className="w-4 h-4" />
                        <span>Asset Monetization</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tightest">Seller Workspace</h1>
                    <p className="text-lg text-neutral-500 mt-3 font-medium">Discover global data requirements and monetize your specialized assets.</p>
                </div>
                <div className="flex bg-white p-2 rounded-2xl shadow-[0_12px_24px_-8px_rgba(0,0,0,0.06)] border border-neutral-100 max-w-sm w-full">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                        <input
                            type="text"
                            placeholder="Search marketplace opportunities..."
                            className="w-full pl-12 pr-4 py-3 bg-transparent border-none focus:ring-0 text-[14px] font-medium text-neutral-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="p-8 group hover:border-indigo-500/20 transition-all duration-500 shadow-sm hover:shadow-md">
                        <div className="flex items-center justify-between mb-8">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} strokeWidth={2.5} />
                            </div>
                            <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-indigo-600 transition-colors" />
                        </div>
                        <p className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-neutral-900 tracking-tight">{stat.value}</p>
                    </Card>
                ))}
            </div>

            {/* Marketplace Grid */}
            <div className="space-y-8">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center space-x-4">
                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                        <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Open Opportunities</h2>
                    </div>
                    <Badge variant="primary" className="px-5 py-2 rounded-xl text-[11px] font-black tracking-widest uppercase">
                        {filteredRequests.length} Nodes Found
                    </Badge>
                </div>

                {isLoading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <LoadingSkeleton count={6} type="card" className="h-64 rounded-[32px]" />
                    </div>
                ) : filteredRequests.length === 0 ? (
                    <Card className="flex items-center justify-center py-32 rounded-[32px] border-dashed border-2 border-neutral-100 bg-transparent">
                        <EmptyState
                            icon={Database}
                            title="No active requirements"
                            description="Network scan complete. No new data acquisition protocols were detected at this time."
                        />
                    </Card>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredRequests.map((req) => (
                            <motion.div
                                key={req.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="h-full"
                            >
                                <Card className="h-full flex flex-col p-10 group hover:border-indigo-500/20 transition-all duration-500 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.03)] rounded-[32px]">
                                    <div className="flex items-start justify-between mb-8">
                                        <Badge variant="secondary" className="px-3 py-1 rounded-lg text-[9px] font-black tracking-widest uppercase">{req.domain}</Badge>
                                        <span className="text-[11px] font-bold text-neutral-400 tracking-tighter">PROTO-ID: {req.id}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-neutral-900 mb-4 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
                                        {req.title}
                                    </h3>
                                    <p className="text-neutral-500 text-[15px] font-medium line-clamp-3 mb-10 flex-1 leading-relaxed italic">
                                        "{req.description}"
                                    </p>
                                    <div className="pt-8 border-t border-neutral-50 flex items-center justify-between">
                                        <div className="flex items-center text-[12px] text-neutral-400 font-bold">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            {new Date(req.created_at).toLocaleDateString()}
                                        </div>
                                        <Button
                                            size="sm"
                                            className="rounded-xl font-bold px-6 h-11 bg-neutral-900 hover:bg-black text-white"
                                            onClick={() => setSelectedRequest(req)}
                                        >
                                            Intake Analysis <ArrowUpRight className="ml-2 w-4 h-4" strokeWidth={3} />
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Proposal Transmission Modal */}
            <Modal
                isOpen={!!selectedRequest}
                onClose={() => setSelectedRequest(null)}
                title="System Proposal Transmission"
                size="md"
            >
                {selectedRequest && (
                    <form onSubmit={handleMakeOffer} className="space-y-8 p-2">
                        <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100 flex items-start space-x-4">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                <Tag className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 block mb-1">Target Protocol</span>
                                <h4 className="font-bold text-neutral-900 leading-tight">{selectedRequest.title}</h4>
                                <p className="text-[12px] text-neutral-500 font-medium mt-1 uppercase tracking-tight">{selectedRequest.domain}</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Input
                                label="Asking Valuation (₹)"
                                name="price"
                                type="number"
                                required
                                min="0"
                                step="0.1"
                                placeholder="0.00"
                                icon={IndianRupee}
                                value={offer.price}
                                onChange={(e) => setOffer({ ...offer, price: e.target.value })}
                                className="h-14 rounded-xl"
                            />
                            <div>
                                <label className="block text-[13px] font-bold text-neutral-500 mb-2 uppercase tracking-wide">
                                    Technical Proposal
                                </label>
                                <textarea
                                    required
                                    rows={5}
                                    className="block w-full rounded-2xl border border-neutral-100 bg-neutral-50/30 text-neutral-900 p-5 text-[15px] font-medium focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all duration-300 min-h-[160px]"
                                    placeholder="Outline your data architecture, veracity metrics, and acquisition methodology..."
                                    value={offer.message}
                                    onChange={(e) => setOffer({ ...offer, message: e.target.value })}
                                />
                                <p className="mt-3 text-[11px] text-neutral-400 font-medium italic">Peer visibility: Ensure technical clarity and high-fidelity specifications.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                variant="secondary"
                                className="flex-1 h-14 rounded-2xl font-bold border-neutral-100"
                                onClick={() => setSelectedRequest(null)}
                            >
                                Abort
                            </Button>
                            <Button
                                type="submit"
                                variant="glow"
                                className="flex-1 h-14 rounded-2xl font-bold"
                                isLoading={isSubmitting}
                            >
                                Transmit Protocol
                            </Button>

                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export default SellerDashboard;

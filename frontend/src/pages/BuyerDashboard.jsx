import React, { useState, useEffect } from 'react';
import marketplaceService from '../services/marketplace';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    ClipboardList,
    Clock,
    CheckCircle2,
    Tag,
    ChevronDown,
    ChevronUp,
    Briefcase,
    IndianRupee,
    Search,
    MessageSquare,
    User,
    ArrowRight,
    TrendingUp,
    ShieldCheck,
    Layers,
    Layout
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Badge from '../components/ui/Badge';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import EmptyState from '../components/ui/EmptyState';

const BuyerDashboard = () => {
    const [requests, setRequests] = useState([]);
    const [newRequest, setNewRequest] = useState({ title: '', description: '', domain: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [offers, setOffers] = useState([]);
    const [isFetchingOffers, setIsFetchingOffers] = useState(false);
    const [buyerStats, setBuyerStats] = useState(null);

    useEffect(() => {
        fetchMyRequests();
        fetchBuyerStats();
    }, []);

    const fetchBuyerStats = async () => {
        try {
            const res = await marketplaceService.getBuyerStats();
            setBuyerStats(res.data);
        } catch (err) {
            console.error('Failed to fetch buyer stats', err);
        }
    };

    const fetchMyRequests = async () => {
        setIsLoading(true);
        try {
            const res = await marketplaceService.getMyRequests();
            setRequests(res.data);
        } catch (err) {
            toast.error("Security: Failed to synchronize acquisition history.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateRequest = async (e) => {
        e.preventDefault();
        setIsCreating(true);
        const loadingToast = toast.loading('Initializing data acquisition protocol...');
        try {
            await marketplaceService.createRequest(newRequest);
            toast.success('Protocol Initialized: Request published to the network.', { id: loadingToast });
            setNewRequest({ title: '', description: '', domain: '' });
            fetchMyRequests();
        } catch (err) {
            toast.error('Protocol Error: Failed to publish requirement.', { id: loadingToast });
        } finally {
            setIsCreating(false);
        }
    };

    const handleViewOffers = async (request) => {
        if (selectedRequest?.id === request.id) {
            setSelectedRequest(null);
            setOffers([]);
            return;
        }

        setIsFetchingOffers(true);
        setSelectedRequest(request);
        try {
            const res = await marketplaceService.getOffers(request.id);
            setOffers(res.data);
        } catch (err) {
            toast.error("Network: Failed to retrieve peer proposals.");
        } finally {
            setIsFetchingOffers(false);
        }
    };

    const handleAcceptOffer = async (offerId) => {
        const loadingToast = toast.loading('Executing smart contract acceptance...');
        try {
            await marketplaceService.acceptOffer(offerId);
            toast.success('Transaction Encrypted: Deal successfully finalized.', { id: loadingToast });
            fetchMyRequests();
        } catch (err) {
            toast.error('Transaction Failure: Acceptance protocol failed.', { id: loadingToast });
        }
    };

    const formatCapital = (amount) => {
        if (amount === null || amount === undefined) return '—';
        return `₹${Number(amount).toLocaleString('en-IN')}`;
    };

    const stats = [
        { label: "Pending Requirements", value: buyerStats ? buyerStats.pending_requirements : '—', icon: Layers, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Capital Deployed", value: buyerStats ? formatCapital(buyerStats.capital_deployed) : '—', icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
        { label: "Verified Offers", value: buyerStats ? buyerStats.verified_offers : '—', icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
        { label: "Completed Assets", value: buyerStats ? buyerStats.completed_assets : '—', icon: CheckCircle2, color: "text-blue-600", bg: "bg-blue-50" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-12 pb-20">
            {/* Minimal Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-8 px-2">
                <div>
                    <div className="flex items-center space-x-3 text-indigo-600 font-bold mb-3 tracking-widest uppercase text-[11px]">
                        <Layout className="w-4 h-4" />
                        <span>Acquisition Console</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tightest">Buyer Workspace</h1>
                    <p className="text-lg text-neutral-500 mt-3 font-medium">Strategize your data intake and manage network requests.</p>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="secondary" className="h-12 px-6 rounded-xl border-neutral-100 font-bold" onClick={fetchMyRequests}>
                        <Clock className="w-4 h-4 mr-2.5" /> Synchronize
                    </Button>
                </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="p-8 group hover:border-indigo-500/20 transition-all duration-500 shadow-sm hover:shadow-md">
                        <div className="flex items-center justify-between mb-8">
                            <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center transition-transform group-hover:rotate-6`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} strokeWidth={2.5} />
                            </div>
                            <TrendingUp className="w-4 h-4 text-emerald-500" />
                        </div>
                        <p className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold text-neutral-900 tracking-tight">{stat.value}</p>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
                {/* Protocol Initialization Form */}
                <div className="lg:col-span-4 lg:sticky lg:top-28 h-fit">
                    <Card className="p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border-neutral-100 rounded-[32px]">
                        <div className="flex items-center space-x-3 mb-8">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
                                <Plus className="w-5 h-5 text-white" strokeWidth={3} />
                            </div>

                            <h2 className="text-xl font-bold text-neutral-900 tracking-tight">New Requirement</h2>
                        </div>

                        <form onSubmit={handleCreateRequest} className="space-y-6">
                            <Input
                                label="Project Identifier"
                                placeholder="e.g. Neural Vision Dataset"
                                value={newRequest.title}
                                onChange={(e) => setNewRequest({ ...newRequest, title: e.target.value })}
                                required
                                className="h-14 rounded-xl"
                            />
                            <Input
                                label="Domain Protocol"
                                placeholder="e.g. Biomedical Imaging"
                                value={newRequest.domain}
                                onChange={(e) => setNewRequest({ ...newRequest, domain: e.target.value })}
                                required
                                className="h-14 rounded-xl"
                            />
                            <div>
                                <label className="block text-[13px] font-bold text-neutral-500 mb-2 uppercase tracking-wide">
                                    Technical Description
                                </label>
                                <textarea
                                    className="block w-full rounded-2xl border border-neutral-100 bg-neutral-50/30 text-neutral-900 p-4 min-h-[160px] focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 outline-none transition-all duration-300 text-[15px] font-medium"
                                    placeholder="Define your specific data architecture and validation requirements..."
                                    value={newRequest.description}
                                    onChange={(e) => setNewRequest({ ...newRequest, description: e.target.value })}
                                    required
                                />

                            </div>
                            <Button type="submit" variant="glow" className="w-full h-15 rounded-2xl text-[16px] font-bold" isLoading={isCreating}>
                                Initialize Protocol
                            </Button>

                        </form>
                    </Card>
                </div>

                {/* History & Offer Resolution */}
                <div className="lg:col-span-8 space-y-8">
                    <div className="flex items-center justify-between px-2">
                        <div className="flex items-center space-x-4">
                            <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">Transmission Logs</h2>
                        </div>
                        <div className="flex items-center space-x-2 bg-neutral-50 px-4 py-2 rounded-xl text-[13px] font-bold text-neutral-500">
                            <Search className="w-4 h-4 mr-2" /> Filter Activity
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="space-y-6">
                            <LoadingSkeleton count={3} type="card" className="h-28 rounded-[28px]" />
                        </div>
                    ) : requests.length === 0 ? (
                        <Card className="flex items-center justify-center py-32 rounded-[32px] border-dashed border-2 border-neutral-100 bg-transparent">
                            <EmptyState
                                title="No active requirements"
                                description="Your data acquisition history is empty. Initialize a new protocol to start receiving offers from the network."
                            />
                        </Card>
                    ) : (
                        <div className="space-y-6">
                            {requests.map((req) => (
                                <div key={req.id} className="relative group">
                                    <motion.div
                                        onClick={() => handleViewOffers(req)}
                                        className={`flex flex-col sm:flex-row sm:items-center justify-between p-8 rounded-[32px] border transition-all duration-500 cursor-pointer ${selectedRequest?.id === req.id
                                            ? 'bg-neutral-900 border-neutral-900 text-white shadow-2xl shadow-neutral-900/20'
                                            : 'bg-white border-neutral-100 hover:border-indigo-500/30 shadow-[0_16px_32px_-12px_rgba(0,0,0,0.03)]'

                                            }`}
                                    >
                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-3">
                                                <h3 className={`font-bold text-xl tracking-tight ${selectedRequest?.id === req.id ? 'text-white' : 'text-neutral-900'}`}>
                                                    {req.title}
                                                </h3>
                                                <Badge variant={selectedRequest?.id === req.id ? "secondary" : "primary"} className="rounded-lg py-1 px-3 text-[10px] font-black tracking-widest uppercase">
                                                    {req.domain}
                                                </Badge>
                                            </div>
                                            <div className={`flex items-center space-x-6 text-[13px] font-bold ${selectedRequest?.id === req.id ? 'text-neutral-400' : 'text-neutral-400'}`}>
                                                <span className="flex items-center"><Clock className="w-4 h-4 mr-2" /> {new Date(req.created_at).toLocaleDateString()}</span>
                                                <span className="flex items-center"><Tag className="w-4 h-4 mr-2" /> #{req.id}</span>
                                            </div>
                                        </div>
                                        <div className="mt-6 sm:mt-0 flex items-center space-x-6">
                                            <span className="text-[12px] font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                                                {selectedRequest?.id === req.id ? 'Close Details' : 'Verify Offers'}
                                            </span>
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${selectedRequest?.id === req.id ? 'bg-white/10' : 'bg-neutral-50'}`}>
                                                {selectedRequest?.id === req.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                            </div>
                                        </div>
                                    </motion.div>

                                    <AnimatePresence>
                                        {selectedRequest?.id === req.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.4 }}
                                                className="mt-4 p-8 rounded-[32px] border border-neutral-100 bg-neutral-50/50 space-y-8"
                                            >
                                                <div className="grid md:grid-cols-12 gap-8">
                                                    <div className="md:col-span-8">
                                                        <h4 className="text-[11px] font-black uppercase tracking-widest text-neutral-400 mb-3">Project Scope</h4>
                                                        <p className="text-[15px] text-neutral-600 font-medium leading-relaxed">{req.description}</p>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    <div className="flex items-center justify-between">
                                                        <h4 className="text-[11px] font-black uppercase tracking-widest text-neutral-400">Validated Peer Proposals</h4>
                                                        {isFetchingOffers && <div className="flex space-x-1"><div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-bounce delay-75" /></div>}
                                                    </div>

                                                    {!isFetchingOffers && offers.length === 0 ? (
                                                        <div className="flex flex-col items-center justify-center py-12 bg-white rounded-3xl border border-dashed border-neutral-200">
                                                            <MessageSquare className="w-8 h-8 text-neutral-100 mb-3" />
                                                            <p className="text-[14px] text-neutral-400 font-bold italic tracking-tight">Scanning network for compatible datasets...</p>
                                                        </div>
                                                    ) : (
                                                        <div className="grid gap-4">
                                                            {offers.map(offer => (
                                                                <motion.div
                                                                    key={offer.offer_id}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:border-indigo-500 transition-all group"
                                                                >
                                                                    <div className="flex items-start space-x-5">
                                                                        <div className="w-14 h-14 rounded-2xl bg-neutral-50 flex items-center justify-center group-hover:bg-indigo-50 transition-colors">
                                                                            <User className="w-6 h-6 text-neutral-400 group-hover:text-indigo-600" />
                                                                        </div>

                                                                        <div className="space-y-1">
                                                                            <div className="flex items-center space-x-3">
                                                                                <span className="font-bold text-[16px] text-neutral-900 tracking-tight">@{offer.seller}</span>
                                                                                <Badge variant="success" className="text-[9px] font-black py-0.5 px-2 rounded-md">VET-CERTIFIED</Badge>
                                                                            </div>
                                                                            <p className="text-[14px] text-neutral-500 font-medium leading-snug">{offer.message}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center w-full sm:w-auto justify-between sm:justify-end gap-10 sm:border-l sm:border-neutral-100 sm:pl-10">
                                                                        <div className="text-right">
                                                                            <div className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-1">Proposal Price</div>
                                                                            <span className="text-2xl font-bold text-neutral-900">₹{offer.price.toLocaleString()}</span>
                                                                        </div>
                                                                        <Button
                                                                            size="sm"
                                                                            className="rounded-xl font-bold h-12 px-8"
                                                                            onClick={() => handleAcceptOffer(offer.offer_id)}
                                                                        >
                                                                            Execute
                                                                        </Button>
                                                                    </div>
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BuyerDashboard;

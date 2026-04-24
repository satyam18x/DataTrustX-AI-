import React from 'react';
import { motion } from 'framer-motion';
import {
    ChevronRight,
    ShieldCheck,
    Zap,
    Globe,
    Lock,
    Star,
    CheckCircle2,
    ArrowRight,
    Search,
    Database,
    LineChart
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Home = () => {
    const features = [
        {
            title: "Autonomous ML Verification",
            description: "Advanced PyTorch-driven validation ensures dataset integrity and statistical accuracy before any exchange.",
            icon: ShieldCheck,
            color: "text-indigo-600",
            bg: "bg-indigo-50"
        },
        {
            title: "Cryptographic Escrow",
            description: "Military-grade encryption and automated escrow protocols guarantee financial security for all parties involved.",
            icon: Lock,
            color: "text-violet-600",
            bg: "bg-violet-50"
        },
        {
            title: "Global Intelligence Mesh",
            description: "Access a distributed network of high-fidelity datasets from verified institutional and private contributors.",
            icon: Globe,
            color: "text-cyan-600",
            bg: "bg-cyan-50"
        },
        {
            title: "Low-Latency Acquisition",
            description: "Optimized retrieval pipelines ensure instantaneous access to verified data assets upon transaction completion.",
            icon: Zap,
            color: "text-amber-600",
            bg: "bg-amber-50"
        }
    ];


    const testimonials = [
        {
            name: "Dr. Elena Rodriguez",
            role: "Principal AI Researcher @ Nexus Lab",
            content: "DataTrustX AI has fundamentally shifted our data acquisition strategy. The rigor of their ML verification is unparalleled in the industry.",
            avatar: "ER"
        },
        {
            name: "Jonathan Aris",
            role: "CTO @ QuantSystems",
            content: "The seamless integration of escrow and automated validation has removed the traditional friction of high-stakes data transactions.",
            avatar: "JA"
        }
    ];

    return (
        <div className="bg-white">
            {/* Announcement Bar */}
            <div className="bg-indigo-50 border-y border-indigo-100 flex justify-center py-2.5 px-4 overflow-hidden relative">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-3"
                >
                    <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>
                    <p className="text-[13px] font-bold text-indigo-900 tracking-tight">Introducing Advanced Statistical Anomaly Detection v2.4. <Link to="/register" className="underline underline-offset-2 ml-1">Explore features</Link></p>
                </motion.div>
            </div>


            {/* Hero Section */}
            <section className="relative pt-24 pb-32 lg:pt-32 lg:pb-48 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-50/50 rounded-full blur-[120px] -mr-96 -mt-96 animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px] -ml-64 -mb-64" />

                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center space-x-2.5 bg-neutral-900 rounded-full py-1.5 pl-1.5 pr-4 mb-10 shadow-xl shadow-neutral-900/10"
                        >
                            <span className="flex items-center justify-center bg-indigo-600 rounded-full p-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                            </span>

                            <span className="text-[13px] font-bold text-white tracking-tight">Enterprise Data Security Standard</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-6xl lg:text-[90px] font-bold text-neutral-900 leading-[1.05] tracking-tightest mb-10"
                        >
                            The global exchange for <br />
                            <span className="text-indigo-600">verified intelligence.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            className="text-xl lg:text-2xl text-neutral-500 max-w-2xl leading-relaxed mb-12"
                        >
                            Orchestrating secure, high-fidelity data transitions through autonomous ML verification and cryptographic escrow.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
                        >
                            <Link to="/register">
                                <Button variant="glow" size="lg" className="px-10 h-16 rounded-2xl text-[16px] font-bold">
                                    Start Transacting <ArrowRight className="ml-2.5 w-5 h-5" />
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="secondary" size="lg" className="px-10 h-16 rounded-2xl text-[16px] font-bold border-indigo-100 bg-indigo-50/20">
                                    Browse Marketplace
                                </Button>
                            </Link>
                        </motion.div>


                        {/* Trusted By */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="mt-24 pt-12 border-t border-neutral-100 flex flex-wrap items-center gap-x-12 gap-y-8 opacity-40 grayscale contrast-125"
                        >
                            <p className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest w-full mb-2">Powering Next-Gen AI Teams</p>
                            <span className="text-xl font-black italic tracking-tighter">NEXUS</span>
                            <span className="text-xl font-bold tracking-widest">AETHER</span>
                            <span className="text-xl font-light">CYBERDYNE</span>
                            <span className="text-xl font-black">QUANTUM</span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-24 border-y border-neutral-100/60 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
                        {[
                            { label: "Verified Datasets", value: "24.5k+" },
                            { label: "Institutional Peers", value: "8.2k+" },
                            { label: "Avg. Reliability Score", value: "99.8%" },
                            { label: "Transactions Secured", value: "$420M+" }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <p className="text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tightest mb-2">{stat.value}</p>
                                <p className="text-[13px] font-bold text-neutral-400 uppercase tracking-widest">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Capabilities */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-[13px] font-black text-indigo-600 uppercase tracking-widest mb-6">Core Infrastructure</h2>
                            <p className="text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tightest">Engineered for precision.</p>
                        </div>
                        <p className="text-lg text-neutral-500 max-w-sm lg:text-right">A proprietary stack designed to handle the most demanding data integrity requirements in the AI ecosystem.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <Card key={idx} className="p-10 hover:border-indigo-500/30 transition-all duration-500 group shadow-sm transition-all">
                                <div className={`w-14 h-14 ${feature.bg} rounded-[20px] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                                    <feature.icon className={`w-6 h-6 ${feature.color}`} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-[18px] font-bold text-neutral-900 mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-neutral-500 text-[15px] leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Operates */}
            <section className="py-32 bg-neutral-900 text-white rounded-[60px] mx-6 mb-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] -mr-96 -mt-96" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -ml-64 -mb-64" />

                <div className="max-w-7xl mx-auto px-10 relative z-10">
                    <div className="max-w-3xl mb-24">
                        <h2 className="text-5xl lg:text-7xl font-bold tracking-tightest mb-8">Fluid execution. <br /> Absolute trust.</h2>
                        <p className="text-xl text-neutral-400 font-medium">The DataTrustX protocol ensures every transaction adheres to the highest standards of data governance.</p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-10">
                        {[
                            {
                                step: "01",
                                title: "Oracle Definition",
                                desc: "Buyers define multi-dimensional acquisition parameters including statistical constraints and quality benchmarks.",
                                icon: Search
                            },
                            {
                                step: "02",
                                title: "Secured Acquisition",
                                desc: "Transactions are executed through non-custodial escrow containers, isolating assets until verification completion.",
                                icon: Database
                            },
                            {
                                step: "03",
                                title: "Neural Validation",
                                desc: "Proprietary ML models perform full-spectrum verification, authorizing release only upon meeting target criteria.",
                                icon: LineChart
                            }
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className="relative p-10 rounded-[32px] border border-white/5 bg-white/[0.03] backdrop-blur-xl group hover:bg-white/[0.06] transition-all duration-500"
                            >
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                                        <item.icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                                    </div>

                                    <span className="text-[54px] font-bold text-white/5 leading-none">{item.step}</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-5 tracking-tight">{item.title}</h3>
                                <p className="text-neutral-400 leading-relaxed font-medium text-[16px]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Validation Infrastructure */}
            <section className="py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-indigo-50 rounded-[40px] -z-10 rotate-2" />
                            <div className="bg-white border border-neutral-100 p-10 rounded-[40px] shadow-2xl shadow-neutral-200/50">
                                <div className="space-y-8">
                                    {[
                                        { label: "Data Integrity Check", status: "Verified", value: "99.2%" },
                                        { label: "Statistical Consistency", status: "Optimal", value: "High" },
                                        { label: "Anomaly Detection", status: "Clear", value: "0 Detected" },
                                        { label: "Cross-Validation", status: "Complete", value: "Pass" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                                                <span className="text-[14px] font-bold text-neutral-900">{item.label}</span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-[12px] font-black text-indigo-600 uppercase tracking-widest">{item.status}</span>

                                                <span className="text-[14px] font-bold text-neutral-400">{item.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-[13px] font-black text-indigo-600 uppercase tracking-widest mb-6">Validation Intelligence</h2>
                            <p className="text-5xl lg:text-6xl font-bold text-neutral-900 tracking-tightest mb-8 leading-tight">Every byte, <br /> rigorously inspected.</p>
                            <p className="text-lg font-medium text-neutral-500 mb-10 leading-relaxed">
                                Our platform integrates directly with your machine learning workflows to provide real-time validation of incoming data assets.
                            </p>
                            <div className="space-y-5">
                                {[
                                    "Probabilistic Schema Validation",
                                    "Semantic drift monitoring",
                                    "Deep learning-based outlier isolation"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                                        <span className="text-[15px] font-bold text-neutral-700">{text}</span>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-48 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-indigo-600 rounded-[60px] p-20 text-center text-white relative overflow-hidden shadow-[0_40px_100px_-20px_rgba(79,70,229,0.4)]"
                    >
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[80px] -ml-24 -mb-24" />

                        <h2 className="text-5xl lg:text-[72px] font-bold tracking-tightest mb-10 relative z-10 leading-[1.1]">
                            The future of data <br /> is verified.
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-8 relative z-10">
                            <Link to="/register">
                                <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 px-12 h-20 rounded-[28px] text-xl font-bold shadow-2xl">
                                    Join the Network
                                </Button>
                            </Link>
                            <Link to="/login">
                                <Button variant="ghost" size="lg" className="text-white hover:bg-white/10 px-12 h-20 rounded-[28px] text-xl font-bold">
                                    Schedule Demo
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>

    );
};

export default Home;


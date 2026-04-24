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
            color: "text-[#365761]",
            bg: "bg-[#E5E3D9]"
        },
        {
            title: "Cryptographic Escrow",
            description: "Military-grade encryption and automated escrow protocols guarantee financial security for all parties involved.",
            icon: Lock,
            color: "text-[#365761]",
            bg: "bg-[#E5E3D9]"
        },
        {
            title: "Global Intelligence Mesh",
            description: "Access a distributed network of high-fidelity datasets from verified institutional and private contributors.",
            icon: Globe,
            color: "text-[#365761]",
            bg: "bg-[#E5E3D9]"
        },
        {
            title: "Low-Latency Acquisition",
            description: "Optimized retrieval pipelines ensure instantaneous access to verified data assets upon transaction completion.",
            icon: Zap,
            color: "text-[#365761]",
            bg: "bg-[#E5E3D9]"
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
            <div className="bg-[#F8F7F4] border-y border-[#E5E3D9] flex justify-center py-2.5 px-4 overflow-hidden relative">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center space-x-3"
                >
                    <span className="bg-[#365761] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>
                    <p className="text-[13px] font-bold text-[#1E3036] tracking-tight">Introducing Advanced Statistical Anomaly Detection v2.4. <Link to="/register" className="underline underline-offset-2 ml-1 text-[#5F6A6E]">Explore features</Link></p>
                </motion.div>
            </div>


            {/* Hero Section */}
            <section className="relative pt-8 pb-12 lg:pt-12 lg:pb-16 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="bg-[#E5E3D9] rounded-[32px] sm:rounded-[40px] pt-12 pb-16 pl-8 sm:pl-16 pr-8 sm:pr-0 relative overflow-hidden flex flex-col lg:flex-row h-auto lg:h-[640px] shadow-sm">
                        
                        {/* Wavy lines SVG (Right side background) */}
                        <div className="absolute right-0 top-[20%] w-[55%] h-[60%] opacity-30 pointer-events-none z-0 hidden lg:block">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 150 Q 250 50, 500 150 T 1000 150" stroke="#1E3036" strokeWidth="3"/>
                                <path d="M0 200 Q 250 100, 500 200 T 1000 200" stroke="#1E3036" strokeWidth="3"/>
                                <path d="M0 250 Q 250 150, 500 250 T 1000 250" stroke="#1E3036" strokeWidth="3"/>
                                <path d="M0 300 Q 250 200, 500 300 T 1000 300" stroke="#1E3036" strokeWidth="3"/>
                            </svg>
                        </div>

                        {/* Floating circles */}
                        <motion.img 
                            animate={{ y: [0, -10, 0] }} 
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=200" 
                            className="absolute top-24 right-[42%] w-[88px] h-[88px] rounded-full border-[5px] border-[#E5E3D9] object-cover shadow-xl z-20 hidden lg:block" 
                        />
                        <motion.img 
                            animate={{ y: [0, 10, 0] }} 
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=200" 
                            className="absolute top-12 right-[10%] w-[72px] h-[72px] rounded-full border-[5px] border-[#E5E3D9] object-cover shadow-xl z-20 hidden lg:block" 
                        />
                        <motion.img 
                            animate={{ y: [0, -8, 0] }} 
                            transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 2 }}
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=200" 
                            className="absolute top-[45%] right-[5%] w-[104px] h-[104px] rounded-full border-[5px] border-[#E5E3D9] object-cover shadow-xl z-30 hidden lg:block" 
                        />

                        {/* Left Side: Text and CTA */}
                        <div className="w-full lg:w-[55%] z-10 relative flex flex-col justify-center pb-10 lg:pb-0">
                            {/* Dotted grid pattern behind text */}
                            <div className="absolute -left-6 bottom-16 w-32 h-32 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1E3036 2px, transparent 2px)', backgroundSize: '12px 12px' }}></div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.6 }}
                                className="text-5xl sm:text-6xl lg:text-[76px] font-bold text-[#1E3036] leading-[1.05] tracking-tight mb-8"
                            >
                                The exchange <br />that helps you <br />stay secure
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="text-lg lg:text-xl text-[#5F6A6E] leading-relaxed mb-12 max-w-lg font-medium"
                            >
                                Orchestrating secure, high-fidelity data transitions through autonomous ML verification and cryptographic escrow.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="relative flex items-center bg-white p-2.5 rounded-full shadow-lg max-w-[500px] w-full"
                            >
                                <div className="flex flex-col pl-6 pr-4 flex-grow">
                                    <span className="text-[11px] font-bold text-neutral-400 tracking-wide mb-0.5">Project focus</span>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. Healthcare datasets" 
                                        className="w-full bg-transparent border-none outline-none text-[#1E3036] font-bold text-[16px] p-0 placeholder-neutral-300"
                                    />
                                </div>
                                <Link to="/register" className="shrink-0">
                                    <button className="h-[52px] px-8 rounded-full text-[15px] font-bold whitespace-nowrap bg-[#365761] hover:bg-[#274048] text-white shadow-md transition-colors">
                                        Get Started
                                    </button>
                                </Link>
                            </motion.div>
                        </div>

                        {/* Right Side: Main Subject Image */}
                        <div className="absolute right-0 bottom-0 w-full lg:w-[45%] h-[60%] lg:h-[95%] z-10 flex items-end justify-end pointer-events-none">
                            <img 
                                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" 
                                alt="Subject" 
                                className="h-full w-auto object-contain object-bottom mix-blend-multiply opacity-95"
                            />
                        </div>

                    </div>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-24 border-y border-[#E5E3D9] bg-[#F8F7F4]">
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
                                <p className="text-4xl lg:text-5xl font-bold text-[#1E3036] tracking-tightest mb-2">{stat.value}</p>
                                <p className="text-[13px] font-bold text-[#5F6A6E] uppercase tracking-widest">{stat.label}</p>
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
                            <h2 className="text-[13px] font-black text-[#365761] uppercase tracking-widest mb-6">Core Infrastructure</h2>
                            <p className="text-5xl lg:text-6xl font-bold text-[#1E3036] tracking-tightest">Engineered for precision.</p>
                        </div>
                        <p className="text-lg text-[#5F6A6E] max-w-sm lg:text-right font-medium">A proprietary stack designed to handle the most demanding data integrity requirements in the AI ecosystem.</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, idx) => (
                            <Card key={idx} className="p-10 hover:border-[#E5E3D9] transition-all duration-500 group shadow-sm bg-white border border-neutral-100 rounded-[32px]">
                                <div className={`w-14 h-14 ${feature.bg} rounded-[20px] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500`}>
                                    <feature.icon className={`w-6 h-6 ${feature.color}`} strokeWidth={2.5} />
                                </div>
                                <h3 className="text-[18px] font-bold text-[#1E3036] mb-4 tracking-tight">{feature.title}</h3>
                                <p className="text-[#5F6A6E] text-[15px] leading-relaxed font-medium">
                                    {feature.description}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Operates */}
            <section className="py-32 bg-[#1E3036] text-white rounded-[40px] mx-6 mb-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#365761]/20 rounded-full blur-[150px] -mr-96 -mt-96 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#365761]/20 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-10 relative z-10">
                    <div className="max-w-3xl mb-24">
                        <h2 className="text-5xl lg:text-7xl font-bold tracking-tightest mb-8">Fluid execution. <br /> Absolute trust.</h2>
                        <p className="text-xl text-[#A0AAB2] font-medium">The DataTrustX protocol ensures every transaction adheres to the highest standards of data governance.</p>
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
                                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-[#365761] transition-colors">
                                        <item.icon className="w-5 h-5 text-white" strokeWidth={2.5} />
                                    </div>

                                    <span className="text-[54px] font-bold text-white/5 leading-none">{item.step}</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-5 tracking-tight">{item.title}</h3>
                                <p className="text-[#A0AAB2] leading-relaxed font-medium text-[16px]">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Validation Infrastructure */}
            <section className="py-32 overflow-hidden bg-[#F8F7F4]">
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="grid lg:grid-cols-2 gap-24 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-[#E5E3D9] rounded-[40px] -z-10 rotate-2" />
                            <div className="bg-white border border-[#E5E3D9] p-10 rounded-[40px] shadow-sm">
                                <div className="space-y-8">
                                    {[
                                        { label: "Data Integrity Check", status: "Verified", value: "99.2%" },
                                        { label: "Statistical Consistency", status: "Optimal", value: "High" },
                                        { label: "Anomaly Detection", status: "Clear", value: "0 Detected" },
                                        { label: "Cross-Validation", status: "Complete", value: "Pass" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-[#F8F7F4] rounded-2xl border border-[#E5E3D9]/50">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-2 h-2 bg-[#365761] rounded-full animate-pulse" />
                                                <span className="text-[14px] font-bold text-[#1E3036]">{item.label}</span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-[12px] font-black text-[#365761] uppercase tracking-widest">{item.status}</span>

                                                <span className="text-[14px] font-bold text-[#5F6A6E]">{item.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-[13px] font-black text-[#365761] uppercase tracking-widest mb-6">Validation Intelligence</h2>
                            <p className="text-5xl lg:text-6xl font-bold text-[#1E3036] tracking-tightest mb-8 leading-tight">Every byte, <br /> rigorously inspected.</p>
                            <p className="text-lg font-medium text-[#5F6A6E] mb-10 leading-relaxed">
                                Our platform integrates directly with your machine learning workflows to provide real-time validation of incoming data assets.
                            </p>
                            <div className="space-y-5">
                                {[
                                    "Probabilistic Schema Validation",
                                    "Semantic drift monitoring",
                                    "Deep learning-based outlier isolation"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <CheckCircle2 className="w-5 h-5 text-[#365761]" />
                                        <span className="text-[15px] font-bold text-[#1E3036]">{text}</span>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-48 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-[#E5E3D9] rounded-[60px] p-20 text-center relative overflow-hidden shadow-sm border border-[#E5E3D9]"
                    >
                        {/* Wavy background lines for CTA */}
                        <div className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
                            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 250 Q 250 150, 500 250 T 1000 250" stroke="#1E3036" strokeWidth="4"/>
                                <path d="M0 300 Q 250 200, 500 300 T 1000 300" stroke="#1E3036" strokeWidth="4"/>
                            </svg>
                        </div>

                        <h2 className="text-5xl lg:text-[72px] font-bold tracking-tightest mb-10 relative z-10 leading-[1.1] text-[#1E3036]">
                            The future of data <br /> is verified.
                        </h2>
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-5 sm:space-y-0 sm:space-x-8 relative z-10">
                            <Link to="/register">
                                <button className="bg-[#365761] text-white hover:bg-[#274048] px-12 h-20 rounded-full text-xl font-bold shadow-xl transition-colors">
                                    Join the Network
                                </button>
                            </Link>
                            <Link to="/login">
                                <button className="bg-white text-[#1E3036] hover:bg-[#F8F7F4] border border-[#1E3036]/10 px-12 h-20 rounded-full text-xl font-bold shadow-sm transition-colors">
                                    Schedule Demo
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>

    );
};

export default Home;


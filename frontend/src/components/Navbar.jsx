import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Handshake, ChevronRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import Button from './ui/Button';

const Navbar = () => {
    const { isAuthenticated, logout, user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Solutions', path: '/#solutions' },
        { name: 'Capabilities', path: '/#capabilities' },
        { name: 'Insights', path: '/#insights' },
    ];

    const isAuthPage = ['/login', '/register'].includes(location.pathname);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/80 backdrop-blur-xl border-b border-indigo-100/50 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
                : 'bg-transparent py-6'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                <div className="flex justify-between items-center">
                    {/* Brand Logo */}
                    <Link to="/" className="flex items-center space-x-3 group outline-none">
                        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-indigo-500/20">
                            <Handshake className="text-white w-5 h-5" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-indigo-600 transition-colors">
                            DataTrustX <span className="text-indigo-600">AI</span>
                        </span>
                    </Link>


                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-10">
                        {!isAuthenticated && navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-[14px] font-bold text-neutral-600 hover:text-indigo-600 transition-all hover:-translate-y-0.5"
                            >
                                {link.name}
                            </Link>

                        ))}

                        <div className="flex items-center space-x-4 pl-4 border-l border-neutral-100">
                            {!isAuthenticated ? (
                                !isAuthPage && (
                                    <>
                                        <Link to="/login" className="text-[14px] font-bold text-neutral-900 hover:text-indigo-600 transition-colors px-2">
                                            Log in
                                        </Link>
                                        <Link to="/register">
                                            <Button variant="primary" size="sm" className="px-5 rounded-full shadow-lg shadow-indigo-500/20">
                                                Get Started <ChevronRight className="ml-1.5 w-4 h-4" />
                                            </Button>
                                        </Link>

                                    </>
                                )
                            ) : (
                                <Link to="/dashboard">
                                    <Button variant="primary" size="sm" className="rounded-full px-5">
                                        Launch Console <ArrowRight className="ml-2 w-4 h-4" />
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-50 transition-colors"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-neutral-900/40 backdrop-blur-[2px] z-40"
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-neutral-50">
                                <span className="font-bold text-neutral-900">Navigation</span>
                                <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-50">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-10 space-y-8">
                                {!isAuthenticated && navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-2xl font-bold text-neutral-900 hover:text-indigo-600 transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                            </div>

                            <div className="p-10 border-t border-neutral-50 space-y-4">
                                {!isAuthenticated ? (
                                    <>
                                        <Link to="/login" onClick={() => setIsOpen(false)} className="block">
                                            <Button variant="secondary" className="w-full h-12">Log in</Button>
                                        </Link>
                                        <Link to="/register" onClick={() => setIsOpen(false)} className="block">
                                            <Button variant="primary" className="w-full h-12">Get Started</Button>
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block">
                                            <Button variant="primary" className="w-full h-12">Launch Console</Button>
                                        </Link>
                                        <Button variant="ghost" onClick={handleLogout} className="w-full h-12 text-red-500 font-bold">Sign Out</Button>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;


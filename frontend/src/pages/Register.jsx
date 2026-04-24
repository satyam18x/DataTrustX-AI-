import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, UserPlus, ArrowLeft, ShieldCheck, ShoppingCart, Tag } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const Register = () => {
    const [user, setUser] = useState({
        username: '',
        password: '',
        role: 'buyer'
    });
    const [isLoading, setIsLoading] = useState(false);
    const { signup } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleRoleSelect = (role) => {
        setUser({ ...user, role });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const loadingToast = toast.loading('Creating your account...');

        try {
            await signup(user.username, user.password, user.role);
            toast.success('Account created successfully! Please log in.', { id: loadingToast });
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.detail || 'Registration failed', { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 relative overflow-hidden">
            {/* Background Sophistication */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px] -ml-48 -mt-48" />

            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-[80px] -mr-24 -mb-24" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-lg relative z-10"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center space-x-3 group mb-8">
                        <div className="w-12 h-12 bg-indigo-600 rounded-[14px] flex items-center justify-center shadow-2xl shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-300">

                            <ShieldCheck className="text-white w-6 h-6" strokeWidth={2.5} />
                        </div>
                        <span className="text-2xl font-bold text-neutral-900 tracking-tightest">
                            DataTrustX AI
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Join the network</h1>
                    <p className="text-neutral-500 mt-3 font-medium text-balance">Select your primary role and initialize your verified account</p>
                </div>

                <Card className="p-8 sm:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border-neutral-100 rounded-[32px]">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Role Selection */}
                        <div className="grid grid-cols-2 gap-5">
                            <button
                                type="button"
                                onClick={() => handleRoleSelect('buyer')}
                                className={`p-6 rounded-2xl border-2 transition-all duration-400 text-left relative overflow-hidden group ${user.role === 'buyer'
                                    ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-600/5'
                                    : 'border-neutral-50 bg-neutral-50 hover:border-indigo-200'
                                    }`}
                            >
                                <div className={`p-2.5 rounded-xl inline-flex mb-4 ${user.role === 'buyer' ? 'bg-indigo-600 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                                    <ShoppingCart className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <p className={`text-[15px] font-bold tracking-tight ${user.role === 'buyer' ? 'text-indigo-900' : 'text-neutral-500'}`}>Buyer</p>
                                <p className="text-[11px] font-medium text-neutral-400 mt-1">Acquire data</p>
                                {user.role === 'buyer' && (
                                    <motion.div layoutId="role-indicator" className="absolute top-4 right-4 w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                                )}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleRoleSelect('seller')}
                                className={`p-6 rounded-2xl border-2 transition-all duration-400 text-left relative overflow-hidden group ${user.role === 'seller'
                                    ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-600/5'
                                    : 'border-neutral-50 bg-neutral-50 hover:border-indigo-200'
                                    }`}
                            >
                                <div className={`p-2.5 rounded-xl inline-flex mb-4 ${user.role === 'seller' ? 'bg-indigo-600 text-white' : 'bg-neutral-200 text-neutral-500'}`}>
                                    <Tag className="w-5 h-5" strokeWidth={2.5} />
                                </div>
                                <p className={`text-[15px] font-bold tracking-tight ${user.role === 'seller' ? 'text-indigo-900' : 'text-neutral-500'}`}>Seller</p>
                                <p className="text-[11px] font-medium text-neutral-400 mt-1">Monetize assets</p>
                                {user.role === 'seller' && (
                                    <motion.div layoutId="role-indicator" className="absolute top-4 right-4 w-1.5 h-1.5 bg-indigo-600 rounded-full" />
                                )}
                            </button>
                        </div>

                        <div className="space-y-6">
                            <Input
                                label="Username"
                                name="username"
                                placeholder="Choose a username"
                                icon={User}
                                required
                                value={user.username}
                                onChange={handleChange}
                                className="h-14 rounded-xl"
                            />

                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Create a secure password"
                                icon={Lock}
                                required
                                value={user.password}
                                onChange={handleChange}
                                className="h-14 rounded-xl"
                            />
                        </div>

                        <div className="flex items-start space-x-3 group px-1">
                            <div className="relative flex items-center mt-0.5">
                                <input
                                    type="checkbox"
                                    required
                                    id="terms"
                                    className="peer h-5 w-5 rounded-md border-neutral-300 bg-white text-indigo-600 focus:ring-indigo-500 transition-all duration-300"
                                />
                            </div>
                            <label htmlFor="terms" className="text-[13px] text-neutral-500 font-medium leading-relaxed select-none">
                                I confirm having read and agreed to the <Link to="#" className="text-indigo-600 font-bold hover:underline underline-offset-4 decoration-2">Terms of Service</Link> and <Link to="#" className="text-indigo-600 font-bold hover:underline underline-offset-4 decoration-2">Privacy Policy</Link>.
                            </label>
                        </div>

                        <Button
                            type="submit"
                            className="w-full h-15 rounded-xl text-[16px] font-bold shadow-xl shadow-indigo-600/10"
                            isLoading={isLoading}
                        >
                            Create Account <UserPlus className="ml-2 w-5 h-5" strokeWidth={3} />
                        </Button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-neutral-50 text-center">
                        <p className="text-[14px] text-neutral-500 font-medium">
                            Already part of the network?{' '}
                            <Link to="/login" className="font-bold text-indigo-600 hover:underline underline-offset-4 decoration-2">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </Card>

                <div className="text-center mt-10">
                    <Link to="/" className="inline-flex items-center text-[13px] font-bold text-neutral-400 hover:text-neutral-900 transition-colors duration-300">
                        <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={3} /> Back to marketplace
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;


import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowLeft, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const loadingToast = toast.loading('Authenticating...');

        try {
            await login(credentials.username, credentials.password);
            toast.success(`Welcome back, ${credentials.username}!`, { id: loadingToast });
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.detail || 'Invalid username or password', { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 relative overflow-hidden">
            {/* Background Sophistication */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[100px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/30 rounded-full blur-[80px] -ml-24 -mb-24" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center space-x-3 group mb-8">
                        <div className="w-12 h-12 bg-indigo-600 rounded-[14px] flex items-center justify-center shadow-2xl shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-300">

                            <ShieldCheck className="text-white w-6 h-6" strokeWidth={2.5} />
                        </div>
                        <span className="text-2xl font-bold text-neutral-900 tracking-tightest">
                            DataTrustX AI
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Access your console</h1>
                    <p className="text-neutral-500 mt-3 font-medium">Review your datasets and active transactions</p>
                </div>

                <Card className="p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border-neutral-100 rounded-[32px]">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Username"
                            name="username"
                            placeholder="Enter username"
                            icon={User}
                            required
                            value={credentials.username}
                            onChange={handleChange}
                            autoComplete="username"
                            className="h-14 rounded-xl"
                        />

                        <div className="space-y-2">
                            <Input
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="••••••••"
                                icon={Lock}
                                required
                                value={credentials.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                className="h-14 rounded-xl"
                            />
                            <div className="flex justify-end">
                                <Link to="#" className="text-[13px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                                    Forgot password?
                                </Link>

                            </div>
                        </div>

                        <Button
                            type="submit"
                            variant="glow"
                            className="w-full h-14 rounded-xl text-[16px] font-bold mt-2"
                            isLoading={isLoading}
                        >
                            Sign In <ArrowRight className="ml-2 w-5 h-5" strokeWidth={3} />
                        </Button>

                    </form>

                    <div className="mt-10 pt-8 border-t border-neutral-50 text-center">
                        <p className="text-[14px] text-neutral-500 font-medium">
                            First time here?{' '}
                            <Link to="/register" className="font-bold text-indigo-600 hover:underline underline-offset-4 decoration-2">
                                Create an account
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

export default Login;


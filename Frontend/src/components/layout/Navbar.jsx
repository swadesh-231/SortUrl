import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { Link2, LogOut } from 'lucide-react';
import Button from '../ui/Button';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800"
            initial={{ y: -60 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                        <Link2 className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="text-lg font-bold text-indigo-400">SortUrl</span>
                </Link>

                {/* Actions */}
                {isAuthenticated ? (
                    <Button variant="ghost" size="sm" icon={LogOut} onClick={handleLogout}>
                        Sign out
                    </Button>
                ) : (
                    <div className="flex items-center gap-3">
                        <Link to="/login">
                            <Button variant="ghost" size="sm">Sign in</Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="primary" size="sm">Get Started</Button>
                        </Link>
                    </div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;

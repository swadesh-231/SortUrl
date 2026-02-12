import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Zap, BarChart3, Shield, Link2, ArrowRight } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';

const features = [
    {
        icon: Zap,
        title: 'Lightning Fast',
        desc: 'Generate short URLs in milliseconds with our optimized infrastructure.',
    },
    {
        icon: BarChart3,
        title: 'Detailed Analytics',
        desc: 'Track clicks, analyze trends, and understand your audience in real time.',
    },
    {
        icon: Shield,
        title: 'Secure & Reliable',
        desc: 'Enterprise-grade security with JWT auth and encrypted data storage.',
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, delay: i * 0.1 },
    }),
};

const Landing = () => {
    return (
        <MainLayout>
            {/* Hero */}
            <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
                    <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium rounded-full bg-indigo-500/10 text-indigo-400 mb-6">
                        <Zap className="w-3 h-3" /> Free & Open Source
                    </span>
                </motion.div>

                <motion.h1
                    className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-zinc-100"
                    variants={fadeUp} initial="hidden" animate="visible" custom={1}
                >
                    Shorten.{' '}
                    <span className="text-indigo-400">Share.</span><br />
                    Track Everything.
                </motion.h1>

                <motion.p
                    className="mt-6 text-lg max-w-xl mx-auto text-zinc-400"
                    variants={fadeUp} initial="hidden" animate="visible" custom={2}
                >
                    Transform long URLs into clean, trackable links. Get real-time analytics and insights on every click.
                </motion.p>

                <motion.div
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                    variants={fadeUp} initial="hidden" animate="visible" custom={3}
                >
                    <Link to="/register">
                        <Button size="lg" icon={ArrowRight}>
                            Get Started — It&apos;s Free
                        </Button>
                    </Link>
                    <Link to="/login">
                        <Button variant="secondary" size="lg">
                            Sign In
                        </Button>
                    </Link>
                </motion.div>

                {/* Hero visual — mock card */}
                <motion.div
                    className="mt-16 max-w-lg mx-auto bg-zinc-900 border border-zinc-800 rounded-xl p-5"
                    variants={fadeUp} initial="hidden" animate="visible" custom={4}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/10">
                            <Link2 className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="flex-1 h-10 rounded-xl bg-zinc-800 border border-zinc-700">
                            <div className="flex items-center h-full px-4">
                                <span className="text-xs text-zinc-500">https://example.com/very/long/url/path…</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex-1 h-10 rounded-xl flex items-center px-4 bg-zinc-800 border border-indigo-500/30">
                            <span className="text-xs font-semibold text-indigo-400">sorturl.app/xK9mL</span>
                        </div>
                        <div className="h-10 px-4 rounded-xl bg-indigo-500 flex items-center">
                            <span className="text-xs font-semibold text-white">Copied ✓</span>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <motion.div className="text-center mb-12" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
                    <h2 className="text-3xl font-bold text-zinc-100">Everything You Need</h2>
                    <p className="mt-2 text-sm text-zinc-500">Simple tools. Powerful insights.</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-700 transition-colors duration-200"
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={i + 1}
                        >
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-indigo-500/10 mb-4">
                                <feat.icon className="w-5 h-5 text-indigo-400" />
                            </div>
                            <h3 className="text-base font-bold text-zinc-100 mb-2">{feat.title}</h3>
                            <p className="text-sm leading-relaxed text-zinc-500">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-zinc-800 py-8 text-center">
                <p className="text-xs text-zinc-500">
                    &copy; {new Date().getFullYear()} SortUrl. Built with ❤ and React.
                </p>
            </footer>
        </MainLayout>
    );
};

export default Landing;

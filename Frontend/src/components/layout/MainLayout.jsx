import Navbar from './Navbar';

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen bg-zinc-950">
            <Navbar />
            <main className="relative z-10 pt-16">
                {children}
            </main>
        </div>
    );
};

export default MainLayout;

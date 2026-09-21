import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FeedbackModal } from './components/FeedbackModal';
import { BulkOrderModal } from './components/BulkOrderModal';
import { BulkOrderProvider } from './context/BulkOrderContext';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { About } from './pages/About';

// Scroll to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export function App() {
  return (
    <Router>
      <BulkOrderProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#FAF6EE] text-earth-900 font-body selection:bg-strawberry-500 selection:text-white">
          
          {/* Top Announcement Bar */}
          <div className="bg-[#B91C1C] text-white text-[11px] sm:text-xs font-semibold py-1.5 px-4 text-center tracking-wide">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
              <span>Fresh Mahabaleshwar ka! Chilled & Delicious Juices • Milkshakes • Icecream • Order Now!</span>
            </div>
          </div>

          {/* Main Navbar */}
          <Navbar />

          {/* Main Route Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />

          {/* Floating Feedback Button & Modal */}
          <FeedbackModal />

          {/* Bulk & Pre-Order Modal (Triggered via Navbar & direct buttons) */}
          <BulkOrderModal />

        </div>
      </BulkOrderProvider>
    </Router>
  );
}

export default App;

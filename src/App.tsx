import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { HomePage } from './pages/HomePage';
import { StoryPage } from './pages/StoryPage';
import { MenuPage } from './pages/MenuPage';
import { DishDetailPage } from './pages/DishDetailPage';
import { OutletsPage } from './pages/OutletsPage';
import { BookTablePage } from './pages/BookTablePage';
import { DeliveryPage } from './pages/DeliveryPage';
import { AwardsPage } from './pages/AwardsPage';
import { CareersPage } from './pages/CareersPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top helper on hash route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#0c0a09] text-[#f5f5f4] selection:bg-[#c29b38] selection:text-[#0c0a09]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/story" element={<StoryPage />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/menu/:id" element={<DishDetailPage />} />
              <Route path="/outlets" element={<OutletsPage />} />
              <Route path="/book-table" element={<BookTablePage />} />
              <Route path="/delivery" element={<DeliveryPage />} />
              <Route path="/awards" element={<AwardsPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer />
        </div>
      </HashRouter>
    </AppProvider>
  );
}

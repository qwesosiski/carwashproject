import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Prices from './components/Prices';
import About from './components/About';
import MapSection from './components/MapSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import Login from './components/Login';
import Account from './components/Account';

const HomePage = ({ onBook }) => (
  <>
    <Hero onBook={onBook} />
    <Services />
    <Prices onBook={onBook} />
    <About />
    <MapSection />
  </>
);

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Header onBook={openBooking} />
          <main>
            <Routes>
              <Route path="/" element={<HomePage onBook={openBooking} />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <Account />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          {isBookingOpen && <BookingModal onClose={closeBooking} />}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
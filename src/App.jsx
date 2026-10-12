import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Prices from './components/Prices';
import About from './components/About';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="app">
      <Header onBook={openBooking} />
      <main>
        <Hero onBook={openBooking} />
        <Services />
        <Prices onBook={openBooking} />
        <About />
      </main>
      <Footer />
      {isBookingOpen && <BookingModal onClose={closeBooking} />}
    </div>
  );
}

export default App;
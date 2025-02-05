import React from 'react';
import { AuthProvider } from './components/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import Mypage from './components/Mypage';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <AuthProvider>
            <Router>
              <Header />
              <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/mypage" element={<Mypage />} />
              </Routes>
            </Router>
            <Footer />
        </AuthProvider>
    </div>
  );
}

export default App;

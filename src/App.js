import React from 'react';
import GeneralSearch from './components/GeneralSearch';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import MainPage from './components/MainPage';
import Header from './components/Header';
import Footer from './components/Footer';
import Layout from './components/Layout';

function App() {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Router>
              <Header />
              <Routes>
                  <Route element={<Layout />}>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/searchResult" element={<GeneralSearch />} />
                    <Route path="/mypage" element={<Mypage />} />
                  </Route>
              </Routes>
            </Router>
            <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

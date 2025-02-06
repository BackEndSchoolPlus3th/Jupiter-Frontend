import { useState } from 'react'
import GeneralSearch from './pages/SearchPage/SearchPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';
import MainPage from './pages/MainPage/MainPage';
import Mypage from './pages/MyPage/MyPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Layout from './components/layout/Layout';


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/searchResult" element={<GeneralSearch />} />
            <Route path="/mypage" element={<Mypage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

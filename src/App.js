import React from 'react';
import GeneralSearch from './components/GeneralSearch';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import Header from './components/Header';
import Layout from './components/Layout';
function App() {
  return (
    // <div>
    //   <GeneralSearch />
    // </div>
   <BrowserRouter>
   <Routes>
      <Route element={<Layout />} >
        <Route path="/" element={<MainPage />} />
        <Route path="/searchResult" element={<GeneralSearch />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

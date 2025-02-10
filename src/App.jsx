import { useState } from "react";
import GeneralSearch from "./pages/SearchPage/SearchPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import Mypage from "./pages/MyPage/MyPage";
import Detail from "./pages/Detail/Detail";
import Layout from "./components/layout/Layout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/searchResult" element={<GeneralSearch />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

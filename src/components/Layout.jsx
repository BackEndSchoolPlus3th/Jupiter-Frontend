import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet /> {/* 하위 라우트 컴포넌트가 렌더링되는 위치 */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
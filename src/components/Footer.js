// src/components/Footer.js
import React from 'react';
import '../styles/Footer.css';

import Chatbot from './Chatbot';

function Footer() {
  return (
    <footer>
      {/* Chatbot 컴포넌트 추가 */}
      <Chatbot />

      {/* 로고 팀명 */}
      <div className="footer-text-team">
        <li className="logo nav-li">우주라이크</li>
      </div>

      <div className="footer-text-member">
        <span>손서연 김규일 김소영 방대혁 최제인</span>
      </div>
    </footer>
  );
}

export default Footer;

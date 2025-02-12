// src/components/Footer.js
import React from 'react';
import "../../index.css";
import '../../styles/Footer.css';

import Chatbot from '../chatbot/Chatbot';

function Footer() {
  return (
    <footer>
      {/* Chatbot 컴포넌트 추가 */}
      <Chatbot />

      {/* 로고 팀명 */}
      <div className="footer-text-team">
          <ul className="nav-list">
            <li className="logo-foot nav-li text-primary">우주라이크</li>
            <li className="home nav-li">멋쟁이 사자처럼 목성팀 * 손서연 김규일 김소영 방대혁 최제인</li>
          </ul>
      </div>
    </footer>
  );
}

export default Footer;

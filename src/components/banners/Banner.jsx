// src/components/Banner.js
import React from 'react';
import './Banner.css';

function Banner() {
    return (
        <div className="banner">
            {/* 배경 이미지로만 설정 */}
            <div className="banner-content">
                <h1>Welcome to Our Movie Service</h1>
                <p>Explore the best movies and shows!</p>
            </div>
        </div>
    );
}

export default Banner;

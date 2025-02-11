/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // 프로젝트 내에서 Tailwind가 적용될 파일 경로
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"), // daisyUI 플러그인 추가
  ],
  daisyui: {
      themes: [],
  },
};
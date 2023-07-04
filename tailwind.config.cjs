/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./index.html', './src/**/*.{jsx,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {},
      backgroundImage: {
        logodark: 'url(/assets/logo_bg_white.png)',
        logolight: 'url(/assets/logo_bg_black.png)',
      },
      animation: {
        navcontentappear: 'navcontentappear 300ms ease-out 1',
        navcontentdisappear: 'navcontentdisappear 300ms ease-in 1',
        tooltipappear: 'tooltipappear 150ms ease-out 1',
        tooltipdisappear: 'tooltipdisappear 10ms ease-in 1',
        resultsRight: 'resultsRight 400ms cubic-bezier(0,0,0,1) 1',
        resultsLeft: 'resultsLeft 400ms cubic-bezier(0,0,0,1) 1',
      },
      keyframes: {
        navcontentappear: {
          from: { transform: 'translateY(-576px)', opacity: '.5' },
          to: { transform: 'translateY(0px)', opacity: '1' },
        },
        navcontentdisappear: {
          from: { transform: 'translateY(0px)', opacity: '1' },
          to: { transform: 'translateY(-576px)', opacity: '0' },
        },
        tooltipappear: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        tooltipdisappear: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        resultsRight: {
          '0%': { transform: 'translateX(0%)' },
          '33%': { transform: 'translateX(-110%)' },
          '33.001%': { transform: 'translateX(80%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        resultsLeft: {
          '0%': { transform: 'translateX(0%)' },
          '33%': { transform: 'translateX(110%)' },
          '33.001%': { transform: 'translateX(-80%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      spacing: {
        //page: 1112,
        page: 1080,
        app: 1080,
      },
      colors: {
        bg1: '#94a3b8', // slate-400
        bg1Dark: '#1e293b', // slate-800
        bg2: '#cbd5e1', // slate-300
        bg2Dark: '#334155', // slate-700
        bgCanvas: '#e2e8f0', // slate-200
        bgCanvasDark: '#64748b', // slate-500
        back: '#e2e8f0', // slate-200
        backDark: '#475569', // slate-600

        textBlack: '#262626', // neutral-800
        textBlack2: '#525252', // neutral-600
        textWhite: '#e5e5e5', // neutral-200
        textWhite2: '#a3a3a3', // neutral-400

        slider1: '#94a3b8', // slate-400
        slider1Dark: '#1e293b', // slate-800
        slider2: '#86198f', //fuchsia-800
        slider2Dark: '#d946ef', // fuchsia-500
        slider3: '#c026d3', // fuchsia-600
        slider3Dark: '#e879f9', // fuchsia-400

        button1: '#155e75', // cyan-800
        button1Dark: '#0891b2', // cyan-600
        button2: '#0891b2', // cyan-600
        button2Dark: '#22d3ee', // cyan-400
        button3: '#a5f3fc', // cyan-200
        button3Dark: '#67e8f9', // cyan-300
        ruleButton1: '#86198f', // fuchsia-800
        ruleButton1Dark: '#d946ef', // fuchsia-500
        ruleButton2: '#c026d3', // fuchsia-600
        ruleButton2Dark: '#e879f9', // fuchsia-400
        ruleButton3: '#e879f9', // fuchsia-400
        ruleButton3Dark: '#f5d0fe', // fuchsia-200
      },
      fontFamily: {
        inter: ['inter', 'serif'],
      },
    },
  },
  plugins: [],
};

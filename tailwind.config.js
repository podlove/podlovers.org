const colors = require('./src/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx,vue}', './dist/**/*.html'],
  theme: {
    colors,
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    },
    fontFamily: {
      sans: [
        'Roboto',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ],
      mono: [
        'Roboto Mono',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace'
      ]
    },
    inset: {
      0: 0,
      auto: 'auto',
      100: '100%'
    },
    extend: {
      colors: {
        'podlove-blue': colors.blue,
        'podlove-green': colors.green,
        'podlove-orange': colors.orange
      },
      spacing: {
        96: '24rem',
        128: '32rem'
      },
      width: {
        app: '1024px'
      }
    }
  },
  variants: {
    visibility: ['responsive', 'hover', 'focus', 'group-hover']
  }
}

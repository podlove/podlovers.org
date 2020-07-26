const colors = require('./src/colors')

module.exports = {
  purge: ['./src/**/*.vue'],
  theme: {
    colors: {
      blue: {
        '100': '#DCE4EB',
        '200': '#C8D3DF',
        '300': '#A2B5C8',
        '400': '#738FAA',
        '500': '#4C6780',
        '600': '#2C4A66',
        '700': '#1B3854',
        '800': '#102A43',
        '900': '#051729',
      },
      gray: {
        '100': '#FFFFFF',
        '200': '#EDEFF2',
        '300': '#CAD1D7',
        '400': '#9EA5AC',
        '500': '#767F87',
        '600': '#56616A',
        '700': '#3D464D',
        '800': '#22282C',
        '900': '#070809',
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
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
      ],
    },
    borderWidth: {
      default: '1px',
      '0': '0',
      '2': '2px',
      '4': '4px',
    },
    inset: {
      '0': 0,
      auto: 'auto',
      '100': '100%',
    },
    extend: {
      colors: {
        'podlove-blue': colors.blue,
        'podlove-green': colors.green,
        'podlove-orange': colors.orange
      },
      spacing: {
        '96': '24rem',
        '128': '32rem',
      },
      width: {
        app: '1024px'
      }
    }
  },
  variants: {
    visibility: ['responsive', 'hover', 'focus', 'group-hover'],
  }
}

import { createTheme } from "@mui/material/styles";

interface CustomThemeOptions {
  status: {
    white: string;
    bgDark: string;
    textSecondary: string
  }
}

declare module '@mui/material/styles' {
  interface Theme extends CustomThemeOptions {}
  // allow configuration using `createTheme`
  interface ThemeOptions extends CustomThemeOptions {}
}

const TB_PALETTE_MAIN = '#262627'
const TB_PALETTE_TEXT_PRIMARY = '#3e5060'
const TB_PALETTE_TEXT_SECONDARY = '#3e5060'
const TB_PALETTE_BG_DEFAULT = '#fcfaf8'

const TB_STATUS_WHITE = '#FFFFFF'
const TB_STATUS_BG_DARK = '#131313'
const TB_STATUS_COLOR_TEXT_SECONDARY = '#AAAAAA'


export default createTheme({
  status: {
    white: TB_STATUS_WHITE,
    bgDark: TB_STATUS_BG_DARK,
    textSecondary: TB_STATUS_COLOR_TEXT_SECONDARY
  },
  palette: {
    primary: {
      main: TB_PALETTE_MAIN,
    },
    background: {
      default: TB_PALETTE_BG_DEFAULT,

    },
    text: {
      primary: TB_PALETTE_TEXT_PRIMARY,
      secondary: TB_PALETTE_TEXT_SECONDARY,
    },
  },
  typography: {
    fontFamily: [
      '"Helvetica Neue LT Pro"',
      '"Ping Fang SC"',
      '"SourceHanSansSC"',
      '"Noto Sans CJK SC"',
      '"Hiragino Sans GB"',
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif',
      '"STXihei"',
      '"华文细黑"',
      '"Heiti"',
      '"黑体"',
      '"冬青黑体简体中文"',
    ].join(','),
    h1: {
      fontSize: 64,
      fontWeight: 700,
    },
    h2: {
      fontSize: 36,
      fontWeight: 700
    },
    h3: {
      fontSize: 24,
      fontWeight: 700
    },
    subtitle1: {
      fontSize: 16
    },
    body1: {
      fontSize: 14
    },
    button: {
      fontSize: 14,
    },
    caption: {
      fontSize: 12
    }
  },
  mixins: {

  }
})

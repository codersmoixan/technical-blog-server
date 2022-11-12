import { createTheme } from "@mui/material/styles";

export enum TechnicalBlogPalette {
  main = '#262627',
  white = '#FFFFFF',
  primary = '#3e5060',
  secondary = '#6f7e8c'
}

export default createTheme({
  palette: {
    primary: {
      main: TechnicalBlogPalette.main,
    },
    background: {
      default: TechnicalBlogPalette.main,

    },
    text: {
      primary: TechnicalBlogPalette.primary,
      secondary: TechnicalBlogPalette.secondary,
    },
    success: {
      main: TechnicalBlogPalette.main
    },
    info: {
      main: TechnicalBlogPalette.main
    },
    common: {
      white: TechnicalBlogPalette.white
    }
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

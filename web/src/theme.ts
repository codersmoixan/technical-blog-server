import { createTheme } from "@mui/material/styles";
import {CSSProperties} from "@mui/styles";

interface CustomThemeOptions {
  status: {
    backdropHeight: number;
    navHeight: number;
    navWidth: number;
    contentWidth: number;

    white: string;
    bgDark: string;
    textSecondary: string;
    transparent: string;
    transition: (t?: number) => string;
    transitionTime: string;
    colorSecondary: string;
    darkPeach: string;
    placeholder: string;
    disabled: string;
    error: string;
    darkColor: string;
    lightGrey: string;
    lightPurple: string;
  };
  common: {
    verticalCenter: CSSProperties;
    inlineCenter: CSSProperties;
    spaceBetweenCenter: CSSProperties;
  }
}

declare module '@mui/material/styles' {
  interface Theme extends CustomThemeOptions {}
  // allow configuration using `createTheme`
  interface ThemeOptions extends CustomThemeOptions {}
}

const TB_PALETTE_MAIN = '#181622'
const TB_PALETTE_TEXT_SECONDARY = '#86909c'
const TB_PALETTE_BG_DEFAULT = '#f5f1ea'

const TB_STATUS_WHITE = '#FFFFFF'
const TB_STATUS_BG_DARK = '#131313'
const TB_STATUS_COLOR_SECONDARY = '#d8dee3'
const TB_STATUS_COLOR_TEXT_SECONDARY = '#737373'
const TB_STATUS_COLOR_TRANSPARENT = 'transparent'
const TB_STATUS_DARK_PEACH = '#f8f6f1'
const TB_STATUS_PLACEHOLDER = '#c1c5cd'
const TB_STATUS_DISABLED = '#86909c'
const TB_STATUS_ERROR = '#d32f2f'
const TB_STATUS_LIGHT_GREY = '#878593'
const TB_STATUS_LIGHT_PURPLE = '#853bce'

const TB_STATUS_TRANSITION_TIME = '.3s'
const TB_STATUS_TRANSITION = (t?: number) => t ? `all ${t}s` : `all ${TB_STATUS_TRANSITION_TIME}`


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1100,
      xl: 1350
    }
  },
  status: {
    backdropHeight: 580,
    navWidth: 1408,
    contentWidth: 1376,
    navHeight: 88,
    transition: TB_STATUS_TRANSITION,
    transitionTime: TB_STATUS_TRANSITION_TIME,

    white: TB_STATUS_WHITE,
    bgDark: TB_STATUS_BG_DARK,
    darkColor: TB_STATUS_BG_DARK,
    darkPeach: TB_STATUS_DARK_PEACH,
    colorSecondary: TB_STATUS_COLOR_SECONDARY,
    textSecondary: TB_STATUS_COLOR_TEXT_SECONDARY,
    transparent: TB_STATUS_COLOR_TRANSPARENT,
    placeholder: TB_STATUS_PLACEHOLDER,
    disabled: TB_STATUS_DISABLED,
    error: TB_STATUS_ERROR,
    lightGrey: TB_STATUS_LIGHT_GREY,
    lightPurple: TB_STATUS_LIGHT_PURPLE,
  },
  common: {
    verticalCenter: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inlineCenter: {
      display: 'flex',
      justifyContent: 'center'
    },
    spaceBetweenCenter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  },
  palette: {
    primary: {
      main: TB_PALETTE_MAIN,
    },
    background: {
      default: TB_PALETTE_BG_DEFAULT,

    },
    text: {
      primary: TB_PALETTE_MAIN,
      secondary: TB_PALETTE_TEXT_SECONDARY,
    },
  },
  typography: {
    fontFamily: [
      "Open Sans",
      'SourceHanSansSC',
      'Noto Sans CJK SC',
      'Hiragino Sans GB',
      'Roboto',
      'Helvetica',
      'Arial',
      'STXihei',
      '华文细黑',
      'Microsoft YaHei',
      'Microsoft YaHei UI',
      '微软雅黑',
      'Heiti',
      '黑体',
      '冬青黑体简体中文',
    ].join(','),
    h1: {
      fontSize: 64,
      fontWeight: 700,
      lineHeight: 1.5
    },
    h2: {
      fontSize: 36,
      fontWeight: 700,
      lineHeight: 1.5
    },
    h3: {
      fontSize: 30,
      fontWeight: 700,
      lineHeight: 1.5
    },
    h4: {
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.5
    },
    h5: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1.5
    },
    subtitle1: {
      fontSize: 16,
      lineHeight: 1.5
    },
    body1: {
      fontSize: 14,
      lineHeight: 1.5
    },
    button: {
      fontSize: 14,
      lineHeight: 1.5
    },
    caption: {
      fontSize: 12,
      lineHeight: 1.5
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        color: TB_PALETTE_MAIN
      }
    }
  }
})

export default theme

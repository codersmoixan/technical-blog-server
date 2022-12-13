import { makeStyles } from "@mui/styles";
import type {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 999,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    transition: 'all .6s',
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(0, 3),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 72,
      backgroundColor: theme.status.white
    }
  },
  focus: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
  },
  blur: {
    backgroundColor: 'rgba(255, 255, 255, 0)'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto',
    width: '100%',
    maxWidth: theme.status.navWidth,
  },
  menus: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: theme.spacing(3),
    height: theme.status.navHeight,
    transition: theme.status.transition(),
    [theme.breakpoints.up('lg')]: {
      marginLeft: theme.spacing(10)
    }
  },
  tools: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 425
  },
  logo: {
    width: 45,
    height: 45,
    [theme.breakpoints.down('lg')]: {
      width: 30,
      height: 30
    }
  },
  open: {
    color: theme.palette.primary.main
  }
}))

export default useStyles

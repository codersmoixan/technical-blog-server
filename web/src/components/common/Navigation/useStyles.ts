import { makeStyles } from "@mui/styles";
import type {Theme} from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 99,
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
    backgroundColor: theme.status.white,
    transition: 'all .6s'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto',
    maxWidth: 1408,
  },
  menus: {
    display: 'flex',
    alignItems: 'center',
    height: 88,
  },
  tools: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 425
  },
  logo: {
    width: 250,
    height: 45,
    [theme.breakpoints.down('lg')]: {
      width: 140,
      height: 30
    }
  },
  open: {
    color: theme.palette.primary.main
  }
}))

export default useStyles

import Box, { BoxProps } from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import LogoIcon from "components/Icons/LogoIcon";
import theme from "@/src/theme";
import type { Theme } from "@mui/material";

interface LogoProps extends BoxProps {
  bgColor?: string;
  color?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    '& svg': {
      width: '100%',
      height: '100%'
    }
  },
}))

function Logo({ className, bgColor = theme.status.white, color, ...other }: LogoProps) {
  const classes = useStyles()

  return (
    <Box className={clsx(className, classes.root)} {...other}>
      <LogoIcon bgColor="white" />
    </Box>
  )
}

export default Logo

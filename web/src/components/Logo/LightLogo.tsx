import Box, { BoxProps } from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import type { Theme } from "@mui/material";
import LogoIcon from "components/Icons/LogoIcon";

interface LightLogo extends BoxProps {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    opacity: '.6',
    '& svg': {
      width: '100%',
      height: '100%'
    }
  },
}))

function LightLogo({ className, ...other }: LightLogo) {
  const classes = useStyles()

  return (
    <Box className={clsx(className, classes.root)} {...other}>
      <LogoIcon bgColor="white" />
    </Box>
  )
}

export default LightLogo

import Box, { BoxProps } from "@mui/material/Box";
import Logo from "public/images/logo/logo.light.jpg";
import Image from "next/image";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import type { Theme } from "@mui/material";

interface LightLogo extends BoxProps {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: `1px solid ${theme.status.white}`,
    borderRadius: '50%'
  },
  logo: {
    width: '100%',
    height: '100%'
  }
}))

function LightLogo({ className, ...other }: LightLogo) {
  const classes = useStyles()

  return (
    <Box className={clsx(className, classes.root)} {...other}>
      <Image src={Logo} alt="" className={classes.logo} />
    </Box>
  )
}

export default LightLogo

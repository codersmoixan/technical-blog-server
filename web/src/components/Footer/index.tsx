/**
 * @author zhengji.su
 * @description Footer
 */

import Box from '@mui/material/Box'
import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";
import Typography from "@mui/material/Typography";
import Logo from "public/images/logo/logo.light.jpg";
import Image from "next/image";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 700,
    backgroundColor: theme.palette.primary.main
  },
  logo: {
    width: 80,
    height: 80
  }
}))

function Footer() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Typography>Footer</Typography>
      <Image src={Logo} alt="" className={classes.logo} />
    </Box>
  )
}

export default Footer

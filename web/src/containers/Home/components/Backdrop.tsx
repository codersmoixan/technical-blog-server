import Image from "next/image";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingTop: '10vh',
    height: '80vh',
    zIndex: -1
  },
  deployments: {
    position: 'absolute',
    right: 0
  },
  computerCity: {
    position: 'absolute',
    bottom: 235,
    right: 650
  }
}))

function Backdrop() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Image
        src="/svg/deployments.svg"
        alt=""
        width={650}
        height={525}
        className={classes.deployments}
      />
      <Image
        src="/svg/computer-city-lines--dark.svg"
        alt="computer-city-lines--dark"
        width={325}
        height={255}
        className={classes.computerCity}
      />
    </Box>
  )
}

export default Backdrop

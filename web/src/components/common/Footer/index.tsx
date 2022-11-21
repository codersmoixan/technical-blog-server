/**
 * @author zhengji.su
 * @description Footer
 */

import Box from '@mui/material/Box'
import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    height: 700,
    backgroundColor: theme.status.bgDark
  }
}))

function Footer() {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Typography>Footer</Typography>
    </Box>
  )
}

export default Footer

import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  stepNumber: {
    margin: theme.spacing(0, 'auto', 5),
    width: 72,
    height: 72,
    lineHeight: '72px',
    textAlign: 'center',
    borderRadius: '50%',
    border: `3px solid ${theme.status.blue500}`,
    color: theme.status.blue500
  },
  title: {
    color: 'var'
  }
}))

function StepFirst() {
  const classes = useStyles()

  return (
    <Box component="section" className={classes.root}>
      <Typography component="p" className={classes.stepNumber} variant="h2">1</Typography>
      <Box>
        <Typography variant="h2" className={classes.title}>技术专场</Typography>
      </Box>
    </Box>
  )
}

export default StepFirst

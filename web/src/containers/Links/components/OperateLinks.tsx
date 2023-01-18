import Box from "@mui/material/Box";
import Logo from "components/Logo";
import Form from "components/Form/Form";
import Grid from "@mui/material/Grid";
import DarkFormText from "components/Form/DarkFormText";
import Buttons from "components/Buttons";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import useForm from "hooks/common/useForm";
import useLinks from "containers/Links/hooks/useLinks";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 296,
  },
  logo: {
    margin: theme.spacing(0, 'auto', 5),
    width: 100,
    height: 100,
  },
  form: {
    marginTop: theme.spacing(3)
  },
  submit: {
    '&.MuiButton-contained': {
      backgroundColor: theme.status.lightPurple
    }
  }
}))

function OperateLinks() {
  const classes = useStyles()
  const { observer } = useForm()
  const { add, loading } = useLinks()

  return (
    <Box className={classes.root}>
      <Logo className={classes.logo} />
      <Form observer={observer} className={classes.form} onFinish={add}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DarkFormText name="label" placeholder="你的URL地址: https://www.links.com" />
          </Grid>
          <Grid item xs={12}>
            <Buttons
              fullWidth
              variant="contained"
              className={classes.submit}
              type="submit"
              loading={loading}
            >提交</Buttons>
          </Grid>
        </Grid>
      </Form>
    </Box>
  )
}

export default OperateLinks

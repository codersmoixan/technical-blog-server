import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Form from "components/Form/Form";
import useForm from "hooks/common/useForm";
import Logo from "components/Logo";
import DarkFormText from "components/Form/DarkFormText";
import Grid from "@mui/material/Grid";
import useCategory from "hooks/features/useCategory";
import DarkFormSelect from "components/Form/DarkFormSelect";
import type { Theme } from "@mui/material";
import Buttons from "components/Buttons";

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

function OperateTag() {
  const classes = useStyles()
  const { observer } = useForm()
  const { categories } = useCategory()

  return (
    <Box className={classes.root}>
      <Logo className={classes.logo} />
      <Form observer={observer} className={classes.form}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DarkFormText name="label" label="你的标签: Go" />
          </Grid>
          <Grid item xs={12}>
            <DarkFormSelect
              name="category"
              options={categories}
              placeholder="添加到你的分类"
              rowKey="label"
              rules={{
                required: '选择你的分类'
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Buttons fullWidth variant="contained" className={classes.submit}>提交</Buttons>
          </Grid>
        </Grid>
      </Form>
    </Box>
  )
}

export default OperateTag

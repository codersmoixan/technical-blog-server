import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import Form from "components/Form/Form";
import useForm from "hooks/common/useForm";
import LightLogo from "components/Logo/LightLogo";
import DarkFormText from "containers/Tag/components/DarkFormText";
import type { Theme } from "@mui/material";
import FormSelectChip from "components/Form/FormSelectChip";
import Grid from "@mui/material/Grid";
import useCategory from "hooks/features/useCategory";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 296,
  },
  logo: {
    margin: theme.spacing(0, 'auto'),
    width: 100,
    height: 100,
  },
  form: {
    marginTop: theme.spacing(3)
  }
}))

function OperateTag() {
  const classes = useStyles()
  const { observer } = useForm()
  const { categories } = useCategory()

  return (
    <Box className={classes.root}>
      <LightLogo className={classes.logo} />
      <Form observer={observer} className={classes.form}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <DarkFormText name="label" label="你的标签: Go" />
          </Grid>
          <Grid item xs={12}>
            <FormSelectChip
              name="tag"
              multiple
              options={categories}
              label="请选择标签"
              rules={{
                required: '请选择文章标签'
              }}
            />
          </Grid>
        </Grid>
      </Form>
    </Box>
  )
}

export default OperateTag

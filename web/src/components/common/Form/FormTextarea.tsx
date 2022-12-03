/**
 * @author zhengji.su
 * @description FormTextArea
 */

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    width: '100%'
  }
}))

function FormTextarea(props: TextFieldProps) {
  const classes = useStyles()

  return (
    <TextField
      id="outlined-multiline-static"
      multiline
      classes={{
        root: classes.textField
      }}
      rows={4}
      {...props}
    />
  )
}

export default FormTextarea

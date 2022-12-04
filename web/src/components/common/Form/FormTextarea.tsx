/**
 * @author zhengji.su
 * @description FormTextArea
 */

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import useFormController from "hooks/useFormController";
import type { EmptyObject } from "src/tb.types"

interface FormTextareaProps extends Omit<TextFieldProps, 'name'> {
  name?: string,
  rules?: EmptyObject<any>,
}

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    width: '100%'
  }
}))

function FormTextarea(props: FormTextareaProps) {
  const { name, rules } = props
  const classes = useStyles(props)
  const { fieldProps, ref } = useFormController({
    name,
    rules,
  })

  return (
    <TextField
      id="outlined-multiline-static"
      multiline
      classes={{
        root: classes.textField
      }}
      rows={4}
      inputRef={ref}
      {...props}
      {...fieldProps}
    />
  )
}

export default FormTextarea

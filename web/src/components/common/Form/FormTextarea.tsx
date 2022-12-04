/**
 * @author zhengji.su
 * @description FormTextArea
 */

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import useFormController from "hooks/useFormController";
import isUndefined from "lodash/isUndefined"
import type { EmptyObject } from "src/tb.types"
import type { Theme } from "@mui/material";

interface FormTextareaProps extends Omit<TextFieldProps, 'name'> {
  name?: string,
  rules?: EmptyObject<any>,
}

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    width: '100%',
    '& .MuiFormHelperText-root': {
      margin: 0
    }
  }
}))

function FormTextarea(props: FormTextareaProps) {
  const { name, rules } = props
  const classes = useStyles(props)
  const { fieldProps, fieldState, ref } = useFormController({
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
      error={!isUndefined(fieldState.error)}
      helperText={fieldState.error?.message}
    />
  )
}

export default FormTextarea

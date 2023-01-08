/**
 * @author zhengji.su
 * @description FormTextArea
 */

import TextField, { TextFieldProps } from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import useFormController from "hooks/common/useFormController";
import isUndefined from "lodash/isUndefined"
import type { EmptyObject } from "@/src/tb.types"
import type { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useMemo } from "react";
import isNumber from "lodash/isNumber";
import clsx from "clsx";

interface FormTextareaProps extends Omit<TextFieldProps, 'name'> {
  name?: string,
  rules?: EmptyObject<any>,
  maxLength?: string | number;
}

const useStyles = makeStyles((theme: Theme) => ({
  textField: {
    width: '100%',
    '& .MuiFormHelperText-root': {
      margin: 0
    },
    '& .MuiInputBase-root': {
      padding: theme.spacing(1, 1, 3)
    }
  },
  length: {
    position: 'absolute',
    bottom: 6,
    right: 8
  },
  maxLength: {
    color: theme.status.error
  }
}))

function FormTextarea(props: FormTextareaProps) {
  const { name, rules, maxLength: propMaxLength = 100, disabled } = props
  const classes = useStyles(props)
  const { fieldProps, fieldState, ref } = useFormController({
    name,
    rules,
  })

  const maxLength = useMemo(() => {
    if (isNumber(propMaxLength)) {
      return propMaxLength
    }

    return isNaN(Number(propMaxLength)) ? 100 : Number(propMaxLength)
  }, [propMaxLength])

  const valueLength = fieldProps.value?.length || 0

  return (
    <Box position="relative">
      <TextField
        id="outlined-multiline-static"
        multiline
        classes={{
          root: classes.textField
        }}
        autoFocus
        rows={4}
        inputRef={ref}
        disabled={disabled ?? valueLength >= maxLength}
        {...props}
        {...fieldProps}
        error={!isUndefined(fieldState.error)}
        helperText={fieldState.error?.message}
      />
      {maxLength && <Typography className={clsx(classes.length, {
        [classes.maxLength]: valueLength >= maxLength
      })}>{valueLength}/{maxLength}</Typography>}
    </Box>
  )
}

export default FormTextarea

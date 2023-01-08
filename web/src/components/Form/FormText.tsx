/**
 * @author zhengji.su
 * @description FormText
 */

import { makeStyles } from "@mui/styles";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { FormControl, InputLabel } from "@mui/material";
import isString from "lodash/isString";
import isUndefined from "lodash/isUndefined"
import clsx from "clsx";
import type { ReactNode } from "react";
import useFormController from "hooks/common/useFormController";
import type { EmptyObject } from "@/src/tb.types"
import type { Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";

export interface FormTextProps extends OutlinedInputProps {
  className?: string;
  label?: ReactNode | undefined;
  bgColor?: string;
  name?: string;
  rules?: EmptyObject<any>;
  helpText?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative'
  },
  label: {
    '&.MuiFormLabel-root': {
      position: 'absolute',
      top: '50%',
      left: 14,
      transform: 'translateY(-50%) scale(1)',
      fontSize: 14,
      color: theme.palette.text.primary,
      transition: 'all .3s'
    },
    '&.MuiFormLabel-root.Mui-focused': {
      transform: 'scale(0.85)',
      left: 16,
      top: -7,
      fontSize: 12,
      color: theme.palette.text.primary,
      backgroundColor: theme.status.transparent
    }
  },
  input: {
    '& .MuiInputBase-input': {
      padding: theme.spacing(0, 1.75),
      height: 42,
      '&::-webkit-input-placeholder': {/*Webkit browsers*/
        fontSize: 14
      },
      '&::-moz-placeholder': {/*Mozilla Firefox 4 to 8*/
        fontSize: 14,
      },
      '&::moz-placeholder': {/*Mozilla Firefox 19+*/
        fontSize: 14
      },
      '&::-ms-input-placeholder': {/*Internet Explorer 10+*/
        fontSize: 14
      },
    },
    '& .MuiOutlinedInput-notchedOutline': {
      backgroundColor: `${(props: FormTextProps) => props.bgColor ?? theme.status.white}`
    },

    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.status.error
        },
      }
    }
  }
}))

function FormText(props: FormTextProps) {
  const { className, label, name, rules, error, helpText, value, ...other } = props
  const classes = useStyles(props)
  const theme = useTheme()
  const { fieldProps, fieldState, ref } = useFormController({
    name,
    rules
  })

  const isError = error ?? !isUndefined(fieldState.error)

  return (
    <FormControl variant="outlined" className={clsx(classes.root, className)}>
      <InputLabel className={classes.label}>{label}</InputLabel>
      <OutlinedInput
        className={classes.input}
        label={label}
        placeholder={isString(label) ? label : ''}
        {...fieldProps}
        inputRef={ref}
        error={isError}
        {...other}
      />
      {isError && <Typography variant="caption" color={theme.status.error}>{helpText ?? fieldState.error?.message}</Typography>}
    </FormControl>
  )
}

export default FormText

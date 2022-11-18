/**
 * @author zhengji.su
 * @description FormText
 */

import React from 'react'
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import type { Theme } from "@mui/material";
import {FormControl, InputLabel} from "@mui/material";

interface FormTextProps extends OutlinedInputProps {
  className?: string
}

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    transform: 'translate(14px, 10px) scale(1)',
    fontSize: 14,
    color: theme.palette.text.primary,
    '&.MuiFormLabel-root.Mui-focused': {
      transform: 'translate(18px, -7px) scale(0.75)',
      color: theme.palette.text.primary,
      backgroundColor: 'transparent'
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

    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main
      }
    }
  }
}))

function FormText(props: FormTextProps) {
  const { className, label, ...other } = props
  const classes = useStyles(props)

  return (
    <FormControl variant="outlined">
      <InputLabel className={classes.label}>{label}</InputLabel>
      <OutlinedInput
        className={clsx(classes.input, className)}
        label={label}
        {...other}
      />
    </FormControl>
  )
}

export default FormText

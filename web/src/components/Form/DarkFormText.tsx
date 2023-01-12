import FormText, { FormTextProps } from "components/Form/FormText";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";

interface DarkFormTextProps extends FormTextProps {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.status.sullenGrey,
    },
  },
  label: {
    '&.MuiFormLabel-root': {
      color: theme.status.lightGrey,
      '&.Mui-focused': {
        color: theme.status.lightPurple,
      },
    },
  },
  input: {
    '&:hover': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.status.lightGrey,
      },
    },
    '& .MuiInputBase-input': {
      color: theme.status.lightGrey,
    },
    '&.Mui-focused': {
      '& fieldset.MuiOutlinedInput-notchedOutline': {
        borderColor: theme.status.lightPurple,
        borderWidth: 1
      },
    },
  },
}))

function DarkFormText({ name, label, ...other }: DarkFormTextProps) {
  const classes = useStyles()

  return (
    <FormText
      name={name}
      label={label}
      classes={{
        root: classes.root,
        label: classes.label,
        input: classes.input
      }}
      {...other}
    />
  )
}

export default DarkFormText

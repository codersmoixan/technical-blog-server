import FormText, { FormTextProps } from "components/Form/FormText";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";

interface DarkFormTextProps extends FormTextProps {}

const useStyles = makeStyles((theme: Theme) => ({
  formText: {
    width: '100%',
    '& .MuiInputBase-root': {
      '&.Mui-focused': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.status.lightPurple,
          borderWidth: 1
        },
      }
    },
    '& .MuiFormLabel-root': {
      color: theme.status.lightGrey,
      '&.Mui-focused': {
        color: theme.status.lightPurple,
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.status.lightGrey,
      '&::hover': {
        borderColor: theme.status.lightGrey,
      }
    },
  }
}))

function DarkFormText({ name, label, ...other }: DarkFormTextProps) {
  const classes = useStyles()

  return <FormText name={name} label={label} className={classes.formText} {...other} />
}

export default DarkFormText

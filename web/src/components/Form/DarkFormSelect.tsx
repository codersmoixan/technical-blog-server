import FormSelect, { FormSelectProps } from "components/Form/FormSelect";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";

interface DarkFormSelect extends FormSelectProps {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.status.lightGrey,
      '&::hover': {
        borderColor: theme.status.lightGrey,
      }
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
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.status.lightPurple,
        borderWidth: 1
      },
    },
  },
}))

function DarkFormSelectChip(props: DarkFormSelect) {
  const classes = useStyles()

  return (
    <FormSelect
      classes={{
        root: classes.root,
        label: classes.label,
        input: classes.input
      }}
      {...props}
    />
  )
}

export default DarkFormSelectChip

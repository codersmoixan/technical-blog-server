import FormSelect, { FormSelectProps } from "components/Form/FormSelect";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";

interface DarkFormSelect extends FormSelectProps {}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
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
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.status.lightPurple,
        borderWidth: 1
      },
    },
    '& svg': {
      color: '#3b3a47'
    }
  },
  value: {
    color: theme.status.lightGrey
  },
  placeholder: {
    color: '#3b3a47 !important'
  }
}))

function DarkFormSelectChip(props: DarkFormSelect) {
  const classes = useStyles()

  return (
    <FormSelect
      classes={{
        root: classes.root,
        label: classes.label,
        input: classes.input,
        value: classes.value,
        placeholder: classes.placeholder
      }}
      {...props}
    />
  )
}

export default DarkFormSelectChip

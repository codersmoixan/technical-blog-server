import { useSnackbar, VariantType, SnackbarMessage, OptionsObject } from "notistack"
import { Theme, useMediaQuery } from "@mui/material";
import { timeSleep } from "@/src/utils";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '&.SnackbarItem-variantSuccess': {
      backgroundColor: theme.palette.primary.main,
    },
    '&.SnackbarItem-variantWarning': {}
  }
}))

const useNotifier = (wait: number = 4000) => {
  const classes = useStyles()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

  return (msg: SnackbarMessage, variant: VariantType = 'success', config: Omit<OptionsObject, 'variant' | 'anchorOrigin' | 'className'> = {}) => {
    const snackbar = enqueueSnackbar(msg, {
      variant,
      anchorOrigin: {
        vertical: smUp ? 'bottom' : 'top',
        horizontal: 'left'
      },
      className: classes.root,
      ...config
    })

    timeSleep(wait).then(() => closeSnackbar(snackbar))
  }
}

export default useNotifier

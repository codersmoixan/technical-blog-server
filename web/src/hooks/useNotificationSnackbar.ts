import { useSnackbar, VariantType, SnackbarMessage } from "notistack"
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

const useNotificationSnackbar = (wait: number = 4000) => {
  const classes = useStyles()
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  const smUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

  const notify = (msg: SnackbarMessage, variant: VariantType = 'success') => {
    const snackbar = enqueueSnackbar(msg, {
      variant,
      anchorOrigin: {
        vertical: smUp ? 'bottom' : 'top',
        horizontal: smUp ? 'left' : 'center'
      },
      className: classes.root
    })

    timeSleep(wait).then(() => closeSnackbar(snackbar))
  }

  return {
    notify
  }
}

export default useNotificationSnackbar

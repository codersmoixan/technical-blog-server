import { useSnackbar, VariantType, SnackbarMessage } from "notistack"

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar()

  const notify = (msg: SnackbarMessage, variant: VariantType = 'success') => enqueueSnackbar(msg, { variant })

  return {
    notify
  }
}

export default useNotification

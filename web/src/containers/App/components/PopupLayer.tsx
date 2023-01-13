import CenterDialog from "components/Dialog/CenterDialog";
import OperateTag from "containers/Tag/components/OperateTag";
import { makeStyles } from "@mui/styles";
import useSpeedDial from "containers/App/hooks/useSpeedDial";
import type { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: theme.palette.primary.main,
    paddingBottom: theme.spacing(4),
    '& .MuiButtonBase-root': {
      color: theme.status.white
    }
  },
  closeIcon: {
    fontSize: 16
  },
}))

function PopupLayer() {
  const classes = useStyles()
  const { clear, speedDial } = useSpeedDial()

  return (
    <CenterDialog
      open={!!speedDial}
      onClose={clear}
      classes={{
        paper: classes.paper,
        closeIcon: classes.closeIcon,
      }}
    >
      <OperateTag />
    </CenterDialog>
  )
}

export default PopupLayer

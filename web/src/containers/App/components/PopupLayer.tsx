import CenterDialog from "components/Dialog/CenterDialog";
import OperateTag from "containers/Tag/components/OperateTag";
import {makeStyles} from "@mui/styles";
import {Theme} from "@mui/material";
import {useState} from "react";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    // backgroundColor: theme.palette.primary.main,
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

  const [open, setOpen] = useState(true)

  return (
    <CenterDialog
      open={open}
      onClose={() => setOpen(false)}
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

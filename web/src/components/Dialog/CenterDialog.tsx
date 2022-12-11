/**
 * @author zhengji.su
 * @description CenterDialog
 */

import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Buttons from "components/Buttons";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close"
import type { Theme } from "@mui/material";

interface CenterDialogProps extends DialogProps {
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  children?: JSX.Element
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    '& .MuiPaper-root': {
      maxWidth: 'initial'
    }
  },
  title: {
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: "space-between",
    alignItems: "center"
  },
  closeIcon: {
    fontSize: 28
  },
  content: {
    padding: theme.spacing(0, 4)
  },
  actions: {
    padding: theme.spacing(4),
    '& .MuiButton-contained': {
      marginLeft: theme.spacing(3)
    }
  }
}))

function CenterDialog(props: CenterDialogProps) {
  const {
    open = false,
    title = '',
    confirmText = '确认',
    cancelText = '取消',
    onClose,
    onConfirm,
    children,
    ...other
  } = props
  const classes = useStyles(props)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
      {...other}
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        <Typography variant="h3">{title}</Typography>
        <Buttons space={false} onClick={onClose}>
          <CloseIcon className={classes.closeIcon} />
        </Buttons>
      </DialogTitle>
      <DialogContent className={classes.content}>
        {children}
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Buttons onClick={onClose} variant="outlined">
          {cancelText}
        </Buttons>
        <Buttons onClick={onConfirm} variant="contained">
          {confirmText}
        </Buttons>
      </DialogActions>
    </Dialog>
  )
}

export default CenterDialog

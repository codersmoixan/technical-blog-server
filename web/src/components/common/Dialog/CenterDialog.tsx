/**
 * @author zhengji.su
 * @description CenterDialog
 */

import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Buttons from "components/common/Buttons";
import Typography from "@mui/material/Typography";
import {makeStyles} from "@mui/styles";

interface CenterDialogProps extends DialogProps {
  open: boolean;
  title?: string;
  confirmText?: string;
  cancelText?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  children?: JSX.Element
}

const useStyles = makeStyles({
  root: {
    '& .MuiPaper-root': {
      maxWidth: 'initial'
    }
  }
})

function CenterDialog({
  open = false,
  title = '',
  confirmText = '确认',
  cancelText = '取消',
  onClose,
  onConfirm,
  children,
  ...other
}: CenterDialogProps) {
  const classes = useStyles()

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      className={classes.root}
      {...other}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h3">{title}</Typography>
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
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

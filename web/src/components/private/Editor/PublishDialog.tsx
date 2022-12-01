/**
 * @author zhengji.su
 * @description PublishDialog
 */

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Dialog from "@mui/material/Dialog";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Buttons from "components/common/Buttons";
import Typography from "@mui/material/Typography";

interface PublishProps {
  open: boolean;
  onClose?: () => void;
  onPublish?: () => void;
}

function PublishDialog({ open = false, onClose, onPublish }: PublishProps) {

  return (
    <Box>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant="h3">发布文章</Typography>
        </DialogTitle>
        <DialogContent>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContent>
        <DialogActions>
          <Buttons onClick={onClose} variant="outlined">取消</Buttons>
          <Buttons onClick={onPublish} variant="contained">
            发布文章
          </Buttons>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PublishDialog

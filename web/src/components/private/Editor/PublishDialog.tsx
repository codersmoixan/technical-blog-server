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
import Grid from "@mui/material/Grid";
import useNotification from "@/src/hooks/useNotification";

interface PublishProps {
  open: boolean;
  onClose?: () => void;
  onPublish?: () => void;
}

const catalog = [
  { id: 1, label: '前端' },
  { id: 2, label: '后端' },
  { id: 3, label: 'IOS' },
  { id: 4, label: 'Android' },
  { id: 5, label: '开发工具' },
  { id: 6, label: '阅读' },
  { id: 7, label: '代码人生' }
]

function PublishDialog({ open = false, onClose, onPublish }: PublishProps) {
  const { notify } = useNotification()

  const handlePublish = () => {
    notify('请输入')
    // onPublish?.()
  }

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
          <Grid container spacing={1} py={1}>
            <Grid item>分类: </Grid>
            <Grid item>
              <Grid container>
                {catalog.map(item => <Grid key={item.id} spacing={2} xs={3}>{item.label}</Grid>)}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Buttons onClick={onClose} variant="outlined">取消</Buttons>
          <Buttons onClick={handlePublish} variant="contained">
            发布文章
          </Buttons>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default PublishDialog

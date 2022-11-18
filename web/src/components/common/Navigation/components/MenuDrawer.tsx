/**
 * @author zhengji.su
 * @description MenuDrawer
 */

import React, { MouseEventHandler } from 'react'
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import CloseIcon from "components/common/Icons/CloseIcon";
import Buttons from "components/common/Buttons";
import UserButtons from "components/common/Navigation/components/UserButtons";

interface MenuDrawerProps {
  open?: boolean;
  onClose?: MouseEventHandler
}

const useStyles = makeStyles((theme: Theme) => ({
  top: {
    '&.MuiDrawer-root': {
      bottom: 'initial',
      height: 'calc(100vh - 76px)',
    },
  },
  paper: {
    '&.MuiPaper-root': {
      position: 'static',
      height: '100%',
      backgroundColor: theme.status.bgDark
    }
  },
  bottom: {
    '&.MuiDrawer-root': {
      top: 'initial',
      height: 76,
    },
  },
  header: {
    padding: theme.spacing(0, 3),
    height: 72,
    textAlign: 'right',
    lineHeight: '72px'
  },
  userButtons: {
    width: '100%',
    boxSizing: 'border-box',
    justifyContent: 'center',
    '& .MuiButtonBase-root': {
      margin: theme.spacing(0, 1.5),
      padding: theme.spacing(1, 2)
    },
    '& .MuiButton-outlined': {
      borderColor: theme.status.white,
      color: theme.status.white
    },
    '& .MuiButton-contained': {
      borderColor: theme.status.white,
      backgroundColor: theme.status.white,
      color: theme.palette.primary.main
    }
  }
}))

function MenuDrawer({ open, onClose }: MenuDrawerProps) {
  const classes = useStyles()

  return (
    <>
      <Drawer
        open={open}
        hideBackdrop
        anchor="top"
        classes={{
          root: classes.top,
          paper: classes.paper
        }}
      >
        <Box className={classes.header}>
          <Buttons variant="text" space={false} onClick={onClose}>
            <CloseIcon />
          </Buttons>
        </Box>
      </Drawer>
      <Drawer
        open={open}
        hideBackdrop
        anchor="bottom"
        classes={{
          root: classes.bottom,
          paper: classes.paper
      }}
      >
        <UserButtons className={classes.userButtons} />
      </Drawer>
    </>
  )
}

export default MenuDrawer

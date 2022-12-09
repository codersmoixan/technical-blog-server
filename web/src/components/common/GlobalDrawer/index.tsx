/**
 * @author zhengji.su
 * @description GlobalDrawer
 */

import Drawer from '@mui/material/Drawer';
import {makeStyles} from "@mui/styles";
import type {Theme} from "@mui/material";
import React, {ReactElement, ReactNode, useMemo} from "react";
import {separateChildren} from "@/src/utils";
import Buttons from "components/common/Buttons";
import CloseIcon from "components/common/Icons/CloseIcon";
import Box from "@mui/material/Box";
import isBoolean from "lodash/isBoolean"
import type { EmptyObject } from "src/tb.types"

interface GlobalDrawerProps {
  open: boolean;
  children: ReactNode | ReactElement[];
  door?: boolean;
  bgColor?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  classes?: EmptyObject;
  header?: boolean;
  footer?: boolean | ReactNode;
  confirmText?: string;
  cancelText?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  top: {
    '&.MuiDrawer-root': {
      bottom: 'initial',
      height: (props: GlobalDrawerProps) => props.door ? 'calc(100vh - 72px)' : '100vh',
    },
  },
  header: {
    position: 'sticky',
    top: 0,
    padding: theme.spacing(0, 3),
    height: 72,
    textAlign: 'right',
    lineHeight: '72px',
    backgroundColor: (props: GlobalDrawerProps) => props.bgColor ? props.bgColor : theme.status.bgDark,
    zIndex: 999,
    '& > button.MuiButtonBase-root': {
      color: theme.status.white
    }
  },
  paper: {
    '&.MuiPaper-root': {
      position: 'static',
      height: '100%',
      backgroundColor: (props: GlobalDrawerProps) => props.bgColor ? props.bgColor : theme.status.bgDark
    }
  },
  bottom: {
    '&.MuiDrawer-root': {
      top: 'initial',
      height: 72,
    },
    '&.MuiPaper-root': {
      justifyContent: 'space-around',
    }
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: theme.spacing(0, 2),
    height: '100%'
  },
}))

function GlobalDrawer(props: GlobalDrawerProps) {
  const { open, door = true, children, header = true, onClose, onConfirm, confirmText, cancelText } = props
  const classes = useStyles({ ...props, door })

  const { head, content, footer } = useMemo(() => separateChildren(children, ['head', 'content', 'footer']), [children])

  return (
    <>
      {door && (
        <Drawer
          open={open}
          hideBackdrop
          anchor="bottom"
          classes={{
            root: classes.bottom,
            paper: classes.paper
          }}
        >
          {footer ?? (
            <Box className={classes.buttons}>
              <Buttons variant="outlined" color="primary" disableRipple onClick={onClose}>{cancelText}</Buttons>
              <Buttons variant="contained" color="info" disableRipple onClick={onConfirm} style={{ marginLeft: 16 }}>{confirmText}</Buttons>
            </Box>
          )}
        </Drawer>
      )}
      <Drawer
        open={open}
        hideBackdrop
        anchor="top"
        classes={{
          root: classes.top,
          paper: classes.paper,
        }}
      >
        {header ? (
          <Box className={classes.header}>
            {head ?? (
              <Buttons variant="text" space={false} onClick={onClose}>
                <CloseIcon />
              </Buttons>
            )}
          </Box>
        ) : null}
        {content}
      </Drawer>
    </>
  )
}

export default GlobalDrawer

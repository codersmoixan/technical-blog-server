/**
 * @author zhengji.su
 * @description GlobalDrawer
 */

import Drawer from '@mui/material/Drawer';
import {makeStyles} from "@mui/styles";
import type {Theme} from "@mui/material";
import {ReactElement, ReactNode, useMemo} from "react";
import {separateChildren} from "@/src/utils";
import Buttons from "components/common/Buttons";
import CloseIcon from "components/common/Icons/CloseIcon";
import Box from "@mui/material/Box";

interface GlobalDrawerProps {
  open: boolean;
  children: ReactNode | ReactElement[];
  door?: boolean;
  onClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  top: {
    '&.MuiDrawer-root': {
      bottom: 'initial',
      height: (props: Pick<GlobalDrawerProps, 'door'>) => props.door ? 'calc(100vh - 70px)' : '100vh',
    },
  },
  header: {
    padding: theme.spacing(0, 3),
    height: 72,
    textAlign: 'right',
    lineHeight: '72px',
    '& > button.MuiButtonBase-root': {
      color: theme.status.white
    }
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
      height: 72,
    },
    '&.MuiPaper-root': {
      justifyContent: 'space-around',
    }
  },
}))

function GlobalDrawer({ open, door = true, children, onClose }: GlobalDrawerProps) {
  const classes = useStyles({ door })

  const { top, bottom } = useMemo(() => separateChildren(children, ['top', 'bottom']), [children])

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
        {top}
      </Drawer>
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
          {bottom}
        </Drawer>
      )}
    </>
  )
}

export default GlobalDrawer

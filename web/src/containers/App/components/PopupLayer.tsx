import React from "react"
import CenterDialog from "components/Dialog/CenterDialog";
import OperateTag from "containers/Tag/components/OperateTag";
import { makeStyles } from "@mui/styles";
import useSpeedDial from "containers/App/hooks/useSpeedDial";
import { getValue } from "utils/index";
import OperateCategory from "containers/Category/components/OperateCategory";
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

const content = {
  tags: <OperateTag />,
  category: <OperateCategory />
}

function PopupLayer() {
  const classes = useStyles()
  const { clearSpeedDial, speedDial } = useSpeedDial()

  const centerDialogContent = getValue(content, speedDial as (keyof typeof content))

  return (
    <CenterDialog
      open={!!centerDialogContent}
      onClose={clearSpeedDial}
      classes={{
        paper: classes.paper,
        closeIcon: classes.closeIcon,
      }}
    >
      {centerDialogContent}
    </CenterDialog>
  )
}

export default PopupLayer

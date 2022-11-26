/**
 * @author zhengji.su
 * @description MenuDrawer
 */

import { useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import CloseIcon from "components/common/Icons/CloseIcon";
import Buttons from "components/common/Buttons";
import UserButtons from "components/common/Navigation/components/UserButtons";
import Menu from "components/common/Menu";
import { useRouter } from "next/router";
import { NavigationItem } from "components/common/Navigation/constant";
import isString from "lodash/isString";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore"
import {itemVariants, VariantContainer, VariantContent} from "components/common/VariantContainer";
import type { Theme } from "@mui/material";

interface MenuDrawerProps {
  menus: any[];
  open: boolean;
  onClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  top: {
    '&.MuiDrawer-root': {
      bottom: 'initial',
      height: 'calc(100vh - 70px)',
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
      height: 72,
    },
    '&.MuiPaper-root': {
      justifyContent: 'space-around',
    }
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
  userButtons: {
    padding: theme.spacing(0.5),
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
  },
  content: {
    padding: theme.spacing(0, 11, 0, 8)
  },
  menu: {
    height: 'auto',
    '& .MuiAccordionSummary-content': {
      '& > p': {
        fontSize: 18,
        color: theme.status.white
      },
      '& .transform-icon > div': {
        color: theme.status.white
      }
    },
    '& .MuiAccordionSummary-root': {
      height: 65
    },
    '& .MuiAccordionDetails-root': {
      padding: theme.spacing(0, 2),
      '& > a': {
        fontSize: 16,
        color: theme.status.white
      }
    }
  },
}))

function MenuDrawer(props: MenuDrawerProps) {
  const { open, menus, onClose } = props
  const classes = useStyles(props)
  const history = useRouter()

  const [focus, setFocus] = useState(false)

  useEffect(() => {
    setFocus(open)
  }, [open])

  const handleNodeClick = (options: NavigationItem) => {
    const url = options.route
    onClose?.()
    return isString(url) ? history.push(url) : history.push(url())
  }

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
        <Box className={classes.content}>
          <VariantContainer focus={focus}>
            <Menu
              menus={menus}
              childKey="menus"
              className={classes.menu}
              onNodeClick={handleNodeClick}
              expandIcon={<ExpandLess />}
              closeIcon={<ExpandMore />}
            />
          </VariantContainer>
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
        <VariantContainer focus={focus}>
          <VariantContent>
            <VariantContent variants={itemVariants}>
              <UserButtons className={classes.userButtons} />
            </VariantContent>
          </VariantContent>
        </VariantContainer>
      </Drawer>
    </>
  )
}

export default MenuDrawer

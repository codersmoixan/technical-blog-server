/**
 * @author zhengji.su
 * @description MenuDrawer
 */

import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import CloseIcon from "components/Icons/CloseIcon";
import Buttons from "components/Buttons";
import UserButtons from "components/Navigation/components/UserButtons";
import Menu from "components/Menu";
import { useRouter } from "next/router";
import { NavigationItem } from "components/Navigation/constant";
import isString from "lodash/isString";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore"
import {Variant, VariantContent} from "components/Variant";
import { stiffnessVariants } from "utils/variants";
import GlobalDrawer from "components/GlobalDrawer";
import type { Theme } from "@mui/material";

interface MenuDrawerProps {
  menus: any[];
  open: boolean;
  onClose?: () => void;
}

const useStyles = makeStyles((theme: Theme) => ({
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

  const handleNodeClick = (options: NavigationItem) => {
    const url = options.route
    onClose?.()
    return isString(url) ? history.push(url) : history.push(url())
  }

  return (
    <GlobalDrawer open={open} onClose={onClose}>
      <Box className={classes.content} slot="content">
        <Variant focus={open}>
          <Menu
            menus={menus}
            childKey="menus"
            className={classes.menu}
            onNodeClick={handleNodeClick}
            expandIcon={<ExpandLess />}
            closeIcon={<ExpandMore />}
          />
        </Variant>
      </Box>
      <Box slot="footer">
        <Variant focus={open}>
          <VariantContent>
            <VariantContent variants={stiffnessVariants}>
              <UserButtons className={classes.userButtons} />
            </VariantContent>
          </VariantContent>
        </Variant>
      </Box>
    </GlobalDrawer>
  )
}

export default MenuDrawer

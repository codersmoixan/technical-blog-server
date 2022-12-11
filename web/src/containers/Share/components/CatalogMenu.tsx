/**
 * @author zhengji.su
 * @description Catalog
 */

import React, { forwardRef, ReactEventHandler } from 'react'
import Box from '@mui/material/Box';
import MediaQuery from "components/MediaQuery";
import Typography from "@mui/material/Typography";
import Menu, {MenuItem} from "components/Menu";
import Search from "@mui/icons-material/Search";
import { makeStyles } from "@mui/styles";
import TransformIcon from "components/TransformIcon";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import clsx from "clsx";
import Close from "@mui/icons-material/Close"
import Buttons from "components/Buttons";
import { Variant, VariantContent } from "components/Variant";
import type { Theme } from "@mui/material";
import type { Variants } from "framer-motion";
import useSwitchCatalog from "containers/Share/hooks/useSwitchCatalog";

interface CatalogMenuProps {
  menus: any[];
  onSearchFocus?: ReactEventHandler;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      margin: theme.spacing(0, -3),
      minHeight: 72
    }
  },
  catalog: {
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3),
      marginTop: theme.spacing(-3)
    },
    [theme.breakpoints.down('md')]: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      minHeight: 72,
      zIndex: 89
    }
  },
  content: {
    position: 'relative',
    display: 'flex',
    height: 72,
    backgroundColor: theme.status.white,
    zIndex: 1,
    '&.focus': {
      boxShadow: 'rgb(227 227 227) 0px 2px 4px',
    }
  },
  menuTitle: {
    paddingBottom: theme.spacing(4),
    borderBottom: `1px solid ${theme.status.colorSecondary}`
  },
  menu: {
    width: 205,
    [theme.breakpoints.down('md')]: {
      width: 'auto',
      '& .MuiButtonBase-root': {
        marginRight: theme.spacing(9)
      }
    }
  },
  menuLabel: {
    ...theme.common.spaceBetweenCenter,
    padding: theme.spacing(0, 3),
    flex: 1,
  },
  searchBtn: {
    ...theme.common.verticalCenter,
    width: 72,
    height: '100%',
    color: theme.palette.primary.main,
    backgroundColor: theme.status.darkPeach
  },
  menuHeader: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 56,
    color: theme.palette.primary.main,
    borderBottom: `1px solid ${theme.status.colorSecondary}`
  },
  menuContainer: {
    padding: theme.spacing(0, 3),
    backgroundColor: theme.status.white,
    boxShadow: 'rgb(227 227 227) 0px 2px 4px',
  }
}))

const menuVariants: Variants = {
  open: {
    display: 'block',
    height: 'auto',
    opacity: 1,
    transition: {
      duration: 0.3
    }
  },
  closed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.3
    },
    transitionEnd: {
      display: 'none'
    }
  }
}

export default forwardRef(function CatalogMenu({ menus, onSearchFocus }: CatalogMenuProps, ref) {
  const classes = useStyles()
  const { focus, checked, setFocus, onCheckedMenu } = useSwitchCatalog()

  const handleSearchFocus = (event: React.MouseEvent) => {
    setFocus(false)
    onSearchFocus?.(event)
  }

  const handleCatalogFocus = () => {
    setFocus(!focus)
  }

  return (
    <Box className={classes.root}>
      <MediaQuery media={['pc', 'pad']}>
        <Box className={classes.catalog}>
          <Typography
            variant="h3"
            fontWeight={400}
            className={classes.menuTitle}
          >
            分类
          </Typography>
          <Variant>
            <Menu
              menus={menus}
              isBorder
              className={classes.menu}
              onNodeClick={onCheckedMenu}
              value={checked}
            />
          </Variant>
        </Box>
      </MediaQuery>
      <MediaQuery media="mobile">
        <Box className={classes.catalog}>
          <Box
            className={clsx(classes.content, {
              focus: !focus
            })}
            ref={ref}
          >
            <Box className={classes.menuLabel} onClick={handleCatalogFocus}>
              <Typography variant="h4" fontWeight={400} width="80%">前端</Typography>
              <TransformIcon focus={focus} originIcon={<ExpandLess />} finishIcon={<ExpandMore />} />
            </Box>
            <Box className={classes.searchBtn} onClick={handleSearchFocus}>
              <Search />
            </Box>
          </Box>
          <Variant focus={focus}>
            <VariantContent
              variants={menuVariants}
              className={classes.menuContainer}
            >
              <Box className={classes.menuHeader}>
                <Buttons
                  variant="text"
                  space={false}
                  onClick={() => setFocus(false)}
                >
                  <Close />
                </Buttons>
              </Box>
              <Menu menus={menus} isBorder className={classes.menu} onNodeClick={onCheckedMenu} />
            </VariantContent>
          </Variant>
        </Box>
      </MediaQuery>
    </Box>
  )
})

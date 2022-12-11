/**
 * @author zhengji.su
 * @description AccordionMenu
 */

import React from 'react'
import Box, {BoxProps} from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import type { Theme } from "@mui/material";
import type { MenuItem, NavigationItem } from "components/Navigation/constant";
import get from "lodash/get";
import isEmpty from "lodash/isEmpty";
import {VariantContent} from "components/Variant";

interface AccordionMenuProps extends BoxProps{
  tab: NavigationItem | null,
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    paddingTop: theme.spacing(11),
    zIndex: -1,
    backgroundColor: theme.status.white,
    boxShadow: 'rgb(19 19 19 / 8%) 0px 2px 4px 0px',
  },
  accordionContent: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3),
    margin: '0 auto',
    width: 980,
    height: 'auto'
  },
  menuTitle: {
    minWidth: 180,
    fontWeight: 700,
    color: theme.status.textSecondary,
  },
  menuContent: {
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  contentItem: {
    padding: theme.spacing(1, 0),
  }
}))

const rootVariants = {
  open: {
    height: 'auto'
  },
  closed: {
    height: 0
  }
}

function AccordionMenu({ tab }: AccordionMenuProps) {
  const classes = useStyles()

  if (isEmpty(tab)) {
    return null
  }

  const menus = (get(tab, 'menus', [])) as MenuItem[]

  return  (
    <VariantContent className={classes.root} variants={rootVariants}>
      <VariantContent
        key={tab.id}
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={classes.accordionContent}
      >
        {menus.map(item => (
          <Box key={item.id}>
            <Typography className={classes.menuTitle}>{item.label}</Typography>
            <Box className={classes.menuContent}>
              {item.menus?.map((menu: any) => (
                <Box key={menu.id} className={classes.contentItem}>
                  <Typography variant="body1">{menu.label}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </VariantContent>
    </VariantContent>
  )
}

export default AccordionMenu

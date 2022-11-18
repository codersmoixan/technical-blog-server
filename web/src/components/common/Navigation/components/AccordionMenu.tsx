/**
 * @author zhengji.su
 * @description AccordionMenu
 */

import React from 'react'
import Box, {BoxProps} from '@mui/material/Box';
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { motion, AnimatePresence } from "framer-motion";
import type { Theme } from "@mui/material";

interface AccordionMenuProps extends BoxProps{
  open: boolean,
  menus: any[]
}

const useStyles = makeStyles((theme: Theme) => ({
  accordion: {
    overflow: 'hidden',
    position: 'relative',
    maxHeight: 0,
    transition: 'all 1s',
    zIndex: 9999,
  },
  accordionOpen: {
    maxHeight: 300,
    boxShadow: 'rgb(19 19 19 / 8%) 0px 2px 4px 0px',
  },
  accordionContent: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3),
    margin: '0 auto',
    width: 980
  },
  menuTitle: {
    minWidth: 180,
    fontWeight: 700,
    color: theme.status.textSecondary
  },
  menuContent: {
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  contentItem: {
    padding: theme.spacing(1, 0),
  }
}))

function AccordionMenu({ open = false, menus = [], ...other }: AccordionMenuProps) {
  const classes = useStyles()

  return (
    <Box
      className={clsx(classes.accordion, {
        [classes.accordionOpen]: !open
      })}
      {...other}
    >
      <AnimatePresence exitBeforeEnter>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Box className={classes.accordionContent}>
            {menus.map(item => (
              <Box key={item.id}>
                <Typography className={classes.menuTitle}>{item.label}</Typography>
                <Box className={classes.menuContent}>
                  {item.menus.map((menu: any) => (
                    <Box key={menu.id} className={classes.contentItem}>
                      <Typography variant="body1">{menu.label}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </motion.div>
      </AnimatePresence>
    </Box>
  )
}

export default AccordionMenu

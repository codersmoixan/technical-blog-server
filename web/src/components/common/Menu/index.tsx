/**
 * @author zhengji.su
 * @description Menu
 */

import React, { ReactNode, useState } from 'react'
import Box, { BoxProps } from '@mui/material/Box';
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import Buttons from "components/common/Buttons";
import clsx from "clsx";
import type { Theme } from "@mui/material";
import TransformIcon from "components/common/TransformIcon";

interface MenuProps extends BoxProps{
  menus: any[];
  isBorder?: boolean;
  onNodeClick?: (options: any) => void;
  childKey?: string;
  expandIcon?: ReactNode;
  closeIcon?: ReactNode;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflowY: 'scroll',
    width: '100%',
  },
  accordion: {
    backgroundColor: theme.status.transparent,
    boxShadow: 'none',
    borderBottom: `${(props: MenuProps) => props.isBorder ? `1px solid ${theme.status.colorSecondary}` : 'none'}`,
    '&.MuiPaper-root': {
      borderRadius: 0,
    },
    '&.Mui-expanded': {
      margin: 0,
    },
    '&:last-of-type': {
      borderBottom: 'none'
    }
  },
  summary: {
    padding: 0,
    '&.Mui-expanded': {
      minHeight: 'auto'
    }
  },
  summaryContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '&.Mui-expanded': {
      margin: theme.spacing(1, 0),
    }
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: 0,
  },
  value: {
    padding: theme.spacing(0, 2, 1),
    '& > a': {
      display: 'block',
      height: 32,
      lineHeight: '32px'
    }
  },
  childItem: {
    display: 'block',
    height: 25,
    lineHeight: '25px',
    cursor: 'pointer'
  },
}))

function Menu(props: MenuProps) {
  const classes = useStyles(props)
  const { menus, onNodeClick, className, childKey = 'child', expandIcon, closeIcon, ...other } = props

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleOpenAccordion = (panel: string) => {
      setExpanded(expanded === panel ? false : panel);
    };

  return (
    <Box className={clsx(classes.root, className)} {...other}>
      {menus.map(menu => (
        <Accordion
          key={menu.id}
          expanded={expanded === menu.id}
          classes={{ root: classes.accordion }}
        >
          <AccordionSummary classes={{
            root: classes.summary,
            expanded: classes.label,
            content: classes.summaryContent
          }}>
            <Typography onClick={() => onNodeClick?.(menu)}>
              {menu.label}
            </Typography>
            {menu[childKey] && (
              <Buttons
                variant="text"
                space={false}
                onClick={() => handleOpenAccordion(menu.id)}
              >
                <TransformIcon focus={expanded === menu.id} originIcon={expandIcon} finishIcon={closeIcon} />
              </Buttons>
            )}
          </AccordionSummary>
          {menu[childKey] && (
            <AccordionDetails classes={{ root: classes.value }}>
              {menu[childKey].map((c: any) => (
                <Typography
                  component="a"
                  key={c.id}
                  className={classes.childItem}
                  onClick={() => onNodeClick?.(c)}
                >
                  {c.label}
                </Typography>
              ))}
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </Box>
  )
}

export default Menu

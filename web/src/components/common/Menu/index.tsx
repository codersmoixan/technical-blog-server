/**
 * @author zhengji.su
 * @description Menu
 */

import React, { useState } from 'react'
import Box, { BoxProps } from '@mui/material/Box';
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import AddIcon from "@mui/icons-material/Add"
import Buttons from "components/common/Buttons";
import type { Theme } from "@mui/material";

interface MenuProps extends BoxProps{
  menus: any[];
  onChange?: (options: any) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    overflowY: 'scroll',
    width: 255,
    height: 800,
  },
  accordion: {
    backgroundColor: theme.status.transparent,
    boxShadow: 'none',
    borderBottom: `1px solid ${theme.status.colorSecondary}`,
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
    padding: theme.spacing(0, 2, 1)
  },
  childItem: {
    display: 'block',
    height: 25,
    lineHeight: '25px',
    cursor: 'pointer'
  }
}))

function Menu(props: MenuProps) {
  const classes = useStyles(props)
  const { menus, onChange } = props

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleOpenAccordion =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Box className={classes.root}>
      {menus.map(menu => (
        <Accordion
          key={menu.id}
          expanded={expanded === menu.id}
          onChange={handleOpenAccordion(menu.id)}
          classes={{ root: classes.accordion }}
        >
          <AccordionSummary classes={{
            root: classes.summary,
            expanded: classes.label,
            content: classes.summaryContent
          }}>
            <Typography>
              {menu.label}
            </Typography>
            <Buttons variant="text" space>
              <AddIcon />
            </Buttons>
          </AccordionSummary>
          <AccordionDetails classes={{ root: classes.value }}>
            {menu.child.map((c: any) => (
              <Typography
                component="a"
                key={c.id}
                className={classes.childItem}
                onClick={() => onChange?.(c)}
              >
                {c.label}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  )
}

export default Menu

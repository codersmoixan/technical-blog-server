/**
 * @author zhengji.su
 * @description NavigationBar
 */

import { useState, useEffect } from 'react'
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Image from "next/image";
import Logo from "public/images/logo.png"
import {NAVIGATION_LIST, NavigationItem} from "components/Layout/constant";
import type { Theme } from "@mui/material";
import Buttons from "components/Buttons";
import FormText from "components/Form/FormText";
import { useRouter } from "next/router";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty"
import isString from "lodash/isString"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    zIndex: 9999
  },
  focus: {
    backgroundColor: theme.palette.common.white,
    transition: 'all .6s'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 auto',
    width: 1408,
  },
  menus: {
    display: 'flex',
    alignItems: 'center',
    height: 80,
  },
  tools: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 425
  },
  logo: {
    width: 250,
    height: 45
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 176,
    height: '100%'
  },
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
    padding: theme.spacing(3),
    margin: '0 auto',
    width: 980
  }
}))

function NavigationBar() {
  const classes = useStyles()
  const router = useRouter()

  const [accordionContent, setAccordionContent] = useState<any[]>([])

  const handleCheckRoute = async (tab: NavigationItem | null, type: string = 'click') => {
    if (tab === null || type === 'leave') {
      return setAccordionContent([])
    }

    if (type === 'enter') {
      return setAccordionContent(tab.menus || [])
    }


    return isString(tab.route) ? router.push(tab.route) : router.push(tab.route())
  }

  const accordionOpen = isEmpty(accordionContent)

  return (
    <Box className={clsx(classes.root, {
      [classes.focus]: !accordionOpen
    })}>
      <Box className={classes.content}>
        <Image src={Logo} alt="" className={classes.logo} />
        <Box className={classes.menus}>
          {NAVIGATION_LIST.map(tab => (
            <Buttons
              key={tab.id}
              variant="text"
              onClick={() => handleCheckRoute(tab)}
              onMouseEnter={() => handleCheckRoute(tab, 'enter')}
              onMouseLeave={() => handleCheckRoute(null, 'leave')}
            >{tab.label}</Buttons>
          ))}
        </Box>
        <Box className={classes.tools}>
          <FormText placeholder="搜索本站" label="搜索本站" />
          <Box className={classes.buttons}>
            <Buttons variant="outlined" color="primary" disableRipple>Log in</Buttons>
            <Buttons variant="contained" color="info" disableRipple>Sign up</Buttons>
          </Box>
        </Box>
      </Box>
      <Box className={clsx(classes.accordion, {
        [classes.accordionOpen]: !accordionOpen
      })}>
        <Box className={classes.accordionContent}>
          {accordionContent.map(item => <div key={item}>{item}</div>)}
        </Box>
      </Box>
    </Box>
  )
}

export default NavigationBar

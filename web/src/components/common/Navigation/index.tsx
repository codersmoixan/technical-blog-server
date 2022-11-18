/**
 * @author zhengji.su
 * @description Index
 */

import { useState } from 'react'
import Box from "@mui/material/Box";
import Image from "next/image";
import Logo from "public/images/logo.png"
import { NAVIGATION_LIST, NavigationItem } from "components/common/Navigation/constant";
import Buttons from "components/common/Buttons";
import FormText from "components/common/Form/FormText";
import { useRouter } from "next/router";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty"
import isString from "lodash/isString"
import MediaVisible from "components/common/MediaVisible";
import useStyles from "components/common/Navigation/useStyles";
import MenuIcon from "components/common/Icons/MenuIcon";
import MenuDrawer from "components/common/Navigation/components/MenuDrawer";
import UserButtons from "components/common/Navigation/components/UserButtons";
import AccordionMenu from "components/common/Navigation/components/AccordionMenu";

function Index() {
  const classes = useStyles()
  const router = useRouter()

  const [accordionContent, setAccordionContent] = useState<any[]>([])
  const [openDialog, setOpenDialog] = useState(false)

  const handleCheckRoute = async (tab: NavigationItem | null, type: string = 'click') => {
    if (tab === null || type === 'leave') {
      return setAccordionContent([])
    }

    if (type === 'enter') {
      return setAccordionContent(tab.menus || [])
    }


    return isString(tab.route) ? router.push(tab.route) : router.push(tab.route())
  }

  const handleOpenDialog = () => setOpenDialog(true)

  const accordionOpen = isEmpty(accordionContent)

  return (
    <>
      <MediaVisible media="pc">
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
                >{tab.label}</Buttons>
              ))}
            </Box>
            <Box className={classes.tools}>
              <FormText placeholder="搜索本站" label="搜索本站" />
              <UserButtons />
            </Box>
          </Box>
          <AccordionMenu
            open={accordionOpen}
            menus={accordionContent}
            onMouseLeave={() => handleCheckRoute(null, 'leave')}
          />
        </Box>
      </MediaVisible>
      <MediaVisible media={['pad', 'mobile']}>
        <Box className={classes.root}>
          <Image src={Logo} alt="" className={classes.logo} />
          <Buttons
            variant="text"
            space={false}
            className={classes.open}
            onClick={handleOpenDialog}
          >
            <MenuIcon />
          </Buttons>
        </Box>
        <MenuDrawer open={openDialog} onClose={() => setOpenDialog(false)} />
      </MediaVisible>
    </>
  )
}

export default Index

/**
 * @author zhengji.su
 * @description Index
 */

import { useEffect, useState } from 'react'
import Box from "@mui/material/Box";
import Image from "next/image";
import Logo from "public/images/logo/logo.dark.jpg"
import { NAVIGATION_LIST, NavigationItem } from "components/Navigation/constant";
import Buttons from "components/Buttons";
import FormText from "components/Form/FormText";
import { useRouter } from "next/router";
import clsx from "clsx";
import isEmpty from "lodash/isEmpty"
import isString from "lodash/isString"
import MediaQuery from "components/MediaQuery";
import useStyles from "components/Navigation/useStyles";
import MenuIcon from "components/Icons/MenuIcon";
import MenuDrawer from "components/Navigation/components/MenuDrawer";
import UserButtons from "components/Navigation/components/UserButtons";
import AccordionMenu from "components/Navigation/components/AccordionMenu";
import throttle from "lodash/throttle";
import routes from "@/src/routes";
import { useTheme } from "@mui/material/styles";
import {Variant} from "components/Variant";

function Navigation() {
  const classes = useStyles()
  const history = useRouter()
  const theme = useTheme()

  const [openDialog, setOpenDialog] = useState(false)
  const [focusTab, setFocusTab] = useState<NavigationItem | null>(null)
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    const scroll = () => setFocus(window.scrollY >= 150)

    window.addEventListener('scroll', throttle(scroll, 500))

    return () => removeEventListener('scroll', scroll)
  }, [])

  const handleCheckRoute = async (tab: NavigationItem | null, type: string = 'click') => {
    if (tab === null || type === 'leave') {
      return setFocusTab(null)
    }

    if (type === 'enter') {
      return !isEmpty(tab.menus) && setFocusTab(tab)
    }


    return isString(tab.route) ? history.push(tab.route) : history.push(tab.route())
  }

  const handleOpenDialog = () => setOpenDialog(true)

  const handleToHome = () => history.push(routes.home)

  return (
    <>
      <MediaQuery media={['pc', 'pad']}>
        <Box
          className={clsx(classes.root, focus ? classes.focus : classes.blur)}
          onMouseLeave={() => handleCheckRoute(null, 'leave')}
        >
          <Box className={classes.content}>
            <Box display="flex" alignItems="center">
              <Image src={Logo} alt="" className={classes.logo} onClick={handleToHome} />
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
            </Box>
            <Box className={classes.tools}>
              <FormText label="搜索本站" bgColor={theme.status.transparent} />
              <UserButtons />
            </Box>
          </Box>
          <Variant focus={!isEmpty(focusTab?.menus)}>
            <AccordionMenu tab={focusTab} />
          </Variant>
        </Box>
      </MediaQuery>
      <MediaQuery media="mobile">
        <Box className={clsx(classes.root, focus ? classes.focus : classes.blur)}>
          <Image src={Logo} alt="" className={classes.logo} onClick={handleToHome} />
          <Buttons
            variant="text"
            space={false}
            className={classes.open}
            onClick={handleOpenDialog}
          >
            <MenuIcon />
          </Buttons>
        </Box>
        <MenuDrawer
          menus={NAVIGATION_LIST}
          open={openDialog}
          onClose={() => setOpenDialog(false)}
        />
      </MediaQuery>
    </>
  )
}

export default Navigation

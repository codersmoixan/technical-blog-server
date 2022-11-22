/**
 * @author zhengji.su
 * @description Index
 */

import { useEffect, useState } from 'react'
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
import throttle from "lodash/throttle";
import routes from "@/src/routes";
import { useTheme } from "@mui/material/styles";

function Index() {
  const classes = useStyles()
  const history = useRouter()
  const theme = useTheme()

  const [openDialog, setOpenDialog] = useState(false)
  const [focusTab, setFocusTab] = useState<NavigationItem>(NAVIGATION_LIST[0])
  const [focus, setFocus] = useState(false)

  useEffect(() => {
    const scroll = () => setFocus(window.scrollY >= 150)

    window.addEventListener('scroll', throttle(scroll, 500))

    return () => removeEventListener('scroll', scroll)
  }, [])

  const handleCheckRoute = async (tab: NavigationItem | null, type: string = 'click') => {
    if (tab === null || type === 'leave') {
      return setFocusTab(NAVIGATION_LIST[0])
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
      <MediaVisible media="pc">
        <Box
          className={clsx(classes.root, focus ? classes.focus : classes.blur)}
          onMouseLeave={() => handleCheckRoute(null, 'leave')}
        >
          <Box className={classes.content}>
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
            <Box className={classes.tools}>
              <FormText label="搜索本站" bgColor={theme.status.transparent} />
              <UserButtons />
            </Box>
          </Box>
          <AccordionMenu
            tab={focusTab}
            focus={focus}
          />
        </Box>
      </MediaVisible>
      <MediaVisible media={['pad', 'mobile']}>
        <Box className={classes.root}>
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
      </MediaVisible>
    </>
  )
}

export default Index

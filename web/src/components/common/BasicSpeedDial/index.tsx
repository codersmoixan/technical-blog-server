/**
 * @author zhengji.su
 * @description BasicSpeedDial
 */

import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import BookmarkAdd from '@mui/icons-material/BookmarkAdd';
import AddLink from '@mui/icons-material/AddLink';
import Queue from '@mui/icons-material/Queue';
import PostAdd from '@mui/icons-material/PostAdd';
import VerticalAlignTop from "@mui/icons-material/VerticalAlignTop";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import {useRouter} from "next/router";
import routes from "@/src/routes";
import isString from "lodash/isString";
import {ReactNode} from "react";

const actions: {
  id: keyof (typeof routes) | 'top';
  icon: ReactNode;
  name?: string;
}[] = [
  { id: 'links', icon: <AddLink />, name: '新增友情链接' },
  { id: 'files', icon: <Queue />, name: '新增归档类型' },
  { id: 'tags', icon: <BookmarkAdd />, name: '新增标签' },
  { id: 'editor', icon: <PostAdd />, name: '新增新的分享' },
  { id: 'top', icon: <VerticalAlignTop /> }
];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'fixed',
    bottom: 64,
    right: 64,
    transform: 'translateZ(0px)',
    flexGrow: 1,
    zIndex: 9999,
    transition: 'all .3s',
    [theme.breakpoints.down('sm')]: {
      bottom: 12,
      right: 12
    }
  }
}))

function BasicSpeedDial() {
  const classes = useStyles()
  const history = useRouter()

  const scrollToTop = () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }


  const handleAction = (type: keyof (typeof routes) | 'top') => {
    if (type === 'top') {
      return scrollToTop()
    }

    const route = routes[type]

    console.log(route);

    return isString(route) ? history.push(route) : history.push(route())
  }

  return (
    <Box className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.id}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleAction(action.id)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default BasicSpeedDial

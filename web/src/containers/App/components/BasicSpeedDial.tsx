/**
 * @author zhengji.su
 * @description BasicSpeedDial
 */

import Box from '@mui/material/Box';
import SpeedDial, {SpeedDialProps} from '@mui/material/SpeedDial';
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
import type { ReactNode } from "react";
import Link from "next/link";
import useSpeedDial from "containers/App/hooks/useSpeedDial";

export interface SpeedDialOption {
  id: keyof (typeof routes) | 'top';
  icon: ReactNode;
  name?: string;
}

export interface BasicSpeedDialProps extends Omit<SpeedDialProps, 'onChange' | 'ariaLabel'> {
  ariaLabel?: string;
  onChange?: (action: SpeedDialOption) => void;
}

const actions: SpeedDialOption[] = [
  { id: 'links', icon: <AddLink />, name: '新增友情链接' },
  { id: 'category', icon: <Queue />, name: '新增归档类型' },
  { id: 'tags', icon: <BookmarkAdd />, name: '新增标签' },
  { id: 'editor', icon: <Link href={routes.editor} target="_blank"><PostAdd /></Link>, name: '新增新的分享' },
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

function BasicSpeedDial({ onChange, ...other }: BasicSpeedDialProps) {
  const classes = useStyles()
  const history = useRouter()
  const { change } = useSpeedDial()

  const scrollToTop = () => {
    document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }


  const handleAction = (action: SpeedDialOption) => {
    const { id } = action
    if (id === 'top') {
      return scrollToTop()
    }

    if (id === 'editor') {
      return
    }

    change(id)

    return onChange?.(action)
  }

  return (
    <Box className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        {...other}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.id}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleAction(action)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}

export default BasicSpeedDial

/**
 * @author zhengji.su
 * @description SearchFormText
 */

import React, { MutableRefObject, useState } from "react";
import Box from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop"
import FormText, { FormTextProps } from "components/Form/FormText";
import clsx from "clsx";
import Search from "@mui/icons-material/Search"
import type { Theme } from "@mui/material";

export interface SearchFormTextProps extends FormTextProps {
  backdrop?: boolean;
  anchorPoint?: MutableRefObject<JSX.Element | HTMLElement | null>
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    transition: theme.status.transition()
  },
  formText: {
    position: 'relative',
    '&.focus': {
      zIndex: 999,
    }
  },
  focus: {
    '& .MuiInputBase-root': {
      backgroundColor: theme.status.white
    }
  },
  backdrop: {
    zIndex: 990
  }
}))

function SearchFormText (props: SearchFormTextProps) {
  const { backdrop = true, onFocus, onBlur, className, anchorPoint, ...other } = props
  const classes = useStyles(props)

  const [focus, setFocus] = useState(false)

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(true)
    const dom = anchorPoint?.current ?? anchorPoint
    // @ts-ignore
    if (dom.scrollIntoView) {
      // @ts-ignore
      dom.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }

    onFocus?.(event)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocus(false)
    onBlur?.(event)
  }

  return (
    <Box className={clsx(classes.root, {
      [classes.focus]: focus
    })}>
      <FormText
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={clsx(classes.formText, {
          focus
        }, className)}
        margin="dense"
        startAdornment={<Search />}
        {...other}
      />
      {backdrop && <Backdrop open={focus} className={classes.backdrop} />}
    </Box>
  )
}

export default SearchFormText

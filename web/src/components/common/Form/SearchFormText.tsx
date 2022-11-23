/**
 * @author zhengji.su
 * @description SearchFormText
 */

import React, { MutableRefObject, ReactNode, useRef, useState } from "react";
import Box from '@mui/material/Box';
import { makeStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop"
import FormText, { FormTextProps } from "components/common/Form/FormText";
import clsx from "clsx";
import Search from "@mui/icons-material/Search"
import type { Theme } from "@mui/material";

interface SearchFormTextProps extends FormTextProps {
  backdrop?: boolean;
  anchorPoint?: MutableRefObject<ReactNode | HTMLElement | null>
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    transition: theme.status.transition()
  },
  formText: {
    position: 'relative',
    zIndex: 99,
  },
  focus: {
    '& .MuiInputBase-root': {
      backgroundColor: theme.status.white
    }
  },
  backdrop: {
    zIndex: 90
  }
}))

function SearchFormText(props: SearchFormTextProps) {
  const { backdrop = true, onFocus, onBlur, className, anchorPoint, ...other } = props
  const classes = useStyles(props)

  const [focus, setFocus] = useState(false)

  const boxRef = useRef()

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
    <Box ref={boxRef} className={clsx(classes.root, {
      [classes.focus]: focus
    })}>
      <FormText
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={clsx(classes.formText, className)}
        margin="dense"
        startAdornment={<Search />}
        {...other}
      />
      {backdrop && <Backdrop open={focus} className={classes.backdrop} />}
    </Box>
  )
}

export default SearchFormText

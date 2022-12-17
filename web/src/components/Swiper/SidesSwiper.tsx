/**
 * @author zhengji.su
 * @description SidesSwiper
 */

import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import VariantList from "components/Variant/VariantList";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Buttons from "components/Buttons";
import useSidesSwiper from "components/Swiper/hooks/useSidesSwiper";
import type { Theme } from "@mui/material";
import type { ReactNode } from "react";

export interface SidesSwiperProps extends Omit<BoxProps, 'children'> {
  data: any[];
  children: (option: any) => ReactNode;
  triggerScroll?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  action: {
    width: 70,
    display: "flex",
    justifyContent: 'space-between'
  },
  title: {
    cursor: 'pointer'
  },
  banner: {
    padding: theme.spacing(3, 0, 3, 0),
    // marginLeft: theme.spacing(-3),
    overflowX: 'clip',
    [theme.breakpoints.down('md')]: {
      overflowX: 'auto',
      padding: theme.spacing(2, 0, 0, 3),
      margin: theme.spacing(0, -3),
    }
  },
  container: {
    display: 'flex',
    width: 'max-content'
  },
  prevBtn: {
    '&.Mui-disabled.MuiButton-textPrimary': {
      color: theme.status.disabled
    }
  },
  nextBtn: {
    '&.Mui-disabled.MuiButton-textPrimary': {
      color: theme.status.disabled
    }
  }
}))

function SidesSwiper({ data, title, triggerScroll, children, ...other }: SidesSwiperProps) {
  const classes = useStyles()

  const { containerRef, swiperRef, prevDisabled, nextDisabled, onNext, onPrev } = useSidesSwiper({
    sideLength: data.length,
    sideSize: 240,
  })

  return (
    <Box className={classes.root} {...other}>
      {(!title && !triggerScroll) ? null : (
        <Box className={classes.actions}>
          {title && <Typography variant="h3" fontWeight={400} className={classes.title}>{title}</Typography>}
          {triggerScroll && (
            <Box className={classes.action}>
              <Buttons
                variant="text"
                onClick={onPrev}
                disabled={prevDisabled}
                className={classes.prevBtn}
              >
                <ChevronLeftIcon />
              </Buttons>
              <Buttons
                variant="text"
                onClick={onNext}
                disabled={nextDisabled}
                className={classes.nextBtn}
              >
                <ChevronRightIcon />
              </Buttons>
            </Box>
          )}
        </Box>
      )}
      <Box
        ref={containerRef}
        className={classes.banner}
      >
        <VariantList ref={swiperRef} list={data} className={classes.container}>
          {option => children(option)}
        </VariantList>
      </Box>
    </Box>
  )
}

export default SidesSwiper

/**
 * @author zhengji.su
 * @description SidesSwiper
 */

import BlogCard from "containers/Share/components/BlogCard";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import VariantList from "components/Variant/VariantList";
import { useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Buttons from "components/Buttons";
import useSidesSwiper from "components/Swiper/hooks/useSidesSwiper";
import type { Theme } from "@mui/material";

interface CardSwiperProps extends BoxProps {
  blogs: any[];
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
    padding: theme.spacing(3, 0, 3, 2),
    marginLeft: theme.spacing(-2),
    overflowX: 'hidden',
    [theme.breakpoints.down('md')]: {
      padding: theme.spacing(2, 0, 0, 3),
      margin: theme.spacing(0, -3),
    }
  },
  container: {
    display: 'flex',
    width: 'max-content'
  },
  card: {
    marginRight: theme.spacing(3),
    width: 216,
    minHeight: 256,
    transition: theme.status.transition(),
    '& img': {
      height: 140,
      transition: theme.status.transition(),
    }
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

function SidesSwiper({ blogs, title, triggerScroll, ...other }: CardSwiperProps) {
  const classes = useStyles()
  const theme = useTheme()
  const { sideRef, swiperRef, prevDisabled, nextDisabled, onNext, onPrev, onTouchStart, onTouchMove, onTouchEnd } = useSidesSwiper({
    length: blogs.length
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
        ref={swiperRef}
        className={classes.banner}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <VariantList list={blogs} className={classes.container}>
          {blog => (
            <BlogCard key={blog.id} title={blog.title} date="2022.11.06" className={classes.card} ref={sideRef}>
              <Typography variant="caption" color={theme.status.textSecondary}>{blog.description}</Typography>
            </BlogCard>
          )}
        </VariantList>
      </Box>
    </Box>
  )
}

export default SidesSwiper

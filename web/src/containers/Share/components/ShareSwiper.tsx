/**
 * @author zhengji.su
 * @description ShareSwiper
 */

import SidesSwiper, {SidesSwiperProps} from "components/Swiper/SidesSwiper";
import BlogCard from "containers/Share/components/BlogCard";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Theme, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface ShareSwiperProps extends Pick<SidesSwiperProps, 'title'> {
  blogs: any[]
}

const useStyles = makeStyles((theme: Theme) => ({
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
}))

function ShareSwiper({ blogs, ...other }: ShareSwiperProps) {
  const theme = useTheme()
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const classes = useStyles()

  return (
    <SidesSwiper data={blogs} triggerScroll={mdUp} {...other}>
      {blog => (
        <BlogCard key={blog.id} title={blog.title} date="2022.11.06" className={classes.card}>
          <Typography variant="caption" color={theme.status.textSecondary}>{blog.description}</Typography>
        </BlogCard>
      )}
    </SidesSwiper>
  )
}

export default ShareSwiper

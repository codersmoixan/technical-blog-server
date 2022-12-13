/**
 * @author zhengji.su
 * @description CardSwiper
 */

import BlogCard from "containers/Share/components/BlogCard";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import VariantList from "components/Variant/VariantList";
import { useTheme } from "@mui/material/styles";
import type { Theme } from "@mui/material";

interface CardSwiperProps extends BoxProps {
  blogs: any[];
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  title: {
    cursor: 'pointer'
  },
  banner: {
    padding: theme.spacing(3, 0),
    overflowX: 'auto',
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
  }
}))

function CardSwiper({ blogs, title, ...other }: CardSwiperProps) {
  const classes = useStyles()
  const theme = useTheme()

  return (
    <Box className={classes.root} {...other}>
      {title && <Typography variant="h3" fontWeight={400} className={classes.title}>{title}</Typography>}
      <Box className={classes.banner}>
        <VariantList list={blogs} className={classes.container}>
          {blog => (
            <BlogCard key={blog.id} title={blog.title} date="2022.11.06" className={classes.card}>
              <Typography variant="caption" color={theme.status.textSecondary}>{blog.description}</Typography>
            </BlogCard>
          )}
        </VariantList>
      </Box>
    </Box>
  )
}

export default CardSwiper

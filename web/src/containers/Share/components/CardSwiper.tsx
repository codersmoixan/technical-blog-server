/**
 * @author zhengji.su
 * @description CardSwiper
 */

import BlogCard, { DESCRIPTION } from "containers/Share/components/BlogCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import VariantList from "components/Variant/VariantList";
import type { Theme } from "@mui/material";

interface CardSwiperProps {
  blogs: any[]
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(3, 0),
    overflowX: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(-3),
    }
  },
  container: {
    display: 'flex',
    width: 'max-content'
  },
  card: {
    width: 200,
    marginRight: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      width: 180,
    }
  }
}))

function CardSwiper({ blogs }: CardSwiperProps) {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <VariantList list={blogs} className={classes.container}>
        {blog => (
          <BlogCard key={blog.id} title={blog.title} date="2022.11.06" className={classes.card}>
            <Box slot={DESCRIPTION}>
              <Typography>{blog.description}</Typography>
            </Box>
          </BlogCard>
        )}
      </VariantList>
    </Box>
  )
}

export default CardSwiper

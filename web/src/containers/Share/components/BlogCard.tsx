/**
 * @author zhengji.su
 * @description BlogCard
 */

import React, { ReactElement, ReactNode, useMemo, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image, { StaticImageData } from "next/image";
import { makeStyles } from "@mui/styles";
import ShareFour from "public/images/share/share-four.png"
import Typography from "@mui/material/Typography";
import MediaQuery from "components/MediaQuery";
import Box from "@mui/material/Box";
import useSeparateChildren from "hooks/useSeparateChildren";
import type { Theme } from "@mui/material";
import clsx from "clsx";

interface BlogCardProps {
  title: ReactNode;
  date: ReactNode;
  avatar?: ReactNode;
  image?: string | StaticImageData;
  actions?: boolean;
  className?: string;
  children?: ReactNode | ReactElement[];
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const DESCRIPTION = 'description'
export const EXPANDED = 'expanded'

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    boxShadow: 'rgb(240 240 240) 4px 4px 16px',
    borderRadius: 8,
    cursor: 'pointer',
    '&:hover': {
      boxShadow: 'rgb(170 170 170) 0px 5px 15px'
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: 325,
    }
  },
  header: {
    padding: theme.spacing(1, 2)
  },
  avatar: {
    backgroundColor: theme.status.bgDark,
    color: theme.status.white
  },
  title: {},
  date: {
    color: theme.palette.text.secondary
  },
  image: {
    width: '100%',
    height: 180,
    [theme.breakpoints.up("sm")]: {
      maxWidth: 325,
    }
  },
  description: {
    padding: theme.spacing(1, 2),
  },
  actions: {},
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1
  },
  expanded: {}
}))

const variants = {
  opacity: 1,
  x: 0,
  y: 0,
  transition: { type: "spring", stiffness: 300, damping: 24 },
  duration: 0.5
};

function BlogCard(props: BlogCardProps) {
  const {
    title,
    avatar = 'S',
    image = ShareFour,
    date,
    actions,
    className,
    children
  } = props
  const classes = useStyles(props)
  const { description, expanded } = useSeparateChildren(children, ['description', 'expanded'])

  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className={clsx(className, classes.root)}>
      <Image className={classes.image} src={image} alt="" />
      <Box className={classes.content}>
        <Box display="flex" justifyContent="flex-start" flexDirection="column">
          <CardHeader
            avatar={
              <Avatar className={classes.avatar}>
                {avatar}
              </Avatar>
            }
            title={<Typography variant="body1" className={classes.title}>{title}</Typography>}
            subheader={<Typography variant="body1" className={classes.date}>{date}</Typography>}
            className={classes.header}
          />
          {description && (
            <CardContent className={classes.description}>
              {description}
            </CardContent>
          )}
        </Box>
        {actions && (
          <CardActions disableSpacing className={classes.actions}>
            <IconButton>
              <FavoriteIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
            <MediaQuery media="mobile">
              {expanded ? (
                <ExpandMore
                  expand={isExpanded}
                  onClick={handleExpandClick}
                  aria-expanded={isExpanded}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              ) : null}
            </MediaQuery>
          </CardActions>
        )}
      </Box>
      {expanded && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit className={classes.expanded}>
          <CardContent>
            {expanded}
          </CardContent>
        </Collapse>
      )}
    </Card>
  )
}

export default BlogCard

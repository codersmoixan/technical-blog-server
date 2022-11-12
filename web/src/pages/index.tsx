import { makeStyles } from "@mui/styles";
import { GetStaticProps } from "next";
import Box from "@mui/material/Box";
import Content from "components/Layout/Content";
import type { Theme } from "@mui/material";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative'
  },
  content: {
    width: 500,
    height: 500,
  },
  backdropVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: theme.spacing(-10),
    width: '100vw',
    height: '100vh',
    zIndex: -1
  },
  video: {
    width: '100%',
  }
}))

function Home({ a }: any) {
  const classes = useStyles()
  return (
    <Box className={classes.root}>
      <Content>
        <div className={classes.content}>
          Home
          {a}
        </div>
      </Content>
      <div className={classes.backdropVideo}>
        <video
          autoPlay
          loop
          playsInline
          muted
          className={classes.video}
        >
          <source src={require('../public/video/backdrop-video.mp4')} type="video/mp4"/>
        </video>
      </div>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      a: '这个就是张三'
    }
  }
}

export default Home

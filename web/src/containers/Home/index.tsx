import { makeStyles } from "@mui/styles";
import Content from "components/Layout/Content";
import Typography from "@mui/material/Typography";
import Buttons from "components/Buttons";
import { useRouter } from "next/router";
import routes from "@/src/routes";
import Root from "components/Layout/Root";
import Banner from "components/Layout/Banner";
import Backdrop from "containers/Home/components/Backdrop";
import type { Theme } from "@mui/material";
import MediaQuery from "components/MediaQuery";
import StepFirst from "containers/Home/components/StepFirst";
import Box from "@mui/material/Box";

const backdrop = 'linear-gradient(327.21deg, rgba(33, 0, 75, 0.24) 3.65%, rgba(60, 0, 136, 0) 40.32%), linear-gradient(245.93deg, rgba(209, 21, 111, 0.16) 0%, rgba(209, 25, 80, 0) 36.63%), linear-gradient(147.6deg, rgba(58, 19, 255, 0) 29.79%, rgba(98, 19, 255, 0.01) 85.72%), #13111C'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: "center",
    padding: theme.spacing(0, 3),
    width: '100%',
  },
  banner: {
    width: 600,
    [theme.breakpoints.down('md')]: {
      marginTop: theme.spacing(9),
      justifyContent: 'flex-start',
      width: 'auto',
    },
    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-end',
    },
    color: 'white'
  },
  subtitle: {
    margin: theme.spacing(3, 0)
  },
  startShare: {
    width: 195,
    height: 50,
    fontSize: 16,
    '&.MuiButton-contained': {
      background: 'linear-gradient(76.35deg, rgb(128, 26, 230) 15.89%, rgb(162, 26, 230) 89.75%)'
    }
  },
  content: {
    background: theme.status.darkColor
  }
}))

function Home() {
  const classes = useStyles()
  const history = useRouter()

  const handleToShare = () => history.push(routes.sharing())

  return (
    <>
      <Root position="relative" height="100vh" bgColor={backdrop}>
        <Content className={classes.root}>
          <Banner className={classes.banner}>
            <Typography variant="h1" fontWeight={400} color="inherit">
              你一路颠沛流离
            </Typography>
            <Typography variant="h1" fontWeight={400} color="inherit">
              到最遥远的地方旅行
            </Typography>
            <Typography
              variant="subtitle1"
              classes={{ root: classes.subtitle }}
              color="inherit"
            >
              未来，就是你站在茫茫大海的这一边，遥望着海的那一边，充满好奇心，憧憬着对海那边的向往，正是对未知的不了解和向往，所以才有了去追逐未来的勇气。
            </Typography>
            <Buttons
              variant="contained"
              className={classes.startShare}
              onClick={handleToShare}
            >
              开始你的旅行
            </Buttons>
          </Banner>
          <MediaQuery media={['pad', 'pc']}>
            <Backdrop />
          </MediaQuery>
        </Content>
      </Root>
      <Box pt={5} className={classes.content}>
        <StepFirst />
      </Box>
    </>
  )
}

export default Home

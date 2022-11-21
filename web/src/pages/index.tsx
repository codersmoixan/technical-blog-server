import { makeStyles } from "@mui/styles";
import { GetStaticProps } from "next";
import Content from "components/common/Layout/Content";
import type { Theme } from "@mui/material";
import Video from "components/private/HomePage/Video";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Buttons from "components/common/Buttons";
import {useRouter} from "next/router";
import routes from "@/src/routes";
import Root from "components/common/Layout/Root";
import Banner from "components/common/Layout/Banner";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: "center",
    padding: theme.spacing(0, 3),
  },
  banner: {
    justifyContent: 'flex-end',
    width: 545,
  },
  subtitle: {
    margin: theme.spacing(3, 0)
  },
  startShare: {
    width: 195,
    height: 50
  }
}))

function Home({ a }: any) {
  const classes = useStyles()
  const history = useRouter()

  const handleToShare = () => history.push(routes.share())

  return (
    <Root position="relative">
      <Content className={classes.root}>
        <Banner className={classes.banner}>
          <Typography variant="h2" fontWeight={400}>
            你一路颠沛流离
          </Typography>
          <Typography variant="h2" fontWeight={400}>
            到最遥远的地方旅行
          </Typography>
          <Typography
            variant="subtitle1"
            classes={{ root: classes.subtitle }}
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
      </Content>
      <Video />
    </Root>
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

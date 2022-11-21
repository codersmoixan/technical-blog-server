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

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: "center",
    padding: theme.spacing(0, 3),
    marginTop: theme.spacing(28)
  },
  content: {
    width: 545,
    minHeight: 425
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
      <Content>
        <Box className={classes.root}>
          <Box className={classes.content}>
            <Typography variant="h2" fontWeight={400}>
              宁可累死自己
            </Typography>
            <Typography variant="h2" fontWeight={400}>
              也要卷死同行
            </Typography>
            <Typography
              variant="subtitle1"
              classes={{ root: classes.subtitle }}
            >
              通过合并相近网格的几何图形，非常细致的管理实例化对象从而节省提升渲染效率。
              车辆在道路中的进行情况会被不断追踪计算，并依据远景能见度来释放不可见的元素并使其重复使用。
              提供一系列和质量有关的设定以满足不同设备上的渲染。
            </Typography>
            <Buttons
              variant="contained"
              className={classes.startShare}
              onClick={handleToShare}
            >
              开始分享旅程
            </Buttons>
          </Box>
        </Box>
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

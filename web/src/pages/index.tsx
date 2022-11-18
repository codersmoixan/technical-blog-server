import { makeStyles } from "@mui/styles";
import { GetStaticProps } from "next";
import Box from "@mui/material/Box";
import Content from "components/common/Layout/Content";
import type { Theme } from "@mui/material";
import Root from "components/common/Layout/Root";
import Video from "components/private/HomePage/Video";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'relative'
  },
}))

function Home({ a }: any) {
  const classes = useStyles()

  return (
    <Root>
      <Box className={classes.root}>
        <Content>
          <div>
            Home
            {a}
          </div>
        </Content>
        <Video />
      </Box>
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

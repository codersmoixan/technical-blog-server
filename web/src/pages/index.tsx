import { makeStyles } from "@mui/styles";
import { GetStaticProps } from "next";
import Content from "components/Layout/Content";

const useStyles = makeStyles(theme => ({
  root: {
    width: 500,
    height: 500,
    backgroundColor: 'red'
  }
}))

function Home({ a }: any) {
  const classes = useStyles()
  return (
    <Content>
      <div className={classes.root}>
        Home
        {a}
      </div>
    </Content>
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

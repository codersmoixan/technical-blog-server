import dynamic  from 'next/dynamic'
import Box from "@mui/material/Box";
import { IDomEditor } from '@wangeditor/editor'
import { useState } from "react";
import Root from "components/common/Layout/Root";
import { makeStyles } from "@mui/styles";
import type {Theme} from "@mui/material";
import Buttons from "components/common/Buttons";

const ShareEditor = dynamic(
  () => import('components/private/Editor/ShareEditor'),
  {ssr: false}
)

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.status.white
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 3),
    backgroundColor: theme.status.white,
    borderBottom: `1px solid ${theme.status.colorSecondary}`,
  },
  title: {
    width: '70%',
    height: '100%',
    fontWeight: 700,
    fontSize: 24,
    outline: 'none',
    border: 'none',
    color: theme.status.colorSecondary,
  },
  actions: {
    display: 'flex'
  },
  content: {
    display: 'flex'
  },
  editor: {
    flex: 1
  },
  review: {
    width: '50%'
  },
  submit: {
    marginLeft: theme.spacing(3)
  }
}))

export default function Editor() {
  const classes = useStyles()

  const [html, setHtml] = useState('')

  const handleEditor = (editor: IDomEditor) => {
    setHtml(editor.getHtml())
  }

  return (
    <Root className={classes.root}>
      <Box className={classes.header}>
        <input placeholder="请输入文章标题..." className={classes.title} />
        <Box className={classes.actions}>
          <Buttons variant="outlined">草稿箱</Buttons>
          <Buttons variant="contained" className={classes.submit}>发布</Buttons>
        </Box>
      </Box>
      <Box className={classes.content}>
        <ShareEditor onChange={handleEditor} className={classes.editor} />
        <Box className={classes.review} dangerouslySetInnerHTML={{
          __html: html
        }} />
      </Box>
    </Root>
  )
}

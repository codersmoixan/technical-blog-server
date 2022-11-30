import dynamic  from 'next/dynamic'
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import { IDomEditor } from '@wangeditor/editor'
import {useState} from "react";
import Root from "components/common/Layout/Root";

const ShareEditor = dynamic(
  () => import('components/private/Editor/ShareEditor'),
  {ssr: false}
)

export default function Editor() {
  const [html, setHtml] = useState('')
  console.log(useRouter())

  const handleEditor = (editor: IDomEditor) => {
    setHtml(editor.getHtml())
  }

  return (
    <Root>
      <ShareEditor onChange={handleEditor} />
      <Box mt={2} dangerouslySetInnerHTML={{
        __html: html
      }} />
    </Root>
  )
}

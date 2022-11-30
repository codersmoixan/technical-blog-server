/**
 * @author zhengji.su
 * @description ShareEditor
 */

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, DomEditor, IToolbarConfig } from '@wangeditor/editor'
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/system";

import '@wangeditor/editor/dist/css/style.css'

interface ShareEditorProps {
  onChange?: (editor: IDomEditor) => void
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  toolbar: {
    position: 'sticky',
    top: 0,
    zIndex: 999,
    boxShadow: 'rgb(19 19 19 / 8%) 0px 2px 4px 0px',
  },
  editor: {
    height: '100%'
  }
}))

const excludeToolKey = [
  '|', 'group-more-style', 'underline', 'italic', 'bgColor', 'fontFamily', 'lineHeight', 'bulletedList',
  'numberedList', 'group-justify', 'group-indent', 'group-video', 'insertTable', 'todo'
]

function ShareEditor({ onChange }: ShareEditorProps) {
  const classes = useStyles()

  const [editor, setEditor] = useState<IDomEditor | null>(null)

  const toolbarConfig: Partial<IToolbarConfig> = {

  } // 菜单栏配置

  // 编辑器配置
  const editorConfig = {
    placeholder: '请输入内容...',
    onCreated: (editor: IDomEditor) => {
      // 编辑器创建之后，记录 editor 实例，重要 ！！！ （有了 editor 实例，就可以执行 editor API）
      setEditor(editor)
    },
    onChange: (editor: IDomEditor) => onChange?.(editor)
  }

  // 组件销毁时，及时销毁 editor 实例，重要！！！
  useEffect(() => {
    if (editor !== null) {
      const toolbarConfig = DomEditor.getToolbar(editor)?.getConfig()
      console.log(toolbarConfig);
      if (toolbarConfig) {
        toolbarConfig.excludeKeys = excludeToolKey
      }

      console.log(toolbarConfig, 66);
    }

    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])

  return (
    <div className={classes.root}>
      <Toolbar
        editor={editor}
        defaultConfig={toolbarConfig}
        className={classes.toolbar}
      />
      <Editor
        defaultConfig={editorConfig}
        className={classes.editor}
      />
    </div>
  )
}

export default ShareEditor

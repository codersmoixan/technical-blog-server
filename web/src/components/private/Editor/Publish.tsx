/**
 * @author zhengji.su
 * @description Publish
 */

import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import useNotification from "@/src/hooks/useNotification";
import CenterDialog from "components/common/Dialog/CenterDialog";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import FormSelectChip from "components/common/Form/FormSelectChip";
import ImageUpload from "components/common/Form/ImageUpload";
import FormTextarea from "components/common/Form/FormTextarea";
import Form from "components/common/Form/Form";
import useForm from "hooks/useForm";
import type { Theme } from "@mui/material";
import FormChipSelect from "components/common/Form/FormChipSelect";
import isEmpty from "lodash/isEmpty";

export interface FormOptions {
  category: string;
  tag: string;
  description: string;
  cover: File[]
}

interface PublishProps {
  open: boolean;
  onClose?: () => void;
  onPublish?: (options: FormOptions) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 700
  },
}))

const chips = [
  { id: 1, label: '前端' },
  { id: 2, label: '后端' },
  { id: 3, label: 'IOS' },
  { id: 4, label: 'Android' },
  { id: 5, label: '开发工具' },
  { id: 6, label: '阅读' },
  { id: 7, label: '代码人生' }
]

const tags = [
  { id: 1, label: '前端', value: '前端' },
  { id: 2, label: '后端', value: '后端' }
]

function Publish({ open = false, onClose, onPublish }: PublishProps) {
  const { notify } = useNotification()
  const classes = useStyles()
  const { observer, handleSubmit } = useForm({
    // defaultValues: {
    //   tag: '1',
    //   category: 1,
    //   description: '2233'
    // }
  })

  // setValue({
  //   tag: 1,
  //   category: 1,
  //   description: '2233'
  // })

  const [cover, setCover] = useState<File[]>([])

  const resetForm = () => {
    observer.reset()
    setCover([])
  }

  const handlePublish = (options: any) => {
    if (isEmpty(cover)) {
      return notify('请上传文章封面', 'warning')
    }

    onPublish?.({ ...options, cover })
    resetForm()
  }

  const handleImageChange = (files: File[]) => {
    setCover(files)
  }

  const handleClose = () => {
    onClose?.()
    resetForm()
  }

  return (
    <CenterDialog
      open={open}
      onClose={handleClose}
      onConfirm={handleSubmit(handlePublish)}
      title="发布文章"
    >
      <Form observer={observer}>
        <Box className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={2}>分类: </Grid>
            <Grid item xs={10}>
              <FormChipSelect name="category" options={chips} rules={{ required: '请选择文章分类' }} />
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={2}>标签: </Grid>
            <Grid item xs={10}>
              <FormSelectChip
                name="tag"
                multiple
                options={tags}
                placeholder="请选择标签"
                rules={{
                  required: '请选择文章标签'
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={2}>文章封面: </Grid>
            <Grid item xs={10}>
              <ImageUpload onChange={handleImageChange} />
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={2}>编辑摘要: </Grid>
            <Grid item xs={10}>
              <FormTextarea
                name="description"
                placeholder="请输入文章摘要..."
                rules={{
                  required: '请输入文章摘要'
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </CenterDialog>
  )
}

export default Publish

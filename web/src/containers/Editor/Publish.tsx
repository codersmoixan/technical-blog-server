/**
 * @author zhengji.su
 * @description Publish
 */

import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import useNotifier from "components/Snackbar/hooks/useNotifier";
import CenterDialog from "components/Dialog/CenterDialog";
import { makeStyles } from "@mui/styles";
import { useState } from "react";
import FormSelectChip from "components/Form/FormSelectChip";
import ImageUpload from "components/Form/ImageUpload";
import FormTextarea from "components/Form/FormTextarea";
import Form from "components/Form/Form";
import useForm from "hooks/common/useForm";
import type { Theme } from "@mui/material";
import FormChipSelect from "components/Form/FormChipSelect";
import isEmpty from "lodash/isEmpty";
import MediaQuery from "components/MediaQuery";
import GlobalDrawer from "components/GlobalDrawer";
import {useTheme} from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import {AddSharingParam} from "containers/Sharing/type";
import useCategory from "hooks/features/useCategory";

export interface FormOptions extends Pick<AddSharingParam, 'category' | 'tag' | 'description'> {
  cover: File[]
}

interface PublishProps {
  open: boolean;
  onClose?: () => void;
  onPublish?: (options: FormOptions) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 700,
    [theme.breakpoints.down('md')]: {
      minWidth: 'auto'
    }
  },
  drawerHeader: {
    textAlign: 'center',
    '& > button.MuiButtonBase-root': {
      color: theme.status.darkColor
    }
  },
  drawerPaper: {
    '&.MuiPaper-root': {
      boxShadow: 'none'
    }
  }
}))

const chips = [
  { id: '1', label: '前端' },
  { id: '2', label: '后端' },
  { id: '3', label: 'IOS' },
  { id: '4', label: 'Android' },
  { id: '5', label: '开发工具' },
  { id: '6', label: '阅读' },
  { id: '7', label: '代码人生' }
]

const tags = [
  { id: '1', label: '前端', value: '前端' },
  { id: '2', label: '后端', value: '后端' }
]

function Publish({ open = false, onClose, onPublish }: PublishProps) {
  const notify = useNotifier()
  const classes = useStyles()
  const theme = useTheme()
  const { observer, handleSubmit } = useForm()
  const { categories } = useCategory()

  console.log(categories, 1212)

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

  function formNode() {
    return (
      <Form observer={observer}>
        <Box className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={3} sm={2}>分类: </Grid>
            <Grid item xs={9} sm={10}>
              <FormChipSelect name="category" options={chips} rules={{ required: '请选择文章分类' }} />
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={3} sm={2}>标签: </Grid>
            <Grid item xs={9} sm={10}>
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
            <Grid item xs={3} sm={2}>文章封面: </Grid>
            <Grid item xs={9} sm={10}>
              <ImageUpload onChange={handleImageChange} />
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={3} sm={2}>编辑摘要: </Grid>
            <Grid item xs={9} sm={10}>
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
    )
  }

  return (
    <>
      <MediaQuery media={['pad', 'pc']}>
        <CenterDialog
          open={open}
          onClose={handleClose}
          onConfirm={handleSubmit(handlePublish)}
          title="发布文章"
          confirmText="发布"
        >
          {formNode()}
        </CenterDialog>
      </MediaQuery>
      <MediaQuery media="mobile">
        <GlobalDrawer
          open={open}
          bgColor={theme.status.white}
          classes={{
            header: classes.drawerHeader,
            paper: classes.drawerPaper
          }}
          confirmText="发布文章"
          cancelText="取消"
          onClose={handleClose}
          onConfirm={handleSubmit(handlePublish)}
        >
          <Typography component="span" variant="h4" slot="head">发布文章</Typography>
          <Box px={2} slot="content">
            {formNode()}
          </Box>
        </GlobalDrawer>
      </MediaQuery>
    </>
  )
}

export default Publish

/**
 * @author zhengji.su
 * @description Publish
 */

import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import useNotification from "@/src/hooks/useNotification";
import CenterDialog from "components/common/Dialog/CenterDialog";
import { makeStyles } from "@mui/styles";
import TBChip from "components/common/TBChip";
import { useState } from "react";
import FormChipSelect from "components/common/Form/FormChipSelect";
import ImageUpload from "components/common/Form/ImageUpload";
import FormTextarea from "components/common/Form/FormTextarea";
import Form from "components/common/Form/Form";
import useForm from "hooks/useForm";
import type { Theme } from "@mui/material";

interface PublishProps {
  open: boolean;
  onClose?: () => void;
  onPublish?: () => void;
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
  const { observer, handleSubmit } = useForm()

  const [options, setOptions] = useState({})
  const [active, setActive] = useState(0)

  const handlePublish = (options: any) => {
    notify('请输入')
    // onPublish?.()
    console.log(options, 2233);
  }

  const handleCheckChip = (chip: any) => {
    setOptions({ ...options, file: chip.id })
    setActive(chip.id)
  }

  const handleImageChange = () => {

  }

  return (
    <CenterDialog
      open={open}
      onClose={onClose}
      onConfirm={handleSubmit(handlePublish)}
      title="发布文章"
    >
      <Form observer={observer}>
        <Box className={classes.root}>
          <Grid container spacing={1}>
            <Grid item xs={2}>分类: </Grid>
            <Grid item xs={10}>
              <Grid container spacing={2}>
                {chips.map(chip => (
                  <Grid item key={chip.id} spacing={2} xs={2}>
                    <TBChip label={chip.label} active={chip.id === active} onClick={() => handleCheckChip(chip)} />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={2}>标签: </Grid>
            <Grid item xs={10}>
              <FormChipSelect name="tag" options={tags} value={['后端']} placeholder="请选择标签" onChange={handleImageChange} />
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={2}>文章封面: </Grid>
            <Grid item xs={10}>
              <ImageUpload />
            </Grid>
          </Grid>
          <Grid container spacing={1} mt={2}>
            <Grid item xs={2}>编辑摘要: </Grid>
            <Grid item xs={10}>
              <FormTextarea name="description" placeholder="请输入文章摘要..." />
            </Grid>
          </Grid>
        </Box>
      </Form>
    </CenterDialog>
  )
}

export default Publish

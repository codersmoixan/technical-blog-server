/**
 * @author zhengji.su
 * @description Publish
 */

import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip"
import useNotification from "@/src/hooks/useNotification";
import CenterDialog from "components/common/Dialog/CenterDialog";
import { makeStyles } from "@mui/styles";
import type { Theme } from "@mui/material";
import TBChip from "components/common/TBChip";
import {useState} from "react";
import FormSelect from "components/common/Form/FormSelect";

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

  const [options, setOptions] = useState({})
  const [active, setActive] = useState(0)

  const handlePublish = () => {
    notify('请输入')
    // onPublish?.()
  }

  const handleCheckChip = (chip: any) => {
    setOptions({ ...options, file: chip.id })
    setActive(chip.id)
  }

  return (
    <CenterDialog
      open={open}
      onClose={onClose}
      onConfirm={handlePublish}
      title="发布文章"
    >
      <Box className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={1}>分类: </Grid>
          <Grid item xs={11}>
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
          <Grid item xs={1}>标签: </Grid>
          <Grid item xs={11}>
            <FormSelect options={tags} value="" placeholder="请选择标签" />
          </Grid>
        </Grid>
      </Box>
    </CenterDialog>
  )
}

export default Publish

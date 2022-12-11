/**
 * @author zhengji.su
 * @description Index
 */

import Chip, {ChipProps} from '@mui/material/Chip';
import clsx from "clsx";
import {makeStyles} from "@mui/styles";
import type { Theme } from "@mui/material";
import type { MouseEventHandler } from "react";

interface TBChipProps extends ChipProps {
  className?: string;
  active?: boolean;
  onClick?: MouseEventHandler
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 80,
    borderRadius: 2,
    cursor: 'pointer',
  },
  active: {
    backgroundColor: theme.palette.primary.main,
    color: theme.status.white,
    '&:hover': {
      '&.MuiChip-outlined': {
        backgroundColor: theme.palette.primary.main
      }
    }
  }
}))

function TBChip({ className, active, onClick, ...other }: TBChipProps) {
  const classes = useStyles()

  return (
    <Chip
      className={clsx(className, classes.root, {
        [classes.active]: active
      })}
      variant="outlined"
      onClick={onClick}
      {...other}
    />
  )
}

export default TBChip

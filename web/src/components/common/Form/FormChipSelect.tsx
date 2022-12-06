/**
 * @author zhengji.su
 * @description Index
 */

import { useState } from "react";
import Grid from "@mui/material/Grid";
import TBChip from "components/common/TBChip";
import { makeStyles } from "@mui/styles";
import useFormController from "hooks/useFormController";
import type { Theme } from "@mui/material";
import type { EmptyObject } from "src/tb.types"
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useTheme} from "@mui/material/styles";
import clsx from "clsx";
import isUndefined from "lodash/isUndefined";

export type ChipOption = {
  id: string | number;
  label: string;
  value?: string;
}

interface ChipSelectProps {
  options: ChipOption[];
  onSelect?: (chip: any) => void;
  name?: string;
  rules?: EmptyObject<any>;
}

const useStyles = makeStyles((theme: Theme) => ({
  formText: {
    display: 'none'
  },
  chipError: {
    borderColor: theme.status.error
  }
}))

function FormChipSelect({ options, onSelect, name, rules }: ChipSelectProps) {
  const theme = useTheme()
  const classes = useStyles()
  const { ref, fieldProps, fieldState, setValue, clearErrors } = useFormController({
    name,
    rules
  })

  const [active, setActive] = useState<ChipOption>({
    label: '',
    id: ''
  })

  const handleCheckChip = (chip: any) => {
    setActive(chip)
    onSelect?.(chip)

    if (name && chip.id) {
      setValue(name, chip.id)
      clearErrors(name)
    }
  }

  const isError = !isUndefined(fieldState.error)

  return (
    <>
      <Grid container spacing={2}>
        {options.map(chip => (
          <Grid item key={chip.id} spacing={2} xs={2}>
            <TBChip
              label={chip.label}
              active={chip.id === active.id}
              onClick={() => handleCheckChip(chip)}
              className={clsx({
                [classes.chipError]: isError
              })}
            />
          </Grid>
        ))}
      </Grid>
      <Box>
        <input ref={ref} {...fieldProps} className={classes.formText} />
        {isError && <Typography variant="caption" color={theme.status.error}>{fieldState.error?.message}</Typography>}
      </Box>
    </>
  )
}

export default FormChipSelect

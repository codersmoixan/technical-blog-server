/**
 * @author zhengji.su
 * @description FormSelectChip
 */

import { useEffect, useState } from "react";
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent, SelectProps} from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import isString from "lodash/isString";
import get from "lodash/get";
import useFormController from "hooks/common/useFormController";
import OutlinedInput from "@mui/material/OutlinedInput";
import isUndefined from "lodash/isUndefined";
import useUpdateEffect from "hooks/common/effect/useUpdateEffect";
import InputLabel from "@mui/material/InputLabel";
import type { EmptyObject } from "@/src/tb.types"

export interface FormChipOption extends EmptyObject {
  id: string;
  value: string;
}

interface FormChipSelectProps extends SelectProps{
  options: FormChipOption[];
  label?: string;
  rules?: EmptyObject<any>;
  multiple?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
    '& .MuiSelect-select': {
      display: 'flex',
      alignItems: 'center'
    },
    '& .MuiChip-root': {
      height: 25,
      borderRadius: 2,
      backgroundColor: theme.palette.primary.main,
      color: theme.status.white,
      '& .MuiChip-label': {
        fontSize: 12
      }
    }
  },
  label: {
    '&.MuiFormLabel-root': {
      position: 'absolute',
      top: '50%',
      left: 14,
      transform: 'translateY(-50%) scale(1)',
      fontSize: 14,
      color: theme.palette.text.primary,
      transition: 'all .3s'
    },
    '&.MuiFormLabel-root.Mui-focused': {
      transform: 'scale(0.85)',
      left: 16,
      top: -7,
      fontSize: 12,
      color: theme.palette.text.primary,
      backgroundColor: theme.status.transparent
    }
  },
  input: {
    '& .MuiInputBase-input': {
      padding: theme.spacing(0, 1.75),
      height: 42,
      '&::-webkit-input-placeholder': {/*Webkit browsers*/
        fontSize: 14
      },
      '&::-moz-placeholder': {/*Mozilla Firefox 4 to 8*/
        fontSize: 14,
      },
      '&::moz-placeholder': {/*Mozilla Firefox 19+*/
        fontSize: 14
      },
      '&::-ms-input-placeholder': {/*Internet Explorer 10+*/
        fontSize: 14
      },
    },
    '&.Mui-focused': {
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-error': {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.status.error
        },
      }
    }
  }
}))

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (name: string, personName: readonly string[], theme: Theme) => {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const findSelected = (value: string | string[], options: FormChipOption[], key: string): FormChipOption[] => {
  if (isString(value)) {
    const values = options.find(option => option[key] === value)
    return values ? [values] : []
  }

  return options.filter(option => value.some(i => i === option[key]))
}

function FormSelectChip({ options, placeholder, label, name, rules, multiple }: FormChipSelectProps) {
  const theme = useTheme();
  const classes = useStyles()
  const { ref, fieldProps, fieldState, setValue, clearErrors } = useFormController({
    name,
    rules
  })

  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const value = fieldProps.value
    if (value) {
      const values = findSelected(value.split(','), options, 'id').map(i => i.value)
      actionSelected(values)
    }
  }, [fieldProps.value])

  useUpdateEffect(() => {
    if (fieldProps.value && name) {
      clearErrors(name)
    }
  }, [fieldProps.value])

  function actionSelected(value: string | string[]) {
    setSelected(
      typeof value === 'string' ? value.split(',') : value,
    );
  }

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const value = get(event, 'target.value', '')
    actionSelected(value)
    if (name) {
      const values = findSelected(value, options, 'value').map(i => i.id).join(',')
      setValue(name, values)
    }
  };

  const isError = !isUndefined(fieldState.error)

  return (
    <FormControl className={classes.root}>
      {label && <InputLabel id="demo-simple-select-label" className={classes.label}>{label}</InputLabel>}
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple={multiple}
        displayEmpty
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" label={label} className={classes.input} inputRef={ref} {...fieldProps} />}
        renderValue={(std) => {
          if (!std?.length) {
            return <Typography component="span" variant="body1" color={theme.status.placeholder}>{placeholder}</Typography>
          }

          if (isString(std)) {
            return <Chip label={std} />
          }

          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {std?.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )
        }}
        MenuProps={MenuProps}
        value={selected}
        error={isError}
      >
        <MenuItem disabled value="">
          {placeholder}
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.value}
            style={getStyles(option.value, selected, theme)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {isError && <Typography variant="caption" color={theme.status.error}>{fieldState.error?.message}</Typography>}
    </FormControl>
  );
}

export default FormSelectChip

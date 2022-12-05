/**
 * @author zhengji.su
 * @description FormSelectChip
 */

import {useEffect, useState} from "react";
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent, SelectProps} from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import isString from "lodash/isString";
import { toggleExist } from "@/src/utils";
import useFormController from "hooks/useFormController";
import FormText from "components/common/Form/FormText";
import get from "lodash/get";
import type { EmptyObject } from "src/tb.types"

export type FormChipOptionsId = string | number

export type FormChipOptions = {
  id: FormChipOptionsId;
  label: string;
  value?: string;
}

interface FormChipSelectProps extends Omit<SelectProps, 'onChange'>{
  options: FormChipOptions[];
  label?: string;
  rules?: EmptyObject<any>;
  multiple?: boolean;
  onChange?: (opts: FormChipOptionsId[], options?: FormChipOptions[]) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 300,
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
  input: {
    display: 'none'
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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function FormSelectChip({ options, placeholder, name, rules, multiple, onChange }: FormChipSelectProps) {
  const theme = useTheme();
  const classes = useStyles()
  const { fieldProps, fieldState, setValue, clearErrors } = useFormController({
    name,
    rules
  })

  const [selected, setSelected] = useState<FormChipOptions[]>([]);
  const [selectedValue, setSelectedValue] = useState<string[]>([])
  const value = get(fieldProps, 'value', '')

  useEffect(() => {
    if (value && name) {
      setValue(name, fieldProps.value)
    }
  }, [value, name])

  useEffect(() => {
    if (value && name) {
      const values = value.split(',')
      const c = options.filter(option => values.some((val: any) => Number(val) === Number(option.id)))

      setSelectedValue(c.map(i => i.label))
    }
  }, [value, options, name])

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const val = get(event, 'target.value', '')
    setSelectedValue(
      typeof val === 'string' ? val.split(',') : val,
    );
  };

  const handleSelected = (option: FormChipOptions) => {
    const options = toggleExist<FormChipOptions>(selected, option)
    setSelected(options)
    const opts = options.map(o => o.id)
    onChange?.(opts, options)
    if (name) {
      setValue(name, opts.join(','))
      clearErrors(name)
    }
  }

  return (
    <FormControl className={classes.root}>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple={multiple}
        displayEmpty
        onChange={handleChange}
        input={<FormText id="select-multiple-chip" error={!!fieldState.error} helpText={fieldState.error?.message} />}
        renderValue={(selected) => {
          if (!selected?.length) {
            return <Typography component="span" variant="body1" color={theme.status.placeholder}>{placeholder}</Typography>
          }

          if (isString(selected)) {
            return <Chip label={selected} />
          }

          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected?.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )
        }}
        MenuProps={MenuProps}
        value={selectedValue}
      >
        <MenuItem disabled value="">
          {placeholder}
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.label}
            style={getStyles(option.label, selectedValue, theme)}
            onClick={() => handleSelected(option)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <input type="text" className={classes.input} {...fieldProps} />
    </FormControl>
  );
}

export default FormSelectChip

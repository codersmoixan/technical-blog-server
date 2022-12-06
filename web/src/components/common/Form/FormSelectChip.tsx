/**
 * @author zhengji.su
 * @description FormSelectChip
 */

import { useState } from "react";
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent, SelectProps} from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import type { EmptyObject } from "src/tb.types"
import isString from "lodash/isString";
import get from "lodash/get";
import useFormController from "hooks/useFormController";
import OutlinedInput from "@mui/material/OutlinedInput";
import isUndefined from "lodash/isUndefined";
import useUpdateEffect from "hooks/effect/useUpdateEffect";

interface FormChipSelectProps extends SelectProps{
  options: any[];
  label?: string;
  rules?: EmptyObject<any>;
  multiple?: boolean;
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

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function FormSelectChip({ options, placeholder, name, rules, multiple }: FormChipSelectProps) {
  const theme = useTheme();
  const classes = useStyles()
  const { ref, fieldProps, fieldState, setValue, clearErrors } = useFormController({
    name,
    rules
  })

  const [selected, setSelected] = useState<string[]>([]);

  useUpdateEffect(() => {
    if (fieldProps.value && name) {
      clearErrors(name)
    }
  }, [fieldProps.value])

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const value = get(event, 'target.value', '')
    setSelected(
      typeof value === 'string' ? value.split(',') : value,
    );
    if (name) {
      setValue(name, isString(value) ? value : value.join(','))
    }
  };

  const isError = !isUndefined(fieldState.error)

  return (
    <FormControl className={classes.root}>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple={multiple}
        displayEmpty
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" className={classes.input} inputRef={ref} {...fieldProps} />}
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
            style={getStyles(option, selected, theme)}
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

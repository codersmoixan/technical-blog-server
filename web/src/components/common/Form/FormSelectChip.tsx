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
import FormText from "components/common/Form/FormText";
import Typography from "@mui/material/Typography";
import type { EmptyObject } from "src/tb.types"
import isString from "lodash/isString";

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

  const [personName, setPersonName] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <FormControl className={classes.root}>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple={multiple}
        displayEmpty
        onChange={handleChange}
        input={<FormText id="select-multiple-chip" name={name} rules={rules} />}
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
        value={personName}
      >
        <MenuItem disabled value="">
          {placeholder}
        </MenuItem>
        {options.map((option) => (
          <MenuItem
            key={option.id}
            value={option.value}
            style={getStyles(option, personName, theme)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormSelectChip

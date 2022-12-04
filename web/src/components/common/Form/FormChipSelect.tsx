/**
 * @author zhengji.su
 * @description FormChipSelect
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

interface FormChipSelectProps extends SelectProps{
  options: any[];
  value: string;
  label?: string;
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

function FormChipSelect({ label, options, placeholder, name }: FormChipSelectProps) {
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
        multiple
        displayEmpty
        value={personName}
        onChange={handleChange}
        input={<FormText id="select-multiple-chip" />}
        renderValue={(selected) => {
          console.log(selected, 4466)
          if (selected.length === 0) {
            return <Typography component="span" variant="body1" color={theme.status.placeholder}>{placeholder}</Typography>
          }

          return (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )
        }}
        MenuProps={MenuProps}
        inputProps={{ name }}
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

export default FormChipSelect

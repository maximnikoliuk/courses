import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuFilterProps, Filters } from '../../types/FilterTypes';
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { setFilters } from '../../redux/sliceFilters';

function MenuFilter ({ label, filterKey, options }: MenuFilterProps) {
  const dispatch = useAppDispatch();
  const { filtersList } = useAppSelector(
      (state) => state.filters,
  );
  const value = filtersList[filterKey as keyof Filters];

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setFilters({
      ...filtersList,
      [filterKey]: event.target.value as string
    }));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size="small">
        <InputLabel id={`${filterKey}-label`}>{label}</InputLabel>
        <Select
            labelId={`${filterKey}-label`}
            value={value}
            label={label}
            onChange={handleChange}
        >
          {
            options.map((option) => (
                <MenuItem value={option.value}>{option.name}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </Box>
    );
}

export default MenuFilter;
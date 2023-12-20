import React, { ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {Filters, TextFieldFilterProps} from '../../types/FilterTypes';
import {setFilters} from "../../redux/sliceFilters";
import {useAppDispatch, useAppSelector} from "../../redux/store";

function TextFieldFilter ({ label, filterKey }: TextFieldFilterProps) {
  const dispatch = useAppDispatch();
  const { filtersList } = useAppSelector(
      (state) => state.filters,
  );
  const value = filtersList[filterKey as keyof Filters];

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({
      ...filtersList,
      [filterKey]: event.target.value as string
    }));
  };
  return (
    <Box sx={{ minWidth: 120 }}>
      <TextField
          fullWidth
          size="small"
          id={`${filterKey}-filter`}
          variant="outlined"
          value={value}
          label={label}
          onChange={handleChange}
      />
    </Box>
    );
}

export default TextFieldFilter;
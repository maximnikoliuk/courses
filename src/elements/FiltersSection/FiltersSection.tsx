import React from 'react';
import Container from '@mui/material/Container';
import MenuFilter from '../FilterFields/MenuFilter';
import TextFieldFilter from '../FilterFields/TextFieldFilter';
import Stack from "@mui/material/Stack";
import { LANGUAGE_OPTIONS, LEVEL_OPTIONS } from '../../utils/constants';

function FiltersSection () {
  return (
      <Container disableGutters sx={{py: 2}}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextFieldFilter label='Title' filterKey='title' />
          <MenuFilter label='Level' filterKey='level' options={LEVEL_OPTIONS} />
          <MenuFilter label='Language' filterKey='language' options={LANGUAGE_OPTIONS} />
        </Stack>
      </Container>
  )
}

export default FiltersSection;
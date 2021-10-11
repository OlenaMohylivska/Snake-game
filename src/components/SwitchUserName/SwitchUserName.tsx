import React, { useState } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useDebouncedCallback } from 'use-debounce';
import { setUserName } from '../../store/actions';
import { getAllNamesFromLS } from '../../utils';
import { AnyAction } from 'redux';
import './SwitchUserName.scss';

type Props = {
  dispatch: (action: AnyAction) => void;
};

export const SwitchUserName: React.FC<Props> = ({ dispatch }) => {
  const [wayToChooseName, setWayToChooseName] = useState('random');
  const debounced = useDebouncedCallback((event) => {
    dispatch(setUserName({ name: event.target.value }));
  }, 1000);

  const selectUserName = (event: React.ChangeEvent<{ value: unknown }>) => {
    dispatch(setUserName({ name: event.target.value }));
  };

  return (
    <FormControl className='fieldset'>
      <div className='fieldset-wrapper'>
        <RadioGroup
          row
          className='radio'
          aria-label='userName'
          defaultValue={wayToChooseName}
          name='radio-buttons-group'
          onChange={(event) => setWayToChooseName(event.target.value)}
        >
          <FormControlLabel
            value='random'
            control={<Radio />}
            label='Random name'
          />
          <FormControlLabel
            value='enter'
            control={<Radio />}
            label='Enter name'
          />
          <FormControlLabel
            value='select'
            control={<Radio />}
            label='Select name'
          />
        </RadioGroup>

        {wayToChooseName === 'enter' ? (
          <TextField
            className='name-field'
            label='Enter your name'
            variant='outlined'
            size='medium'
            onChange={debounced}
          />
        ) : null}

        {wayToChooseName === 'select' ? (
          <FormControl>
            <InputLabel className='select-label'>Select name</InputLabel>

            <Select
              className='name-field'
              onChange={selectUserName}
              variant='outlined'
            >
              {getAllNamesFromLS().map((el, index) => (
                <MenuItem key={index} value={el}>
                  {el}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : null}
      </div>
    </FormControl>
  );
};

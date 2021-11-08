import React, { useEffect, useRef, useState } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@material-ui/core';
import { Alert, Autocomplete } from '@material-ui/lab';
import { useDebouncedCallback } from 'use-debounce';
import {
  fetchRandomUser,
  getUserInfo,
  saveUserNameToDB,
  setUserName,
} from '../../store/actions';
import './SwitchUserName.scss';
import { splitFullName } from '../../utils';

type Props = {
  dispatch: (action: any) => void;
  usersList: string[];
  error: string | null;
};

export const SwitchUserName: React.FC<Props> = ({ dispatch, usersList, error }) => {
  const [wayToChooseName, setWayToChooseName] = useState('random');
  const [enteredUserName, setEnteredUserName] = useState({
    first: '',
    last: '',
  });
  const wayToChooseNameRef = useRef('');
  const enteredNameRef = useRef({ first: '', last: '' });

  useEffect(() => {
    wayToChooseNameRef.current = wayToChooseName;
    enteredNameRef.current = enteredUserName;
  }, [wayToChooseName, enteredUserName]);

  const debounced = useDebouncedCallback((event) => {
    const { firstName, lastName } = splitFullName(event.target.value);
    dispatch(setUserName({ name: `${firstName} ${lastName}` }));
    setEnteredUserName({ first: firstName, last: lastName });
  }, 1000);

  const selectUserName = (event: any, value: any) => {
    const { firstName, lastName } = splitFullName(value);
    dispatch(getUserInfo({ first: firstName, last: lastName }));
  };

  useEffect(() => {
    return () => {
      if (wayToChooseNameRef.current === 'random') {
        dispatch(fetchRandomUser());
      } else if (wayToChooseNameRef.current === 'enter') {        
        dispatch(saveUserNameToDB(enteredNameRef.current));
      }
    };
  }, []);

  return (
    <FormControl className='fieldset'>
      <div className='fieldset-wrapper'>
        <RadioGroup
          row
          className='radio'
          aria-label='userName'
          defaultValue={'random'}
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
            className='name-field fieldset_name-field_enter'
            label='Enter first and last name'
            variant='outlined'
            size='medium'
            onChange={debounced}
          />
        ) : null}

        {wayToChooseName === 'select' ? (
          <Autocomplete
            options={usersList}
            getOptionLabel={(option) => option || ''}
            onChange={selectUserName}
            renderInput={(params) => (
              <TextField
                {...params}
                className='name-field fieldset_name-field_select'
                variant='outlined'
                label='Select user name'
              />
            )}
          />
        ) : null}
      </div>
    </FormControl>
  );
};

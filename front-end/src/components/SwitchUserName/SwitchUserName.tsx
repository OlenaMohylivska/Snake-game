import React, { useEffect, useRef, useState } from 'react';
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useDebouncedCallback } from 'use-debounce';
import {
  fetchRandomUser,
  getUserInfo,
  saveUserInfoToDB,
  setUserInfo,
} from '../../store/actions';
import './SwitchUserName.scss';

type Props = {
  dispatch: (action: any) => void;
  usersList: Array<{ name: string, id: number}>;
};

export const SwitchUserName: React.FC<Props> = ({ dispatch, usersList }) => {
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
    const [ firstName, lastName ] = event.target.value.split(' ');
    dispatch(setUserInfo({ name: `${firstName} ${lastName}` }));
    setEnteredUserName({ first: firstName, last: lastName });
  }, 1000);

  const selectUserName = (event: any, value: any) => {
    dispatch(getUserInfo({ id: value.id }));
  };

  useEffect(() => {
    return () => {
      if (wayToChooseNameRef.current === 'random') {
        dispatch(fetchRandomUser());
      } else if (wayToChooseNameRef.current === 'enter') {        
        dispatch(saveUserInfoToDB(enteredNameRef.current));
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
            className='autocomplete'
            options={usersList}
            getOptionLabel={(option) => option.name || ''}
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

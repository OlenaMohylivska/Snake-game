import { AnyAction } from 'redux';
import { setUserName } from './actions';

export const fetchUser = () => {
  return (dispatch: (action: AnyAction) => void) => {
    fetch('https://randomuser.me/api')
      .then(response => {
        if (response.status >= 200 && response.status < 400) {
          return response.json()
        } else if (response.status >= 400 && response.status < 500) {
          throw new Error('Client problem');
        } else if (response.status >= 500 && response.status < 600) {
          throw new Error('Server problem');
        }
      })
      .then(data => {
        dispatch(setUserName({ name: `${data.results[0].name.first} ${data.results[0].name.last}`, error: '' }))
      })
      .catch((error) => {
        dispatch(setUserName({ name: 'Default user', error: error.message }));
      })
  }
}
import { produce } from 'immer';
import { actions } from './actions';
import token from '../utils/token';
export const initialState = {
  count: 0,
  token: token.get(),
  x: {
    y: 0,
  },
  user: null,
};
export const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    console.log(state, action);
    switch (action.type) {
      case 'increase':
        draft.count += 1;
        draft.x.y += 1;
        break;
      case 'decrease':
        draft.count -= 1;
        draft.x.y -= 1;
        break;
      case actions.LOGIN_SUCCESS:
        draft.token = action.payload.token;
        draft.user = action.payload.user;
        token.set(draft.token);
        break;
      case actions.LOGOUT_SUCCESS:
        draft.token = null;
        token.remove();
        break;
      default:
        break;
    }
  });

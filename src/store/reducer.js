import { produce } from 'immer';
import { actions } from './actions';
export const initialState = {
  count: 0,
  token: null,
  x: {
    y: 0,
  },
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
        draft.token = action.payload.access_token;
        break;
      default:
        break;
    }
  });

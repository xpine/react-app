import { produce } from 'immer';
const initialState = {
  count: 0,
  x: {
    y: 0,
  },
};
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case 'increase':
        draft.count += 1;
        draft.x.y += 1;
        break;
      case 'decrease':
        draft.count -= 1;
        draft.x.y -= 1;
        break;
      default:
        break;
    }
  });
export default reducer;

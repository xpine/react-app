import Cookies from 'js-cookie';
const TOKENKEY = 'app-token';
export default {
  get: () => Cookies.get(TOKENKEY),
  remove: () => Cookies.remove(TOKENKEY),
  set: (val) => Cookies.set(TOKENKEY, val),
};

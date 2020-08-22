import { SET_CURRENT_USER, GET_ERRORS } from "../actions/types";
import isEmpty from "../utils/is-empty";
const intialState = {
  isAuthenticated: false,
  user: {},
  errors: {}
};

export default function(state = intialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}

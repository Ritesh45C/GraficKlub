import { GET_PHOTOS, PHOTO_LOADING } from "../actions/types";
const intialState = {
  photos: {},
  loading: false
};

export default function(state = intialState, action) {
  switch (action.type) {
    case PHOTO_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        loading: false
      };

    default:
      return state;
  }
}

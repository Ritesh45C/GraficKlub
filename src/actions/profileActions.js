import { GET_PHOTOS, PHOTO_LOADING } from "./types";
import axios from "axios";

export const getPhotos = () => dispatch => {
  dispatch(setPhotoLoading());
  axios
    .get("/api/users/photos/")
    .then(res => {
      dispatch({
        type: GET_PHOTOS,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_PHOTOS,
        payload: {}
      });
    });
};

export const setPhotoLoading = () => {
  return {
    type: PHOTO_LOADING
  };
};

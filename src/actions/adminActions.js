import axios from "axios";
import { SET_CURRENT_USER, GET_ERRORS } from "./types";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
export const getContest = () => {};

// export const getAllPhotos = () => dispatch => {
//   dispatch(setPhotoLoading());
//   axios
//     .get("/api/admin/photos/")
//     .then(res => {
//       console.log(res);
//       dispatch({
//         type: GET_PHOTOS,
//         payload: res.data
//       });
//     })
//     .catch(err => {
//       dispatch({
//         type: GET_PHOTOS,
//         payload: {}
//       });
//     });
// };

export const loginAdmin = (userData, history) => dispatch => {
  axios
    .post("/api/admin/login", userData)
    .then(res => {
      //save to localStorage
      const { token } = res.data;
      console.log(res.data);
      localStorage.setItem("jwtToken", token);
      //set token auth header (will put token to every auth request)
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      history.push("/admin");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

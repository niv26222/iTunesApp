import * as mainConstanst from '../reducers/constant'
import axiosp from "axios-jsonp-pro";
import axios from 'axios';
const DEV= process.env.NODE_ENV==='development'?'http://localhost:5000/':'/';

let mockUrl = 'https://itunes.apple.com/search?term=';
let limit25 = '&limit=25';
export const getArtistsAPI = (artist) => async dispatch => {
  if (artist) {
    const localArtist = JSON.parse(localStorage.getItem("artists"));
    if (!localArtist) {
      localStorage.setItem("artists", JSON.stringify([artist]));
    } else {
      if (!localArtist.includes(artist) && localArtist.length < 10) {
        localArtist.push(artist);
        localStorage.setItem("artists", JSON.stringify(localArtist));
      }
    }
    let url = mockUrl + artist + limit25;
    axiosp.jsonp(url)
      .then(function (response) {
        if (response) {
          dispatch({
            type: mainConstanst.FETCH_NEW_ARTIST_SUCCESS,
            payload: response.results
          });
        } else {
          dispatch({
            type: mainConstanst.FETCH_NEW_ARTIST_ERROR,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: mainConstanst.FETCH_NEW_ARTIST_ERROR,
        });
      });
  } else {
    const localArtist = JSON.parse(localStorage.getItem("artists"));
    if (localArtist) {
      let url = mockUrl + localArtist[localArtist.length - 1] + limit25;
      axiosp.jsonp(url)
        .then(function (response) {
          if (response) {
            dispatch({
              type: mainConstanst.FETCH_NEW_ARTIST_SUCCESS,
              payload: response.results
            });
          } else {
            dispatch({
              type: mainConstanst.FETCH_NEW_ARTIST_ERROR,
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          dispatch({
            type: mainConstanst.FETCH_NEW_ARTIST_ERROR,
          });
        });
    } else {
      dispatch({
        type: mainConstanst.FETCH_NEW_ARTIST_ERROR,
      });
    }


  }
};
export const loginUser = (user) => async dispatch => {
  let responseLogin = await  axios.post(DEV+'api/login', user);
  let body = responseLogin.data;
  console.log(responseLogin);
  if (body.status === "approved" && body !== null) {
    return dispatch({
      type: mainConstanst.SUCCESS_LOGIN,
      payload: user
    })
  } else {
    return dispatch({
      type: mainConstanst.ERROR_LOGIN,
    })
  }
};
export const getUsers = () => async dispatch => {
  let responseLogin = await  axios.post(DEV+'api/getUsers');
  let body = responseLogin.data;
  console.log('getUsers',responseLogin);
  if (body.status === "approved" && body !== null) {
    return dispatch({
      type: mainConstanst.GET_USERS,
      payload:body.users
    })
  } else {
    return dispatch({
      type: mainConstanst.GET_USERS_ERROR,
    })
  }
};
export const deleteUser = (user) => async dispatch => {
  console.log('deleteUser',user);
  let responseLogin = await  axios.post(DEV+'api/deleteUser',user);
  let body = responseLogin.data;
  console.log('getUsers',responseLogin);
  if (body.status === "approved" && body !== null) {
    return dispatch({
      type: mainConstanst.DELETE_USER_SUCCESS,
      payload:body.users
    })
  } else {
    return dispatch({
      type: mainConstanst.DELETE_USER_ERROR,
    })
  }
};
export const registerUser = (user) => async dispatch => {
  let responseLogin = await  axios.post(DEV+'api/register', user);
  let body = responseLogin.data;
  console.log('getUsers',responseLogin);
  if (body.status === "added" && body !== null) {
    return dispatch({
      type: mainConstanst.REGISTER_USER,
      payload:user
    })
  } else {
    return dispatch({
      type: mainConstanst.REGISTER_USER_ERROR,
    })
  }
};

export const searchArtists = value => {
  return {
    type: mainConstanst.SEARCH_ARTIST,
    value
  };
};




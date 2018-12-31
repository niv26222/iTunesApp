import * as actionTypes from './constant'

const initialState = {
  logdin: false,
  userEmail: null,
  userPassword: null,
  adminUsers: null,
  Artists: [],
  searchedValue: "",
  loaded: false,
  errorNewArtist: false
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_USER:
      console.log('REGISTER_USER',action.payload);
      return {...state, logdin: true, userEmail: action.payload.user.email, userPassword: action.payload.user.password};
    case actionTypes.SUCCESS_LOGIN:
      return {...state, logdin: true, userEmail: action.payload.user.email, userPassword: action.payload.user.password};
    case actionTypes.GET_USERS:
      return {...state,adminUsers:action.payload};
    case actionTypes.FETCH_LOCAL_ARTIST_SUCCESS:
      return {...state, Artists: action.payload, loaded: true};
    case actionTypes.SEARCH_ARTIST:
      return {...state, searchedValue: action.value};
    case actionTypes.FETCH_NEW_ARTIST_ERROR:
      return {...state, errorNewArtist: !state.errorNewArtist, searchedValue: "", loaded: true};
    case actionTypes.FETCH_NEW_ARTIST_SUCCESS:
      return {...state, Artists: action.payload, searchedValue: "", loaded: true};
    default:
      return state;
  }
};
export default mainReducer
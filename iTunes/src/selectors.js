import { createSelector } from 'reselect';

export const getArtists = state => state.mainReducer.Artists;
export const getSearchValue = state => state.mainReducer.searchedValue;
export const getLoadingStatus = state => state.mainReducer.loaded;
export const getErrorNewArtist = state => state.mainReducer.errorNewArtist;

export const getSearchedArtists= createSelector(getArtists, getSearchValue, (Artists, searchValue) => {

  return Artists.filter(Artist => Artist.artistName.toLowerCase().includes(searchValue.toLowerCase()));
});



import * as types from '../constants/actionTypes';

export const getFilmAction = (payload) => ({
    type: types.GET_FILM_REQUEST,
    payload
});
import axios from 'axios';

import { BASE_URL } from '../config/index';

// Define action types
export const GET_PEOPLES = 'GET_PEOPLES';
export const ADD_TO_FAVORITES_LIST = 'ADD_TO_FAVORITES_LIST';
export const REMOVE_FROM_FAVORITES_LIST = 'REMOVE_FROM_FAVORITES_LIST';

export const getPeoples = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL}`);
      if (response.data) {
      //console.log("value Test"+response.data.results[0].name)
      //console.log("value Test 00 "+response.data.results)
        dispatch({
          type: GET_PEOPLES,
          payload: response.data.results
        });
      } else {
        console.log('Unable to fetch data from the API BASE URL!');
      }
    };
  } catch (error) {
    // Add custom logic to handle errors
    console.log(error);
  }
};

export const addFavorites = people => dispatch => {
  dispatch({
    type: ADD_TO_FAVORITES_LIST,
    payload: people
  });
};

export const removeFavorites = people => dispatch => {
  dispatch({
    type: REMOVE_FROM_FAVORITES_LIST,
    payload: people
  });
};
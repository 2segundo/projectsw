import { 
  GET_PEOPLES,
  ADD_TO_FAVORITES_LIST,
  REMOVE_FROM_FAVORITES_LIST 
} from './actions';

const initialState = {
  peoples: [],
  favorites: []
};

function peoplesReducer(state = initialState, action) {
  //console.log("Action reducers: "+action.payload)
  switch (action.type) {
    case GET_PEOPLES:
      return { ...state, peoples: action.payload };
    case ADD_TO_FAVORITES_LIST:
      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FROM_FAVORITES_LIST:
      return {
        ...state,
        favorites: state.favorites.filter(peoples => peoples.height !== action.payload.height)
      };
    default:
      return state;
  }
}

export default peoplesReducer;
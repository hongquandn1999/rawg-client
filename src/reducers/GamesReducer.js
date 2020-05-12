import {
  FETCH_GAMES_REQUEST,
  FETCH_GAMES_SUCCESS
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  nextUrl: null,
  games: []
};

function gameKey(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_GAMES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        loading: false,
        nextUrl: payload.nextUrl,
        games: [...state.games, ...payload.fetchedData]
      };

    default:
      return state;
  }
}

function games(state = {}, { type, payload }) {
  switch (type) {
    case FETCH_GAMES_REQUEST:
    case FETCH_GAMES_SUCCESS:
      return {
        ...state,
        [payload.genre]: gameKey(state[payload.genre], {
          type,
          payload
        })
      };
    default:
      return state;
  }
}

export default games;
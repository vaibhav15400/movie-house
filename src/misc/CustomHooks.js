import { useReducer, useEffect, useState } from 'react';
import { apiget } from './config';

function showsReducer(prevstate, action) {
  switch (action.type) {
    case 'ADD': {
      return [...prevstate, action.showId];
    }
    case 'REMOVE': {
      return prevstate.filter(showId => showId !== action.showId);
    }

    default:
      return prevstate;
  }
}

function usePersistedReducer(reducer, initialState, key) {
  const [state, dispatch] = useReducer(reducer, initialState, inital => {
    const persisted = localStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : inital;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
}

export function useShows(key = 'shows') {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = 'lastQuery') {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);

    return persisted ? JSON.parse(persisted) : '';
  });

  const setPersistedInput = newState => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };

  return [input, setPersistedInput];
}

const reducer = (prevstate, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { isloading: false, error: null, show: action.show };
    }
    case 'FETCH_FAILED': {
      return { ...prevstate, isloading: false, error: action.error };
    }

    default:
      return prevstate;
  }
};

export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isloading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    apiget(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showId]);

  return state;
}

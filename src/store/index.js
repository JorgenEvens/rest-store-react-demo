import { createStore, combineReducers, applyMiddleware } from 'redux';
import { restMiddleware, restReducer } from '@jorgenevens/rest-store/redux';

import authReducer from './auth';
import users from './users';
import projects from './projects';
import issues from './issues';

export const rootReducer = combineReducers({
    auth: authReducer,
    users,
    issues,
    projects,
});

const promiseMiddleware = ({ dispatch }) => (next) => async (action) => next(await action);

export const store = createStore(
    (state, action) => {
        state = rootReducer(state, action);
        state = restReducer(state, action);
        state = {
            ...state,
            counter: (state.counter || 0) + 1
        }

        return state;
    },
    {},
    applyMiddleware(
        restMiddleware,
        promiseMiddleware
    )
);

export default store;

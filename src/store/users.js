import qs from 'qs';
import { github } from 'lib/api/github';
import { fetchResource, fetchPage } from 'store/helpers';

function Actions(actions) {
    Object.assign(this, actions);
}

const actions = new Actions({

    fetch: fetchResource(payload => {
        return github.getUser(payload.id);
    }),

    fetchPage: fetchPage(payload => {
        const { page, filters } = payload;
        const query = qs.stringify({ page, ...filters });

        return fetch(`/users?page=${query}`).then(res => res.json());
    }),
});

const defaultState = { actions };

export default
function userReducer(state = defaultState, action) {
    return state;
}


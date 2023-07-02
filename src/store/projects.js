import qs from 'qs';
import { github } from 'lib/api/github';
import { fetchResource, fetchPage } from 'store/helpers';

function Actions(actions) {
    Object.assign(this, actions);
}

const actions = new Actions({

    fetch: fetchResource(payload => {
        return github.getProject(payload.id);
    }),

    fetchPage: fetchPage(async payload => {
        const { page, userId } = payload;

        const query = {
            page,
            per_page: 10,
        };

        return {
            items: await github.getUserProjects(userId, query),
            total: Infinity,
        };
    }),
});

const defaultState = { actions };

export default
function projectReducer(state = defaultState, action) {
    return state;
}


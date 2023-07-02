import qs from 'qs';
import { github } from 'lib/api/github';
import { fetchPage } from 'store/helpers';

function Actions(actions) {
    Object.assign(this, actions);
}

const actions = new Actions({

    fetchPage: fetchPage(async payload => {
        const { page, projectId, type } = payload;

        const query = {
            page,
            per_page: 10,
        };

        const method = type === 'issue' ?
            'getProjectIssues' :
            'getProjectPulls';

        return {
            items: await github[method](projectId, query),
            total: Infinity,
        };
    }),
});

const defaultState = { actions };

export default
function issueReducer(state = defaultState, action) {
    return state;
}


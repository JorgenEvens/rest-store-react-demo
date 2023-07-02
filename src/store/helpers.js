import {
    add,
    addPage,
    loading,
    loadingPage,
    options,
} from '@jorgenevens/rest-store';

export function fetchResource(fn) {
    return async (action, state, apply) => {
        const { payload } = action;
        const { id } = payload;

        apply(state => loading(state, id));

        const result = await fn(payload);

        apply(state => add(state, id, result));
    }
}

export function fetchPage(fn) {
    return async (action, state, apply) => {
        const { payload } = action;
        const { listName, page } = payload;

        apply(state => loadingPage(state, listName, page));

        const result = await fn(payload);

        apply(state => {
            const ids = [];
            for (const item of result.items) {
                ids.push(item.id);
                state = add(state, item.id, item);
            }

            state = addPage(state, listName, page, ids);
            state = options(state, listName, { total: result.total });

            return state;
        });
    }
}

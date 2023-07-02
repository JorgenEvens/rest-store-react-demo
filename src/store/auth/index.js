import { github } from 'lib/api/github';
import { useSelector } from 'react-redux';

export function useAuth() {
    return useSelector(state => state?.auth || {});
}

export function useToken() {
    return useSelector(state => state?.auth?.token);
}

export async function exchangeCode({ state, code }) {
    const result = await github.exchangeCode(state, code);

    return {
        type: 'auth/exchangeCode',
        payload: {
            code,
            state,
            token: result.access_token,
        }
    };
}

export default
function authReducer(state, action) {
    if (typeof state == 'undefined') {
        state = {
            token: window?.localStorage?.getItem('accessToken'),
        };
    }

    if (action.type === 'auth/exchangeCode') {
        const token = action.payload?.token;

        window?.localStorage?.setItem('accessToken', token);
        state = { ...state, token };
    }

    return state;
}

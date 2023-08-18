import { isSessionAndSessionData } from '../actions/api_actions'
export const getCookie = (name) => {

    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1, cookie.length);
        }
    }

    return null;
};

export const getSession = () => {
    let data = isSessionAndSessionData('GET', {})
    data.then((result) => {
        if (result.status === 200) {
            return result.data.response_data
        }
        else {
            return {}
        }
    })
}
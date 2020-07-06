import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = `Token ${token}`;

    }
    else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;
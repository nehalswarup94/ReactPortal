import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        //axios.defaults.headers.common['x-auth-token'] = `Token ${token}`;
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
        axios.defaults.headers.post['Content-Type'] = 'application/json';

    }
    else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;
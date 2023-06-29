import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL2,
});

export const get = async (id = '', options = {}) => {
    const response = await httpRequest.get(id, options);

    return response.data;
};

export default httpRequest;

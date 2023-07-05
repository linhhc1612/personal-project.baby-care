import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL2,
});

export const get = async (id = '', options = {}) => {
    const response = await httpRequest.get(id, options);

    return response.data;
};

export const put = async (id = '', options = {}) => {
    try {
        return await httpRequest.put(id, options);
    } catch (error) {
        console.log('Lỗi khi cập nhật giá trị:', error);
    }
};

export default httpRequest;

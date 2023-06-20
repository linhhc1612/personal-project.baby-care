import * as request from '~/untils/httpRequest';

export const search = async (query, type = 'less') => {
    try {
        const response = await request.get('users/search', {
            params: {
                q: query,
                type,
            },
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

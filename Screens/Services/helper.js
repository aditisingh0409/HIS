import axios from 'axios'
export const BASE_URL='http://localhost:8070/his';

export const myAxios=axios.create({
    baseURL:BASE_URL
});
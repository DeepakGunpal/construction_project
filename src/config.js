import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://constructionproject.onrender.com/api/'
})
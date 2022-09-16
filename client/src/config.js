import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://dgconstruction.herokuapp.com/api/'
})
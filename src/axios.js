import axios from 'axios';

const instance = axios.create({baseURL: 'https://api.mocklets.com'});

export default instance;

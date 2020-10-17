import axios from'axios';

const instance = axios.create({
    baseURL : 'https://react-burger-app-69ff9.firebaseio.com/'
})

export default instance;
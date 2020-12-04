import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger24-app-default-rtdb.firebaseio.com/'
})

export default instance;
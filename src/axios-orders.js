import axios from 'axios';

const instance = axios.create({

baseURL: 'https://react-burger-2e4b7.firebaseio.com/'

});


export default instance;

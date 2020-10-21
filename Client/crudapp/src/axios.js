import axios from 'axios';

const instance = axios.create({baseURL:'http://investocracybackend-env.eba-cpt3gimy.ca-central-1.elasticbeanstalk.com/'});


export default instance;
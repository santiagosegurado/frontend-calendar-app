import axios from 'axios';
import { getEnvVariables } from '../helpers';


const { VITE_URL_API }  = getEnvVariables();


// Le digo a axios que url voy a usar 
const calendarApi = axios.create({
  baseURL: VITE_URL_API
})


//TODO:  Config de Interceptores de request(Solicitud)

// Para agregar los token en el header
calendarApi.interceptors.request.use( config => {

  config.headers = {
    ...config.headers,
    'x-token': localStorage.getItem('token')
  }

  return config
})

export default calendarApi;

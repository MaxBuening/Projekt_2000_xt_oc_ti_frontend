import axios from "axios";
import {store} from "@/assets/store";

axios.interceptors.response.use(resp => resp, async error => {

    if (error.response.status === 401){
       const response = await axios.post('http://localhost:8080/api/refresh', {}, {withCredentials:true});

    if (response.status ===200){
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data}`
        store.auth = true;
        return axios(error.config);
    } else{
        store.auth = false;
    }
   }
    return error;
});

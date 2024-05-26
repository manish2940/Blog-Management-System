import axios  from 'axios';
import { getType } from '../utils/common-utils';
import { API_NOTIFICATION_MESSAGES,SERVICE_URLS } from '../constants/config';
const API_URL = 'http://localhost:8000';
const axiosInstance = axios.create({
    baseURL:API_URL,/* The code snippet you provided is setting up an Axios instance with specific
    configurations. */
    timeout:10000,
    headers:{
        "Content-Type":"application/json"
    }
})
axiosInstance.interceptors.request.use(
    // function (config) {
    //     return config;
    // },
    // function (error){
    //     return Promise.reject(error);
    // }
    function(config) {
        if (config.TYPE.params) {
            config.params = config.TYPE.params
        } else if (config.TYPE.query) {
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
)
axiosInstance.interceptors.response.use(
    function (response){
        //stop global loader here
        return processResponse(response);
    },
    function (error){
        return Promise.reject(processError(error));
    }
    
)
const processResponse = (response)=>{
    if(response?.status === 200){
        return {isSuccess:true,data:response.data}
    }else{
        return{
            isFailure:true,
            status:response?.status,
            msg:response?.msg,
            code:response?.code
        }
    }
}  
const processError = (error)=>{
    if(error.response){
        console.log('Error in response: ',JSON.stringify(error));
        return{
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code:error.response.status
        }
    }else if(error.request){
            console.log('ERROR IN REQUEST: ',JSON.stringify(error));
            return{
                isError:true,
                msg:API_NOTIFICATION_MESSAGES.requestFailure,
                code:""
            }
        
        }
    else{
        console.log('ERROR IN NETWORK: ',JSON.stringify(error));
        return {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:""
        }
    }
}
const API = {};
for(const [key,value] of Object.entries(SERVICE_URLS)){
    API[key]=  (body,showUploadProgress,showDownloadProgress)=>{
        axiosInstance({
            method:value.method,
            url:value.url,
            data:value.method === 'DELETE' ? {}:body,
            responseType:value.responseType,
            TYPE:getType(value,body),
            onUploadProgress:function (progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total);
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress:function (progressEvent){
                if(showDownloadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded*100)/progressEvent.total);
                    showDownloadProgress(percentageCompleted);
                }
            }
        })
        
    }
}
export {API};
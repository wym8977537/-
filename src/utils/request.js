// 01 创建axios对象
import axios from 'axios'
//02配置参考
const request = axios.create({
    baseURL:process.env.VUE_APP_BASE_API,
    // baseURL:'/',
    timeout:5000
})

//拦截
request.interceptors.request.use(config=>{
    return config
},error =>{
    return Promise.reject(error)
})
request.interceptors.response.use(response => {
    return response
},error=>{
    return Promise.reject(error)
})
//导出axios
export default request 
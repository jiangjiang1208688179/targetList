import axios from 'axios'
/*创建axios实例对象*/
const ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

/*请求拦截器（请求之前的操作）*/
ajax.interceptors.request.use(
    config => {
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
// 请求后的操作
ajax.interceptors.response.use(config => {
    return config;
}, err=>{
    return Promise.reject(err);
})
// 导出模块
export default ajax;
module.exports
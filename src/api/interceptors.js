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
    console.log('aa',config);
    return config;
}, err=>{
    return Promise.reject(err);
})
// 导出模块
export default ajax;
module.exports


// 接口拦截器，使用时可以通过以下方法来使用
// import {request} from '../api/interceptors'
// request({methods: 'get', url:'/api/task/get_tasks'}).then(res=>{
//     console.log('');
//   });



// import axios from 'axios';


// // 默认配置
// axios.defaults.baseURL = 'http://118.24.156.129/'; 
// // axios.defaults.headers.post['Content-Type'] = 'application/json';

// export const request = (config) => {
//   return axios(config);
// };

// // http request 拦截器
// axios.interceptors.request.use(
//   (config) => {  //post请求成功
//       if(config.data.content){
//           return config
//       }else {
//           throw new Error('提交失败');
//       }
//   },
//   (err) => {
//     return Promise.reject(err);
//   }
// );

// // http response 拦截器
// axios.interceptors.response.use(
//   (response) => {
//       if(response.data.code==20000){
//         return response;
//       } else {
//           throw new Error('请求异常', response.data.msg);
//       }
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
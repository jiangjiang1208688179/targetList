import ajax from './interceptor.js';
// 具体接口请求
const cardList = () => {
    return ajax.get('home');
}
// const login = (params) => {
//     return ajax.post(`auth/login`, params)
//   }
apiList = {cardList};
export default apiList
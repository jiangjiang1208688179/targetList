import axios from 'axios'

export function fetch(options){
    return new Promise((resolve, reject)=>{
        const instance = axios.create({
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000
        });
        instance(options)
        .then(response =>{
            if(response.status == '200' && response.data.code == '20000'){
                resolve(response.data);
            } else if(response.status == '200'){
                console.log('响应正常，结果不正常：'+ response.data.msg);  //处理响应正常，但结果不正常部分
            } else {
                //.......//处理非200状态
            }
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
    });
}

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
            }
        })
        .catch(err => {
            console.log(err);
            reject(err);
        });
    });
}

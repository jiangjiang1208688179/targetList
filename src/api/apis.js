import {fetch} from './fetch'
// import api from './api'

///api/task/get_tasks?is_complete=true  //表示查看已完成项目，不传值表示所有
export function getTasks(params){
    return fetch({
       url: '/api/task/get_tasks',
       method: 'get',
       params:{
        is_complete: params
       }
    })
}
export function taskEdit(obj){
    return fetch({
        url: '/api/task/edit',
        method: 'post',
        data: obj
    })
}
export function taskAdd(obj){
    return fetch({
        url: '/api/task/add',
        method: 'post',
        data: obj
    })
}
export function taskRm(obj){
    return fetch({
        url: '',
        method: 'post',
        data: obj
    })
}
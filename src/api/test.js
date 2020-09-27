import request from '../utils/request';
//测试一：get方式发送get请求
// request.get('/text.json').then(response =>{
//     console.log('get',response.data);
// }).catch(error => {
//     console.log(error)
// })
// // 测试二：使用对象的方式传入请求匹配 
// request({
//     url:'/text.json',
//     method:'get'
// }).then(response => {
//     console.log('get2',response.data)
// }).catch(error =>{
//     console.log(error)
// })
// 03导出默认对象
// 导出的默认对象里面是方法，
// 方法返回值为 Promise 对象，
// 通过它调用 then 获取响应数据 
export default {
    getList(){
        const req = request({
            url: '/text.json',
            method:'get'
        });
        return req;
    }
}
import request from '@/utils/request'

export default{
    getList(){
        return request({
            url:'/member/list',
            method:'get'	
        })
    },
    search(page,size,searchMap){
        return request({
            url:`/member/list/search/${page}/${size}`,
            method:'get',
            data:searchMap
        })  
    },
    //新增会员
    add(pojo){
        return request({
            url:'/member',
            method:'post',
            data:pojo
        })
    }
}
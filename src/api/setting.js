import request from "@/utils/request";

// 修改全局设置
export function settingAdmin(data){
    return request({
        url: '/api/admin',
        method: 'put', 
        data:{
            ...data
        }
      })
}
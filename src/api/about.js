import request from "@/utils/request";
 
  // 修改关于我URL
export function updataAboutUrl(url) { 
  return request({
    url: '/api/about',
    method: 'post',
    data:{
        url,
    }
  })
}
 
// 获取关于我的url
export function getAboutUrl(){
    return request({
        url: '/api/about',
        method: 'get', 
      })
}

// 获取全局设置
export function getSetting(){
    return request({
        url: '/api/setting',
        method: 'get', 
      })
}

// 修改全局设置
export function updateSetting(data){
    return request({
        url: '/api/setting',
        method: 'put', 
        data:{
            ...data
        }
      })
}
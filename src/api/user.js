import request from "@/utils/request";
 
// 登录方法
export function loginApi(data) { 
  return request({
    url: "/api/admin/login",
    method: "post",
    data
  }) 
}

// export function loginApi(data) { 
//   return request({
//     url: "/api/admin/login",
//     method: "post",  
//     data, 
//   });
// }
export function getInfoApi() {
  return request({
    url: "/api/admin/whoami",
    method: "get",
  });
}

export function logout() {
  return request({
    url: "/vue-admin-template/user/logout",
    method: "post",
  });
}
